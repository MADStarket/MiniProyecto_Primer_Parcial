// Importamos los componentes
import '../components/header';
import '../components/footer';
// Importamos la clase
import { Participante } from '../model/Participante';
// Importamos los utils
import { obtenerSorteo, guardarSorteo } from '../utils/sorteoUtil';
import { animarProgress } from '../utils/progressUtil';
import { navigateTo } from '../utils/navigationUtil';

// Declaracion de variables globales
let participanteSeleccionado = ''; // Guardaremos al participante que estamos editando sus exclusiones
let arrastrandoNombre = ''; // Variable temporal para usar el draganddrop

function obtenerNombresUnicos(): string[] {
  // Obtenemos la información almacenada en el localstorage
  const sorteo = obtenerSorteo();
  if (!sorteo) return [];

  // Usamos la estructura SET para evitar duplicados
  const nombres = new Set<string>();

  // Agregamos a todos los participantes
  sorteo.participantes.forEach((p: Participante) => {
    const nombre = p.nombre;
    if (nombre !== '') nombres.add(nombre);
  });

  return Array.from(nombres);
}

function obtenerParticipante(): Participante | null {
  const sorteo = obtenerSorteo();

  if (!sorteo) return null;

  const participante = sorteo.participantes.find((p) => p.nombre === participanteSeleccionado);

  // En caso de que el participante no exista (lo que esta en el select)
  if (!participante) {
    // No regresamos nada
    return null;
  }

  // Regresamos al participante seleccionado
  return participante;
}

// Llenamos el selector con todos los participantes
function cargarSelector(): void {
  const select = document.getElementById('SelectorParticipantes') as HTMLSelectElement;

  // Obtenemos la lista única de nombres (sin duplicados)
  const nombres: string[] = obtenerNombresUnicos();

  //Creamos las opciones para cada participante
  nombres.forEach((nombre) => {
    const option = document.createElement('option');
    option.value = nombre;
    option.textContent = nombre;
    select.appendChild(option);
  });
}

// Carga lista de participantes a los contenedores
function cargarLista(): void {
  const disponibles = document.getElementById('disponibles') as HTMLDivElement;
  const excluidos = document.getElementById('excluidos') as HTMLDivElement;

  // Limpiamos listas
  disponibles.innerHTML = '';
  excluidos.innerHTML = '';

  // Si no hay nadie seleccionado, no se carga nada
  if (!participanteSeleccionado) return;

  const participante = obtenerParticipante();
  if (!participante) return;

  // Obtenemos todos los participantes a excepcion del que estamos configurando
  const todos = obtenerNombresUnicos();

  // Creamos una estructura Set con los nombres excluidos
  const excluidosSet = new Set(participante.participantesExcluidos.map((p) => p.nombre));

  // Por cada participante creamos un tarjeta drag
  todos.forEach((nombre) => {

    // Omitimos al mismo participante seleccionado
    if (nombre === participanteSeleccionado) {
      return;
    }

    const card = document.createElement('div');
    card.className = 'drag-item';
    card.draggable = true; // Indicamos que es un drag activando la propiedad
    card.textContent = nombre;
    card.dataset.nombre = nombre; // Guardamos el nombre en un atributo data-*

    // Evento del drag
    card.addEventListener('dragstart', () => {
      arrastrandoNombre = nombre; // Guardamos al participante que esta siendo arrastrado
      card.classList.add('dragging'); // Efecto Visual
    });

    // Evento del drop
    card.addEventListener('dragend', () => {
      card.classList.remove('dragging'); // Efecto visual retirado
    });

    // Determinamos en que lista se carga la tarjeta
    if (excluidosSet.has(nombre)) {
      excluidos.appendChild(card); // Se carga en excluidos
    } else {
      disponibles.appendChild(card); // Se carga en disponibles
    }
  });
}

// Cargamos la información al localstorage
function guardarExclusionesDesdeUI(): void {
  const excluidos = document.getElementById('excluidos') as HTMLDivElement;

  const sorteo = obtenerSorteo();
  if (!sorteo) return;

  // Guardamos los participantes excluidos en el array
  const nombresExcluidos: string[] = [];

  // Recorremos todas las tarjetas de los participantes excluidos
  excluidos.querySelectorAll('.drag-item').forEach((item) => {
    const nombre = (item as HTMLElement).dataset.nombre;
    if (nombre) nombresExcluidos.push(nombre);
  });

  // Sobreescribimos al participante dentro del objeto sorteo
  sorteo.participantes.forEach((p) => {
    // Si el nombre coincide
    if (p.nombre === participanteSeleccionado) {
      // ACtualizamos sus exclusiones
      p.participantesExcluidos = nombresExcluidos.map((nombre) => {
        // Creamos al nuevo participante
        const nuevoParticipante = new Participante();
        // Le ponemos el nombre
        nuevoParticipante.nombre = nombre;
        // Esto hace que se guarde en participantesExcluidos
        return nuevoParticipante;
      });
    }
  });

  // Guardamos el sorteo completo en localstorage
  guardarSorteo(sorteo);
}

// Definimos las zonas de disponible y excluidos
function configuracionDropZone(): void {
  const disponibles = document.getElementById('disponibles') as HTMLDivElement;
  const excluidos = document.getElementById('excluidos') as HTMLDivElement;

  // Tanto drag como drop los configuramos con los mismos eventos
  [disponibles, excluidos].forEach((zona) => {
    //dragover: Se activa cuando estamos pasando por encima
    zona.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    zona.addEventListener('drop', (e) => {
      e.preventDefault();
      if (!arrastrandoNombre) return; // SI no hay nada arrastrando salimos de la función

      // Buscamos la tarjeta que se esta arrastrando
      const card = document.querySelector(`.drag-item[data-nombre="${arrastrandoNombre}"]`);
      if (!card) return;

      // Movemos la tarjeta a esta zona
      zona.appendChild(card);

      // Guardamos el nuevo estado en el localstorage
      guardarExclusionesDesdeUI();

      // Limpiamos la variable temporal
      arrastrandoNombre = '';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Obtenemos los elemenetos
  const select = document.getElementById('SelectorParticipantes') as HTMLSelectElement;
  const botonRegresar = document.getElementById('botonRegresar') as HTMLButtonElement;
  const botonPasarExclusiones = document.getElementById('botonPasarExclusiones') as HTMLButtonElement;
  const progress = document.getElementById('progress') as HTMLProgressElement;

  // Cargamos el progress
  animarProgress(progress, 51);

  // Cargamos el selector
  cargarSelector();

  // Configuramos las zonas para el drag&drop
  configuracionDropZone();

  // Escuchamos los cambios en el selector
  select.addEventListener('change', (): void => {
    participanteSeleccionado = select.value; // Guardamos al participante seleccionado
    cargarLista(); // Dibujamos las listas
  });


  const manejarRegresar = (): void => {
    navigateTo('src/pages/participantes.html');
  };

  const manejarPasarExclusiones = (): void => {
    navigateTo('src/pages/celebracion.html');
  };

  botonRegresar.addEventListener('click', manejarRegresar);
  botonPasarExclusiones.addEventListener('click', manejarPasarExclusiones);
});
