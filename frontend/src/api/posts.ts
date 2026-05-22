import api from './client'
import type { Post } from '../types'

export async function getPublishedPosts(): Promise<Post[]> {
  const { data } = await api.get<Post[]>('/posts')
  return data
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const { data } = await api.get<Post>(`/posts/${slug}`)
  return data
}

export async function getPostsByCategory(categoryId: number): Promise<Post[]> {
  const { data } = await api.get<Post[]>(`/posts/category/${categoryId}`)
  return data
}

export async function searchPosts(query: string): Promise<Post[]> {
  const { data } = await api.get<Post[]>('/posts/search', { params: { q: query } })
  return data
}

export async function createPost(post: Partial<Post>): Promise<Post> {
  const { data } = await api.post<Post>('/posts/admin', post)
  return data
}

export async function updatePost(id: number, post: Partial<Post>): Promise<Post> {
  const { data } = await api.put<Post>(`/posts/admin/${id}`, post)
  return data
}

export async function deletePost(id: number): Promise<void> {
  await api.delete(`/posts/admin/${id}`)
}
