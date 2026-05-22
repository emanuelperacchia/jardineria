import { Link } from 'react-router-dom'
import { Scissors, Leaf, Sparkles, ArrowRight } from 'lucide-react'
import SEO from '../components/SEO'

const services = [
  {
    title: 'Corte de césped',
    desc: 'Corte profesional con bordeadora y desmalezadora. Dejamos el pasto a la altura ideal, bordes definidos y todo impecable. Incluye limpieza del césped cortado.',
    items: ['Corte con bordeadora', 'Desmalezado', 'Perfilado de bordes', 'Limpieza final'],
    Icon: Scissors,
  },
  {
    title: 'Poda de arbustos',
    desc: 'Poda de formación y mantenimiento para arbustos, setos y plantas ornamentales. Realizamos cortes precisos que favorecen el crecimiento saludable.',
    items: ['Poda de formación', 'Setos y cerco vivo', 'Eliminación de ramas secas', 'Plantas ornamentales'],
    Icon: Leaf,
  },
  {
    title: 'Limpieza de canteros',
    desc: 'Remoción de malezas, acondicionamiento de la tierra y preparación de canteros para nuevas plantaciones. Dejamos todo listo para que puedas plantar.',
    items: ['Remoción de malezas', 'Aireado de tierra', 'Acondicionamiento', 'Preparación para siembra'],
    Icon: Sparkles,
  },
]

export default function Services() {
  return (
    <div>
      <SEO title="Servicios" description="Corte de césped, poda de arbustos y limpieza de canteros en Córdoba. Presupuesto sin compromiso." />

      <section className="border-b border-gray-100 bg-gradient-to-br from-[#E8FBE8] via-white to-[#E8FBE8]/30 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[#0D8033]">Qué ofrecemos</p>
          <h1 className="font-serif text-4xl font-bold text-gray-900">Servicios</h1>
          <p className="mx-auto mt-3 max-w-xl text-gray-500">
            Trabajos de jardinería profesional en Córdoba y zona. Presupuesto sin compromiso.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <a
              href="https://wa.me/543534132355"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-gradient-to-r from-[#0D8033] to-[#1A401A] px-6 py-3 font-medium text-white transition-colors hover:from-[#1A401A] hover:to-[#0F2E0F]"
            >
              Consultar por WhatsApp
            </a>
            <Link
              to="/galeria"
              className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Ver trabajos
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="space-y-12">
          {services.map((s, i) => (
            <div key={s.title} className={`flex flex-col gap-8 md:flex-row ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="flex-1">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#2DE330] to-[#0D8033] text-white shadow-sm">
                  <s.Icon className="h-7 w-7" />
                </div>
                <h2 className="mb-3 font-serif text-2xl font-bold text-gray-900">{s.title}</h2>
                <p className="mb-4 leading-relaxed text-gray-500">{s.desc}</p>
                <ul className="space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#2DE330]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-1 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E8FBE8] to-[#C4F5C4]/50 p-8">
                <s.Icon className="h-24 w-24 text-[#0D8033]/30" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-gray-100 bg-gradient-to-br from-[#0D8033] via-[#1A401A] to-[#0F2E0F] py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-serif text-2xl font-bold">¿Listo para poner en orden tu jardín?</h2>
          <p className="mx-auto mb-8 mt-3 max-w-md text-gray-300">Presupuesto sin compromiso. Respondo al instante.</p>
          <a
            href="https://wa.me/543534132355"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#2DE330] px-8 py-3.5 font-semibold text-[#1A401A] shadow-lg transition-all hover:bg-[#1FC420] hover:shadow-xl"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
