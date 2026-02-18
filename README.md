# VibeCoding Orders - Sistema de Pedidos Dinámico

Sistema de gestión de pedidos para cafetería/restaurante/stand-up comedy con menús dinámicos según horario.

## 🚀 Características

- ☕ **Menús Dinámicos**: Cambian automáticamente según la hora (Cafetería → Restaurante → Premium)
- 📱 **Landing Page**: Muestra el menú actual con diseño responsive
- 🛒 **Sistema de Pedidos**: Formulario simple para clientes
- 👨‍🍳 **Vista de Cocina**: Display en tiempo real de pedidos
- ⚙️ **Panel Admin**: CRUD completo para gestionar menús e items
- ⚡ **Tiempo Real**: Socket.IO para actualización instantánea

## 📦 Stack Tecnológico

- **Framework**: Next.js 14 con App Router
- **Lenguaje**: TypeScript
- **Base de Datos**: Vercel Postgres + Prisma ORM
- **Autenticación**: NextAuth.js
- **Tiempo Real**: Socket.IO
- **Estilos**: Tailwind CSS + shadcn/ui
- **Deploy**: Vercel

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone <tu-repo>
cd vibecoding-orders
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env con tus credenciales
```

4. **Configurar base de datos**
```bash
npm run db:push
npm run db:seed
```

5. **Ejecutar en desarrollo**
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
vibecoding-orders/
├── app/                    # Next.js App Router
│   ├── (public)/          # Rutas públicas
│   │   ├── page.tsx       # Landing page
│   │   └── pedido/        # Sistema de pedidos
│   ├── admin/             # Panel de administración
│   ├── cocina/            # Vista de cocina
│   └── api/               # API Routes
├── components/            # Componentes React
│   ├── ui/               # shadcn components
│   └── ...               # Componentes personalizados
├── lib/                  # Utilidades
│   ├── db.ts            # Prisma client
│   ├── auth.ts          # NextAuth config
│   └── utils.ts         # Helpers
├── prisma/
│   ├── schema.prisma    # Modelos de BD
│   └── seed.ts          # Datos iniciales
└── types/               # TypeScript types
```

## 🕐 Horarios de Menú

- **Mañana (6am - 12pm)**: Cafetería
- **Tarde (12pm - 6pm)**: Restaurante
- **Noche (6pm - 12am)**: Menú Premium (Stand-up)

## 🔐 Acceso Admin

Credenciales por defecto (cambiar en producción):
- Email: admin@vibecoding.com
- Password: admin123

## 🚀 Deploy en Vercel

1. Push a GitHub
2. Importar proyecto en Vercel
3. Configurar variables de entorno
4. Deploy automático

## 📝 Licencia

MIT
