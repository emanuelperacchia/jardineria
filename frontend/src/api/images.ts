import api from './client'
import type { GalleryImage } from '../types'

export async function getImages(): Promise<GalleryImage[]> {
  const { data } = await api.get<GalleryImage[]>('/images')
  return data
}

export async function getImagesByCategory(categoryId: number): Promise<GalleryImage[]> {
  const { data } = await api.get<GalleryImage[]>(`/images/category/${categoryId}`)
  return data
}

export async function uploadImage(
  file: File,
  title: string,
  categoryId: number,
  description?: string,
  displayOrder?: number,
): Promise<GalleryImage> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('title', title)
  formData.append('categoryId', categoryId.toString())
  if (description) formData.append('description', description)
  if (displayOrder !== undefined) formData.append('displayOrder', displayOrder.toString())

  const { data } = await api.post<GalleryImage>('/images/admin/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export async function deleteImage(id: number): Promise<void> {
  await api.delete(`/images/admin/${id}`)
}
