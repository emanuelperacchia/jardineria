import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { X } from 'lucide-react'
import { getImages, getImagesByCategory } from '../api/images'
import { getCategories } from '../api/categories'
import SEO from '../components/SEO'
import type { GalleryImage, Category } from '../types'

export default function Gallery() {
  const { categoryId } = useParams()
  const [images, setImages] = useState<GalleryImage[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [activeCategory, setActiveCategory] = useState<number | null>(
    categoryId ? Number(categoryId) : null,
  )

  useEffect(() => { getCategories().then(setCategories) }, [])

  useEffect(() => {
    if (activeCategory) {
      getImagesByCategory(activeCategory).then(setImages)
    } else {
      getImages().then(setImages)
    }
  }, [activeCategory])

  const handleCategoryFilter = (id: number | null) => {
    setActiveCategory(id)
    window.history.pushState(null, '', id ? `/galeria/${id}` : '/galeria')
  }

  return (
    <div>
      <SEO
        title="Galería de Trabajos"
        description="Conocé nuestros proyectos de jardinería: diseños, mantenimiento, paisajismo y más."
      />

      <section className="bg-gradient-to-br from-[#2DE330] via-[#0D8033] to-[#1A401A] py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-3 text-4xl font-bold">Galería de Trabajos</h1>
          <p className="mx-auto max-w-xl text-white/80">Conocé algunos de nuestros proyectos realizados.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryFilter(null)}
            className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${
              !activeCategory ? 'bg-[#0D8033] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Todas
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryFilter(cat.id)}
              className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${
                activeCategory === cat.id ? 'bg-[#0D8033] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {images.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-gray-400">
              {activeCategory
                ? 'No hay imágenes en esta categoría todavía.'
                : 'No hay imágenes cargadas aún. Volvé pronto.'}
            </p>
          </div>
        ) : (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {images.map((img) => (
              <button
                key={img.id}
                onClick={() => setSelectedImage(img)}
                className="group mb-4 w-full overflow-hidden rounded-2xl break-inside-avoid shadow-sm transition-shadow hover:shadow-lg"
              >
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        )}
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              className="max-h-[90vh] rounded-2xl shadow-2xl"
            />
            <div className="mt-3 flex items-center justify-between">
              <p className="text-white">{selectedImage.title}</p>
              <button onClick={() => setSelectedImage(null)} className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/30">
                <X className="h-4 w-4" /> Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
