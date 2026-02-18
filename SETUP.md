# 🚀 Guía de Instalación y Configuración

Esta guía te ayudará a configurar y ejecutar el proyecto VibeCoding Orders desde cero.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior): [Descargar aquí](https://nodejs.org/)
- **npm** o **yarn** (viene con Node.js)
- **Git**: [Descargar aquí](https://git-scm.com/)
- **PostgreSQL** (o usa Vercel Postgres en la nube)

## 🛠️ Instalación Paso a Paso

### 1. Verificar Node.js

Abre una terminal y ejecuta:

```bash
node --version
npm --version
```

Deberías ver las versiones instaladas. Si no, instala Node.js primero.

### 2. Instalar Dependencias

Navega al directorio del proyecto e instala todas las dependencias:

```bash
cd vibecoding-orders
npm install
```

Esto instalará todos los paquetes necesarios especificados en `package.json`.

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto copiando el ejemplo:

```bash
cp .env.example .env
```

Luego edita el archivo `.env` con tus credenciales:

```env
# Database - Opción 1: PostgreSQL Local
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/vibecoding_orders?schema=public"

# Database - Opción 2: Vercel Postgres (recomendado)
# Obtén esta URL desde tu dashboard de Vercel después de crear un proyecto
DATABASE_URL="postgres://default:xxx@xxx.postgres.vercel-storage.com:5432/verceldb"

# NextAuth (genera un secret aleatorio)
NEXTAUTH_SECRET="tu-secret-super-seguro-aqui-cambiar-en-produccion"
NEXTAUTH_URL="http://localhost:3000"

# Admin credentials
ADMIN_EMAIL="admin@vibecoding.com"
ADMIN_PASSWORD="admin123"
```

**Generar NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 4. Configurar Base de Datos

#### Opción A: PostgreSQL Local

1. Instala PostgreSQL
2. Crea una base de datos:
```sql
CREATE DATABASE vibecoding_orders;
```
3. Actualiza `DATABASE_URL` en `.env`

#### Opción B: Vercel Postgres (Recomendado)

1. Ve a [vercel.com](https://vercel.com)
2. Crea un nuevo proyecto
3. Ve a "Storage" → "Create Database" → "Postgres"
4. Copia la conexión `DATABASE_URL` y pégala en tu `.env`

### 5. Inicializar Base de Datos

Ejecuta las migraciones y seed:

```bash
# Crear las tablas en la base de datos
npm run db:push

# Poblar con datos iniciales (menús de ejemplo)
npm run db:seed
```

### 6. Ejecutar en Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🔐 Credenciales de Acceso

### Admin Panel
- URL: http://localhost:3000/admin/login
- Email: `admin@vibecoding.com`
- Password: `admin123`

**⚠️ IMPORTANTE:** Cambia estas credenciales en producción.

## 📱 Rutas de la Aplicación

- `/` - Landing page con menú actual
- `/pedido` - Sistema de pedidos
- `/cocina` - Vista de cocina (tiempo real)
- `/admin` - Panel de administración
- `/admin/login` - Login de admin
- `/admin/menus` - Gestión de menús

## 🌐 Desplegar en Vercel

### Desde GitHub

1. **Sube tu código a GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/vibecoding-orders.git
git push -u origin main
```

2. **Conecta con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Click en "Add New Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Next.js

3. **Configurar Variables de Entorno en Vercel:**
   - En la configuración del proyecto, ve a "Settings" → "Environment Variables"
   - Agrega todas las variables de tu archivo `.env`:
     - `DATABASE_URL`
     - `NEXTAUTH_SECRET`
     - `NEXTAUTH_URL` (usa tu dominio de producción)

4. **Deploy:**
   - Vercel desplegará automáticamente
   - Cada push a `main` creará un nuevo deploy

### Desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

## 🐛 Solución de Problemas

### Error: "Cannot find module '@prisma/client'"
```bash
npm install
npx prisma generate
```

### Error de conexión a base de datos
- Verifica que `DATABASE_URL` en `.env` sea correcta
- Asegúrate de que PostgreSQL esté corriendo
- Prueba la conexión:
```bash
npm run db:push
```

### Error: "NEXTAUTH_SECRET is not set"
- Asegúrate de tener el archivo `.env` en la raíz
- Genera un secret: `openssl rand -base64 32`
- Reinicia el servidor de desarrollo

### Prisma Client no actualizado
```bash
npx prisma generate
```

## 📊 Comandos Útiles

```bash
# Desarrollo
npm run dev              # Ejecutar en modo desarrollo
npm run build            # Construir para producción
npm run start            # Ejecutar build de producción

# Base de Datos
npm run db:push          # Aplicar schema a la DB
npm run db:studio        # Abrir Prisma Studio (GUI)
npm run db:seed          # Poblar con datos de ejemplo

# Calidad de Código
npm run lint             # Ejecutar ESLint
```

## 🔄 Actualizar Datos de Seed

Para modificar los datos iniciales, edita `prisma/seed.ts` y ejecuta:

```bash
npm run db:seed
```

## 📝 Próximos Pasos

1. **Socket.IO:** La funcionalidad de tiempo real está preparada pero no implementada completamente
2. **Upload de Imágenes:** Agregar soporte para subir imágenes de productos
3. **CRUD Completo:** Implementar edición completa de menús desde el admin
4. **Reportes:** Dashboard con estadísticas y reportes avanzados
5. **Notificaciones:** Sistema de notificaciones push para clientes

## 🆘 Soporte

Si encuentras problemas:

1. Revisa los logs de error en la consola
2. Verifica que todas las dependencias estén instaladas
3. Asegúrate de que el archivo `.env` exista y tenga valores correctos
4. Consulta la documentación de [Next.js](https://nextjs.org/docs), [Prisma](https://www.prisma.io/docs), y [NextAuth](https://next-auth.js.org/)

## 📄 Licencia

MIT

---

¡Listo! 🎉 Tu aplicación debería estar funcionando. Si tienes preguntas, revisa el README.md principal.
