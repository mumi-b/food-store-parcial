import type { IUser } from "../../../types/IUser";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();
    const valueEmail = inputEmail.value;
    const valuePassword = inputPassword.value;

    const user1: IUser = { 
    /* IUser     ← el MOLDE (la interfaz). Describe cómo tiene que ser.
       user1      ← la COSA concreta. Un usuario de verdad, con datos adentro.*/
    role: "client", 
    loggedIn: false, 
    email: valueEmail, 
    password: valuePassword
    };

    const usersGuardados = localStorage.getItem("users"); 
/*Es una foto de un array, no el array. Y puede ser null, si nunca nadie se registró.  */
    const users: IUser[] = usersGuardados ? JSON.parse(usersGuardados) : [];
/* es un if comprimido, seria...condición  ?  esto si es verdad  :  esto si es mentira, porq si es null, necesito lista vacia, no q explote*/
/*JSON.parse agarra ese texto y lo desarma en un array real*/
    
    const emailRepetidos = users.some((u) => u.email === valueEmail); 
    /*users el array, u el de cada vuelta, .email el campo, valueEmail lo que escribieron, y === la comparación estricta.*/
    /*Esa línea te da un true o un false. Falta usarlo:*/


    if (emailRepetidos) {
    alert("Ese email ya está registrado");
    return;
    }
    
    users.push(user1);

    localStorage.setItem("users", JSON.stringify(users));
/*JSON.stringify hace lo contrario de parse: convierte el array en texto para poder guardarlo. */

    navigate("/src/pages/auth/login/login.html");
});

