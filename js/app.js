import {nombreInput, apellidoInput, rutInput, religionInput,  formulario} from "./selectores.js";
import { capturarDatos, validarCampos } from "./funciones.js";


/*====================================================================================================================*/

//4.Eventos

nombreInput.addEventListener('change', capturarDatos);
apellidoInput.addEventListener('change', capturarDatos);
rutInput.addEventListener('change', capturarDatos);
religionInput.addEventListener('change', capturarDatos);
formulario.addEventListener('submit', validarCampos); //Evento formulario

