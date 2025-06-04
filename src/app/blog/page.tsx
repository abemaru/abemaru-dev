import Link from "next/link";
import { getAllPosts } from "../../lib/blog";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="p-8 pb-20 gap-16 sm:p-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-gray-200 pb-6">
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-semibold mb-2 text-blue-600 hover:underline">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-600 text-sm mb-2">{post.date}</p>
              {post.description && (
                <p className="text-gray-700 mb-3">{post.description}</p>
              )}
              {post.tags && (
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}