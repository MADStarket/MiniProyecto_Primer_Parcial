// Importamos los componentes
import '../components/header';
import '../components/footer';
// Importamos la libreria
import Swal from 'sweetalert2';
// Importamos los utils
import { obtenerSorteo, guardarSorteo } from '../utils/sorteoUtil';

// Funciones
function cargarOrganizador(input: HTMLInputElement): void {
  // Obtenemos el sorteo
  let sorteo = obtenerSorteo();

  // Si no null
  if (sorteo !== null) {
    // Obtenemos la informacion sobre el organizador (si esta ya existe)
    const nombreOrganizador = sorteo?.organizador;
    // Ponemos en el input esta informacion
    input.value = nombreOrganizador
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Obtenemos los elementos
  const input = document.getElementById('nombreOrganizador') as HTMLInputElement;
  const boton = document.getElementById('botonPasarOrganizador') as HTMLButtonElement;
  const checkbox = document.getElementById('incluirOrganizador') as HTMLInputElement;

  // Verificamos que los elementos existan
  if (!input || !boton || !checkbox) {
    console.log('Elementos no encontrados');
    return;
  }

  // Ejecutamos nuestra funcion
  cargarOrganizador(input);

  // Definimos la funcion que se ejecutara al momento de hacer click
  const manejarClick = () => {

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
      });
    }
    else {
      // Obtenemos el sorteo
      let sorteo = obtenerSorteo();

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

  // Creamos el listener para el boton
  boton.addEventListener('click', manejarClick);

});
