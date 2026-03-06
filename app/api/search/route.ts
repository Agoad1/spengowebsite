import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const rateLimitMap = new Map<string, { count: number; startTime: number }>();

function isRateLimited(ip: string) {
    const windowMs = 60 * 1000;
    const limit = 20;
    const now = Date.now();

    if (!rateLimitMap.has(ip)) {
        rateLimitMap.set(ip, { count: 1, startTime: now });
        return false;
    }

    const data = rateLimitMap.get(ip)!;

    if (now - data.startTime > windowMs) {
        data.count = 1;
        data.startTime = now;
        return false;
    }

    data.count++;
    return data.count > limit;
}

export async function GET(req: Request) {
    try {
        const ip = req.headers.get('x-forwarded-for') || 'unknown';
        if (isRateLimited(ip)) {
            return NextResponse.json({ error: 'Too Many Requests', success: false }, { status: 429 });
        }

        const { searchParams } = new URL(req.url);
        const query = searchParams.get('query');

        if (!query) {
            return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
        }

        // Generate the embedding vector for the search query
        const response = await openai.embeddings.create({
            model: 'text-embedding-ada-002',
            input: query,
        });

        const query_embedding = response.data[0].embedding;

        // Implement Supabase pgvector RPC call here in step 2
        const { data: results, error: rpcError } = await supabase.rpc('match_pages', {
            query_embedding,
            match_threshold: 0.5,
            match_count: 5
        });

        if (rpcError) {
            console.error('Supabase RPC error:', rpcError);
            return NextResponse.json({ error: 'Failed to search database', details: rpcError.message }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            results: results || []
        });

    } catch (error: any) {
        console.error('API /api/search error:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
