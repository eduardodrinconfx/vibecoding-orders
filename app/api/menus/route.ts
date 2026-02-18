import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getCurrentMenuType } from '@/lib/utils'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || getCurrentMenuType()

    // Obtener el menú activo del tipo especificado
    const menu = await prisma.menu.findFirst({
      where: {
        type: type as any,
        isActive: true,
      },
      include: {
        items: {
          where: {
            isAvailable: true,
          },
          include: {
            category: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    })

    if (!menu) {
      return NextResponse.json({ items: [] })
    }

    return NextResponse.json({
      menu: {
        id: menu.id,
        name: menu.name,
        type: menu.type,
      },
      items: menu.items,
    })
  } catch (error) {
    console.error('Error fetching menu:', error)
    return NextResponse.json(
      { error: 'Error al cargar el menú' },
      { status: 500 }
    )
  }
}
