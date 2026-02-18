import { Menu, MenuItem, Category, Order, MenuType, OrderStatus } from '@prisma/client'

export type { Menu, MenuItem, Category, Order, MenuType, OrderStatus }

export interface MenuWithItems extends Menu {
  items: MenuItem[]
}

export interface MenuItemWithCategory extends MenuItem {
  category: Category
}

export interface OrderItem {
  itemId: string
  itemName: string
  quantity: number
  price: number
}

export interface CreateOrderData {
  customerName: string
  tableNumber?: string
  items: OrderItem[]
  total: number
}

export interface MenuCardProps {
  item: MenuItem
  onAddToCart: (item: MenuItem) => void
}

export interface CartItem extends MenuItem {
  quantity: number
}
