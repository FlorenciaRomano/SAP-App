"use client"

// Simplified toast implementation
import { createContext, useContext } from "react"

const ToastContext = createContext({})

export const useToast = () => {
  const context = useContext(ToastContext)
  return context
}

export function toast({ title, description, variant = "default" }) {
  console.log(`Toast: ${variant} - ${title} - ${description}`)
  // In a real implementation, this would show a toast notification
  // For simplicity, we're just logging to console
}
