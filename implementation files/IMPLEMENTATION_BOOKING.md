# Spengo Booking & Backend Dashboard Implementation Plan

This document outlines the systematic plan to implement a comprehensive backend and dashboard system for user management, booking functionality, and analytics.

---

## 1. Architecture & Tech Stack Updates
We are leveraging the existing architecture:
*   **Frontend**: Next.js App Router, React, Tailwind CSS, Framer Motion.
*   **Database & Auth**: Supabase.
*   **File Storage**: Supabase Storage (Buckets).
*   **Serverless**: Supabase Edge Functions.
*   **Payment Integration**: Deferred for future enhancements; no online payments are handled initially.

---

## 2. Branding & UI/UX Guidelines
To ensure the new pages and dashboards seamlessly align with the current Spengo platform context, follow these UI guidelines:

### Branding
*   **Theme**: Dark mode interface natively.
    *   **Backgrounds**: Use `#1a1a1a` (app `bg`) and `#242424` (app `surface` or `card`) for main containers.
    *   **Borders**: Soft thin borders `rgba(255, 255, 255, 0.08)` for dividing sections.
    *   **Typography**:
        *   **Headings**: `Outfit` font with negative letter spacing (`-0.02em` or `-tracking-headline`).
        *   **Body Text**: `Plus Jakarta Sans` (`text-body`, `text-muted` #a0a0a0).
    *   **Accents**: Use the primary purple `text-primary` (`#a855f7`) and `text-cyan` (`#06b6d4`) for call-to-action details, badges, and focus rings.

### UX Rules
*   **Admin Dashboard**: Integrate directly into the existing `/admin` structure and layout (which currently handles metrics and blog generation).
*   **Routing**: Use unique URL slugs for major user pages (e.g., `/dashboard`, `/book/[sessionId]`) rather than nesting everything in modals.
*   **Modals**: Use strictly for confirmation actions (e.g., "Are you sure you want to cancel this booking?") or quick field edits.
*   **Notifications**: Implement a **Screen Toast Messages** system that appears on the **Top Left** of the screen for success, warning, or error messages.

---

## 3. Booking & Logic Rules
*   **Booking Window**: Users can book sessions up to **2 weeks in advance**.
*   **Capacity**: Sessions are **strictly 1-on-1**. Once a time slot is booked, it is unavailable to everyone else. Users can leave a note in the `reason_notes` if they will have multiple people attending on their end.
*   **Timezones**: Save incoming booking times as UTC in Supabase; display in the user's local timezone.
*   **Login History Tracking**: For now, we will rely on Supabase's native `last_sign_in_at` to track the most recent login, rather than a full ledger of every login occurrence.

---

## 4. Database Schema Overview (Supabase)

We will introduce or expand the following tables to manage bookings, history, and users.

### Table: `users` (Extend Supabase Auth)
*(Ties to `auth.users` via triggers or Foreign Key)*
*   `id`: UUID (FK to auth.users)
*   `email`: String
*   `role`: Enum (`user`, `client`, `admin`) - Defaults to `user`. Changes to `client` upon booking first session.
*   `status`: Enum (`active`, `banned`, `rejected`)
*   `created_at`: Timestamp
*   *(Login time handled natively by Supabase Auth `last_sign_in_at`)*

### Table: `booking_topics` (CRUD)
*   `id`: UUID
*   `name`: String (e.g., "Project Kickoff", "Bug Support")
*   `is_active`: Boolean
*   `created_at`: Timestamp

### Table: `session_categories` (CRUD)
*   `id`: UUID
*   `name`: String (e.g., "Development", "Design", "Marketing")
*   `is_active`: Boolean
*   `created_at`: Timestamp

### Table: `sessions` (Available blocks on the Landing Page)
*   `id`: UUID
*   `category_id`: UUID (FK to `session_categories`)
*   `title`: String (e.g., "Consultation", "Design Review")
*   `description`: Text (Short description of the call/session)
*   `duration_minutes`: Integer
*   `is_active`: Boolean (Toggle availability on Landing Page)
*   `created_at`: Timestamp

### Table: `calendar_availability` (Rules & Exceptions)
*   `id`: UUID
*   `day_of_week`: Integer (0-6)
*   `start_time`: Time
*   `end_time`: Time
*   `is_exception`: Boolean (For single-day overrides or specific micro-activations)
*   `exception_date`: Date (If `is_exception` is true)

### Table: `bookings`
*   `id`: UUID
*   `user_id`: UUID (FK to `users`)
*   `session_id`: UUID (FK to `sessions`)
*   `topic_id`: UUID (FK to `booking_topics`, Optional)
*   `booking_date`: Date
*   `start_time`: Time
*   `end_time`: Time
*   `status`: Enum (`pending`, `confirmed`, `completed`, `cancelled`)
*   `reason_notes`: Text (User context, noting if multiple people are joining, etc.)
*   `created_at`: Timestamp

### Table: `history_logs` (Audit History)
*   `id`: UUID
*   `user_id`: UUID (FK to `users`)
*   `action_type`: String (Standardized varchar strings e.g., 'booking_made', 'blog_read' instead of Enum for flexible tracking)
*   `details`: JSONB (Metadata about the action)
*   `created_at`: Timestamp

---

## 5. Page Structure & Routing

### Public Pages
1.  **Landing Page Session Blocks** (`/`)
    *   Display active sessions queried from the `sessions` table.
    *   Show available times based on `calendar_availability` rules (max 2 weeks out).
    *   If user clicks book, redirect to auth or booking confirmation slug.

### General User Pages
*   `/dashboard`: User's primary hub showing upcoming bookings.
*   `/dashboard/bookings`: Full history of past and upcoming bookings.
*   `/dashboard/settings`: Profile settings (name, password updates) + Toast message integration on save.
*   `/book/[sessionId]`: Unique slug for scheduling a specific session.

### Admin Pages (`/admin/*`) *Integrates into existing Admin Board*
*   `/admin`: Add a bookings/users overview section to the existing metrics dashboard.
*   `/admin/categories-topics`: CRUD interface to manage `booking_topics` and `session_categories`.
*   `/admin/sessions`: CRUD interface for the actual session blocks shown on the landing page *(similar format to how Admin currently creates blogs)*. 
*   `/admin/bookings`: Master table of all bookings. Manage statuses (`pending` -> `confirmed` or `cancelled`, flag `no_show`).
*   `/admin/calendar`: Manage `calendar_availability` rules and exceptions (activating availability for small periods).
*   `/admin/clients`: View all users. Filter by role (`user`, `client`). Actions: Ban, Reject, elevate status. View specific Client UI at `/admin/clients/[userId]`.
*   `/admin/reports`: View `reason_notes` from bookings and general platform trends based on `history_logs`.

---

## 6. Implementation Phases

**Phase 1: Database & Role Infrastructure**
- [x] Create all tables defined in Section 4 (Database Schema Overview).
- [x] Deploy Supabase SQL migrations to create `users` (with roles), `booking_topics`, `session_categories`, `sessions`, `bookings`, `calendar_availability`, and `history_logs`.
- [x] Set up Row Level Security (RLS) ensuring admins can read/write everything, but users can only read/write their own data.

**Phase 2: Admin Dashboard Extension & Session Creator**
- [x] Extend the existing `/admin` layout to include navigation for Sessions, Categories/Topics, Bookings, Clients, Calendar, and Reports.
- [x] Build `/admin/categories-topics` to give the Admin full CRUD control over lookup tables.
- [x] Build `/admin/sessions` ensuring the Admin can create and toggle session blocks easily (mimicking the blog creation workflow).
- [x] Implement the global Top-Left Toast Notification Context for the App.

**Phase 3: Calendar & Availability Engine**
- [x] Build `/admin/calendar` to map available days/times and one-off exceptions.
- [x] Implement timezone-aware API logic to build available slots (max 2 weeks out, ignoring slots that already have a `booking` to enforce 1-on-1).

**Phase 4: Client Booking Experience**
- [x] Update the Main Landing page to fetch active sessions from Supabase.
- [x] Create the Booking Flow: Selecting an available time -> entering reason/notes -> clicking Book.
- [x] Handle logic to automatically upgrade a user's role to `client` upon their first successful booking.
- [ ] Create mock/dummy sessions to test and display on the landing page and admin page.

**Phase 5: Booking Management & Client Monitoring**
- [ ] Establish `/admin/bookings` to approve/deny/manage bookings.
- [ ] Establish `/admin/clients` to allow role manipulation (`user` to `client` handling, banning).
- [ ] Create the User variant at `/dashboard/bookings` and `/dashboard/settings`.
- [ ] Construct the `/admin/reports` page aggregating the `history_logs` and booking reasons.
