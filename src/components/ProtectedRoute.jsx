"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function ProtectedRoute({ children, requiredRole = null }) {
  const { isAuthenticated, role } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Si no está autenticado, redirigir al login
    if (!isAuthenticated) {
      navigate("/login")
      return
    }

    // Si se requiere un rol específico y el usuario no lo tiene
    if (requiredRole && role !== requiredRole) {
      navigate("/dashboard") // Redirigir a una página permitida
    }
  }, [isAuthenticated, role, requiredRole, navigate])

  // No mostrar nada mientras se verifica la autenticación
  if (!isAuthenticated) {
    return null
  }

  // Si se requiere un rol específico y el usuario no lo tiene
  if (requiredRole && role !== requiredRole) {
    return null
  }

  // Si pasa todas las verificaciones, mostrar el contenido protegido
  return <>{children}</>
}

export default ProtectedRoute
