import { supabase as publicSupabase } from '@/lib/supabase';
import { createClient as createServerClient } from '@/lib/supabase-server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import BackgroundBlobs from '@/components/BackgroundBlobs';
import BackgroundEngine from '@/components/BackgroundEngine';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const { data: post } = await publicSupabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

    if (!post) return { title: 'Post Not Found' };

    return {
        title: `${post.title} | Spengo Blog`,
        description: post.content.substring(0, 160).replace(/[#*_]/g, ''),
        openGraph: {
            images: [post.cover_image || '/og-image.png'],
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Check authentication on server
    const supabase = await createServerClient();
    const { data: { session } } = await supabase.auth.getSession();
    const isAdmin = !!session;

    let query = supabase
        .from('posts')
        .select('*')
        .eq('slug', slug);

    // If not admin, only fetch published posts
    if (!isAdmin) {
        query = query.eq('is_published', true);
    }

    const { data: post, error } = await query.single();

    if (!post || error) {
        return notFound();
    }

    const { data: recentPosts } = await supabase
        .from('posts')
        .select('title, slug, cover_image, published_at')
        .eq('is_published', true)
        .neq('slug', slug)
        .order('published_at', { ascending: false })
        .limit(3);

    return (
        <div className="relative z-10 min-h-screen">
            <BackgroundBlobs />
            <BackgroundEngine />
            <CursorGlow />
            <Navbar />

            <article className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 mb-8 text-sm font-bold text-muted hover:text-primary transition-colors cursor-pointer"
                        >
                            <span>←</span> Back to all articles
                        </Link>
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <span className="text-[11px] font-bold text-primary uppercase tracking-[0.2em]">
                                {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-outfit font-bold text-white mb-8 tracking-tight leading-tight">
                            {post.title}
                        </h1>
                    </div>

                    {/* Cover Image */}
                    {post.cover_image && (
                        <div className="aspect-[21/9] rounded-[2rem] overflow-hidden border border-white/10 mb-20">
                            <img
                                src={post.cover_image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose prose-invert prose-lg max-w-none 
                        prose-headings:font-outfit prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
                        prose-p:text-muted prose-p:leading-relaxed
                        prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary/80 transition-colors
                        prose-strong:text-white
                        prose-li:text-muted
                        prose-img:rounded-3xl prose-img:border prose-img:border-white/10"
                    >
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-32 p-12 bg-white/[0.03] border border-white/10 rounded-[3rem] text-center backdrop-blur-sm">
                        <h3 className="text-3xl font-bold text-white font-outfit mb-4">Want a website that converts like this blog?</h3>
                        <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
                            We build technically-superior, AI-optimized sites that turn your traffic into customers.
                        </p>
                        <Link
                            href="/#start"
                            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-all btn-jump"
                        >
                            Start Your Free Audit →
                        </Link>
                    </div>

                    {/* Recent Articles */}
                    {recentPosts && recentPosts.length > 0 && (
                        <div className="mt-32">
                            <h2 className="text-2xl font-bold text-white font-outfit mb-12 flex items-center gap-4">
                                <span className="w-8 h-px bg-primary" />
                                More from the blog
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {recentPosts.map((recent) => (
                                    <Link key={recent.slug} href={`/blog/${recent.slug}`} className="group space-y-4">
                                        <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-white/5 opacity-60 group-hover:opacity-100 group-hover:border-primary/30 transition-all duration-300">
                                            <img
                                                src={recent.cover_image || ''}
                                                alt={recent.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h4 className="text-white font-bold group-hover:text-primary transition-colors line-clamp-2">
                                            {recent.title}
                                        </h4>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </article>

            <Footer />
        </div>
    );
}
