import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import BackgroundBlobs from '@/components/BackgroundBlobs';
import BackgroundEngine from '@/components/BackgroundEngine';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Spengo AI-Powered Web Design',
  description: 'Insights on web design, conversion optimization, and AI performance from the Spengo team.',
};

export const revalidate = 60;

export default async function BlogPage() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
  }

  return (
    <div className="relative z-10 min-h-screen">
      <BackgroundBlobs />
      <BackgroundEngine />
      <CursorGlow />
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-outfit font-bold text-white mb-6 tracking-tight">
              The <span className="text-primary glow-noise">Blog</span>
            </h1>
            <p className="text-muted text-xl max-w-2xl mx-auto">
              Insights on building high-converting websites, AI optimization, and digital strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts?.map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.id}
                className="group bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  {post.cover_image ? (
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/5 flex items-center justify-center">
                      <span className="text-muted/20 font-outfit text-4xl font-bold">SPENGO</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                      {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4 font-outfit leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <div className="mt-auto pt-6 flex items-center text-sm font-bold text-white group-hover:text-primary transition-colors">
                    Read the article <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {(!posts || posts.length === 0) && (
            <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
              <p className="text-muted italic">No articles published yet. Check back soon!</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
