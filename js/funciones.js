import Notificacion from "./Clases/Notificacion.js";
import AdminUser from "./Clases/AdminUser.js";
import { datosUser, editandoAuxiliar } from "./variables.js";
import { formulario, formularioInput, nombreInput, apellidoInput, rutInput, religionInput } from "./selectores.js";


//5.1 Instancia
const registro = new AdminUser();
//Nota: se debe instanciar luego de crear la Clase.//


//3.Funciones

//Función que detecta lo que escribe el usuario en los diferentes campos del formulario.
export function capturarDatos(e) {
    datosUser[e.target.name] = e.target.value;
    //Nota: Accedemos al Objeto, y atravez del "nombre" del campo que esta llenando el usuario, le pasamos el valor al a clave del Objeto. 
}

//Función simple para validar formato de RUT chileno
export function validarRut(rut) {
    const rutSinPuntos = rut.replace(/\./g, '').toUpperCase();
    const regex = /^[0-9]{7,8}-[0-9K]$/;
    return regex.test(rutSinPuntos);
}

//Función para validar los campos
export function validarCampos(e) {
    e.preventDefault();

    const { nombre, apellido, rut, religion } = datosUser //Destructuring

    // Object.value revisa los valores del Objeto = datosUser, el método "some" verifica si al menos un valor del objeto cumple la condición planteada a continuación: valor.trim() ==="" no sea una cadena vacia y con espacios.
    if (Object.values(datosUser).some(valor => valor.trim() === "")) {

        //Intancia de un Objeto a la clase notificación 
        const notificacion = new Notificacion({
            tipo: "error",
            texto: "Todos los campos son obligatorios"
        })
        return;
    }

    else if (!isNaN(nombre) || !isNaN(apellido) || !isNaN(religion)) {
        const notificacion = new Notificacion({
            tipo: "error",
            texto: "Nombre, Apellido y Religión deben ser textos válidos"
        })
        return;
    }

    else if (!validarRut(rut)) {
        const notificacion = new Notificacion({
            tipo: "error",
            texto: "Formato de RUT inválido. Ej: 12345678-5"
        })
        return;
    }
    const notificacion = new Notificacion({
        tipo: "correcto",
        texto: "Usuario Registrado"
    })

    //Condicional q verifica si editamos o registramos

    if (editandoAuxiliar.value) {//Registro Editado
        registro.editarRegistro({ ...datosUser }); // LLamamos al Método editarCita
        registro.mostrarRegistro();
        const notificacion = new Notificacion({
            tipo: "correcto",
            texto: "Guardado Correctamente"

        })


    } else { //Registro nuevo
        //Llamada al Métdo agregarCita
        registro.agregarRegistro({ ...datosUser }); //COPIA DEL OBJETO 
        registro.mostrarRegistro();
        generarId(); //Volvemos a generar un Id nuevo para la proxima cita a ingresar

    }

    formulario.reset(); // Reinicia el formulario una vez ingresado el paciente correctamente.
    reiniciarAdminUser(); // Reinicia el Objeto una vez mostrada la cita correctamente.
    formularioInput.value = "Registrar Usuario" //Reiniciamos el texto del btn una vez editada la cita
    editandoAuxiliar.value = false // Reinciamos la variable auxiliar para que nos permita volver a registrar nuevas citas
}



//Función Reinicia el Objeto
export function reiniciarAdminUser() {
    datosUser.id = generarId(); // una vez reiniciado el Objeto generamos otro Id diferente.
    datosUser.nombre = "";
    datosUser.apellido = "";
    datosUser.rut = "";
    datosUser.religion = "";

}

//Función que identifica la ficha a Editar
export function fichaEditar(registro) {
    Object.assign(datosUser, registro)

    nombreInput.value = registro.nombre
    apellidoInput.value = registro.apellido
    rutInput.value = registro.rut
    religionInput.value = registro.religion


    editandoAuxiliar.value = true;  //La convertimos en true al editar
    formularioInput.value = "Guardar"
}

//Función que genera ID únicos
export function generarId() {
    return Math.random().toString(36).substring(2) + Date.now();
}