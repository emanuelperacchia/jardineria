import api from './client'
import type { Category } from '../types'

export async function getCategories(): Promise<Category[]> {
  const { data } = await api.get<Category[]>('/categories')
  return data
}

export async function getCategory(id: number): Promise<Category> {
  const { data } = await api.get<Category>(`/categories/${id}`)
  return data
}

export async function createCategory(cat: Partial<Category>): Promise<Category> {
  const { data } = await api.post<Category>('/categories/admin', cat)
  return data
}

export async function updateCategory(id: number, cat: Partial<Category>): Promise<Category> {
  const { data } = await api.put<Category>(`/categories/admin/${id}`, cat)
  return data
}

export async function deleteCategory(id: number): Promise<void> {
  await api.delete(`/categories/admin/${id}`)
}
