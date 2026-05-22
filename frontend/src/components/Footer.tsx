import { Phone, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-[#1A401A] text-gray-300">
      <div
        className="h-6 w-full opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 24' preserveAspectRatio='none'%3E%3Cpath d='M0,24 L0,8 Q30,0 60,8 Q90,16 120,8 Q150,0 180,8 Q210,16 240,8 Q270,0 300,8 Q330,16 360,8 Q390,0 420,8 Q450,16 480,8 Q510,0 540,8 Q570,16 600,8 Q630,0 660,8 Q690,16 720,8 Q750,0 780,8 Q810,16 840,8 Q870,0 900,8 Q930,16 960,8 Q990,0 1020,8 Q1050,16 1080,8 Q1110,0 1140,8 Q1170,16 1200,8 L1200,24 Z' fill='%232DE330'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat-x',
          backgroundSize: '1200px 24px',
        }}
      />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-lg font-bold text-white">Emanuel Peracchia</h3>
            <p className="mt-1 text-xs font-medium uppercase tracking-widest text-[#2DE330]">Servicio de Jardinería</p>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Mantenimiento y diseño de espacios verdes en Córdoba y zona.
            </p>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-white">Contacto</h3>
            <div className="space-y-2 text-sm">
              <p>
                <a href="tel:3534132355" className="inline-flex items-center gap-2 transition-colors hover:text-[#2DE330]">
                  <Phone className="h-4 w-4 text-[#2DE330]" />
                  353-4132355
                </a>
              </p>
              <p>
                <a
                  href="https://wa.me/543534132355"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-[#2DE330]"
                >
                  <MessageCircle className="h-4 w-4 text-[#2DE330]" />
                  WhatsApp
                </a>
              </p>
            </div>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-white">Servicios</h3>
            <ul className="space-y-1.5 text-sm text-gray-400">
              <li>Corte de césped</li>
              <li>Poda de arbustos</li>
              <li>Limpieza de canteros</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Emanuel Peracchia — Servicio de Jardinería
          <span className="mx-2">·</span>
          <a href="/admin" className="transition-colors hover:text-[#2DE330]">Admin</a>
        </div>
      </div>
    </footer>
  )
}
