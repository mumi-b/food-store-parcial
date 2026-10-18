import { logout } from "../../../utils/auth";
import {
  obtenerCarrito,
  agregarAlCarrito,
  restarDelCarrito,
  quitarDelCarrito,
  calcularTotal,
} from "../../../utils/cart";

const buttonLogout = document.getElementById(
  "logoutButton"
) as HTMLButtonElement;
buttonLogout?.addEventListener("click", () => {
  logout();
});

const contenedorCarrito = document.getElementById(
  "contenedor-carrito"
) as HTMLDivElement;

const totalCarrito = document.getElementById(
  "total-carrito"
) as HTMLParagraphElement;

function renderCarrito() {
  const items = obtenerCarrito();
  contenedorCarrito.innerHTML = "";

  if (items.length === 0) {
    contenedorCarrito.innerHTML = "<p>Tu carrito está vacío.</p>";
    totalCarrito.textContent = "Total: $0";
    return;
  }

  items.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item-carrito";
    itemDiv.innerHTML = `
      <h3>${item.producto.nombre}</h3>
      <p>Precio: $${item.producto.precio}</p>
      <p>Cantidad: ${item.cantidad}</p>
      <p>Subtotal: $${item.producto.precio * item.cantidad}</p>
      <button class="restar">-</button>
      <button class="sumar">+</button>
      <button class="quitar">Quitar</button>
    `;

    const botonRestar = itemDiv.querySelector(".restar") as HTMLButtonElement;
    botonRestar.addEventListener("click", () => {
      restarDelCarrito(item.producto.id);
      renderCarrito();
    });

    const botonSumar = itemDiv.querySelector(".sumar") as HTMLButtonElement;
    botonSumar.addEventListener("click", () => {
      agregarAlCarrito(item.producto);
      renderCarrito();
    });

    const botonQuitar = itemDiv.querySelector(".quitar") as HTMLButtonElement;
    botonQuitar.addEventListener("click", () => {
      quitarDelCarrito(item.producto.id);
      renderCarrito();
    });

    contenedorCarrito.appendChild(itemDiv);
  });

  totalCarrito.textContent = `Total: $${calcularTotal()}`;
}

renderCarrito();
