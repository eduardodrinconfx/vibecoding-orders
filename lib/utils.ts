import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Obtiene el tipo de menú actual basado en la hora
 */
export function getCurrentMenuType(): 'CAFETERIA' | 'RESTAURANTE' | 'PREMIUM' {
  const now = new Date()
  const hour = now.getHours()

  if (hour >= 6 && hour < 12) {
    return 'CAFETERIA'
  } else if (hour >= 12 && hour < 18) {
    return 'RESTAURANTE'
  } else {
    return 'PREMIUM'
  }
}

/**
 * Formatea el precio en formato de moneda
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

/**
 * Formatea la fecha
 */
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}
