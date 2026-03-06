import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const openaiKey = process.env.OPENAI_API_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase configuration in .env.local");
    process.exit(1);
}

if (!openaiKey) {
    console.error("Missing OPENAI_API_KEY in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const openai = new OpenAI({ apiKey: openaiKey });

const searchIndex = [
    { title: "Home", description: "We make it easy for your website visitors to convert. Fast, modern websites that earn trust instantly.", url: "/" },
    { title: "How It Works", description: "Submit your site, we audit everything, you review the roadmap and decide.", url: "/#pricing" },
    { title: "Services", description: "Browse our service packages — Tier 1, Tier 2, Tier 3, and Tier X custom builds.", url: "/services" },
    { title: "Tier 1", description: "Foundation package. Includes website or landing page and basic SEO.", url: "/services/tier-1" },
    { title: "Tier 2", description: "System package. Includes everything in Tier 1 plus lead capture, FAQ bot, email follow-up automation, and booking CRM.", url: "/services/tier-2" },
    { title: "Tier 3", description: "Full automation package. Includes everything in Tier 2 plus full automations, AEO optimization, and phone caller automation.", url: "/services/tier-3" },
    { title: "Tier X", description: "Custom build. Fully tailored system built around your exact business needs. Quote-based.", url: "/services/tier-x" },
    { title: "Website & Landing Page", description: "High-converting websites and landing pages built to earn trust and drive action.", url: "/services/website-landing-page" },
    { title: "Automations", description: "Business automations that eliminate manual work and keep your operation running without you.", url: "/services/automations" },
    { title: "Booking CRM", description: "Booking and CRM systems that manage your clients, appointments, and follow-ups automatically.", url: "/services/booking-crm" },
    { title: "FAQ Bot & Lead Capture", description: "AI-powered FAQ bots that answer questions and capture leads around the clock.", url: "/services/faq-bot-lead-capture" },
    { title: "SEO & AEO Optimization", description: "Search engine and answer engine optimization to get your business found online.", url: "/services/seo-aeo-optimization" },
    { title: "Email Follow-up Automation", description: "Automated email sequences that follow up with leads so you never lose a potential client.", url: "/services/email-follow-up" },
    { title: "Phone Caller Automation", description: "Automated phone caller systems that reach out to leads and clients without manual dialing.", url: "/services/phone-caller-automation" },
    { title: "Blog", description: "Insights on building high-converting websites, AI optimization, and digital strategy.", url: "/blog" },
    { title: "Changelog", description: "Track updates and improvements to Spengo's services and platform.", url: "/changelog" },
    { title: "Contact", description: "Let's build your conversion engine. Start your free audit today.", url: "/#start" }
];

async function seed() {
    console.log('Fetching blog posts...');
    const { data: posts, error } = await supabase.from('posts').select('title, content, slug');
    if (error) {
        console.error('Error fetching posts:', error);
        return;
    }

    const allPages = [...searchIndex];

    if (posts) {
        posts.forEach(post => {
            const description = post.content ? post.content.slice(0, 200).replace(/\n/g, ' ') + '...' : '';
            allPages.push({
                title: post.title,
                description,
                url: `/blog/${post.slug}`
            });
        });
    }

    console.log(`Successfully fetched and prepared ${allPages.length} total items...`);

    let successCount = 0;
    for (const page of allPages) {
        try {
            const input = `${page.title} - ${page.description}`;
            console.log(`Generating embedding for: ${page.url}`);

            const response = await openai.embeddings.create({
                model: 'text-embedding-ada-002',
                input: input
            });

            const embedding = response.data[0].embedding;

            const { error: upsertError } = await supabase
                .from('page_embeddings')
                .upsert({
                    url: page.url,
                    title: page.title,
                    description: page.description,
                    embedding: embedding
                }, { onConflict: 'url' });

            if (upsertError) {
                console.error(`Error saving ${page.url}:`, upsertError);
            } else {
                successCount++;
                console.log(`Successfully saved ${page.url}`);
            }
        } catch (err) {
            console.error(`Error processing ${page.url}:`, err);
        }
    }

    console.log(`Done! Synced ${successCount}/${allPages.length} items to Supabase pgvector.`);
}

seed().catch(console.error);
