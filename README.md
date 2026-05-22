# Jardinería — Emanuel Peracchia

Sitio web profesional para servicio de jardinería con panel de administración.

## Stack

### Frontend (`frontend/`)
- React 18 + TypeScript + Vite
- Tailwind CSS
- React Router v6
- Lucide React (iconos)
- Axios
- Cloudinary SDK
- react-dropzone
- react-helmet-async

### Backend (`backend/`)
- Spring Boot 3.2
- Spring Data JPA + H2 (dev) / PostgreSQL (prod)
- Spring Security + JWT
- Cloudinary API
- Spring Mail

## Desarrollo

```bash
# Backend (puerto 8080)
cd backend
mvn spring-boot:run

# Frontend (puerto 5173, proxy a 8080)
cd frontend
pnpm install
pnpm dev
```

## Admin

| Ruta | Descripción |
|------|-------------|
| `/admin/login` | Login (`admin` / `admin123`) |
| `/admin` | Dashboard |
| `/admin/categorias` | ABM categorías |
| `/admin/posts` | ABM artículos |
| `/admin/galeria` | Subir imágenes a Cloudinary |
| `/admin/mensajes` | Bandeja de mensajes |

## API

Todas las rutas públicas (GET) no requieren autenticación. Las rutas de admin requieren token JWT.

| Método | Ruta | Auth |
|--------|------|------|
| POST | `/api/auth/login` | No |
| GET | `/api/categories` | No |
| GET | `/api/posts/public` | No |
| GET | `/api/images` | No |
| POST | `/api/contact` | No |
| PUT/POST/DELETE | `/api/admin/*` | JWT |

## Despliegue

- **Backend**: Railway (perfil `prod` usa PostgreSQL)
- **Frontend**: Vercel
- **Imágenes**: Cloudinary

## Contacto

- WhatsApp: [+54 353 4132355](https://wa.me/543534132355)
- Tel: 353-4132355
- Ubicación: Córdoba, Argentina
