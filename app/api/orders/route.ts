import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { customerName, tableNumber, items, total } = body

    // Validar datos
    if (!customerName || !items || items.length === 0 || !total) {
      return NextResponse.json(
        { error: 'Datos incompletos' },
        { status: 400 }
      )
    }

    // Crear pedido (convertir items a JSON string para SQLite)
    const order = await prisma.order.create({
      data: {
        customerName,
        tableNumber: tableNumber || null,
        items: JSON.stringify(items),
        total,
        status: 'PENDING',
      },
    })

    // TODO: Emitir evento Socket.IO para notificar a cocina
    // io.emit('new_order', order)

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Error al crear el pedido' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const where = status ? { status: status as any } : {}

    const orders = await prisma.order.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    })

    // Parsear items de JSON string a objeto
    const ordersWithParsedItems = orders.map(order => ({
      ...order,
      items: JSON.parse(order.items)
    }))

    return NextResponse.json(ordersWithParsedItems)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Error al obtener pedidos' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { orderId, status } = body

    if (!orderId || !status) {
      return NextResponse.json(
        { error: 'Datos incompletos' },
        { status: 400 }
      )
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        completedAt: status === 'COMPLETED' ? new Date() : null,
      },
    })

    // TODO: Emitir evento Socket.IO
    // io.emit('order_updated', order)

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { error: 'Error al actualizar el pedido' },
      { status: 500 }
    )
  }
}
