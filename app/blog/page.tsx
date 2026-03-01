"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  slug: string;
  cover_image: string;
  published_at: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, slug, cover_image, published_at")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (!error) setPosts(data || []);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-12">Our Blog</h1>
      <div className="grid gap-8">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <div className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              {post.cover_image && (
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <p className="text-sm text-gray-400 mb-2">
                  {new Date(post.published_at).toLocaleDateString()}
                </p>
                <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-blue-500 mt-3 text-sm">Read the article →</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}