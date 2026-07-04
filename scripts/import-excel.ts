/**
 * Importa datos desde Baby.xlsx a las colecciones de Appwrite.
 *
 * Uso:
 *   npx tsx scripts/import-excel.ts
 */

import { Client, Databases, ID } from 'node-appwrite'
import { config } from 'dotenv'
import * as XLSX from 'xlsx'

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

function excelDateToISO(serial: number): string {
  const utcDays = Math.floor(serial - 25569)
  const utcValue = utcDays * 86400
  const fractionalDay = serial - Math.floor(serial)
  const totalSeconds = Math.floor(fractionalDay * 86400)
  const date = new Date(utcValue * 1000 + totalSeconds * 1000)
  return date.toISOString()
}

async function importWishes() {
  console.log('\n📨 Importando mensajes/deseos...\n')

  const wb = XLSX.readFile('Baby.xlsx')
  const ws = wb.Sheets['Mensajes']
  const rows = XLSX.utils.sheet_to_json<{ Nombre: string; 'Mensaje ': string; Fecha: number }>(ws)

  // Deduplicate by name + first 50 chars of message
  const seen = new Set<string>()
  const unique = rows.filter((row) => {
    const key = `${row.Nombre?.trim()}|${row['Mensaje ']?.trim().slice(0, 50)}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  console.log(`   Total: ${rows.length} filas, Únicos: ${unique.length}`)

  let success = 0
  for (const row of unique) {
    const name = row.Nombre?.trim()
    const message = row['Mensaje ']?.trim()
    if (!name || !message) {
      console.log(`   ⚠️  Fila incompleta, saltando...`)
      continue
    }

    try {
      await databases.createDocument(DATABASE_ID, 'wishes', ID.unique(), {
        name,
        message: message.slice(0, 1000),
        visible: true
      })
      success++
      console.log(`   ✅ ${name}`)
    } catch (err: unknown) {
      const e = err as { message?: string }
      console.log(`   ❌ ${name}: ${e.message}`)
    }
  }

  console.log(`\n   Importados: ${success}/${unique.length}`)
}

async function importRsvps() {
  console.log('\n👥 Importando asistencias...\n')

  const wb = XLSX.readFile('Baby.xlsx')
  const ws = wb.Sheets['Asistencia']
  const rows = XLSX.utils.sheet_to_json<{ 'Nombre ': string; Asistentes: number; Fechas: number }>(ws)

  console.log(`   Total: ${rows.length} filas`)

  let success = 0
  for (const row of rows) {
    const name = row['Nombre ']?.trim()
    const guests = row.Asistentes || 1
    if (!name) {
      console.log(`   ⚠️  Fila sin nombre, saltando...`)
      continue
    }

    try {
      await databases.createDocument(DATABASE_ID, 'rsvp', ID.unique(), {
        name,
        guests: Math.min(Math.max(guests, 1), 10)
      })
      success++
      console.log(`   ✅ ${name} (${guests} asistentes)`)
    } catch (err: unknown) {
      const e = err as { message?: string }
      console.log(`   ❌ ${name}: ${e.message}`)
    }
  }

  console.log(`\n   Importados: ${success}/${rows.length}`)
}

async function main() {
  console.log('🚀 Importando datos de Baby.xlsx a Appwrite...')

  await importWishes()
  await importRsvps()

  console.log('\n🎉 ¡Importación completada!')
}

main().catch((err) => {
  console.error('❌ Error:', err)
  process.exit(1)
})
