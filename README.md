# Food Store — Parcial 1, Programación III

Catálogo de productos y carrito de compras con persistencia en `localStorage`.
Desarrollado con HTML, CSS, TypeScript y Vite, sin frameworks.

Abril Barco — Tecnicatura Universitaria en Programación, UTN.

## Cómo ejecutarlo

Requiere Node.js y pnpm.

```bash
pnpm install
pnpm dev
```

El servidor queda disponible en http://localhost:5173

Para generar la versión de producción:

```bash
pnpm build
```

## Qué hace

**Catálogo** — Muestra los productos cargados en `src/data/data.ts`.

**Búsqueda** — Filtra por nombre a medida que se escribe. Si no hay
coincidencias, lo informa en pantalla.

**Filtrado por categoría** — Un botón por categoría más uno de "Todos los
productos" para volver al catálogo completo.

**Carrito** — Se agregan productos desde el catálogo. Si el producto ya está,
suma cantidad en lugar de duplicarse. Desde el carrito se puede sumar, restar o
quitar, y el total se recalcula. Todo persiste en `localStorage` bajo la clave
`"cart"`, así que sobrevive a recargar la página.

**Autenticación** — Viene del Trabajo Práctico Integrador: registro, login y
protección de rutas por rol. No se evalúa en esta instancia, pero se mantiene
funcionando. Para ver el catálogo hay que registrarse e iniciar sesión.

## Estructura

```
src/
├── data/
│   └── data.ts           PRODUCTS y getCategories()
├── types/
│   ├── product.ts        IProduct, ICartItem
│   ├── categoria.ts      ICategoria
│   ├── IUser.ts          IUser
│   └── Rol.ts            Rol
├── utils/
│   ├── cart.ts           lógica del carrito sobre localStorage
│   ├── auth.ts           verificación de sesión y rol
│   ├── localStorage.ts   guardado de la sesión activa
│   └── navigate.ts       redirecciones
├── pages/
│   ├── auth/             registro y login
│   ├── admin/            vista de administrador
│   └── client/
│       ├── home/         catálogo, búsqueda y filtros
│       └── cart/         carrito y total
└── main.ts               protección de rutas centralizada
```

Cada archivo tiene una responsabilidad: `types` define las formas, `data`
provee los datos, `utils` la lógica reutilizable y `pages` las vistas.

## Claves de localStorage

| Clave | Contenido |
|---|---|
| `users` | usuarios registrados |
| `userData` | sesión activa |
| `cart` | ítems del carrito |

## Notas

Las imágenes de los productos usan un placeholder genérico en
`public/producto.svg`.

No se implementa checkout ni conexión con backend: el botón "Finalizar compra"
está deshabilitado a propósito.
