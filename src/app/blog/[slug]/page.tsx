import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getAllPostSlugs, getPostBySlug, BlogPostWithContent
} from '../../../lib/blog'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const paths = getAllPostSlugs()
  return paths.map((path) => ({
    slug: path.params.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = await getPostBySlug(slug)
    return {
      title: post.title,
      description: post.description,
    }
  } catch (error) {
    return {
      title: 'Post not found',
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  let post: BlogPostWithContent

  try {
    post = await getPostBySlug(slug)
  } catch (error) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-4">
          <time dateTime={post.date}>{post.date}</time>
          {post.tags && (
            <div className="flex gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {post.description && (
          <p className="text-lg text-gray-700 dark:text-gray-300">{post.description}</p>
        )}
      </header>
      <div
        className="prose prose-lg max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      <footer className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">
          ← ブログ一覧に戻る
        </Link>
      </footer>
    </article>
  )
}
