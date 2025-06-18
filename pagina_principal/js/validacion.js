//Referencias a los elementos del formulario
const Nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const contraseña = document.getElementById("contraseña");
const rol = document.getElementById("rol");

//Referencias a los elementos que muestran errores
const errorNombre = document.getElementById("error-nombre");
const errorcorreo = document.getElementById("error-correo");
const errorcontraseña = document.getElementById("error-contraseña");
const errorrol = document.getElementById("error-rol");

//Validacion del campo nombre
Nombre.addEventListener("input", () => {
    //Si el nombre tiene menos de 3 caracteres,  muestra el error
    if (Nombre.ariaValueMax.trim().length < 3) {
        errorNombre.textContent = "El nombre debe tener almenos 3 caracteres.";
    } else {
        //Si es valido se borra el mensaje
        errorNombre.textContent = "";
    }
});

//Validacion del campo correo
correo.addEventListener("input", () =>{
    //Validar correos electronicos
    const regexcorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexcorreo.test(correo.value)) {
        //Si el correo no cumple con el formato muestra el mensaje de error
        errorcorreo.textContent = "Ingrese un correo valido"
    } else {
        //Si es valido se borra le mensaje
        errorcorreo.textContent = "";
    }
});

//Validacion del campo contraseña
contraseña.addEventListener("input", () => {
    //Si la contraseña tiene menos de 3 caracteres, se muestra un error
    if (contraseña.value.length < 3) {
        errorcontraseña.textContent = "La contraseña debe tener almenos 3 caracteres."
    } else {
        //si es valido se borra el mensaje de error
        errorcontraseña.textContent = ""
    }
});

//Validacion final al intentar enviar el formulario
document.getElementById("Formulario").addEventListener("submit", (e) => {
    //si alguno de los campos es invalido, se detiene el envio y se muestra un aviso
    if (
        Nombre.value.trim().length < 3 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value) ||
        contraseña.value.length < 3 
    ) {
        e.preventDefault();
        alert("Corrige los errores antes de enviar el formulario.")
    }
});

