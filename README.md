# POS Nest Frontend

[![Next.js](https://img.shields.io/badge/Next.js_16-000000?logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React_19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Zod](https://img.shields.io/badge/Zod-3E67B1?logo=zod&logoColor=white)](https://zod.dev)
[![Zustand](https://img.shields.io/badge/Zustand-433E38?logo=react&logoColor=white)](https://zustand-demo.pmnd.rs)
[![React Query](https://img.shields.io/badge/React_Query-FF4154?logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![Recharts](https://img.shields.io/badge/Recharts-22B5BF?logo=chart.js&logoColor=white)](https://recharts.org)

Interfaz web para un sistema de punto de venta (POS). Consume la API REST del backend NestJS e implementa CRUD completo para productos, categorías y cupones, carrito de compras, gestión de ventas, sistema de cupones y un dashboard de analíticas con gráficas interactivas.

## ✨ Características

- **CRUD de productos** — crear, editar, eliminar con formularios validados y subida de imágenes a Cloudinary vía dropzone.
- **CRUD de categorías** — crear, editar, eliminar con tabla responsiva y modal de confirmación.
- **Carrito de compras** — agregar productos, ajustar cantidades, aplicar cupones de descuento.
- **Registro de ventas** — procesar órdenes con descuento de inventario automático.
- **Historial de ventas** — listado con filtro por fecha (calendario interactivo) y detalle completo.
- **CRUD de cupones** — crear, editar y activar/desactivar cupones desde el panel admin con tabla responsiva y badges de estado (Activo, Expirado, Deshabilitado).
- **Dashboard de analíticas** — gráficas interactivas con ventas diarias (área + barras), productos más vendidos (barras horizontales), uso de cupones (donut), tarjetas de resumen y mejor día de ventas.
- **Control de disponibilidad** — badge de "Agotado" en tabla de productos y tarjeta de tienda; botón de agregar al carrito deshabilitado cuando inventario = 0.
- **Tienda pública** — catálogo de productos filtrable por categoría con paginación.
- **Diseño responsivo** — mobile-first con vistas optimizadas para escritorio y móvil.
- **Paleta personalizada** — colores `cielo`, `apple` y `milano` consistentes en toda la UI.
- **Validación client + server** — schemas Zod compartidos, Server Actions con `useActionState`.
- **Notificaciones** — feedback visual con Sonner (toasts) en todas las operaciones.
- **Estado global** — Zustand para el carrito de compras.

## 🧱 Stack

- Next.js 16 (App Router, Server Actions, Server Components)
- React 19
- TypeScript
- Tailwind CSS 4
- Zod (validación de schemas)
- Zustand (estado global del carrito)
- React Query / TanStack Query
- Recharts (gráficas interactivas del dashboard)
- Sonner (notificaciones toast)
- react-dropzone (subida de imágenes)
- react-calendar (filtro de ventas por fecha)
- date-fns (formateo de fechas)

## 📁 Estructura principal

```
frontend/
├── actions/              # Server Actions (CRUD de productos, categorías, cupones, ventas)
├── app/
│   ├── (store)/          # Tienda pública (catálogo + carrito)
│   ├── admin/
│   │   ├── products/     # CRUD de productos (list, new, edit)
│   │   ├── categories/   # CRUD de categorías (list, new, edit)
│   │   ├── sales/        # Historial de ventas con filtro por fecha
│   │   ├── coupons/      # CRUD de cupones (list, new, edit, toggle activo)
│   │   └── dashboard/    # Dashboard de analíticas con gráficas
│   └── coupons/          # API route para validación de cupones
├── components/
│   ├── cart/             # Carrito de compras (items, cupón, submit)
│   ├── categories/       # Tabla, formularios y delete de categorías
│   ├── coupons/          # Tabla, formularios y toggle de cupones
│   ├── dashboard/        # Gráficas y tarjetas de analíticas
│   ├── products/         # Tabla, formularios, dropzone y delete de productos
│   ├── transactions/     # Resumen y filtro de transacciones
│   └── ui/               # Componentes compartidos (nav, heading, logo, paginación)
├── src/
│   ├── api.ts            # Funciones de fetch
│   ├── schemas.ts        # Schemas Zod (validación + tipos)
│   └── store.ts          # Store Zustand (carrito)
└── utils/                # Helpers (formatPrice, getImagePath)
```

## ⚙️ Configuración

1) Instalar dependencias

```bash
npm install
```

2) Variables de entorno

Crea un archivo `.env.local` en la raíz del frontend con:

```bash
API_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_DOMIAN=http://localhost:3001
```

> `API_URL` se usa en Server Components/Actions. `NEXT_PUBLIC_API_URL` en componentes client.

3) Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:3001` (o el puerto que Next.js asigne).

## 🧪 Scripts

| Script | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con hot reload |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | Linting con ESLint |

## 🎨 Paleta de colores

El proyecto usa tres colores personalizados definidos en `tailwind.config.ts`:

| Color | Uso principal | Ejemplo |
|---|---|---|
| **cielo** (azul) | Fondos, bordes, textos neutros, navegación | Backgrounds, inputs, labels |
| **apple** (verde) | Acciones positivas, éxito, CTAs | Botones crear/editar, badges |
| **milano** (rojo) | Errores, eliminación, alertas | Validaciones, botones eliminar |

## 📱 Rutas principales

| Ruta | Descripción |
|---|---|
| `/` | Tienda pública — catálogo con carrito |
| `/[categoryId]` | Productos filtrados por categoría |
| `/admin/products` | Listado de productos (admin) |
| `/admin/products/new` | Crear producto |
| `/admin/products/[id]/edit` | Editar producto |
| `/admin/categories` | Listado de categorías (admin) |
| `/admin/categories/new` | Crear categoría |
| `/admin/categories/[id]/edit` | Editar categoría |
| `/admin/sales` | Historial de ventas con filtro por fecha |
| `/admin/coupons` | Listado de cupones (admin) |
| `/admin/coupons/new` | Crear cupón |
| `/admin/coupons/[id]/edit` | Editar cupón |
| `/admin/dashboard` | Dashboard de analíticas con gráficas interactivas |

## 🖼️ Imágenes

- Las imágenes se suben a **Cloudinary** mediante un dropzone en el formulario de productos.
- La función `getImagePath()` en `utils/index.ts` detecta automáticamente si la imagen es de Cloudinary (URL completa) o local (nombre de archivo) y construye la ruta correcta.
- El dominio `res.cloudinary.com` está registrado en `next.config.ts` como `remotePattern` para la optimización de imágenes en producción.

## � Dashboard de Analíticas

Accesible desde `/admin/dashboard`, presenta las métricas de los últimos 30 días:

| Sección | Descripción | Tipo de gráfica |
|---|---|---|
| **Tarjetas resumen** | Ingresos totales, total de ventas, productos vendidos, ticket promedio | KPI cards |
| **Mejor día + descuentos** | Día con mayor facturación y total de descuentos otorgados | Highlight cards |
| **Ventas diarias** | Ingresos por día (tendencia) | Area chart |
| **Transacciones diarias** | Cantidad de transacciones por día | Bar chart |
| **Productos más vendidos** | Top 8 por cantidad vendida con revenue | Horizontal bar chart |
| **Uso de cupones** | Distribución de uso y descuento por cupón | Donut chart + tabla |

Los datos se obtienen del endpoint `GET /transactions/analytics` del backend y se cachean con React Query.

## 🗺️ Próximos pasos (ideas)

- Autenticación y protección de rutas admin.
- Búsqueda de productos en tiempo real.
- Modo oscuro.
- PWA para uso en tablets/móviles como caja registradora.
- Exportación de reportes a CSV/PDF.
- Filtro de rango de fechas en el dashboard.

---

Proyecto de práctica personal — frontend del sistema POS con enfoque en Server Components, Server Actions y UI consistente.

## 👨‍💻 Autor

Errold Núñez Sánchez

## ✉️ Contacto

[![GitHub](https://img.shields.io/badge/GitHub-Errold146-181717?logo=github)](https://github.com/Errold146)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ErroldNúñezS-0A66C2?logo=linkedin)](https://linkedin.com/in/errold-núñez-sánchez)
[![Email](https://img.shields.io/badge/Email-ErroldNúñezS-D14836?logo=gmail)](mailto:errold222@gmail.com)
