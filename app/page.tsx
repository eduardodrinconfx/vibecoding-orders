'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { businessConfig } from '@/lib/business-config'
import { formatPrice, getCurrentMenuType } from '@/lib/utils'
import { MenuItem, MenuType } from '@/types'
import { Coffee, UtensilsCrossed, Sparkles, Phone, MapPin, Mail, Clock, Instagram } from 'lucide-react'

export default function HomePage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [menuType, setMenuType] = useState<MenuType>('CAFETERIA')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const currentType = getCurrentMenuType()
        setMenuType(currentType)
        const response = await fetch(`/api/menus?type=${currentType}`)
        const data = await response.json()
        setMenuItems(data.items || [])
      } catch (error) {
        console.error('Error fetching menu:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMenu()
    const interval = setInterval(fetchMenu, 60000)
    return () => clearInterval(interval)
  }, [])

  const getMenuIcon = () => {
    switch (menuType) {
      case 'CAFETERIA': return <Coffee className="w-6 h-6" />
      case 'RESTAURANTE': return <UtensilsCrossed className="w-6 h-6" />
      case 'PREMIUM': return <Sparkles className="w-6 h-6" />
    }
  }

  const getMenuTitle = () => {
    switch (menuType) {
      case 'CAFETERIA': return 'Cafetería Mañanera'
      case 'RESTAURANTE': return 'Menú del Día'
      case 'PREMIUM': return 'Menú Premium Stand-up'
    }
  }

  const getMenuSubtitle = () => {
    switch (menuType) {
      case 'CAFETERIA': return '6:00 AM - 12:00 PM'
      case 'RESTAURANTE': return '12:00 PM - 6:00 PM'
      case 'PREMIUM': return '6:00 PM - 12:00 AM'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="space-y-4">
            <div className="h-8 w-48 rounded-lg animate-shimmer mx-auto"></div>
            <div className="h-4 w-32 rounded animate-shimmer mx-auto"></div>
          </div>
          <p className="mt-6 text-muted-foreground animate-fade-in-up">Cargando menú...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 animate-slide-down">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getMenuIcon()}
              <div>
                <h1 className="text-xl font-bold">{businessConfig.name}</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">{businessConfig.tagline}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {/* Mobile: solo boton Ordenar */}
              <Link href="/pedido" className="md:hidden">
                <Button size="sm" className="bg-gradient-to-r from-orange-500 to-amber-500">
                  Ordenar
                </Button>
              </Link>
              {/* Desktop: botones completos */}
              <div className="hidden md:flex gap-2">
                <Link href="/pedido">
                  <Button className="bg-gradient-to-r from-orange-500 to-amber-500">Hacer Pedido</Button>
                </Link>
                <Link href="/cocina">
                  <Button variant="outline" size="sm">Cocina</Button>
                </Link>
                <Link href="/admin">
                  <Button variant="outline" size="sm">Admin</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero + Contact Bar */}
      <section className="bg-gradient-to-br from-orange-500 to-amber-500 text-white py-10 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-3 animate-fade-in-up">
            {businessConfig.name}
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 animate-fade-in-up stagger-1">
            {businessConfig.type}
          </p>

          {/* Contact Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto animate-fade-in-up stagger-2">
            <a
              href={`tel:${businessConfig.contact.phone}`}
              className="flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm rounded-lg p-4 hover:bg-white/25 transition-colors"
            >
              <Phone className="w-5 h-5 shrink-0" />
              <div className="text-left">
                <p className="text-xs opacity-75">Llamar</p>
                <p className="font-semibold text-sm">{businessConfig.contact.phone}</p>
              </div>
            </a>

            <div className="flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm rounded-lg p-4">
              <MapPin className="w-5 h-5 shrink-0" />
              <div className="text-left">
                <p className="text-xs opacity-75">Ubicación</p>
                <p className="font-semibold text-sm">{businessConfig.address.neighborhood}, {businessConfig.address.city}</p>
              </div>
            </div>

            <a
              href={`mailto:${businessConfig.contact.email}`}
              className="flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm rounded-lg p-4 hover:bg-white/25 transition-colors"
            >
              <Mail className="w-5 h-5 shrink-0" />
              <div className="text-left">
                <p className="text-xs opacity-75">Email</p>
                <p className="font-semibold text-sm">{businessConfig.contact.email}</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Horarios */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <h3 className="text-xl font-bold text-center mb-6 flex items-center justify-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Horarios de Atención
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {Object.entries(businessConfig.hours).map(([key, val]) => (
              <div
                key={key}
                className={`text-center p-4 rounded-lg ${
                  key === menuType.toLowerCase() ? 'bg-orange-100 ring-2 ring-orange-400' : 'bg-orange-50'
                }`}
              >
                <p className="font-semibold">{val.label}</p>
                <p className="text-sm text-muted-foreground">{val.hours}</p>
                {key === menuType.toLowerCase() && (
                  <Badge className="mt-2 text-xs">Activo ahora</Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu */}
      <main className="container mx-auto px-4 py-10">
        <div className="text-center mb-8 animate-fade-in-up">
          <Badge className="mb-3">{getMenuSubtitle()}</Badge>
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
            {getMenuTitle()}
          </h2>
          <p className="text-muted-foreground">Menú disponible ahora</p>
        </div>

        {menuItems.length === 0 ? (
          <div className="text-center py-12 animate-fade-in-up">
            <p className="text-muted-foreground">No hay items disponibles en este momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {menuItems.map((item, index) => (
              <Card key={item.id} className={`overflow-hidden animate-scale-in stagger-${Math.min(index + 1, 9)}`}>
                {item.imageUrl && (
                  <div className="relative h-48 w-full bg-muted">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">{formatPrice(item.price)}</p>
                </CardContent>
                <CardFooter>
                  {item.isAvailable ? (
                    <Badge variant="secondary">Disponible</Badge>
                  ) : (
                    <Badge variant="destructive">No disponible</Badge>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center animate-fade-in-up">
          <Link href="/pedido">
            <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg hover:shadow-xl">
              Hacer un Pedido
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-slate-50 mt-12">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <h4 className="font-bold text-lg mb-3">{businessConfig.name}</h4>
              <p className="text-sm text-muted-foreground">{businessConfig.type}</p>
              <p className="text-sm text-muted-foreground mt-2">{businessConfig.openingHoursSummary}</p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-3">Contacto</h4>
              <div className="space-y-2 text-sm">
                <a href={`tel:${businessConfig.contact.phone}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" />
                  {businessConfig.contact.phone}
                </a>
                <a href={`mailto:${businessConfig.contact.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                  {businessConfig.contact.email}
                </a>
              </div>
            </div>

            {/* Location */}
            <div>
              <h4 className="font-bold mb-3">Ubicación</h4>
              <p className="text-sm text-muted-foreground flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                {businessConfig.address.full}
              </p>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-bold mb-3">Síguenos</h4>
              <div className="flex gap-3">
                {businessConfig.social.instagram && (
                  <a
                    href={businessConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center hover:bg-orange-200 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5 text-orange-600" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} {businessConfig.name}. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  )
}
