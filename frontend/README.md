# Frontend — Jardinería

React 18 + TypeScript + Vite + Tailwind CSS.

## Scripts

```bash
pnpm dev        # desarrollo (:5173)
pnpm build      # producción
pnpm preview    # preview de build
```

## Estructura

```
src/
├── admin/       # Panel de administración (login, dashboard, CRUDs)
├── api/         # Cliente Axios + endpoints
├── components/  # Header, Footer, SEO, WhatsApp FAB
├── contexts/    # AuthContext
├── pages/       # Home, Services, Gallery, Blog, Contact
└── types/       # TypeScript interfaces
```

## Variables de entorno

```env
VITE_API_URL=http://localhost:8080/api
```

## Notas

- El proxy de Vite redirige `/api/*` a `localhost:8080` en dev
- Para producción, se configura en `vercel.json`
- Iconos: `lucide-react`
