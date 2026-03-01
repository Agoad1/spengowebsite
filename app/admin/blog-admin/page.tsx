"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  is_published: boolean;
  published_at: string;
  created_at: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, slug, is_published, published_at, created_at")
      .order("created_at", { ascending: false });

    if (!error) setPosts(data || []);
    setLoading(false);
  };

  const deletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    await supabase.from("posts").delete().eq("id", id);
    fetchPosts();
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link href="/admin/blog-admin/new">
          <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
            <PlusCircle size={18} /> New Post
          </button>
        </Link>
      </div>
      <div className="grid gap-4">
        {posts.map((post) => (
          <div key={post.id} className="flex items-center justify-between border border-gray-200 rounded-xl p-5">
            <div>
              <h2 className="font-semibold text-lg">{post.title}</h2>
              <p className="text-sm text-gray-400">/{post.slug}</p>
              <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${post.is_published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                {post.is_published ? "Published" : "Draft"}
              </span>
            </div>
            <div className="flex gap-3">
              <Link href={`/admin/blog-admin/${post.id}/edit`}>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <Pencil size={18} />
                </button>
              </Link>
              <button onClick={() => deletePost(post.id)} className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <p className="text-gray-400 text-center py-10">No posts yet. Create your first one!</p>
        )}
      </div>
    </main>
  );
}