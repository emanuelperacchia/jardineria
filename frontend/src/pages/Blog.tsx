import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Leaf } from 'lucide-react'
import { getPublishedPosts, searchPosts } from '../api/posts'
import SEO from '../components/SEO'
import type { Post } from '../types'

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [query, setQuery] = useState('')

  useEffect(() => { getPublishedPosts().then(setPosts) }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) { getPublishedPosts().then(setPosts); return }
    const results = await searchPosts(query)
    setPosts(results)
  }

  return (
    <div>
      <SEO title="Blog de Jardinería" description="Consejos, tutoriales y guías sobre diseño, mantenimiento y cuidado de jardines." />

      <section className="bg-gradient-to-br from-[#2DE330] via-[#0D8033] to-[#1A401A] py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-3 text-4xl font-bold">Blog de Jardinería</h1>
          <p className="mx-auto max-w-xl text-white/80">Consejos, tutoriales y novedades sobre el mundo de la jardinería.</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <form onSubmit={handleSearch} className="mb-10">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar artículos..."
              className="w-full rounded-xl border border-gray-200 py-3.5 pl-12 pr-4 outline-none transition-all focus:border-[#2DE330] focus:ring-2 focus:ring-[#E8FBE8]"
            />
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>
        </form>

        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.id} className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
              <Link to={`/blog/${post.slug}`} className="md:flex">
                {post.coverImageUrl ? (
                  <div className="md:w-80">
                    <img src={post.coverImageUrl} alt={post.title} className="h-48 w-full object-cover md:h-full" />
                  </div>
                ) : (
                  <div className="flex h-48 items-center justify-center bg-gradient-to-br from-[#E8FBE8] to-[#C4F5C4] md:w-80 md:h-auto">
                    <Leaf className="h-12 w-12 text-[#0D8033]" />
                  </div>
                )}
                <div className="p-6">
                  <div className="mb-2 flex items-center gap-3 text-xs font-medium uppercase tracking-wider">
                    {post.categoryName && <span className="text-[#0D8033]">{post.categoryName}</span>}
                    <span className="text-gray-400">{new Date(post.createdAt).toLocaleDateString('es-AR')}</span>
                  </div>
                  <h2 className="mb-2 text-xl font-semibold text-gray-900 transition-colors group-hover:text-[#0D8033]">{post.title}</h2>
                  {post.excerpt && <p className="line-clamp-2 text-gray-500">{post.excerpt}</p>}
                </div>
              </Link>
            </article>
          ))}
          {posts.length === 0 && (
            <p className="py-12 text-center text-gray-400">No hay artículos publicados aún. Volvé pronto.</p>
          )}
        </div>
      </section>
    </div>
  )
}
