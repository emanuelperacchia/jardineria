import { useState, useEffect } from 'react'
import { Mail } from 'lucide-react'
import api from '../api/client'
import type { ContactForm } from '../types'

interface Message extends ContactForm {
  id: number
  read: boolean
  createdAt: string
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [selected, setSelected] = useState<Message | null>(null)

  useEffect(() => { load() }, [])

  const load = async () => {
    const { data } = await api.get<Message[]>('/admin/contact')
    setMessages(data)
  }

  const markAsRead = async (id: number) => {
    await api.put(`/admin/contact/${id}/read`)
    await load()
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <div className="mb-4">
          <a href="/admin" className="inline-flex items-center gap-1 text-sm text-[#0D8033] hover:text-[#1A401A]">
            ← Volver al dashboard
          </a>
        </div>
        <h1 className="mb-6 text-2xl font-bold">Mensajes</h1>
        <div className="space-y-3">
          {messages.map((msg) => (
            <button
              key={msg.id}
              onClick={() => { setSelected(msg); if (!msg.read) markAsRead(msg.id) }}
              className={`w-full rounded-xl border p-4 text-left transition-colors hover:bg-gray-50 ${!msg.read ? 'border-[#2DE330] bg-[#E8FBE8]/50' : ''} ${selected?.id === msg.id ? 'ring-2 ring-[#0D8033]' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className={`font-medium ${!msg.read ? 'text-[#1A401A]' : ''}`}>{msg.name}</p>
                  <p className="text-sm text-gray-500">{msg.email}</p>
                </div>
                <div className="text-right text-xs text-gray-400">
                  <p>{new Date(msg.createdAt).toLocaleDateString('es-AR')}</p>
                  <p className="mt-0.5">{msg.source}</p>
                </div>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-gray-600">{msg.message}</p>
            </button>
          ))}
          {messages.length === 0 && (
            <p className="py-8 text-center text-gray-500">No hay mensajes todavía</p>
          )}
        </div>
      </div>

      <div>
        {selected ? (
          <div className="rounded-xl border p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">{selected.name}</h2>
              <div className="mt-1 space-y-1 text-sm text-gray-500">
                <p>Email: <a href={`mailto:${selected.email}`} className="text-[#0D8033] hover:underline">{selected.email}</a></p>
                {selected.phone && <p>Tel: {selected.phone}</p>}
                <p>Origen: {selected.source}</p>
                <p>Fecha: {new Date(selected.createdAt).toLocaleString('es-AR')}</p>
              </div>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="whitespace-pre-wrap text-gray-700">{selected.message}</p>
            </div>
            <div className="mt-4 flex gap-2">
              <a
                href={`mailto:${selected.email}`}
                className="inline-flex items-center gap-2 rounded-lg bg-[#0D8033] px-4 py-2 text-sm text-white hover:bg-[#1A401A]"
              >
                <Mail className="h-4 w-4" />
                Responder por email
              </a>
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center rounded-xl border p-12">
            <p className="text-gray-400">Seleccioná un mensaje para verlo</p>
          </div>
        )}
      </div>
    </div>
  )
}
