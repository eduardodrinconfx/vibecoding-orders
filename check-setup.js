#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración del proyecto...\n');

let allGood = true;

// Check 1: Node.js version
console.log('✓ Node.js:', process.version);

// Check 2: .env file
if (fs.existsSync('.env')) {
  console.log('✓ Archivo .env encontrado');
  const envContent = fs.readFileSync('.env', 'utf-8');

  if (envContent.includes('DATABASE_URL')) {
    console.log('  ✓ DATABASE_URL configurada');
  } else {
    console.log('  ⚠️  DATABASE_URL no encontrada en .env');
    allGood = false;
  }

  if (envContent.includes('NEXTAUTH_SECRET')) {
    console.log('  ✓ NEXTAUTH_SECRET configurada');
  } else {
    console.log('  ⚠️  NEXTAUTH_SECRET no encontrada en .env');
    allGood = false;
  }
} else {
  console.log('⚠️  Archivo .env no encontrado');
  console.log('   → Ejecuta: cp .env.example .env');
  allGood = false;
}

// Check 3: node_modules
if (fs.existsSync('node_modules')) {
  console.log('✓ Dependencias instaladas (node_modules existe)');
} else {
  console.log('❌ node_modules no encontrado');
  console.log('   → Ejecuta: npm install');
  allGood = false;
}

// Check 4: Prisma Client
if (fs.existsSync('node_modules/@prisma/client')) {
  console.log('✓ Prisma Client generado');
} else {
  console.log('❌ Prisma Client no encontrado');
  console.log('   → Ejecuta: npx prisma generate');
  allGood = false;
}

// Check 5: Required directories
const requiredDirs = ['app', 'components', 'lib', 'prisma', 'types'];
const missingDirs = requiredDirs.filter(dir => !fs.existsSync(dir));

if (missingDirs.length === 0) {
  console.log('✓ Estructura de directorios completa');
} else {
  console.log('⚠️  Directorios faltantes:', missingDirs.join(', '));
}

// Check 6: Key files
const keyFiles = [
  'package.json',
  'next.config.js',
  'tailwind.config.ts',
  'tsconfig.json',
  'prisma/schema.prisma',
  'app/page.tsx',
  'app/layout.tsx'
];

const missingFiles = keyFiles.filter(file => !fs.existsSync(file));
if (missingFiles.length === 0) {
  console.log('✓ Archivos principales encontrados');
} else {
  console.log('⚠️  Archivos faltantes:', missingFiles.join(', '));
  allGood = false;
}

console.log('\n' + '='.repeat(60));

if (allGood) {
  console.log('✅ ¡TODO LISTO! El proyecto está configurado correctamente.\n');
  console.log('📝 Próximos pasos:');
  console.log('   1. Configura tu base de datos en .env (DATABASE_URL)');
  console.log('   2. Ejecuta: npm run db:push');
  console.log('   3. Ejecuta: npm run db:seed');
  console.log('   4. Inicia el servidor: npm run dev');
  console.log('\n🌐 Luego abre: http://localhost:3000\n');
} else {
  console.log('⚠️  Hay algunos problemas que resolver (ver arriba).\n');
  process.exit(1);
}
