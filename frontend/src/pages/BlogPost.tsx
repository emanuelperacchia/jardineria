import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getPostBySlug } from '../api/posts'
import SEO from '../components/SEO'
import type { Post } from '../types'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    getPostBySlug(slug)
      .then(setPost)
      .catch(() => setPost(null))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#C4F5C4] border-t-[#0D8033]" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="py-24 text-center">
        <p className="text-xl text-gray-500">Artículo no encontrado</p>
        <Link to="/blog" className="mt-4 inline-flex items-center gap-1 text-[#0D8033] hover:underline">
          <ArrowLeft className="h-4 w-4" /> Volver al blog
        </Link>
      </div>
    )
  }

  return (
    <article>
      <SEO title={post.title} description={post.excerpt || ''} image={post.coverImageUrl} />

      {post.coverImageUrl && (
        <div className="h-64 overflow-hidden md:h-96">
          <img src={post.coverImageUrl} alt={post.title} className="h-full w-full object-cover" />
        </div>
      )}

      <div className="mx-auto max-w-3xl px-4 py-10">
        <Link to="/blog" className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-[#0D8033] hover:text-[#1A401A]">
          <ArrowLeft className="h-4 w-4" />
          Volver al blog
        </Link>

        <div className="mb-2 flex items-center gap-3 text-sm font-medium uppercase tracking-wider text-gray-400">
          {post.categoryName && <span className="text-[#0D8033]">{post.categoryName}</span>}
          <span>{new Date(post.createdAt).toLocaleDateString('es-AR')}</span>
        </div>

        <h1 className="mb-8 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">{post.title}</h1>

        <div className="prose prose-lg max-w-none text-gray-700">
          {post.content.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
    </article>
  )
}
