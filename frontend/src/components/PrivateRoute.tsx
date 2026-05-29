import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import type { ReactNode } from 'react'

interface PrivateRouteProps {
  children?: ReactNode
  requiredRole?: string
}

export default function PrivateRoute({ children, requiredRole }: PrivateRouteProps) {
  const { isAuth, role } = useAuth()

  if (!isAuth) {
    return <Navigate to="/admin/login" replace />
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return children ? <>{children}</> : <Outlet />
}
