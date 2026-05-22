import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Leaf } from 'lucide-react'

export default function AdminLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await login(username, password)
      navigate('/admin')
    } catch {
      setError('Credenciales inválidas')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#2DE330] via-[#0D8033] to-[#1A401A] p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center text-white">
          <div className="mb-2 flex justify-center">
            <Leaf className="h-12 w-12" />
          </div>
          <h1 className="text-2xl font-bold">Jardinería Profesional</h1>
          <p className="mt-1 text-sm text-white/80">Panel de Administración</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl bg-white/95 p-8 shadow-2xl backdrop-blur-sm">
          {error && (
            <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Ingresá tu usuario"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-[#2DE330] focus:ring-2 focus:ring-[#E8FBE8]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Ingresá tu contraseña"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-[#2DE330] focus:ring-2 focus:ring-[#E8FBE8]"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-[#0D8033] to-[#1A401A] px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-[#1A401A] hover:to-[#0F2E0F] hover:shadow-xl active:scale-[0.98]"
            >
              Ingresar
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-gray-400">
            Acceso exclusivo para administradores
          </div>
        </form>
      </div>
    </div>
  )
}
