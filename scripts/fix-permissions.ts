/**
 * Script para corregir permisos de colecciones y bucket existentes.
 *
 * Uso:
 *   npx tsx scripts/fix-permissions.ts
 */

import { Client, Databases, Storage, Permission, Role } from 'node-appwrite'
import { config } from 'dotenv'

config({ path: '.env.local' })
config({ path: '.env', override: true })

const ENDPOINT = process.env.APPWRITE_ENDPOINT || process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
const PROJECT_ID = process.env.APPWRITE_PROJECT_ID || process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
const API_KEY = process.env.APPWRITE_API_KEY
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'bbshower'

if (!ENDPOINT || !PROJECT_ID || !API_KEY) {
  console.error('❌ Faltan variables de entorno.')
  process.exit(1)
}

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID).setKey(API_KEY)
const databases = new Databases(client)
const storage = new Storage(client)

async function main() {
  console.log('🔧 Corrigiendo permisos...\n')

  // Fix wishes collection permissions
  try {
    await databases.updateCollection(DATABASE_ID, 'wishes', 'Wishes - Deseos', [
      Permission.create(Role.any()),
      Permission.read(Role.any()),
      Permission.update(Role.any()),
      Permission.delete(Role.any())
    ])
    console.log('✅ Permisos de colección "wishes" actualizados')
  } catch (err) {
    console.error('❌ Error actualizando wishes:', err)
  }

  // Fix rsvp collection permissions
  try {
    await databases.updateCollection(DATABASE_ID, 'rsvp', 'RSVP - Confirmaciones', [
      Permission.create(Role.any()),
      Permission.read(Role.any()),
      Permission.update(Role.any()),
      Permission.delete(Role.any())
    ])
    console.log('✅ Permisos de colección "rsvp" actualizados')
  } catch (err) {
    console.error('❌ Error actualizando rsvp:', err)
  }

  // Fix gallery collection permissions
  try {
    await databases.updateCollection(DATABASE_ID, 'gallery', 'Gallery - Galería', [
      Permission.create(Role.any()),
      Permission.read(Role.any()),
      Permission.update(Role.any()),
      Permission.delete(Role.any())
    ])
    console.log('✅ Permisos de colección "gallery" actualizados')
  } catch (err) {
    console.error('❌ Error actualizando gallery:', err)
  }

  // Fix gallery bucket - recreate with correct mime types
  try {
    await storage.updateBucket('gallery', 'Gallery - Imágenes', [
      Permission.create(Role.any()),
      Permission.read(Role.any()),
      Permission.update(Role.any()),
      Permission.delete(Role.any())
    ], false, undefined, undefined, ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif', 'image/gif'])
    console.log('✅ Permisos y tipos del bucket "gallery" actualizados')
  } catch (err) {
    console.error('❌ Error actualizando bucket gallery:', err)
  }

  console.log('\n🎉 ¡Permisos corregidos!')
}

main().catch((err) => {
  console.error('❌ Error:', err)
  process.exit(1)
})
