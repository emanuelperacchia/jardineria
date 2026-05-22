# Backend — Jardinería API

Spring Boot 3.2 + JPA + Security + Cloudinary.

## Perfiles

| Perfil | DB | Puerto |
|--------|----|--------|
| `dev` (default) | H2 en memoria | 8080 |
| `prod` | PostgreSQL | 8080 |

## Configuración necesaria

En `application.yml` o variables de entorno:

```yaml
cloudinary:
  cloud-name: tu-cloud
  api-key: tu-key
  api-secret: tu-secret

spring:
  mail:
    host: smtp.tu-servicio.com
    username: tu-email@ejemplo.com
    password: tu-password
```

## Endpoints públicos

- POST `/api/auth/login`
- GET `/api/categories`
- GET `/api/posts/public`
- GET `/api/posts/public/{slug}`
- GET `/api/posts/search?q=...`
- GET `/api/images`
- GET `/api/images/category/{id}`
- POST `/api/contact`

## Endpoints admin (requieren JWT)

- CRUD `/api/admin/categories`
- CRUD `/api/admin/posts`
- POST/DELETE `/api/admin/images`
- GET/PUT `/api/contact/admin`

## Admin por defecto

- Usuario: `admin`
- Contraseña: `admin123`
