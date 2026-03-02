import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import BackgroundBlobs from '@/components/BackgroundBlobs';
import BackgroundEngine from '@/components/BackgroundEngine';
import BlogShowcase from '@/components/BlogShowcase';
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

      <main className="pt-20">
        <div className="w-full">
          {posts && posts.length > 0 ? (
            <BlogShowcase posts={posts} />
          ) : (
            <div className="max-w-7xl mx-auto px-6 py-40">
              <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
                <p className="text-muted italic text-xl">No articles published yet. Check back soon!</p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
