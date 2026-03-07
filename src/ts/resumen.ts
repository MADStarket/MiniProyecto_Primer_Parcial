// Importamos los componentes
import '../components/header';
import '../components/footer';
// Importamos los utils
import { obtenerSorteo } from '../utils/sorteoUtil';
import { animarProgress } from '../utils/progressUtil';
// Importamos las clases
import { Participante } from '../model/Participante';

document.addEventListener('DOMContentLoaded', () => {
  // Obtenemos los elementos
  const spanNombreCelebracion = document.getElementById('nombreCelebracion') as HTMLSpanElement;
  const spanNombreOrganizador = document.getElementById('nombreOrganizador') as HTMLSpanElement;
  const spanFechaCelebracion = document.getElementById('fechaCelebracion') as HTMLSpanElement;
  const spanPresupuesto = document.getElementById('presupuesto') as HTMLSpanElement;
  const participantes = document.getElementById('participantes') as HTMLParagraphElement;
  const progress = document.getElementById('progress') as HTMLProgressElement;

  // Cargamos el progress
  animarProgress(progress, 100);

  // Obtenemos los datos del sorteo
  const sorteo = obtenerSorteo();
  if (sorteo) {
    // Mostramos la informacion
    spanNombreCelebracion.textContent = sorteo.nombreCelebracion;
    spanNombreOrganizador.textContent = sorteo.organizador;
    spanFechaCelebracion.textContent = sorteo.fechaCelebracion;
    spanPresupuesto.textContent = `$${sorteo.presupuesto}`;

    // Escribimos la palabra y el numero de participantes
    participantes.textContent = `Participantes (${sorteo.participantes.length.toString()}): `;
    // Creamos un span
    const spanParticipantes = document.createElement('span');
    // Mostramos los nombres de los participantes
    spanParticipantes.textContent = sorteo.participantes.map((p: Participante) => p.nombre).join(', ');
    participantes.appendChild(spanParticipantes);
    // Clase para font normal
    spanParticipantes.classList.add('font-normal');

  }

});
