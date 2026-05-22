import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Scissors, Leaf, Sparkles, ArrowRight } from 'lucide-react'
import { getImages } from '../api/images'
import { getPublishedPosts } from '../api/posts'
import SEO from '../components/SEO'
import type { GalleryImage, Post } from '../types'

const servicesData = [
  { title: 'Corte de césped', desc: 'Corte profesional de césped con bordeadora y desmalezadora. Dejamos tu jardín impecable.', Icon: Scissors },
  { title: 'Poda de arbustos', desc: 'Poda de formación y mantenimiento de arbustos, setos y plantas ornamentales.', Icon: Leaf },
  { title: 'Limpieza de canteros', desc: 'Remoción de malezas, acondicionamiento de tierra y preparación de canteros para nuevas plantas.', Icon: Sparkles },
]

export default function Home() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    getImages().then(setImages)
    getPublishedPosts().then(setPosts)
  }, [])

  const featuredImages = images.slice(0, 6)
  const latestPosts = posts.slice(0, 3)

  return (
    <>
      <SEO title="Emanuel Peracchia — Servicio de Jardinería" description="Corte de césped, poda de arbustos y limpieza de canteros en Córdoba. Presupuesto sin compromiso." />

      <section className="relative bg-gradient-to-br from-[#E8FBE8] via-white to-[#E8FBE8]/30 py-24">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[#0D8033]">Servicio Profesional</p>
          <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl">
            Emanuel Peracchia
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-500">
            Corte de césped, poda de arbustos y limpieza de canteros. Transformamos tus espacios verdes con dedicación y experiencia.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://wa.me/543534132355?text=Hola%20Emanuel!%20Quiero%20consultar%20por%20tus%20servicios%20de%20jardiner%C3%ADa."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0D8033] to-[#1A401A] px-8 py-3.5 font-semibold text-white shadow-lg transition-all hover:from-[#1A401A] hover:to-[#0F2E0F] hover:shadow-xl active:scale-[0.98]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Consultar por WhatsApp
            </a>
            <Link
              to="/galeria"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-8 py-3.5 font-medium text-gray-700 shadow-sm transition-all hover:border-gray-400 hover:bg-gray-50"
            >
              Ver trabajos realizados
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[#0D8033]">Qué ofrecemos</p>
            <h2 className="font-serif text-3xl font-bold text-gray-900">Servicios</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {servicesData.map((s) => (
              <div key={s.title} className="group rounded-2xl border border-gray-100 bg-gray-50/50 p-8 transition-all hover:-translate-y-1 hover:border-[#C4F5C4] hover:bg-white hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2DE330] to-[#0D8033] text-white shadow-sm">
                  <s.Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900">{s.title}</h3>
                <p className="leading-relaxed text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {featuredImages.length > 0 && (
        <section className="border-t border-gray-100 bg-gradient-to-b from-[#E8FBE8]/50 to-white py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[#0D8033]">Trabajos realizados</p>
              <h2 className="font-serif text-3xl font-bold text-gray-900">Galería</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredImages.map((img) => (
                <Link
                  key={img.id}
                  to={`/galeria/${img.categoryId || ''}`}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  <img
                    src={img.imageUrl}
                    alt={img.title}
                    className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="font-medium">{img.title}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link to="/galeria" className="inline-flex items-center gap-1 font-medium text-[#0D8033] hover:text-[#1A401A]">
                Ver galería completa <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-gray-100 bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[#0D8033]">Consejos y novedades</p>
            <h2 className="font-serif text-3xl font-bold text-gray-900">Del blog</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {latestPosts.length > 0 ? latestPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                {post.coverImageUrl && (
                  <img src={post.coverImageUrl} alt={post.title} className="h-48 w-full rounded-t-2xl object-cover" />
                )}
                <div className="p-5">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#0D8033]">{post.categoryName || 'Jardinería'}</p>
                  <h3 className="mb-2 font-semibold text-gray-900 transition-colors group-hover:text-[#0D8033]">{post.title}</h3>
                  {post.excerpt && <p className="line-clamp-2 text-sm text-gray-500">{post.excerpt}</p>}
                </div>
              </Link>
            )) : (
              <p className="col-span-3 text-center text-gray-400">Próximamente artículos de jardinería.</p>
            )}
          </div>
          {latestPosts.length > 0 && (
            <div className="mt-8 text-center">
              <Link to="/blog" className="inline-flex items-center gap-1 font-medium text-[#0D8033] hover:text-[#1A401A]">
                Ver todos los artículos <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#0D8033] via-[#1A401A] to-[#0F2E0F] py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[#2DE330]">Contacto</p>
          <h2 className="font-serif text-3xl font-bold">¿Necesitás un servicio de jardinería?</h2>
          <p className="mx-auto mb-8 mt-4 max-w-lg text-gray-300">Presupuesto sin compromiso. Respondemos al instante por WhatsApp.</p>
          <a
            href="https://wa.me/543534132355"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#2DE330] px-8 py-3.5 font-semibold text-[#1A401A] shadow-lg transition-all hover:bg-[#1FC420] hover:shadow-xl active:scale-[0.98]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Escribime a WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}
