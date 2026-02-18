'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Plus, Coffee, UtensilsCrossed, Sparkles } from 'lucide-react'

export default function MenusPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [menus, setMenus] = useState<any[]>([])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        // Fetch para cada tipo de menú
        const types = ['CAFETERIA', 'RESTAURANTE', 'PREMIUM']
        const promises = types.map(type =>
          fetch(`/api/menus?type=${type}`).then(r => r.json())
        )
        const results = await Promise.all(promises)
        setMenus(results.filter(r => r.menu))
      } catch (error) {
        console.error('Error fetching menus:', error)
      }
    }

    if (status === 'authenticated') {
      fetchMenus()
    }
  }, [status])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="space-y-3 text-center">
          <div className="h-6 w-40 rounded-lg animate-shimmer mx-auto"></div>
          <div className="h-4 w-28 rounded animate-shimmer mx-auto stagger-2"></div>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null
  }

  const getMenuIcon = (type: string) => {
    switch (type) {
      case 'CAFETERIA':
        return <Coffee className="w-6 h-6" />
      case 'RESTAURANTE':
        return <UtensilsCrossed className="w-6 h-6" />
      case 'PREMIUM':
        return <Sparkles className="w-6 h-6" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/80 to-amber-50/40">
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50 animate-slide-down">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">Gestión de Menús</h1>
            </div>
            <Link href="/admin">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {menus.map((menuData, index) => (
            <Card key={menuData.menu.id} className={`animate-scale-in stagger-${Math.min(index + 1, 9)}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <span className=" inline-block">{getMenuIcon(menuData.menu.type)}</span>
                    </div>
                    <div>
                      <CardTitle>{menuData.menu.name}</CardTitle>
                      <CardDescription>{menuData.menu.type}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Items:</span>
                    <Badge variant="secondary">{menuData.items?.length || 0}</Badge>
                  </div>
                  <div className="space-y-1">
                    {menuData.items?.slice(0, 3).map((item: any) => (
                      <p key={item.id} className="text-sm text-muted-foreground truncate">
                        • {item.name}
                      </p>
                    ))}
                    {menuData.items?.length > 3 && (
                      <p className="text-sm text-muted-foreground">
                        +{menuData.items.length - 3} más
                      </p>
                    )}
                  </div>
                  <Button variant="outline" className="w-full mt-4" disabled>
                    <Plus className="w-4 h-4 mr-2" />
                    Editar Menú
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 animate-fade-in-up stagger-4">
          <CardHeader>
            <CardTitle>Información</CardTitle>
            <CardDescription>
              Los menús se activan automáticamente según el horario configurado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>Cafetería:</strong> 6:00 AM - 12:00 PM</p>
              <p><strong>Restaurante:</strong> 12:00 PM - 6:00 PM</p>
              <p><strong>Premium:</strong> 6:00 PM - 12:00 AM</p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-muted rounded-lg text-sm text-muted-foreground animate-fade-in-up stagger-5">
          <p><strong>Nota:</strong> La funcionalidad completa de edición de menús se implementará en la siguiente fase. Por ahora puedes ver los menús existentes y sus items.</p>
        </div>
      </main>
    </div>
  )
}
