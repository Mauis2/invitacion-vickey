/**
 * Script para crear las colecciones y storage de Appwrite necesarios para el Baby Shower.
 *
 * Uso:
 *   npx tsx scripts/setup-appwrite.ts
 *
 * Variables de entorno requeridas (se leen desde .env.local / .env):
 *   APPWRITE_ENDPOINT        - URL del endpoint de Appwrite
 *   APPWRITE_PROJECT_ID      - ID del proyecto
 *   APPWRITE_API_KEY         - API Key con permisos de databases + storage
 *   APPWRITE_DATABASE_ID     - (opcional) ID de la base de datos.
 */

import { Client, Databases, Storage, Permission, Role } from 'node-appwrite'
import { config } from 'dotenv'

config({ path: '.env.local' })
config({ path: '.env', override: true })

const ENDPOINT = process.env.APPWRITE_ENDPOINT || process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
const PROJECT_ID = process.env.APPWRITE_PROJECT_ID || process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
const API_KEY = process.env.APPWRITE_API_KEY
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID

if (!ENDPOINT || !PROJECT_ID || !API_KEY) {
  console.error('❌ Faltan variables de entorno. Revisa tu .env.local')
  console.error('   Necesitas: APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_API_KEY')
  process.exit(1)
}

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID).setKey(API_KEY)

const databases = new Databases(client)
const storage = new Storage(client)

async function ensureDatabase(): Promise<string> {
  const dbId = DATABASE_ID || 'bbshower'
  try {
    await databases.create(dbId, 'Baby Shower Vickey Eileen')
    console.log(`✅ Base de datos creada con ID: ${dbId}`)
  } catch (error: unknown) {
    const err = error as { code?: number }
    if (err.code === 409) {
      console.log(`📦 Base de datos "${dbId}" ya existe, usándola...`)
    } else {
      throw error
    }
  }
  return dbId
}

async function createRsvpCollection(dbId: string) {
  const COLLECTION_ID = 'rsvp'

  try {
    await databases.createCollection(dbId, COLLECTION_ID, 'RSVP - Confirmaciones', [
      Permission.create(Role.any()),
      Permission.read(Role.any())
    ])
    console.log('✅ Colección RSVP creada')
  } catch (error: unknown) {
    const err = error as { code?: number }
    if (err.code === 409) {
      console.log('📦 Colección RSVP ya existe')
    } else {
      throw error
    }
  }

  // Crear atributos (ignorar si ya existen)
  await safeCreateAttribute(() =>
    databases.createStringAttribute(dbId, COLLECTION_ID, 'name', 255, true)
  , 'rsvp.name')

  await safeCreateAttribute(() =>
    databases.createIntegerAttribute(dbId, COLLECTION_ID, 'guests', true, 1, 10)
  , 'rsvp.guests')
}

async function createWishesCollection(dbId: string) {
  const COLLECTION_ID = 'wishes'

  try {
    await databases.createCollection(dbId, COLLECTION_ID, 'Wishes - Deseos', [
      Permission.create(Role.any()),
      Permission.read(Role.any()),
      Permission.update(Role.any()),
      Permission.delete(Role.any())
    ])
    console.log('✅ Colección Wishes creada')
  } catch (error: unknown) {
    const err = error as { code?: number }
    if (err.code === 409) {
      console.log('📦 Colección Wishes ya existe')
    } else {
      throw error
    }
  }

  await safeCreateAttribute(() =>
    databases.createStringAttribute(dbId, COLLECTION_ID, 'name', 255, true)
  , 'wishes.name')

  await safeCreateAttribute(() =>
    databases.createStringAttribute(dbId, COLLECTION_ID, 'message', 1000, true)
  , 'wishes.message')

  await safeCreateAttribute(() =>
    databases.createBooleanAttribute(dbId, COLLECTION_ID, 'visible', false, true)
  , 'wishes.visible')
}

async function createGalleryCollection(dbId: string) {
  const COLLECTION_ID = 'gallery'

  try {
    await databases.createCollection(dbId, COLLECTION_ID, 'Gallery - Galería', [
      Permission.create(Role.any()),
      Permission.read(Role.any()),
      Permission.update(Role.any()),
      Permission.delete(Role.any())
    ])
    console.log('✅ Colección Gallery creada')
  } catch (error: unknown) {
    const err = error as { code?: number }
    if (err.code === 409) {
      console.log('📦 Colección Gallery ya existe')
    } else {
      throw error
    }
  }

  await safeCreateAttribute(() =>
    databases.createStringAttribute(dbId, COLLECTION_ID, 'fileId', 255, true)
  , 'gallery.fileId')

  await safeCreateAttribute(() =>
    databases.createStringAttribute(dbId, COLLECTION_ID, 'alt', 500, true)
  , 'gallery.alt')

  await safeCreateAttribute(() =>
    databases.createIntegerAttribute(dbId, COLLECTION_ID, 'order', false, 0, 100, 0)
  , 'gallery.order')

  await safeCreateAttribute(() =>
    databases.createBooleanAttribute(dbId, COLLECTION_ID, 'visible', false, true)
  , 'gallery.visible')
}

async function createGalleryBucket() {
  const BUCKET_ID = 'gallery'

  try {
    await storage.createBucket(BUCKET_ID, 'Gallery - Imágenes', [
      Permission.create(Role.any()),
      Permission.read(Role.any()),
      Permission.delete(Role.any())
    ], false, undefined, undefined, ['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
    console.log('✅ Bucket Gallery creado')
  } catch (error: unknown) {
    const err = error as { code?: number }
    if (err.code === 409) {
      console.log('📦 Bucket Gallery ya existe')
    } else {
      throw error
    }
  }
}

async function safeCreateAttribute(fn: () => Promise<unknown>, label: string) {
  try {
    await fn()
    console.log(`   ✅ Atributo "${label}" creado`)
  } catch (error: unknown) {
    const err = error as { code?: number }
    if (err.code === 409) {
      console.log(`   📦 Atributo "${label}" ya existe`)
    } else {
      throw error
    }
  }
}

async function main() {
  console.log('🚀 Configurando Appwrite para Baby Shower de Vickey Eileen...\n')
  console.log(`   Endpoint: ${ENDPOINT}`)
  console.log(`   Project:  ${PROJECT_ID}\n`)

  const dbId = await ensureDatabase()

  await createRsvpCollection(dbId)
  await createWishesCollection(dbId)
  await createGalleryCollection(dbId)
  await createGalleryBucket()

  console.log('\n🎉 ¡Configuración completada!')
  console.log(`\n📝 Variables de entorno necesarias:`)
  console.log(`   NEXT_PUBLIC_APPWRITE_DATABASE_ID=${dbId}`)
  console.log(`   NEXT_PUBLIC_APPWRITE_GALLERY_COLLECTION_ID=gallery`)
  console.log(`   NEXT_PUBLIC_APPWRITE_GALLERY_BUCKET_ID=gallery`)
}

main().catch((err) => {
  console.error('❌ Error:', err)
  process.exit(1)
})
