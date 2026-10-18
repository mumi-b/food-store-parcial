import { logout } from "../../../utils/auth";
import type { ICategoria } from "../../../types/categoria";
import type { IProduct } from "../../../types/product";
import { getCategories, PRODUCTS } from "../../../data/data";
import { agregarAlCarrito } from "../../../utils/cart";

const buttonLogout = document.getElementById(
  "logoutButton"
) as HTMLButtonElement;
buttonLogout?.addEventListener("click", () => {
  logout();
});

const contenedorCategorias = document.getElementById(
  "contenedor-categorias"
) as HTMLDivElement;

const contenedorProductos = document.getElementById(
  "contenedor-productos"
) as HTMLDivElement;

const searchInput = document.getElementById(
  "searchInput"
) as HTMLInputElement;

function renderCategorias(categorias: ICategoria[]) {
  contenedorCategorias.innerHTML = "";

  const todasDiv = document.createElement("div");
  todasDiv.className = "categoria";
  todasDiv.textContent = "Todos los productos";
  todasDiv.addEventListener("click", () => {
    renderProductos(PRODUCTS);
  });
  contenedorCategorias.appendChild(todasDiv);

  categorias.forEach((categoria) => {
    const categoriaDiv = document.createElement("div");
    categoriaDiv.className = "categoria";
    categoriaDiv.textContent = categoria.nombre;
    categoriaDiv.addEventListener("click", () => {
      const productosFiltrados = PRODUCTS.filter((producto) =>
        producto.categorias.some((cat) => cat.id === categoria.id)
      );
      renderProductos(productosFiltrados);
    });
    contenedorCategorias.appendChild(categoriaDiv);
  });
}

function renderProductos(productos: IProduct[]) {
  contenedorProductos.innerHTML = "";

  if (productos.length === 0) {
    contenedorProductos.innerHTML = "<p>No se encontraron productos.</p>";
    return;
  }

  productos.forEach((producto) => {
    const sinStock = producto.stock === 0 || !producto.disponible;

    const productoDiv = document.createElement("div");
    productoDiv.className = sinStock ? "producto agotado" : "producto";
    productoDiv.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <p>Precio: $${producto.precio}</p>
      <p class="stock">${sinStock ? "Sin stock" : `Stock: ${producto.stock}`}</p>
      <img src="/${producto.imagen}" alt="${producto.nombre}" />
      <button class="agregar" data-id="${producto.id}" ${sinStock ? "disabled" : ""}>${sinStock ? "Sin stock" : "Agregar al carrito"}</button>
    `;

    if (!sinStock) {
      const botonAgregar = productoDiv.querySelector(
        ".agregar"
      ) as HTMLButtonElement;
      botonAgregar.addEventListener("click", () => {
        agregarAlCarrito(producto);
        botonAgregar.textContent = "Agregado";
        setTimeout(() => {
          botonAgregar.textContent = "Agregar al carrito";
        }, 1000);
      });
    }

    contenedorProductos.appendChild(productoDiv);
  });
}

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const productosFiltrados = PRODUCTS.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTerm)
  );
  renderProductos(productosFiltrados);
});

renderCategorias(getCategories());
renderProductos(PRODUCTS);
