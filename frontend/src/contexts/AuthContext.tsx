import { createContext, useContext, useState, type ReactNode } from 'react'
import { login as apiLogin, logout as apiLogout } from '../api/auth'

interface AuthContextType {
  isAuth: boolean
  username: string | null
  role: string | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [username, setUsername] = useState<string | null>(localStorage.getItem('username'))
  const [role, setRole] = useState<string | null>(localStorage.getItem('role'))

  const isAuth = !!token

  const login = async (user: string, pass: string) => {
    const res = await apiLogin(user, pass)
    setToken(res.token)
    setUsername(res.username)
    setRole(res.role)
  }

  const logout = () => {
    apiLogout()
    setToken(null)
    setUsername(null)
    setRole(null)
  }

  return (
    <AuthContext.Provider value={{ isAuth, username, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
