// Importamos los componentes
import '../components/header';
import '../components/footer';
// Importamos las clases
import { Participante } from '../model/Participante';
// Importamos la libreria
import Swal from 'sweetalert2';
// Importamos los utils
import { obtenerSorteo, guardarSorteo } from '../utils/sorteoUtil';

function agregarParticipante(participante: Participante, contenedorNombres: HTMLDivElement): void {
  // Creamos el div para la tarjeta
  const divParticipante = document.createElement('div');

  // Agregamos el participante
  divParticipante.innerHTML = `
  <p>${participante.nombre}</p>
    <a class="cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </a>
  `;

  // Le agregamos la clase al tag
  divParticipante.classList.add('tarjeta');
  // Le agregamos su id
  divParticipante.id = participante.nombre;

  // Lo agregamos al div
  contenedorNombres.appendChild(divParticipante);

  // Obtenemos la etiqueta <a>
  const botonEliminar = divParticipante.querySelector('a');
  // Le agregamos un listener para que cuando se le haga click, se quite
  botonEliminar?.addEventListener('click', () => {
    divParticipante.remove();
    // Obtenemos el arreglo de sorteo
    const sorteo = obtenerSorteo();
    // Removemos el participante del sorteo (usando filter)
    if (sorteo) {
      sorteo.participantes = sorteo.participantes.filter((p) => p.nombre !== participante.nombre);
      // Lo guardamos de nuevo
      guardarSorteo(sorteo);
    }
  });

  // Obtenemos el sorteo
  const sorteo = obtenerSorteo();
  // Agregamos el participante
  sorteo?.participantes.push(participante);
  // Guardamos
  guardarSorteo(sorteo);
}

function cargarParticipantes(contenedorNombres: HTMLDivElement): void {
  // Obtenemos el sorteo
  const sorteo = obtenerSorteo();

  // Si no es null
  if (sorteo !== null) {
    // Si el organizador participa
    if (sorteo.organizadorParticipa) {
      // Creamos el div para la tarjeta
      const divOrganizador = document.createElement('div');

      // Agregamos al organizador
      divOrganizador.innerHTML = `
      <p>${sorteo.organizador} <span>(Organizador)</span></p>
    `;

      // Le agregamos la clase
      divOrganizador.classList.add('tarjeta');
      // Le agregamos su id
      divOrganizador.id = sorteo.organizador;

      // Lo agregamos al div
      contenedorNombres.appendChild(divOrganizador);
    }

    // Cargamos los otros participantes si hay
    if (sorteo.participantes !== null) {
      // Iteramos
      sorteo.participantes.forEach((participante: Participante) => {
        // Creamos el div para la tarjeta
        const divParticipante = document.createElement('div');

        // Agregamos el participante
        divParticipante.innerHTML = `
        <p>${participante.nombre}</p>
        <a class="cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </a>
      `;

        // Le agregamos la clase al tag
        divParticipante.classList.add('tarjeta');
        // Le agregamos su id
        divParticipante.id = participante.nombre;

        // Lo agregamos al div
        contenedorNombres.appendChild(divParticipante);

        // Obtenemos la etiqueta <a>
        const botonEliminar = divParticipante.querySelector('a');
        // Si el boton no es null
        if (botonEliminar !== null) {
          // Le agregamos un listener para que cuando se le haga click, se quite
          botonEliminar.addEventListener('click', () => {
            divParticipante.remove();
            // Obtenemos el arreglo de sorteo
            const sorteo = obtenerSorteo();
            // Removemos el participante del sorteo (usando filter)
            if (sorteo) {
              sorteo.participantes = sorteo.participantes.filter((p) => p.nombre !== participante.nombre);
              // Lo guardamos de nuevo
              guardarSorteo(sorteo);
            }
          });
        }
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Obtemos los elementos
  const input = document.getElementById('nombreParticipante') as HTMLInputElement;
  const botonAgregarParticipante = document.getElementById('botonAgregarParticipante') as HTMLButtonElement;
  const botonRegresar = document.getElementById('botonRegresar') as HTMLButtonElement;
  const botonPasarExclusiones = document.getElementById('botonPasarExclusiones') as HTMLButtonElement;
  const contenedorNombres = document.getElementById("contenedorNombres") as HTMLDivElement;

  if (!input || !botonAgregarParticipante || !botonRegresar || !botonPasarExclusiones || !contenedorNombres) {
    console.log('Elementos no encontrados');
    return;
  }

  // Llamamos a nuestra funcion
  cargarParticipantes(contenedorNombres);

  // ----- Definimos las funciones que se ejecutaran al momento de hacer click -----
  const manejarBotonRegresar = () => {
    // Aqui redireccionamos a la pagina pasada
    window.location.href = window.location.origin + '/src/pages/organizador.html';
  };

  const manejarAgregarParticipante = () => {
    // Obtenemos el valor insertado del input
    const nombreParticipante = input.value.trim();

    // Verificamos si no se ingreso informacion
    if (nombreParticipante === '') {
      // Mandamos mensaje de error
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes de ingresar un participante",
      });
    }
    else {

      // Creamos al participante
      const participante = new Participante();
      // Le agregamos el nombre
      participante.nombre = nombreParticipante;
      // Llamamos a nuestra funcion
      agregarParticipante(participante, contenedorNombres);

      // Vaciamos el input
      input.value = '';
    }
  };

  const manejarPasarExclusiones = () => {

    // Verificamos que haya por lo menos 2 personas para el intercambio
    const sorteo = obtenerSorteo();

    if (sorteo !== null) {

      // Si el organizador participa necesitamos al menos 1 invitado, de lo contrario 2
      const minimoInvitados = sorteo.organizadorParticipa ? 1 : 2;

      // Si hay los participantes adecuados
      if (sorteo.participantes.length >= minimoInvitados) {
        // Agregamos al organizador como participante, si este participa
        if (sorteo.organizadorParticipa) {
          sorteo.participantes.push(new Participante(sorteo.organizador));
        }

        // Guardamos el sorteo
        guardarSorteo(sorteo);

        // Redireccionamos a la siguiente pagina
        window.location.href = window.location.origin + '/src/pages/exclusiones.html';
      }
      else {
        // Mandamos mensaje de error
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Debes de haber al menos 2 participantes",
        });
      }
    }

  };

  // Definimos la funcion para cuando se le de enter al input
  const manejarEnter = (event: KeyboardEvent) => {
    // Si la tecla la que se presiono fue el enter
    if (event.key === 'Enter') {
      // Le quitamos el comportamiento default
      event.preventDefault();
      // Es como si le hicieramos click al boton
      botonAgregarParticipante.click();
    }
  };

  // Creamos los listener para cada elemento
  botonRegresar.addEventListener('click', manejarBotonRegresar);
  botonAgregarParticipante.addEventListener('click', manejarAgregarParticipante);
  botonPasarExclusiones.addEventListener('click', manejarPasarExclusiones);
  input.addEventListener('keydown', manejarEnter);

});
