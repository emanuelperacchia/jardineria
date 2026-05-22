export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  displayOrder: number
}

export interface Post {
  id: number
  title: string
  slug: string
  content: string
  excerpt?: string
  coverImageUrl?: string
  coverImagePublicId?: string
  published: boolean
  createdAt: string
  updatedAt?: string
  categoryId?: number
  categoryName?: string
}

export interface GalleryImage {
  id: number
  title: string
  description?: string
  imageUrl: string
  publicId: string
  displayOrder: number
  createdAt: string
  categoryId?: number
  categoryName?: string
}

export interface ContactForm {
  name: string
  email: string
  phone?: string
  message: string
  source: string
}

export interface AuthResponse {
  token: string
  username: string
  role: string
}
