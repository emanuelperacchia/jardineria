import { useState, useEffect } from 'react'
import { getCategories, createCategory, updateCategory, deleteCategory } from '../api/categories'
import type { Category } from '../types'

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [editing, setEditing] = useState<Category | null>(null)
  const [form, setForm] = useState({ name: '', slug: '', description: '', displayOrder: 0 })

  useEffect(() => { load() }, [])

  const load = async () => setCategories(await getCategories())

  const resetForm = () => setForm({ name: '', slug: '', description: '', displayOrder: 0 })

  const openEdit = (cat: Category) => {
    setEditing(cat)
    setForm({ name: cat.name, slug: cat.slug, description: cat.description || '', displayOrder: cat.displayOrder })
  }

  const handleSave = async () => {
    if (editing) {
      await updateCategory(editing.id, form)
    } else {
      await createCategory(form)
    }
    setEditing(null)
    resetForm()
    await load()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar esta categoría?')) return
    await deleteCategory(id)
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
        <h1 className="text-2xl font-bold">Categorías</h1>
        <button
          onClick={() => { setEditing(null); resetForm() }}
          className="rounded-lg bg-[#0D8033] px-4 py-2 text-sm font-medium text-white hover:bg-[#1A401A]"
        >
          + Nueva
        </button>
      </div>

      <div className="mb-8 overflow-hidden rounded-xl border">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-medium">Orden</th>
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Descripción</th>
              <th className="px-4 py-3 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{cat.displayOrder}</td>
                <td className="px-4 py-3 font-medium">{cat.name}</td>
                <td className="px-4 py-3 text-gray-500">{cat.slug}</td>
                <td className="max-w-xs truncate px-4 py-3 text-gray-500">{cat.description}</td>
                <td className="px-4 py-3">
                  <button onClick={() => openEdit(cat)} className="mr-2 text-[#0D8033] hover:underline">Editar</button>
                  <button onClick={() => handleDelete(cat.id)} className="text-red-600 hover:underline">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {categories.length === 0 && <p className="p-4 text-center text-gray-500">Sin categorías</p>}
      </div>

      {(editing || form.name || form.slug) && (
        <div className="rounded-xl border p-6">
          <h2 className="mb-4 text-lg font-semibold">{editing ? 'Editar' : 'Nueva'} categoría</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <input placeholder="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-[#2DE330]" />
            <input placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-[#2DE330]" />
            <input placeholder="Orden" type="number" value={form.displayOrder} onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })} className="rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-[#2DE330]" />
            <input placeholder="Descripción" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-[#2DE330]" />
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={handleSave} className="rounded-lg bg-[#0D8033] px-6 py-2 text-white hover:bg-[#1A401A]">{editing ? 'Guardar' : 'Crear'}</button>
            <button onClick={() => { setEditing(null); resetForm() }} className="rounded-lg border px-6 py-2 hover:bg-gray-50">Cancelar</button>
          </div>
        </div>
      )}
    </div>
  )
}
