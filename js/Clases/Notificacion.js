import { formulario } from "../selectores.js"; 


//5.Clases

//Clase Notificación

export default class Notificacion {

    //Objeto Constructor
    constructor({tipo, texto}) {
        this.tipo = tipo,
        this.texto = texto,
        this.mostrarAlerta() //Llamamos el Método una vez que el Objeto Constructor recibe los datos desde la funcion validarCampos.
    }


    //Construcción para mostrar la alerta en el HTML
    mostrarAlerta() {

        //Crear el contenedor de la Alerta y sus clases
        const alerta = document.createElement('DIV');
        alerta.classList.add('text-center', 'w-full', 'p-3', 'text-white', 'my-5', 'alert', 'uppercase', 'font-bold', 'text-sm')

        //Evitar duplicados de alertas
        const alertaPrevia = document.querySelector('.alert') //Seleccionamos en el DOM

        if(alertaPrevia){
            alertaPrevia.remove();
        }

        //Nueva forma: alertaPrevia?.remove();

        //Condicional para el tipo de alerta
        if (this.tipo === 'error') {
            alerta.classList.add('bg-red-500')
        }
        else{
            alerta.classList.add('bg-green-500')
        }
            
        //Contenido del texto
        alerta.textContent = this.texto;

        //Inyectamos HTML
        formulario.parentElement.insertBefore(alerta, formulario) //Se requiere importarlo
        

        setTimeout(() => {
            alerta.remove();
        }, 2000);
    }

}
