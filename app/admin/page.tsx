'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import { LayoutDashboard, UtensilsCrossed, ShoppingBag, Settings, ArrowLeft } from 'lucide-react'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalOrders: 0,
    todayOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/orders')
        const orders = await response.json()

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const todayOrders = orders.filter((order: any) =>
          new Date(order.createdAt) >= today
        )

        setStats({
          totalOrders: orders.length,
          todayOrders: todayOrders.length,
          totalRevenue: orders.reduce((sum: number, order: any) => sum + order.total, 0),
          pendingOrders: orders.filter((order: any) =>
            order.status === 'PENDING' || order.status === 'IN_PROGRESS'
          ).length,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    if (status === 'authenticated') {
      fetchStats()
    }
  }, [status])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-food-pattern">
        <div className="text-center">
          <div className="space-y-3">
            <div className="h-6 w-40 rounded-lg animate-shimmer mx-auto"></div>
            <div className="h-4 w-28 rounded animate-shimmer mx-auto stagger-2"></div>
          </div>
          <p className="mt-4 text-muted-foreground animate-fade-in-up">Cargando...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/80 to-amber-50/40">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50 animate-slide-down">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="animate-float"><LayoutDashboard className="w-8 h-8" /></span>
              <div>
                <h1 className="text-2xl font-bold">Panel de Administración</h1>
                <p className="text-sm text-muted-foreground">Bienvenido, {session?.user?.email}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Ir al Sitio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="animate-fade-in-up stagger-1">
            <CardHeader>
              <CardDescription>Total de Pedidos</CardDescription>
              <CardTitle className="text-3xl">{stats.totalOrders}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="animate-fade-in-up stagger-2">
            <CardHeader>
              <CardDescription>Pedidos Hoy</CardDescription>
              <CardTitle className="text-3xl">{stats.todayOrders}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="animate-fade-in-up stagger-3">
            <CardHeader>
              <CardDescription>Ingresos Totales</CardDescription>
              <CardTitle className="text-3xl">{formatPrice(stats.totalRevenue)}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="animate-fade-in-up stagger-4">
            <CardHeader>
              <CardDescription>Pedidos Activos</CardDescription>
              <CardTitle className="text-3xl">
                {stats.pendingOrders}
                {stats.pendingOrders > 0 && (
                  <Badge variant="destructive" className="ml-2 animate-gentle-pulse">Activos</Badge>
                )}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="cursor-pointer animate-scale-in stagger-5">
            <Link href="/admin/menus">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <UtensilsCrossed className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Gestionar Menús</CardTitle>
                    <CardDescription>Crear y editar menús e items</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Link>
          </Card>

          <Card className="cursor-pointer animate-scale-in stagger-6">
            <Link href="/cocina">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <ShoppingBag className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Ver Pedidos</CardTitle>
                    <CardDescription>Vista de cocina en tiempo real</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Link>
          </Card>

          <Card className="cursor-pointer opacity-50 animate-scale-in stagger-7">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-muted rounded-lg">
                  <Settings className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle>Configuración</CardTitle>
                  <CardDescription>Próximamente...</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="mt-8 animate-fade-in-up stagger-8">
          <CardHeader>
            <CardTitle>Información del Sistema</CardTitle>
            <CardDescription>
              Este es el panel de administración de VibeCoding Orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>Versión:</strong> 1.0.0</p>
              <p><strong>Framework:</strong> Next.js 14</p>
              <p><strong>Base de Datos:</strong> PostgreSQL con Prisma</p>
              <p><strong>Autenticación:</strong> NextAuth.js</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
