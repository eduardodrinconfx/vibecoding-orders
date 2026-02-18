'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatPrice, getCurrentMenuType } from '@/lib/utils'
import { MenuItem, MenuType } from '@/types'
import { Coffee, UtensilsCrossed, Sparkles } from 'lucide-react'

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

    // Actualizar cada minuto por si cambia la hora
    const interval = setInterval(fetchMenu, 60000)
    return () => clearInterval(interval)
  }, [])

  const getMenuIcon = () => {
    switch (menuType) {
      case 'CAFETERIA':
        return <Coffee className="w-8 h-8" />
      case 'RESTAURANTE':
        return <UtensilsCrossed className="w-8 h-8" />
      case 'PREMIUM':
        return <Sparkles className="w-8 h-8" />
    }
  }

  const getMenuTitle = () => {
    switch (menuType) {
      case 'CAFETERIA':
        return 'Cafetería Mañanera'
      case 'RESTAURANTE':
        return 'Menú del Día'
      case 'PREMIUM':
        return 'Menú Premium Stand-up'
    }
  }

  const getMenuSubtitle = () => {
    switch (menuType) {
      case 'CAFETERIA':
        return '6:00 AM - 12:00 PM'
      case 'RESTAURANTE':
        return '12:00 PM - 6:00 PM'
      case 'PREMIUM':
        return '6:00 PM - 12:00 AM'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-food-pattern">
        <div className="text-center">
          <div className="space-y-4">
            <div className="h-8 w-48 rounded-lg animate-shimmer mx-auto"></div>
            <div className="h-4 w-32 rounded animate-shimmer mx-auto"></div>
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="h-40 w-36 rounded-xl animate-shimmer"></div>
              <div className="h-40 w-36 rounded-xl animate-shimmer stagger-2"></div>
              <div className="h-40 w-36 rounded-xl animate-shimmer stagger-4"></div>
            </div>
          </div>
          <p className="mt-6 text-muted-foreground animate-fade-in-up">Cargando menú...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/80 to-amber-50/40 bg-food-pattern">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 animate-slide-down">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="animate-float">{getMenuIcon()}</span>
              <div>
                <h1 className="text-2xl font-bold">VibeCoding</h1>
                <p className="text-sm text-muted-foreground">Cafetería • Restaurante • Stand-up</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/cocina">
                <Button variant="outline">Vista Cocina</Button>
              </Link>
              <Link href="/admin">
                <Button variant="outline">Admin</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Menu Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <Badge className="mb-4">{getMenuSubtitle()}</Badge>
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">{getMenuTitle()}</h2>
          <p className="text-muted-foreground">Menú disponible ahora</p>
        </div>

        {/* Menu Items Grid */}
        {menuItems.length === 0 ? (
          <div className="text-center py-12 animate-fade-in-up">
            <p className="text-muted-foreground">No hay items disponibles en este momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {menuItems.map((item, index) => (
              <Card key={item.id} className={`overflow-hidden animate-scale-in stagger-${Math.min(index + 1, 9)}`}>
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

        {/* CTA Section */}
        <div className="text-center animate-fade-in-up stagger-5">
          <Link href="/pedido">
            <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg hover:shadow-xl">
              Hacer un Pedido
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2026 VibeCoding. Sistema de pedidos inteligente.</p>
        </div>
      </footer>
    </div>
  )
}
