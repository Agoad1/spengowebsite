import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export const revalidate = 60;

interface Props {
  params: { slug: string };
}

export default async function PostPage({ params }: Props) {
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", params.slug)
    .eq("is_published", true)
    .single();

  if (error || !post) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      {post.cover_image && (
        <img
          src={post.cover_image}
          alt={post.title}
          className="w-full h-64 object-cover rounded-xl mb-10"
        />
      )}
      <p className="text-sm text-gray-400 mb-3">
        {new Date(post.published_at).toLocaleDateString()}
      </p>
      <h1 className="text-4xl font-bold mb-10">{post.title}</h1>
      <article className="prose prose-lg max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </main>
  );
}