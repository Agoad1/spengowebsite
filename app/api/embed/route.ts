import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, description, url, action } = body;

        if (!url || !action) {
            return NextResponse.json({ error: 'Missing required fields: url and action are required' }, { status: 400 });
        }

        if (action === 'delete') {
            const { error: deleteError } = await supabase
                .from('page_embeddings')
                .delete()
                .eq('url', url);

            if (deleteError) {
                console.error('Error deleting embedding:', deleteError);
                return NextResponse.json({ error: 'Failed to delete embedding' }, { status: 500 });
            }

            return NextResponse.json({ success: true, message: 'Embedding deleted successfully' });
        }

        if (action === 'upsert') {
            if (!title || !description) {
                return NextResponse.json({ error: 'Missing title or description for upsert' }, { status: 400 });
            }

            try {
                const response = await openai.embeddings.create({
                    model: 'text-embedding-ada-002',
                    input: `${title} - ${description}`
                });

                const embedding = response.data[0].embedding;

                const { error: upsertError } = await supabase
                    .from('page_embeddings')
                    .upsert(
                        { url, title, description, embedding },
                        { onConflict: 'url' }
                    );

                if (upsertError) {
                    console.error('Error upserting embedding:', upsertError);
                    // Return 200 so we don't block the blog post from saving in the admin UI
                    return NextResponse.json({ success: true, warning: 'Failed to upsert embedding, but proceeding' });
                }

                return NextResponse.json({ success: true, message: 'Embedding generated and saved successfully' });
            } catch (embedError) {
                console.error('Error generating embedding with OpenAI:', embedError);
                // Return 200 so we don't block the blog post from saving in the admin UI
                return NextResponse.json({ success: true, warning: 'Failed to generate embedding, but proceeding' });
            }
        }

        return NextResponse.json({ error: 'Invalid action specified' }, { status: 400 });

    } catch (error) {
        console.error('API /api/embed error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
