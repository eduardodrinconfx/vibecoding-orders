'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { formatPrice, getCurrentMenuType } from '@/lib/utils'
import { MenuItem, CartItem } from '@/types'
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react'

export default function PedidoPage() {
  const router = useRouter()
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [customerName, setCustomerName] = useState('')
  const [tableNumber, setTableNumber] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [justAdded, setJustAdded] = useState<string | null>(null)

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const currentType = getCurrentMenuType()
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
  }, [])

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
    setJustAdded(item.id)
    setTimeout(() => setJustAdded(null), 400)
  }

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId))
  }

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === itemId ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i
        )
        .filter((i) => i.quantity > 0)
    )
  }

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!customerName.trim() || cart.length === 0) {
      alert('Por favor completa tu nombre y agrega items al carrito')
      return
    }

    setSubmitting(true)

    try {
      const orderItems = cart.map((item) => ({
        itemId: item.id,
        itemName: item.name,
        quantity: item.quantity,
        price: item.price,
      }))

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerName.trim(),
          tableNumber: tableNumber.trim() || null,
          items: orderItems,
          total: calculateTotal(),
        }),
      })

      if (response.ok) {
        alert('¡Pedido realizado con éxito! Tu orden ha sido enviada a la cocina.')
        router.push('/')
      } else {
        alert('Error al realizar el pedido. Intenta nuevamente.')
      }
    } catch (error) {
      console.error('Error submitting order:', error)
      alert('Error al realizar el pedido. Intenta nuevamente.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="text-center">
          <div className="space-y-3">
            <div className="h-6 w-40 rounded-lg animate-shimmer mx-auto"></div>
            <div className="h-4 w-28 rounded animate-shimmer mx-auto stagger-2"></div>
          </div>
          <p className="mt-4 text-muted-foreground animate-fade-in-up">Cargando menú...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/80 to-amber-50/40 ">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50 animate-slide-down">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Menú
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              <Badge className={justAdded ? 'animate-bounce-once' : ''}>{cart.length} items</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Items */}
          <div className="lg:col-span-2 animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-6">Selecciona tus Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuItems.map((item, index) => (
                <Card key={item.id} className={`animate-scale-in stagger-${Math.min(index + 1, 9)}`}>
                  <CardHeader>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-bold text-primary">{formatPrice(item.price)}</p>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => addToCart(item)} className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Cart & Checkout */}
          <div className="lg:col-span-1 animate-slide-in-right">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Tu Pedido</CardTitle>
                <CardDescription>Revisa y confirma tu pedido</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="customerName">Nombre *</Label>
                    <Input
                      id="customerName"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="tableNumber">Número de Mesa (opcional)</Label>
                    <Input
                      id="tableNumber"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="Ej: 5"
                    />
                  </div>

                  {/* Cart Items */}
                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-3">Items:</h3>
                    {cart.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No has agregado items
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {cart.map((item, index) => (
                          <div key={item.id} className={`flex items-center justify-between text-sm animate-fade-in-up stagger-${Math.min(index + 1, 9)}`}>
                            <div className="flex-1">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-muted-foreground">{formatPrice(item.price)}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                type="button"
                                size="icon"
                                variant="outline"
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                type="button"
                                size="icon"
                                variant="outline"
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                              <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="h-7 w-7"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-primary">{formatPrice(calculateTotal())}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                    disabled={submitting || cart.length === 0 || !customerName.trim()}
                  >
                    {submitting ? 'Procesando...' : 'Confirmar Pedido'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
