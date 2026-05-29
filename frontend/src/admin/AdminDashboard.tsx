import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
  LayoutDashboard,
  Folder,
  FileText,
  Image,
  Mail,
  ExternalLink,
  LogOut,
  Plus,
  Upload,
} from 'lucide-react'
import AdminCategories from './AdminCategories'
import AdminPosts from './AdminPosts'
import AdminGallery from './AdminGallery'
import AdminMessages from './AdminMessages'

const navLinks = [
  { to: '/admin', label: 'Dashboard', Icon: LayoutDashboard },
  { to: '/admin/categorias', label: 'Categorías', Icon: Folder },
  { to: '/admin/posts', label: 'Artículos', Icon: FileText },
  { to: '/admin/galeria', label: 'Galería', Icon: Image },
  { to: '/admin/mensajes', label: 'Mensajes', Icon: Mail },
]

export default function AdminDashboard() {
  const { isAuth, role, logout } = useAuth()
  const { pathname } = useLocation()

  if (!isAuth) return <Navigate to="/admin/login" replace />
  if (role !== 'ROLE_ADMIN') return <Navigate to="/" replace />

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#E8FBE8] via-white to-[#E8FBE8]/50">
      <aside className="flex w-64 flex-col bg-gradient-to-b from-[#0D8033] via-[#1A401A] to-[#0F2E0F] text-white shadow-xl">
        <div className="border-b border-white/10 p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <LayoutDashboard className="h-5 w-5" />
            Panel Admin
          </h2>
          <p className="mt-1 text-xs text-green-300/80">Jardinería Profesional</p>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navLinks.map((link) => {
            const isActive = link.to === '/admin' ? pathname === '/admin' : pathname.startsWith(link.to)
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white/20 text-white shadow-sm'
                    : 'text-green-100/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <link.Icon className="h-5 w-5 flex-shrink-0" />
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <Link
            to="/"
            className="mb-2 flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-green-100/80 transition-all hover:bg-white/10 hover:text-white"
          >
            <ExternalLink className="h-4 w-4" />
            Ver sitio
          </Link>
          <button
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-xl bg-red-600/80 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-red-600"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto p-8">
        <div className="mx-auto max-w-5xl">
          <Routes>
            <Route index element={<AdminHome />} />
            <Route path="categorias" element={<AdminCategories />} />
            <Route path="posts" element={<AdminPosts />} />
            <Route path="galeria" element={<AdminGallery />} />
            <Route path="mensajes" element={<AdminMessages />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

function AdminHome() {
  const stats = [
    { label: 'Categorías', value: '5', Icon: Folder, to: '/admin/categorias', color: 'from-[#2DE330] to-[#0D8033]' },
    { label: 'Artículos', value: '0', Icon: FileText, to: '/admin/posts', color: 'from-[#0D8033] to-[#1A401A]' },
    { label: 'Galería', value: '0', Icon: Image, to: '/admin/galeria', color: 'from-[#2DE330]/80 to-[#0D8033]' },
    { label: 'Mensajes', value: '0', Icon: Mail, to: '/admin/mensajes', color: 'from-[#1A401A] to-[#0F2E0F]' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-500">Bienvenido al panel de administración.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${s.color} p-5 text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl`}
          >
            <div className="absolute right-3 top-3 opacity-20 transition-transform group-hover:scale-125">
              <s.Icon className="h-6 w-6" />
            </div>
            <p className="text-3xl font-bold">{s.value}</p>
            <p className="mt-1 text-sm text-white/80">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-[#C4F5C4] bg-white p-6 shadow-sm">
          <h3 className="mb-1 font-semibold text-gray-900">Acceso rápido</h3>
          <p className="mb-4 text-sm text-gray-500">Creá contenido nuevo</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/admin/posts" className="inline-flex items-center gap-2 rounded-xl bg-[#0D8033] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1A401A]">
              <Plus className="h-4 w-4" />
              Nuevo artículo
            </Link>
            <Link to="/admin/galeria" className="inline-flex items-center gap-2 rounded-xl border border-[#C4F5C4] px-4 py-2 text-sm font-medium text-[#0D8033] transition-colors hover:bg-[#E8FBE8]">
              <Upload className="h-4 w-4" />
              Subir imágenes
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-[#C4F5C4] bg-white p-6 shadow-sm">
          <h3 className="mb-1 font-semibold text-gray-900">Recordatorio</h3>
          <p className="text-sm leading-relaxed text-gray-500">
            Los cambios en el sitio público se ven reflejados al recargar la página.
            Las imágenes se sirven desde Cloudinary con CDN incluido.
          </p>
        </div>
      </div>
    </div>
  )
}
