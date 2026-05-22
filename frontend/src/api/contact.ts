import api from './client'
import type { ContactForm } from '../types'

export async function sendContact(form: ContactForm): Promise<void> {
  await api.post('/contact', form)
}
