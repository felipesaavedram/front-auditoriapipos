import { generarId } from "./funciones.js";


 //Variable Auxiliar
 export let editandoAuxiliar = { 
    value:false}; 
//Nota: al aplicar los módulos las variables que se declaran en forma global JS las reconoce como Const aunque esten declaradas let, por lo que se recomienda convertirlas en un objeto. Renombramos todo en el código tmb donde existiera la variable con .value

//2.Objeto Principal para Almacenar datos usuario

 export const datosUser = {
    id: generarId(),
    nombre: '',
    apellido: '',
    rut: '',
    religion: '',
}
