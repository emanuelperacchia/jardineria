import { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Trash2 } from 'lucide-react'
import { getImages, getImagesByCategory, uploadImage, deleteImage } from '../api/images'
import { getCategories } from '../api/categories'
import type { GalleryImage, Category } from '../types'

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => { loadImages(); getCategories().then(setCategories) }, [])

  const loadImages = async () => {
    const data = activeCategory ? await getImagesByCategory(activeCategory) : await getImages()
    setImages(data)
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!activeCategory) { alert('Seleccioná una categoría primero'); return }
    setUploading(true)
    try {
      for (const file of acceptedFiles) {
        const name = file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
        await uploadImage(file, name, activeCategory, '', images.length + 1)
      }
      await loadImages()
    } finally {
      setUploading(false)
    }
  }, [activeCategory, images.length])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    multiple: true,
  })

  const handleDelete = async (img: GalleryImage) => {
    if (!confirm(`¿Eliminar "${img.title}"?`)) return
    try {
      await deleteImage(img.id)
      await loadImages()
    } catch {
      alert('Error al eliminar la imagen')
    }
  }

  const [preview, setPreview] = useState<GalleryImage | null>(null)

  return (
    <div>
      <div className="mb-4">
        <a href="/admin" className="inline-flex items-center gap-1 text-sm text-[#0D8033] hover:text-[#1A401A]">
          ← Volver al dashboard
        </a>
      </div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Galería</h1>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${!activeCategory ? 'bg-[#0D8033] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Todas
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${activeCategory === cat.id ? 'bg-[#0D8033] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div
        {...getRootProps()}
        className={`mb-8 cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-colors ${isDragActive ? 'border-[#2DE330] bg-[#E8FBE8]' : 'border-gray-300 hover:border-[#2DE330]'}`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <p className="text-gray-500">Subiendo imágenes...</p>
        ) : isDragActive ? (
          <p className="text-[#0D8033]">Soltá las imágenes acá...</p>
        ) : (
          <div>
            <p className="font-medium text-gray-600">Arrastrá imágenes o hacé click para seleccionar</p>
            <p className="mt-1 text-sm text-gray-400">PNG, JPG, WebP — múltiples archivos</p>
            {!activeCategory && <p className="mt-2 text-sm text-amber-600">Seleccioná una categoría primero</p>}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {images.map((img) => (
          <div key={img.id} className="group relative overflow-hidden rounded-xl border">
            <img
              src={img.imageUrl}
              alt={img.title}
              className="h-48 w-full cursor-pointer object-cover transition-transform group-hover:scale-105"
              onClick={() => setPreview(img)}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <p className="truncate text-sm text-white">{img.title}</p>
              <p className="text-xs text-white/70">{img.categoryName}</p>
            </div>
            <button
              onClick={() => handleDelete(img)}
              className="absolute right-2 top-2 rounded-full bg-red-600 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
              title="Eliminar"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      {images.length === 0 && !uploading && (
        <p className="py-12 text-center text-gray-500">
          {activeCategory ? 'No hay imágenes en esta categoría. Arrastrá algunas arriba.' : 'Seleccioná una categoría para empezar a subir imágenes.'}
        </p>
      )}

      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setPreview(null)}>
          <div className="max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <img src={preview.imageUrl} alt={preview.title} className="max-h-[85vh] rounded-xl" />
            <p className="mt-2 text-center text-white">{preview.title}</p>
          </div>
        </div>
      )}
    </div>
  )
}
