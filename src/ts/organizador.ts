// Importamos los componentes
import '../components/header';
import '../components/footer';
// Importamos la libreria
import Swal from 'sweetalert2';
// Importamos los utils
import { obtenerSorteo, guardarSorteo } from '../utils/sorteoUtil';
import { animarProgress } from '../utils/progressUtil';

// Funciones
function cargarOrganizador(input: HTMLInputElement, checkbox: HTMLInputElement): void {
  // Obtenemos el sorteo
  const sorteo = obtenerSorteo();

  // Si no null
  if (sorteo !== null) {
    // Obtenemos la informacion sobre el organizador (si esta ya existe)
    const nombreOrganizador: string = sorteo.organizador;
    // Ponemos en el input esta informacion
    input.value = nombreOrganizador;

    // Obtenemos si el organizador participa
    const participa: boolean = sorteo.organizadorParticipa;
    // Lo asignamos
    checkbox.checked = participa;

  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Obtenemos los elementos
  const input = document.getElementById('nombreOrganizador') as HTMLInputElement;
  const boton = document.getElementById('botonPasarOrganizador') as HTMLButtonElement;
  const checkbox = document.getElementById('incluirOrganizador') as HTMLInputElement;
  const progress = document.getElementById('progress') as HTMLProgressElement;

  // Cargamos el progress
  animarProgress(progress, 17);

  // Ejecutamos nuestra funcion
  cargarOrganizador(input, checkbox);

  // Definimos la funcion que se ejecutara al momento de hacer click
  const manejarClick = (): void => {

    // Obtenemos el valor insertado del input
    const nombreOrganizador = input.value.trim();
    // Verificamos si el organizador participa o no
    const participa = checkbox.checked;

    // Verificamos si no se ingreso informacion
    if (nombreOrganizador === '') {
      // Mandamos mensaje de error
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El intercambio debe de tener un organizador",
      }).catch(() => { });
    }
    else {
      // Obtenemos el sorteo
      const sorteo = obtenerSorteo();

      // Si no es null
      if (sorteo !== null) {
        // Le asignamos el organizador al sorteo
        sorteo.organizador = nombreOrganizador;
        // Asignamos si el organizador participa o no
        sorteo.organizadorParticipa = participa;

        // Lo guardamos
        guardarSorteo(sorteo);
      }

      // Redireccionamos a la siguiente pagina
      window.location.href = window.location.origin + '/src/pages/participantes.html';
    }
  };

  // Definimos la funcion para cuando se le de enter al input
  const manejarEnter = (event: KeyboardEvent): void => {
    // Si la tecla la que se presiono fue el enter
    if (event.key === 'Enter') {
      // Le quitamos el comportamiento default
      event.preventDefault();
      // Es como si le hicieramos click al boton
      boton.click();
    }
  };

  // Creamos el listener para el boton
  boton.addEventListener('click', manejarClick);
  // Creamos el listener para el input
  input.addEventListener('keydown', manejarEnter);

});
