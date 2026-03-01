"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    cover_image: "",
    is_published: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { error } = await supabase.from("posts").insert({
      ...form,
      published_at: form.is_published ? new Date().toISOString() : null,
    });

    if (!error) {
      router.push("/admin/blog-admin");
    } else {
      alert("Something went wrong, please try again.");
    }
    setLoading(false);
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-10">New Post</h1>
      <div className="grid gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="My first post"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Slug (URL)</label>
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="my-first-post"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Cover Image URL</label>
          <input
            name="cover_image"
            value={form.cover_image}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="https://..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Content (Markdown)</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={15}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black font-mono text-sm"
            placeholder="Write your post in markdown..."
          />
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="is_published"
            checked={form.is_published}
            onChange={(e) => setForm((prev) => ({ ...prev, is_published: e.target.checked }))}
            className="w-4 h-4"
          />
          <label htmlFor="is_published" className="text-sm font-medium">Publish immediately</label>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Post"}
        </button>
      </div>
    </main>
  );
}