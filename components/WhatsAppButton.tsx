'use client'

import { MessageCircle } from 'lucide-react'
import { businessConfig } from '@/lib/business-config'

export function WhatsAppButton() {
  const url = `https://wa.me/${businessConfig.contact.whatsapp}?text=${encodeURIComponent('Hola! Me gustaría hacer una consulta.')}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Escríbenos por WhatsApp
      </span>
    </a>
  )
}
