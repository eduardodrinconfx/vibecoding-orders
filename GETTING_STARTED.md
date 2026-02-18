# 🎯 Getting Started - Inicio Rápido

## ⚡ Inicio Rápido (5 minutos)

### Paso 1: Instalar Node.js (si no lo tienes)
Descarga e instala Node.js desde: https://nodejs.org/

### Paso 2: Abrir Terminal en el Proyecto
```bash
cd vibecoding-orders
```

### Paso 3: Instalar Dependencias
```bash
npm install
```

### Paso 4: Configurar Base de Datos

**Opción Fácil - Usar SQLite (solo desarrollo):**
```bash
# Edita prisma/schema.prisma
# Cambia: provider = "postgresql"
# Por: provider = "sqlite"
# Y cambia DATABASE_URL en .env a:
# DATABASE_URL="file:./dev.db"
```

**Opción Recomendada - PostgreSQL en la nube (Gratis):**
1. Ve a https://vercel.com/storage
2. Crea un proyecto y una base de datos Postgres
3. Copia la `DATABASE_URL` a tu archivo `.env`

### Paso 5: Inicializar Base de Datos
```bash
npm run db:push
npm run db:seed
```

### Paso 6: Ejecutar el Proyecto
```bash
npm run dev
```

Abre http://localhost:3000

## 🎉 ¡Listo!

### Explora la Aplicación:

1. **Landing Page**: http://localhost:3000
   - Ve el menú actual según la hora del día

2. **Hacer un Pedido**: Click en "Hacer un Pedido"
   - Agrega items al carrito
   - Completa el formulario y envía

3. **Vista de Cocina**: http://localhost:3000/cocina
   - Ve todos los pedidos en tiempo real
   - Gestiona estados: Pendiente → En Proceso → Completado

4. **Panel Admin**: http://localhost:3000/admin/login
   - Email: `admin@vibecoding.com`
   - Password: `admin123`

## 📱 Funcionalidades Implementadas

✅ Sistema de menús dinámicos (Cafetería, Restaurante, Premium)
✅ Landing page responsive con menú actual
✅ Sistema de pedidos con carrito
✅ Vista de cocina tipo Kanban
✅ Panel de administración con autenticación
✅ Dashboard con estadísticas
✅ Gestión de menús (visualización)
✅ Base de datos con Prisma ORM
✅ Deploy listo para Vercel

## 🔄 Horarios de Menús

- **6:00 AM - 12:00 PM**: Cafetería (Café, Croissants, etc.)
- **12:00 PM - 6:00 PM**: Restaurante (Hamburguesas, Pasta, etc.)
- **6:00 PM - 12:00 AM**: Premium Stand-up (Tabla de quesos, Cocteles, etc.)

## 🚀 Subir a GitHub

```bash
git init
git add .
git commit -m "Initial commit - VibeCoding Orders"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/vibecoding-orders.git
git push -u origin main
```

## 🌐 Deploy en Vercel (1 clic)

1. Ve a https://vercel.com
2. Click en "Add New Project"
3. Importa tu repositorio de GitHub
4. Agrega las variables de entorno:
   - `DATABASE_URL` (de Vercel Postgres)
   - `NEXTAUTH_SECRET` (genera con: `openssl rand -base64 32`)
   - `NEXTAUTH_URL` (tu dominio de producción)
5. Click en "Deploy"

## 📚 Más Información

Para detalles completos, consulta:
- [SETUP.md](./SETUP.md) - Guía detallada de instalación
- [README.md](./README.md) - Documentación completa

## 🆘 Problemas Comunes

**Error: "Cannot find module"**
```bash
npm install
npx prisma generate
```

**Error: "Database connection"**
- Verifica que `DATABASE_URL` en `.env` sea correcto
- Ejecuta `npm run db:push` de nuevo

**Página en blanco**
- Asegúrate de que el servidor esté corriendo (`npm run dev`)
- Revisa la consola del navegador (F12) para errores

---

**¿Necesitas ayuda?** Abre un issue en GitHub o consulta la documentación completa.
