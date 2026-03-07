// Importamos los componentes
import "../components/header";
import "../components/footer";

// Importamos libreria
import Swal from "sweetalert2";

// Importamos claes y utils
import { Participante } from "../model/Participante";
import { obtenerSorteo } from "../utils/sorteoUtil";

type Asignaciones = Map<string, string>;

function barajear<T>(arr: T[]): T[] {
  const copia = [...arr];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); //Genera un indice aleatorio
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function estaExcluido(proveedor: Participante,posibleReceptor: string,): boolean {
  return (
    proveedor.participantesExcluidos?.some(
      (p) => p.nombre === posibleReceptor,
    ) ?? false
  );
}

function generarAsignaciones(participantes: Participante[],): Asignaciones | null {
  const nombres = participantes
    .map((p) => p.nombre.trim())
    .filter((n) => n !== "");
  const nombresUnicos = new Set(nombres);

  // Verificamos que al menos haya 2 participantes sin duplicados
  if (nombres.length < 2 || nombresUnicos.size !== nombres.length) {
    return null;
  }

  const mapaParticipantes = new Map<string, Participante>();
  participantes.forEach((p) => {
    if (p.nombre.trim() !== "") mapaParticipantes.set(p.nombre, p);
  });

  // Asignamos un numero maximo de intentos
  const MAX_INTENTOS = 6900;

  // Intentamos generar asignaciones válidas múltiples veces
  for (let intento = 0; intento < MAX_INTENTOS; intento++) {
    // Barajamos la lista de receptores
    const receptores = barajear(nombres);
    let valido = true;
    const asignaciones: Asignaciones = new Map();

    // Verificamos que cada asignación sea válida
    for (let i = 0; i < nombres.length; i++) {
      const proveedor = nombres[i];
      const receptor = receptores[i];
      const participante = mapaParticipantes.get(proveedor);

      if (!participante) {
        valido = false;
        break;
      }

      if (proveedor === receptor) {
        valido = false;
        break;
      }

      if (estaExcluido(participante, receptor)) {
        valido = false;
        break;
      }

      asignaciones.set(proveedor, receptor);
    }

    if (valido) return asignaciones;
  }

  return null;
}

function dibujarResultados(contenedor: HTMLDivElement,asignaciones: Asignaciones,): void {
    contenedor.innerHTML = "";

    asignaciones.forEach((receptor, proveedor) => {
      const fila = document.createElement("div");

      fila.className =
        "grid grid-cols-3 items-center bg-white border border-slate-200 rounded-xl p-3 text-center";

      fila.innerHTML = `
      <p class="font-bold text-[#4f46e5]">${proveedor}</p>
      <p class="font-bold text-slate-400">→</p>
      <p class="font-bold text-[#ec4899]">${receptor}</p>
      `;

      contenedor.appendChild(fila);
    });
  }

document.addEventListener('DOMContentLoaded', async () => {
    // Obtenemos los elementos del HTML
  const contenedorResultados = document.getElementById('contenedorResultados') as HTMLDivElement;
  const botonOtroIntercambio = document.getElementById('botonPasarInicio') as HTMLButtonElement;

  // Validamos que los elementos existan
  if (!contenedorResultados || !botonOtroIntercambio) {
    console.log('Elementos no encontrados');
    return;
  }

  // Obtenemos el sorteo guardado en localStorage
  const sorteo = obtenerSorteo()!;

  const asignaciones = generarAsignaciones(sorteo.participantes);

  // Verificamos si se logro la generacion de asignaciones
  if (!asignaciones) {
    await Swal.fire({
      icon: 'error',
      title: 'No se pudo generar el sorteo',
      text: 'Las exclusiones actuales no permiten una combinación válida.',
    });
    window.location.href = window.location.origin + '/src/pages/exclusiones.html';
    return;
  }

  dibujarResultados(contenedorResultados, asignaciones);

  botonOtroIntercambio.addEventListener('click', () => {
    localStorage.removeItem('sorteo');
    window.location.href = window.location.origin + '/';
  });
});
