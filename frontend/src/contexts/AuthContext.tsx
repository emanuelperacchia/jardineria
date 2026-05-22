import { createContext, useContext, useState, type ReactNode } from 'react'
import { login as apiLogin, logout as apiLogout } from '../api/auth'

interface AuthContextType {
  isAuth: boolean
  username: string | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string | null>(localStorage.getItem('username'))

  const isAuth = !!localStorage.getItem('token')

  const login = async (user: string, pass: string) => {
    const res = await apiLogin(user, pass)
    setUsername(res.username)
  }

  const logout = () => {
    apiLogout()
    setUsername(null)
  }

  return (
    <AuthContext.Provider value={{ isAuth, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
