// Importamos los componentes
import '../components/header';
import '../components/footer';
// Importamos los utils
import { obtenerSorteo, guardarSorteo } from '../utils/sorteoUtil';
import { animarProgress } from '../utils/progressUtil';
import { navigateTo } from '../utils/navigationUtil';

// Función para establecer el presupuesto seleccionado
function establecerPresupuesto(valor: string, presupuestoBtns: NodeListOf<HTMLButtonElement>, inputPresupuesto: HTMLInputElement, botonOtro: HTMLButtonElement): void {
  // Removemos la clase activa de todos los botones
  presupuestoBtns.forEach(btn => { btn.classList.remove('border-blue-500', 'bg-blue-100'); });
  botonOtro.classList.remove('border-blue-500', 'bg-blue-100');

  // Si el valor es 'Otro', habilitamos el input
  if (valor === 'Otro') {
    botonOtro.classList.add('border-blue-500', 'bg-blue-100');
    inputPresupuesto.disabled = false;
    inputPresupuesto.focus();
  } else {
    // Encontramos el botón que corresponde al valor y le agregamos las clases
    presupuestoBtns.forEach(btn => {
      if (btn.textContent.trim() === valor) {
        btn.classList.add('border-blue-500', 'bg-blue-100');
      }
    });

    // Obtenemos el sorteo
    const sorteo = obtenerSorteo();
    // Le quitamos el signo $ a la cadena
    const presupuesto = valor.slice(1);
    // Le asignamos el presupuesto
    if (sorteo) {
      sorteo.presupuesto = presupuesto;
    }
    // Guardamos el sorteo
    guardarSorteo(sorteo);

    // Deshabilitamos el input
    inputPresupuesto.disabled = true;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Obtenemos los elementos
  const inputPresupuesto = document.getElementById('presupuesto') as HTMLInputElement;
  const botonRegresar = document.getElementById('botonRegresar') as HTMLButtonElement;
  const botonPasarResumen = document.getElementById('botonPasarResumen') as HTMLButtonElement;
  const progress = document.getElementById('progress') as HTMLProgressElement;
  // Botones de precios (excluimos el botón 'Otro')
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const presupuestoBtns = document.querySelectorAll('[id^="presupuesto-"]') as NodeListOf<HTMLButtonElement>;
  const botonPresupuesto100 = document.getElementById('presupuesto-100') as HTMLButtonElement;
  const botonPresupuesto200 = document.getElementById('presupuesto-200') as HTMLButtonElement;
  const botonPresupuesto300 = document.getElementById('presupuesto-300') as HTMLButtonElement;
  const botonPresupuesto400 = document.getElementById('presupuesto-400') as HTMLButtonElement;
  const botonPresupuesto500 = document.getElementById('presupuesto-500') as HTMLButtonElement;
  const botonOtro = document.getElementById('presupuesto-otro') as HTMLButtonElement;

  // Cargamos el progress
  animarProgress(progress, 85);

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


  const manejarPasarResumen = (): void => {

    // Si el input esta habilitado, entonces se selecciono "Otro" y debemos guardar lo que está en el input
    if (!inputPresupuesto.disabled) {
      // Obtenemos el valor que se ingreso y le quitamos el primer elemento (signo $)
      const presupuesto: string = inputPresupuesto.value.slice(1);

      // Obtenemos el sorteo
      const sorteo = obtenerSorteo();

      // Le asignamos el presupuesto obtenido
      if (sorteo !== null) {
        sorteo.presupuesto = presupuesto;
        // Lo guardamos nuevamente
        guardarSorteo(sorteo);
      }
    }

    navigateTo('src/pages/resumen.html');
  };

  const manejarRegresar = (): void => {
    navigateTo('src/pages/celebracion.html');
  };

  botonRegresar.addEventListener('click', manejarRegresar);
  botonPasarResumen.addEventListener('click', manejarPasarResumen);

  // Para cada boton un listener para cambiar el input con selección visual
  botonPresupuesto100.addEventListener('click', () => {
    establecerPresupuesto('$100', presupuestoBtns, inputPresupuesto, botonOtro);
  });
  botonPresupuesto200.addEventListener('click', () => {
    establecerPresupuesto('$200', presupuestoBtns, inputPresupuesto, botonOtro);
  });
  botonPresupuesto300.addEventListener('click', () => {
    establecerPresupuesto('$300', presupuestoBtns, inputPresupuesto, botonOtro);
  });
  botonPresupuesto400.addEventListener('click', () => {
    establecerPresupuesto('$400', presupuestoBtns, inputPresupuesto, botonOtro);
  });
  botonPresupuesto500.addEventListener('click', () => {
    establecerPresupuesto('$500', presupuestoBtns, inputPresupuesto, botonOtro);
  });
  botonOtro.addEventListener('click', () => {
    establecerPresupuesto('Otro', presupuestoBtns, inputPresupuesto, botonOtro);
  });

});
