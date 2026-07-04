import { Client, Databases, Storage, ID, Query } from 'appwrite'

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)

const databases = new Databases(client)
const storage = new Storage(client)

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!
const RSVP_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_RSVP_COLLECTION_ID!
const WISHES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_WISHES_COLLECTION_ID!
const GALLERY_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_GALLERY_COLLECTION_ID!
const GALLERY_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_GALLERY_BUCKET_ID!

export interface RsvpEntry {
  name: string
  guests: number
  $id?: string
  $createdAt?: string
}

export interface WishEntry {
  name: string
  message: string
  visible?: boolean
  $id?: string
  $createdAt?: string
}

export async function submitRsvp(data: { name: string; guests: number }) {
  return databases.createDocument(DATABASE_ID, RSVP_COLLECTION_ID, ID.unique(), {
    name: data.name,
    guests: data.guests
  })
}

export async function submitWish(data: { name: string; message: string }) {
  return databases.createDocument(DATABASE_ID, WISHES_COLLECTION_ID, ID.unique(), {
    name: data.name,
    message: data.message,
    visible: true
  })
}

export async function getWishes(): Promise<WishEntry[]> {
  const response = await databases.listDocuments(DATABASE_ID, WISHES_COLLECTION_ID, [
    Query.orderDesc('$createdAt'),
    Query.limit(100)
  ])
  return response.documents as unknown as WishEntry[]
}

export async function getVisibleWishes(): Promise<WishEntry[]> {
  const response = await databases.listDocuments(DATABASE_ID, WISHES_COLLECTION_ID, [
    Query.equal('visible', true),
    Query.orderDesc('$createdAt'),
    Query.limit(100)
  ])
  return response.documents as unknown as WishEntry[]
}

// --- Admin functions ---

export async function getRsvps(): Promise<RsvpEntry[]> {
  const response = await databases.listDocuments(DATABASE_ID, RSVP_COLLECTION_ID, [
    Query.orderDesc('$createdAt'),
    Query.limit(100)
  ])
  return response.documents as unknown as RsvpEntry[]
}

export async function deleteRsvp(id: string) {
  return databases.deleteDocument(DATABASE_ID, RSVP_COLLECTION_ID, id)
}

export async function updateWish(id: string, data: Partial<{ name: string; message: string; visible: boolean }>) {
  return databases.updateDocument(DATABASE_ID, WISHES_COLLECTION_ID, id, data)
}

export async function deleteWish(id: string) {
  return databases.deleteDocument(DATABASE_ID, WISHES_COLLECTION_ID, id)
}

// --- Gallery functions ---

export interface GalleryEntry {
  fileId: string
  alt: string
  order?: number
  visible?: boolean
  $id?: string
  $createdAt?: string
}

export function getGalleryImageUrl(fileId: string): string {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${GALLERY_BUCKET_ID}/files/${fileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`
}

export function getGalleryPreviewUrl(fileId: string, width = 400, height = 400): string {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${GALLERY_BUCKET_ID}/files/${fileId}/preview?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}&width=${width}&height=${height}`
}

export async function uploadGalleryImage(file: File): Promise<string> {
  const result = await storage.createFile(GALLERY_BUCKET_ID, ID.unique(), file)
  return result.$id
}

export async function deleteGalleryFile(fileId: string) {
  return storage.deleteFile(GALLERY_BUCKET_ID, fileId)
}

export async function createGalleryEntry(data: { fileId: string; alt: string; order?: number }) {
  return databases.createDocument(DATABASE_ID, GALLERY_COLLECTION_ID, ID.unique(), {
    fileId: data.fileId,
    alt: data.alt,
    order: data.order ?? 0,
    visible: true
  })
}

export async function getGalleryEntries(): Promise<GalleryEntry[]> {
  const response = await databases.listDocuments(DATABASE_ID, GALLERY_COLLECTION_ID, [
    Query.orderAsc('order'),
    Query.limit(50)
  ])
  return response.documents as unknown as GalleryEntry[]
}

export async function getVisibleGalleryEntries(): Promise<GalleryEntry[]> {
  const response = await databases.listDocuments(DATABASE_ID, GALLERY_COLLECTION_ID, [
    Query.equal('visible', true),
    Query.orderAsc('order'),
    Query.limit(50)
  ])
  return response.documents as unknown as GalleryEntry[]
}

export async function updateGalleryEntry(id: string, data: Partial<{ alt: string; order: number; visible: boolean }>) {
  return databases.updateDocument(DATABASE_ID, GALLERY_COLLECTION_ID, id, data)
}

export async function deleteGalleryEntry(id: string, fileId: string) {
  await databases.deleteDocument(DATABASE_ID, GALLERY_COLLECTION_ID, id)
  try {
    await storage.deleteFile(GALLERY_BUCKET_ID, fileId)
  } catch {
    // file may already be deleted
  }
}
