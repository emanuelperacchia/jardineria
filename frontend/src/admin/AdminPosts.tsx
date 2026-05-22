import { useState, useEffect } from 'react'
import { getPublishedPosts, createPost, updatePost, deletePost } from '../api/posts'
import { getCategories } from '../api/categories'
import type { Post, Category } from '../types'

export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [editing, setEditing] = useState<Post | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    title: '', slug: '', content: '', excerpt: '',
    coverImageUrl: '', coverImagePublicId: '', categoryId: 0, published: false,
  })

  useEffect(() => { load(); getCategories().then(setCategories) }, [])

  const load = async () => setPosts(await getPublishedPosts())

  const resetForm = () => {
    setForm({ title: '', slug: '', content: '', excerpt: '', coverImageUrl: '', coverImagePublicId: '', categoryId: 0, published: false })
  }

  const slugify = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const openEdit = (post: Post) => {
    setEditing(post)
    setForm({
      title: post.title, slug: post.slug, content: post.content,
      excerpt: post.excerpt || '', coverImageUrl: post.coverImageUrl || '',
      coverImagePublicId: post.coverImagePublicId || '',
      categoryId: post.categoryId || 0, published: post.published,
    })
    setShowForm(true)
  }

  const handleSave = async () => {
    if (editing) {
      await updatePost(editing.id, form)
    } else {
      await createPost(form)
    }
    setEditing(null)
    setShowForm(false)
    resetForm()
    await load()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este artículo?')) return
    await deletePost(id)
    await load()
  }

  return (
    <div>
      <div className="mb-4">
        <a href="/admin" className="inline-flex items-center gap-1 text-sm text-[#0D8033] hover:text-[#1A401A]">
          ← Volver al dashboard
        </a>
      </div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Artículos</h1>
        <button
          onClick={() => { setEditing(null); resetForm(); setShowForm(true) }}
          className="rounded-lg bg-[#0D8033] px-4 py-2 text-sm font-medium text-white hover:bg-[#1A401A]"
        >
          + Nuevo
        </button>
      </div>

      <div className="mb-8 overflow-hidden rounded-xl border">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-medium">Título</th>
              <th className="px-4 py-3 font-medium">Categoría</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium">Fecha</th>
              <th className="px-4 py-3 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{post.title}</td>
                <td className="px-4 py-3 text-gray-500">{post.categoryName || '—'}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${post.published ? 'bg-[#E8FBE8] text-[#0D8033]' : 'bg-yellow-100 text-yellow-700'}`}>
                    {post.published ? 'Publicado' : 'Borrador'}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString('es-AR')}
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => openEdit(post)} className="mr-2 text-[#0D8033] hover:underline">Editar</button>
                  <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:underline">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && <p className="p-4 text-center text-gray-500">Sin artículos</p>}
      </div>

      {showForm && (
        <div className="rounded-xl border p-6">
          <h2 className="mb-4 text-lg font-semibold">{editing ? 'Editar' : 'Nuevo'} artículo</h2>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input placeholder="Título *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: editing ? form.slug : slugify(e.target.value) })} className="rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-[#2DE330]" />
              <input placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-[#2DE330]" />
            </div>
            <input placeholder="Extracto (resumen visible en blog)" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-[#2DE330]" />
            <div className="grid gap-4 md:grid-cols-2">
              <input placeholder="URL de imagen de portada (cover)" value={form.coverImageUrl} onChange={(e) => setForm({ ...form, coverImageUrl: e.target.value })} className="rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-[#2DE330]" />
              <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: Number(e.target.value) })} className="rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-[#2DE330]">
                <option value={0}>Sin categoría</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <textarea placeholder="Contenido (HTML o texto plano)" rows={12} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full rounded-lg border px-4 py-2 font-mono text-sm outline-none focus:ring-2 focus:ring-[#2DE330]" />
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="rounded" />
              Publicado
            </label>
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={handleSave} className="rounded-lg bg-[#0D8033] px-6 py-2 text-white hover:bg-[#1A401A]">{editing ? 'Guardar' : 'Crear'}</button>
            <button onClick={() => { setShowForm(false); setEditing(null); resetForm() }} className="rounded-lg border px-6 py-2 hover:bg-gray-50">Cancelar</button>
          </div>
        </div>
      )}
    </div>
  )
}
