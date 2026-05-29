# Jardinería — Emanuel Peracchia

![CI](https://github.com/emanuelperacchia/jardineria/actions/workflows/ci.yml/badge.svg)
![CD](https://github.com/emanuelperacchia/jardineria/actions/workflows/cd.yml/badge.svg)

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
| `/admin/login` | Login (Usuario: `admin` / Contraseña: Generada dinámicamente en consola al iniciar o configurable vía variable de entorno) |
| `/admin` | Dashboard |
| `/admin/categorias` | ABM categorías |
| `/admin/posts` | ABM artículos |
| `/admin/galeria` | Subir imágenes a Cloudinary |
| `/admin/mensajes` | Bandeja de mensajes |

## API

Todas las rutas públicas (GET y POST de contacto) no requieren autenticación. Las rutas de admin requieren token JWT con rol `ROLE_ADMIN`.

| Método | Ruta | Auth |
|--------|------|------|
| POST | `/api/auth/login` | No |
| GET | `/api/categories` | No |
| GET | `/api/posts/public` | No |
| GET | `/api/images` | No |
| POST | `/api/contact` | No |
| GET | `/api/admin/contact` | JWT (Admin) |
| PUT | `/api/admin/contact/{id}/read` | JWT (Admin) |
| PUT/POST/DELETE | `/api/admin/*` | JWT (Admin) |

## Despliegue

- **Backend**: Railway (perfil `prod` usa PostgreSQL)
- **Frontend**: Vercel
- **Imágenes**: Cloudinary
- **CI/CD**: GitHub Actions (tests + deploy automático)

## GitHub Actions

Este repositorio utiliza dos workflows:

1. **CI** (`.github/workflows/ci.yml`):
   - Ejecuta en cada PR y push a `main`
   - Corre tests del backend (`mvn test`)
   - Build del frontend (`pnpm install && pnpm build`)
   - **No requiere secrets**

2. **CD** (`.github/workflows/cd.yml`):
   - Ejecuta en push a `main` (solo si CI pasa)
   - Deploya backend a Railway vía `railway up`
   - Deploya frontend a Vercel
   - **Requiere secrets configurados**:
     - `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
     - `RAILWAY_TOKEN`, `RAILWAY_SERVICE_ID`

## Contacto

- WhatsApp: [+54 353 4132355](https://wa.me/543534132355)
- Tel: 353-4132355
- Ubicación: Córdoba, Argentina
