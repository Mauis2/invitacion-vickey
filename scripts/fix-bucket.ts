/**
 * Elimina y recrea el bucket gallery con extensiones correctas.
 */

import { Client, Storage, Permission, Role } from 'node-appwrite'
import { config } from 'dotenv'

config({ path: '.env.local' })
config({ path: '.env', override: true })

const ENDPOINT = process.env.APPWRITE_ENDPOINT || process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
const PROJECT_ID = process.env.APPWRITE_PROJECT_ID || process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
const API_KEY = process.env.APPWRITE_API_KEY

if (!ENDPOINT || !PROJECT_ID || !API_KEY) {
  console.error('❌ Faltan variables de entorno.')
  process.exit(1)
}

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID).setKey(API_KEY)
const storage = new Storage(client)

async function main() {
  console.log('🔧 Recreando bucket gallery...\n')

  // Delete existing bucket
  try {
    await storage.deleteBucket('gallery')
    console.log('🗑️  Bucket "gallery" eliminado')
  } catch (err: unknown) {
    const e = err as { code?: number }
    if (e.code === 404) {
      console.log('📦 Bucket no existía')
    } else {
      throw err
    }
  }

  // Wait a moment for deletion to process
  await new Promise((r) => setTimeout(r, 2000))

  // Recreate without mime type restrictions (allow all images)
  try {
    await storage.createBucket(
      'gallery',
      'Gallery - Imágenes',
      [
        Permission.create(Role.any()),
        Permission.read(Role.any()),
        Permission.update(Role.any()),
        Permission.delete(Role.any())
      ],
      false,       // fileSecurity
      true,        // enabled
      undefined,   // maximumFileSize (default)
      []           // allowedFileExtensions — empty = allow all
    )
    console.log('✅ Bucket "gallery" recreado sin restricciones de extensión')
  } catch (err) {
    console.error('❌ Error creando bucket:', err)
  }

  console.log('\n🎉 ¡Listo!')
}

main().catch((err) => {
  console.error('❌ Error:', err)
  process.exit(1)
})
