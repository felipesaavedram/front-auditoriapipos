import { areaRegistro } from "../selectores.js";
import { fichaEditar } from "../funciones.js";
import Notificacion from "./Notificacion.js";

 export default class AdminUser{

    constructor(){
        this.registro =[];
    }

    //Método para agregar los Registros
    agregarRegistro(registro){
        this.registro = [...this.registro, registro ];
    }

    editarRegistro (registroActualizado){
        this.registro = this.registro.map (registro => registro.id === registroActualizado.id ? registroActualizado : registro) 
        //mapeamos el arreglo y confirmamos los id , en caso de que concidan muestrame en registro el registo actulizado, sino muestrame registro.  
    }

     eliminarRegistro(id){
        this.registro = this.registro.filter (registro => registro.id !== id);
        this.mostrarRegistro();
        const notificacion = new Notificacion({
            tipo: "correcto",
            texto: "Usuario Eliminado"
        })

    }

    //Método para mostrar las Registros
    mostrarRegistro() {

        //Limpiar HTML
        while (areaRegistro.firstChild) {
            areaRegistro.removeChild(areaRegistro.firstChild)
        }

        //Reinciamos el contenedor de los registros
        if(this.registro.length === 0){
            areaRegistro.innerHTML = `<p class="text-xl mt-5 mb-10 text-center">No Hay Usuarios</p>`
            return;
        }


        //Construyendo el HTML para mostrar la cita

        //Utilizamos forEach para que acceda a cada Objeto (cita agendada) dentro de la colección (Array cita) y construya con esos datos el card donde serán mostrados.

        this.registro.forEach(registro => {

            //Contenedor Registro
            const divRegistro = document.createElement('DIV');
            divRegistro.classList.add('mx-5', 'my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10', 'rounded-xl');

            //Datos del Registro
            const nombre = document.createElement('P');
            nombre.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            nombre.innerHTML = `<span class= "font-bold uppercase">Nombre: </span> ${registro.nombre}`
            divRegistro.appendChild(nombre);

            const apellido = document.createElement('P');
            apellido.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            apellido.innerHTML = `<span class="font-bold uppercase">Apellido: </span> ${registro.apellido}`;
            divRegistro.appendChild(apellido);

            const rut = document.createElement('P');
            rut.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            rut.innerHTML = `<span class="font-bold uppercase">Rut: </span> ${registro.rut}`;
            divRegistro.appendChild(rut);

            const religion = document.createElement('P');
            religion.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            religion.innerHTML = `<span class="font-bold uppercase">Religion: </span> ${registro.religion}`;
            divRegistro.appendChild(religion);

        
            //Botones Editar y Eliminar
            //Contenedor Botones
            const divBtn = document.createElement('DIV');
            divBtn.classList.add('flex', 'justify-between', 'mt-10')

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
            divBtn.appendChild(btnEditar);

            //Event Handlers
            const copiaObjeto = { ...registro } //Se crea una copia del objeto ya que forEach solamente itera y no se comunica con la función (fichaEditar) 
            btnEditar.onclick = () => fichaEditar(copiaObjeto)


            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
            divBtn.appendChild(btnEliminar);
            btnEliminar.onclick = () => this.eliminarRegistro(registro.id);



            // Agregar al HTML    
            divRegistro.appendChild(divBtn)
            areaRegistro.appendChild(divRegistro);
        });

    }
}