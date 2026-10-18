import type { IProduct, ICartItem } from "../types/product";

const CART_KEY = "cart";

export const obtenerCarrito = (): ICartItem[] => {
  const guardado = localStorage.getItem(CART_KEY);
  return guardado ? JSON.parse(guardado) : [];
};

const guardarCarrito = (items: ICartItem[]): void => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const agregarAlCarrito = (producto: IProduct): void => {
  const items = obtenerCarrito();
  const existente = items.find((item) => item.producto.id === producto.id);

  if (existente) {
    existente.cantidad = existente.cantidad + 1;
  } else {
    items.push({ producto: producto, cantidad: 1 });
  }

  guardarCarrito(items);
};

export const restarDelCarrito = (idProducto: number): void => {
  const items = obtenerCarrito();
  const existente = items.find((item) => item.producto.id === idProducto);

  if (!existente) {
    return;
  }

  if (existente.cantidad > 1) {
    existente.cantidad = existente.cantidad - 1;
    guardarCarrito(items);
  } else {
    quitarDelCarrito(idProducto);
  }
};

export const quitarDelCarrito = (idProducto: number): void => {
  const items = obtenerCarrito();
  const restantes = items.filter((item) => item.producto.id !== idProducto);
  guardarCarrito(restantes);
};

export const calcularTotal = (): number => {
  const items = obtenerCarrito();
  return items.reduce(
    (total, item) => total + item.producto.precio * item.cantidad,
    0
  );
};
