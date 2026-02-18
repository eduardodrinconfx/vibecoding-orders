'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice, formatDate } from '@/lib/utils'
import { Order, OrderStatus } from '@/types'
import { Clock, CheckCircle2, ChefHat, XCircle } from 'lucide-react'

export default function CocinaPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()

    // Actualizar cada 10 segundos
    const interval = setInterval(fetchOrders, 10000)
    return () => clearInterval(interval)
  }, [])

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status }),
      })

      if (response.ok) {
        fetchOrders()
      }
    } catch (error) {
      console.error('Error updating order:', error)
    }
  }

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Pendiente</Badge>
      case 'IN_PROGRESS':
        return <Badge><ChefHat className="w-3 h-3 mr-1" />En Proceso</Badge>
      case 'COMPLETED':
        return <Badge variant="outline"><CheckCircle2 className="w-3 h-3 mr-1" />Completado</Badge>
      case 'CANCELLED':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Cancelado</Badge>
    }
  }

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING':
        return 'border-l-4 border-l-yellow-500'
      case 'IN_PROGRESS':
        return 'border-l-4 border-l-blue-500'
      case 'COMPLETED':
        return 'border-l-4 border-l-green-500'
      case 'CANCELLED':
        return 'border-l-4 border-l-red-500'
    }
  }

  const pendingOrders = orders.filter((o) => o.status === 'PENDING')
  const inProgressOrders = orders.filter((o) => o.status === 'IN_PROGRESS')
  const completedOrders = orders.filter((o) => o.status === 'COMPLETED').slice(0, 5)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-food-pattern">
        <div className="text-center">
          <div className="space-y-3">
            <div className="h-6 w-44 rounded-lg animate-shimmer mx-auto"></div>
            <div className="h-4 w-28 rounded animate-shimmer mx-auto stagger-2"></div>
          </div>
          <p className="mt-4 text-muted-foreground animate-fade-in-up">Cargando pedidos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/80 to-amber-50/40">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50 animate-slide-down">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="animate-float"><ChefHat className="w-8 h-8" /></span>
              <div>
                <h1 className="text-2xl font-bold">Vista de Cocina</h1>
                <p className="text-sm text-muted-foreground">
                  {pendingOrders.length + inProgressOrders.length} pedidos activos
                </p>
              </div>
            </div>
            <Button onClick={fetchOrders} variant="outline">
              Actualizar
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pendientes */}
          <div className="animate-slide-in-left">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Pendientes
              <Badge variant="secondary" className={pendingOrders.length > 0 ? 'animate-gentle-pulse' : ''}>
                {pendingOrders.length}
              </Badge>
            </h2>
            <div className="space-y-4 rounded-xl bg-yellow-50/50 p-3">
              {pendingOrders.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No hay pedidos pendientes</p>
              ) : (
                pendingOrders.map((order, index) => (
                  <Card key={order.id} className={`${getStatusColor(order.status)} animate-scale-in stagger-${Math.min(index + 1, 9)}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{order.customerName}</CardTitle>
                          <CardDescription>
                            {order.tableNumber && `Mesa ${order.tableNumber} • `}
                            {formatDate(order.createdAt)}
                          </CardDescription>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        {(order.items as unknown as any[]).map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span>
                              {item.quantity}x {item.itemName}
                            </span>
                            <span className="text-muted-foreground">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mb-4 pt-2 border-t">
                        <span className="font-bold">Total:</span>
                        <span className="font-bold text-primary">{formatPrice(order.total)}</span>
                      </div>
                      <Button
                        onClick={() => updateOrderStatus(order.id, 'IN_PROGRESS')}
                        className="w-full"
                      >
                        Comenzar Preparación
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* En Proceso */}
          <div className="animate-fade-in-up stagger-2">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ChefHat className="w-5 h-5" />
              En Proceso
              <Badge className={inProgressOrders.length > 0 ? 'animate-gentle-pulse' : ''}>
                {inProgressOrders.length}
              </Badge>
            </h2>
            <div className="space-y-4 rounded-xl bg-blue-50/50 p-3">
              {inProgressOrders.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No hay pedidos en proceso</p>
              ) : (
                inProgressOrders.map((order, index) => (
                  <Card key={order.id} className={`${getStatusColor(order.status)} animate-scale-in stagger-${Math.min(index + 1, 9)}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{order.customerName}</CardTitle>
                          <CardDescription>
                            {order.tableNumber && `Mesa ${order.tableNumber} • `}
                            {formatDate(order.createdAt)}
                          </CardDescription>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        {(order.items as unknown as any[]).map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span>
                              {item.quantity}x {item.itemName}
                            </span>
                            <span className="text-muted-foreground">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mb-4 pt-2 border-t">
                        <span className="font-bold">Total:</span>
                        <span className="font-bold text-primary">{formatPrice(order.total)}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => updateOrderStatus(order.id, 'COMPLETED')}
                          className="flex-1"
                        >
                          Completar
                        </Button>
                        <Button
                          onClick={() => updateOrderStatus(order.id, 'CANCELLED')}
                          variant="destructive"
                          className="flex-1"
                        >
                          Cancelar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Completados Recientes */}
          <div className="animate-slide-in-right">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Completados Recientes
            </h2>
            <div className="space-y-4 rounded-xl bg-green-50/30 p-3">
              {completedOrders.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No hay pedidos completados</p>
              ) : (
                completedOrders.map((order, index) => (
                  <Card key={order.id} className={`${getStatusColor(order.status)} opacity-60 animate-fade-in-up stagger-${Math.min(index + 1, 9)}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{order.customerName}</CardTitle>
                          <CardDescription>
                            {order.tableNumber && `Mesa ${order.tableNumber} • `}
                            {formatDate(order.createdAt)}
                          </CardDescription>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1 text-sm">
                        {(order.items as unknown as any[]).map((item, idx) => (
                          <div key={idx}>
                            {item.quantity}x {item.itemName}
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mt-2 pt-2 border-t">
                        <span className="text-sm font-medium">Total:</span>
                        <span className="text-sm font-medium">{formatPrice(order.total)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
