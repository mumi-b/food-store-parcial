import type { IUser } from "../../../types/IUser";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  const valueEmail = inputEmail.value;
  const valuePassword = inputPassword.value;

  const usersGuardados = localStorage.getItem("users"); 
  const users: IUser[] = usersGuardados ? JSON.parse(usersGuardados) : [];

  const loginSuccesful= users.find((u) => u.email === valueEmail && u.password === valuePassword); 
  if (!loginSuccesful) {
    alert("Email o contraseña erroneos. Por favor, ingrese correctamente su email y contraseña.");
    return;
}
  

const userTexto = JSON.stringify(loginSuccesful);
localStorage.setItem("userData", userTexto);

if (loginSuccesful.role === "admin") {
  navigate("/src/pages/admin/home/home.html");
  } else {
  navigate("/src/pages/client/home/home.html");
  }
});
