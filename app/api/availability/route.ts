import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Helper to add minutes to a time string (HH:MM)
function addMinutes(timeStr: string, minutes: number): string {
    const [hours, mins] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, mins + minutes, 0, 0);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

// Helper to compare two time strings (HH:MM)
function isTimeEarlierOrEqual(time1: string, time2: string): boolean {
    return time1 <= time2;
}

// Check if two time intervals overlap
// [start1, end1) and [start2, end2)
function doIntervalsOverlap(start1: string, end1: string, start2: string, end2: string): boolean {
    // If one interval starts after or exactly when the other ends, they don't overlap
    if (start1 >= end2 || start2 >= end1) return false;
    return true; // Otherwise they overlap
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get('session_id');
        const timezone = searchParams.get('timezone') || 'America/New_York'; // Client can pass TZ if needed, but defaults to EST

        if (!sessionId) {
            return NextResponse.json({ error: 'session_id is required' }, { status: 400 });
        }

        // 1. Fetch Session details
        const { data: session, error: sessionError } = await supabase
            .from('sessions')
            .select('duration_minutes, is_active')
            .eq('id', sessionId)
            .single();

        if (sessionError || !session || !session.is_active) {
            return NextResponse.json({ error: 'Active session not found' }, { status: 404 });
        }

        const duration = session.duration_minutes;

        // 2. Fetch Weekly Schedule and Exceptions
        const { data: availabilityData, error: availabilityError } = await supabase
            .from('calendar_availability')
            .select('*');

        if (availabilityError) {
            return NextResponse.json({ error: 'Failed to fetch calendar availability' }, { status: 500 });
        }

        const weeklySchedule: any = {};
        const exceptions = new Set<string>();

        availabilityData.forEach((item: any) => {
            if (item.is_exception && item.exception_date) {
                exceptions.add(item.exception_date);
            } else if (item.day_of_week !== null) {
                weeklySchedule[item.day_of_week] = {
                    start: item.start_time?.substring(0, 5) || "09:00",
                    end: item.end_time?.substring(0, 5) || "17:00",
                };
            }
        });

        // 3. Define 2-week window (14 days)
        // We calculate dates from 'today' based on the business timezone (America/New_York)
        const dateOptions: Intl.DateTimeFormatOptions = { timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit' };
        const formatter = new Intl.DateTimeFormat('en-CA', dateOptions); // en-CA gives YYYY-MM-DD

        const today = new Date();
        const dates: string[] = [];
        for (let i = 1; i <= 14; i++) { // Start from tomorrow to give 24h notice, or i=0 for today
            const nextDate = new Date(today);
            nextDate.setDate(today.getDate() + i);

            // Format to YYYY-MM-DD in the target Timezone
            const formattedDate = formatter.format(nextDate);
            dates.push(formattedDate);
        }

        // 4. Fetch Bookings within the 14 day window
        const { data: bookings, error: bookingsError } = await supabase
            .from('bookings')
            .select('booking_date, start_time, end_time, status')
            .gte('booking_date', dates[0])
            .lte('booking_date', dates[dates.length - 1])
            .in('status', ['pending', 'confirmed']); // Only regard active bookings blocking time

        if (bookingsError) {
            return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
        }

        // Map bookings by date
        const bookingsMap: { [key: string]: Array<{ start: string, end: string }> } = {};
        dates.forEach(d => bookingsMap[d] = []);
        if (bookings) {
            bookings.forEach(b => {
                const dateCode = b.booking_date;
                if (bookingsMap[dateCode]) {
                    bookingsMap[dateCode].push({
                        start: b.start_time.substring(0, 5),
                        end: b.end_time.substring(0, 5)
                    });
                }
            });
        }

        // 5. Generate open slots per day
        const availableSlots: { [key: string]: string[] } = {};

        dates.forEach(dateStr => {
            // Check if exception
            if (exceptions.has(dateStr)) {
                availableSlots[dateStr] = [];
                return;
            }

            // Get day of week (0-6, representing Sunday-Saturday)
            // Parse date string carefully to not skew via timezone
            const [year, month, day] = dateStr.split('-').map(Number);
            const dateObj = new Date(year, month - 1, day);
            const dayOfWeek = dateObj.getDay();

            const schedule = weeklySchedule[dayOfWeek];
            if (!schedule) {
                availableSlots[dateStr] = []; // Not working this day
                return;
            }

            const dailySlots: string[] = [];
            let currentSlotStart = schedule.start;

            while (true) {
                const currentSlotEnd = addMinutes(currentSlotStart, duration);

                // If this slot pushes past the work day end
                if (!isTimeEarlierOrEqual(currentSlotEnd, schedule.end)) {
                    break;
                }

                // Check for overlaps with booked times
                const dayBookings = bookingsMap[dateStr] || [];
                let hasConflict = false;
                for (const b of dayBookings) {
                    if (doIntervalsOverlap(currentSlotStart, currentSlotEnd, b.start, b.end)) {
                        hasConflict = true;
                        break;
                    }
                }

                if (!hasConflict) {
                    dailySlots.push(currentSlotStart);
                }

                // Increment slot iterator (e.g. by 15 mins or full duration? let's do 30 min increments to offer neat slots)
                // You can also increment by 'duration' strictly. Let's do 30 mins to avoid weird fragmented slots.
                currentSlotStart = addMinutes(currentSlotStart, 30);
            }

            availableSlots[dateStr] = dailySlots;
        });

        // Structure response
        const responseData = dates.map(date => ({
            date,
            slots: availableSlots[date]
        })).filter(day => day.slots.length > 0); // Optionally filter out days with zero availability

        return NextResponse.json({ data: responseData });

    } catch (err: any) {
        console.error("Availability API Error:", err);
        return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
    }
}
