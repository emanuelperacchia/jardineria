import { useState } from 'react'
import { Phone, MapPin, CheckCircle, SendHorizonal } from 'lucide-react'
import { sendContact } from '../api/contact'
import SEO from '../components/SEO'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      await sendContact({ ...form, source: 'web' })
      setSent(true)
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      alert('Error al enviar el mensaje. Intentalo de nuevo.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div>
      <SEO title="Contacto" description="Contactame por WhatsApp o email. Presupuesto sin compromiso para servicios de jardinería en Córdoba." />

      <section className="border-b border-gray-100 bg-gradient-to-br from-[#E8FBE8] via-white to-[#E8FBE8]/30 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[#0D8033]">Contacto</p>
          <h1 className="font-serif text-4xl font-bold text-gray-900">Escribime</h1>
          <p className="mx-auto mt-3 max-w-xl text-gray-500">
            Presupuesto sin compromiso. Respondo al instante por WhatsApp o a la brevedad por email.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-3">
            {sent ? (
              <div className="rounded-2xl bg-gradient-to-br from-[#E8FBE8] to-[#C4F5C4] p-8 text-center">
                <div className="mb-3 flex justify-center">
                  <CheckCircle className="h-12 w-12 text-[#0D8033]" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-[#1A401A]">Mensaje enviado con éxito</h3>
                <p className="mb-4 text-[#0D8033]">Te respondo a la brevedad. Mientras tanto, podés ver los trabajos en la galería.</p>
                <button onClick={() => setSent(false)} className="font-medium text-[#0D8033] hover:underline">
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input type="text" placeholder="Nombre *" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-[#2DE330] focus:ring-2 focus:ring-[#E8FBE8]" />
                  <input type="email" placeholder="Email *" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-[#2DE330] focus:ring-2 focus:ring-[#E8FBE8]" />
                </div>
                <input type="tel" placeholder="Teléfono" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-[#2DE330] focus:ring-2 focus:ring-[#E8FBE8]" />
                <textarea placeholder="Mensaje *" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-[#2DE330] focus:ring-2 focus:ring-[#E8FBE8]" />
                <button type="submit" disabled={sending}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0D8033] to-[#1A401A] px-6 py-3.5 font-semibold text-white shadow-lg transition-all hover:from-[#1A401A] hover:to-[#0F2E0F] hover:shadow-xl disabled:opacity-50">
                  {sending ? 'Enviando...' : (
                    <>
                      Enviar mensaje <SendHorizonal className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-4 md:col-span-2">
            <a href="https://wa.me/543534132355?text=Hola%20Emanuel!%20Quiero%20consultar%20por%20tus%20servicios%20de%20jardiner%C3%ADa." target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-green-200 bg-green-50 p-5 transition-all hover:bg-green-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0D8033] text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-green-800">WhatsApp</p>
                <p className="text-sm text-green-600">Respondo al instante</p>
              </div>
            </a>

            <div className="flex items-center gap-4 rounded-2xl border p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2DE330] to-[#0D8033] text-white">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Teléfono</p>
                <a href="tel:3534132355" className="text-sm text-gray-500 transition-colors hover:text-[#0D8033]">353-4132355</a>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2DE330] to-[#0D8033] text-white">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Ubicación</p>
                <p className="text-sm text-gray-500">Córdoba, Argentina</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
