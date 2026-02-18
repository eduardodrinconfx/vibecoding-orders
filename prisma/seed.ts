import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Crear usuario admin
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@vibecoding.com' },
    update: {},
    create: {
      email: 'admin@vibecoding.com',
      passwordHash: hashedPassword,
      role: 'admin',
    },
  })
  console.log('✅ Admin user created:', admin.email)

  // Crear categorías
  const bebidas = await prisma.category.upsert({
    where: { id: 'cat-bebidas' },
    update: {},
    create: {
      id: 'cat-bebidas',
      name: 'Bebidas',
      displayOrder: 1,
    },
  })

  const comidas = await prisma.category.upsert({
    where: { id: 'cat-comidas' },
    update: {},
    create: {
      id: 'cat-comidas',
      name: 'Comidas',
      displayOrder: 2,
    },
  })

  const postres = await prisma.category.upsert({
    where: { id: 'cat-postres' },
    update: {},
    create: {
      id: 'cat-postres',
      name: 'Postres',
      displayOrder: 3,
    },
  })

  console.log('✅ Categories created')

  // Crear menú de Cafetería (6am - 12pm)
  const cafeteria = await prisma.menu.upsert({
    where: { id: 'menu-cafeteria' },
    update: {},
    create: {
      id: 'menu-cafeteria',
      name: 'Cafetería Mañanera',
      type: 'CAFETERIA',
      timeStart: 6,
      timeEnd: 12,
      isActive: true,
    },
  })

  // Items de cafetería
  await prisma.menuItem.createMany({
    data: [
      {
        menuId: cafeteria.id,
        categoryId: bebidas.id,
        name: 'Café Americano',
        description: 'Café negro recién preparado',
        price: 2.50,
        isAvailable: true,
      },
      {
        menuId: cafeteria.id,
        categoryId: bebidas.id,
        name: 'Cappuccino',
        description: 'Espresso con leche espumada',
        price: 3.50,
        isAvailable: true,
      },
      {
        menuId: cafeteria.id,
        categoryId: bebidas.id,
        name: 'Té Verde',
        description: 'Té verde orgánico',
        price: 2.00,
        isAvailable: true,
      },
      {
        menuId: cafeteria.id,
        categoryId: comidas.id,
        name: 'Croissant',
        description: 'Croissant de mantequilla recién horneado',
        price: 3.00,
        isAvailable: true,
      },
      {
        menuId: cafeteria.id,
        categoryId: comidas.id,
        name: 'Tostadas con Aguacate',
        description: 'Pan artesanal con aguacate fresco',
        price: 6.50,
        isAvailable: true,
      },
    ],
  })

  console.log('✅ Cafetería menu created')

  // Crear menú de Restaurante (12pm - 6pm)
  const restaurante = await prisma.menu.upsert({
    where: { id: 'menu-restaurante' },
    update: {},
    create: {
      id: 'menu-restaurante',
      name: 'Menú del Día',
      type: 'RESTAURANTE',
      timeStart: 12,
      timeEnd: 18,
      isActive: true,
    },
  })

  // Items de restaurante
  await prisma.menuItem.createMany({
    data: [
      {
        menuId: restaurante.id,
        categoryId: comidas.id,
        name: 'Pasta Carbonara',
        description: 'Pasta fresca con salsa carbonara cremosa',
        price: 12.00,
        isAvailable: true,
      },
      {
        menuId: restaurante.id,
        categoryId: comidas.id,
        name: 'Hamburguesa Gourmet',
        description: 'Carne angus con queso cheddar y tocino',
        price: 14.50,
        isAvailable: true,
      },
      {
        menuId: restaurante.id,
        categoryId: comidas.id,
        name: 'Ensalada César',
        description: 'Lechuga romana, pollo grillado y crutones',
        price: 10.00,
        isAvailable: true,
      },
      {
        menuId: restaurante.id,
        categoryId: bebidas.id,
        name: 'Limonada Natural',
        description: 'Limonada fresca hecha en casa',
        price: 3.50,
        isAvailable: true,
      },
      {
        menuId: restaurante.id,
        categoryId: postres.id,
        name: 'Tiramisú',
        description: 'Postre italiano clásico',
        price: 6.00,
        isAvailable: true,
      },
    ],
  })

  console.log('✅ Restaurante menu created')

  // Crear menú Premium (6pm - 12am)
  const premium = await prisma.menu.upsert({
    where: { id: 'menu-premium' },
    update: {},
    create: {
      id: 'menu-premium',
      name: 'Menú Premium Stand-up',
      type: 'PREMIUM',
      timeStart: 18,
      timeEnd: 24,
      isActive: true,
    },
  })

  // Items premium
  await prisma.menuItem.createMany({
    data: [
      {
        menuId: premium.id,
        categoryId: comidas.id,
        name: 'Tabla de Quesos',
        description: 'Selección de quesos artesanales con frutos secos',
        price: 18.00,
        isAvailable: true,
      },
      {
        menuId: premium.id,
        categoryId: comidas.id,
        name: 'Ceviche de Camarones',
        description: 'Camarones frescos en salsa de limón',
        price: 16.50,
        isAvailable: true,
      },
      {
        menuId: premium.id,
        categoryId: bebidas.id,
        name: 'Mojito',
        description: 'Cóctel clásico con menta fresca',
        price: 8.00,
        isAvailable: true,
      },
      {
        menuId: premium.id,
        categoryId: bebidas.id,
        name: 'Vino Tinto Reserva',
        description: 'Copa de vino tinto de la casa',
        price: 10.00,
        isAvailable: true,
      },
      {
        menuId: premium.id,
        categoryId: postres.id,
        name: 'Brownie con Helado',
        description: 'Brownie de chocolate con helado de vainilla',
        price: 7.50,
        isAvailable: true,
      },
    ],
  })

  console.log('✅ Premium menu created')
  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
