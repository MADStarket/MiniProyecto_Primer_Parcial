// Importamos los componentes
import '../components/header';
import '../components/footer';
// Importamos los utils
import { obtenerSorteo, guardarSorteo } from '../utils/sorteoUtil';

document.addEventListener('DOMContentLoaded', () => {
  // Obtenemos los elementos
  const inputPresupuesto = document.getElementById('presupuesto') as HTMLInputElement;
  const botonRegresar = document.getElementById('botonRegresar') as HTMLButtonElement;
  const botonPasarResumen = document.getElementById('botonPasarResumen') as HTMLButtonElement;
  // Botones de precios
  const botonPresupuesto100 = document.getElementById('presupuesto-100') as HTMLButtonElement;
  const botonPresupuesto200 = document.getElementById('presupuesto-200') as HTMLButtonElement;
  const botonPresupuesto300 = document.getElementById('presupuesto-300') as HTMLButtonElement;
  const botonPresupuesto400 = document.getElementById('presupuesto-400') as HTMLButtonElement;
  const botonPresupuesto500 = document.getElementById('presupuesto-500') as HTMLButtonElement;

  if (!inputPresupuesto || !botonRegresar || !botonPasarResumen || !botonPresupuesto100 || !botonPresupuesto200 || !botonPresupuesto300 || !botonPresupuesto400 || !botonPresupuesto500) {
    console.log('Elementos no encontrados');
    return;
  }

  if (inputPresupuesto) {
    // Le agregamos un listener para cuando haya una entrada
    inputPresupuesto.addEventListener('input', () => {
      // Obtenemos lo que tiene el input directamente
      let value = inputPresupuesto.value;
      // Le quitamos todo excepto los numeros
      value = value.replace(/[^\d]/g, '');
      // Le agregamos el simbolo $
      inputPresupuesto.value = value ? `$${value}` : '';
    });

    // Le agregamos un listener cuando haya un enter
    inputPresupuesto.addEventListener('keydown', (e: KeyboardEvent) => {
      // Si la tecla que se presiono fue el enter
      if (e.key === 'Enter') {
        e.preventDefault();
        // Es como si hicieran click
        botonPasarResumen.click();
      }
    });
  }

  const manejarPasarResumen = () => {
    // Obtenemos el valor que se ingreso y le quitamos el primer elemento (signo $)
    const presupuesto: string = inputPresupuesto.value.slice(1);
    console.log(presupuesto);

    // Obtenemos el sorteo
    const sorteo = obtenerSorteo();

    // Le asignamos el presupuesto obtenido
    if (sorteo !== null) {
      sorteo.presupuesto = presupuesto;
      // Lo guardamos nuevamente
      guardarSorteo(sorteo);
    }

    window.location.href = window.location.origin + '/src/pages/resumen.html';
  };

  const manejarRegresar = () => {
    window.location.href = window.location.origin + '/src/pages/detalles.html';
  };

  botonRegresar.addEventListener('click', manejarRegresar);
  botonPasarResumen.addEventListener('click', manejarPasarResumen);
  // Para cada boton un listener para cambiar el input
  botonPresupuesto100.addEventListener('click', () => {
    inputPresupuesto.value = '$100';
  });
  botonPresupuesto200.addEventListener('click', () => {
    inputPresupuesto.value = '$200';
  });
  botonPresupuesto300.addEventListener('click', () => {
    inputPresupuesto.value = '$300';
  });
  botonPresupuesto400.addEventListener('click', () => {
    inputPresupuesto.value = '$400';
  });
  botonPresupuesto500.addEventListener('click', () => {
    inputPresupuesto.value = '$500';
  });

});
