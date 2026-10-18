import { checkAuhtUser } from "./utils/auth";

const protegerRuta = () => {
  const ruta = window.location.pathname;

  if (ruta.includes("/admin/")) {
    checkAuhtUser(
        "/src/pages/auth/login/login.html",
       "/src/pages/client/home/home.html",
        "admin"
    )
  } else if (ruta.includes("/client/")) {
        checkAuhtUser(
            "/src/pages/auth/login/login.html",
            "/src/pages/admin/home/home.html",
            "client"
        )

//Por qué no hay else final
/*Si la ruta no incluye ninguna de las dos, estás en el login o el registro. Esas páginas tienen que ser accesibles sin sesión, así que ahí no se hace nada. 
Un if/else if sin else es exactamente eso: si no cumple ninguna condición, no pasa nada. */
  }
};

protegerRuta();
