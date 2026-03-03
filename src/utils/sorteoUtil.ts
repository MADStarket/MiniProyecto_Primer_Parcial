// Importamos la clase
import { Sorteo } from '../model/Sorteo';

export const obtenerSorteo = (): Sorteo | null => {
  // Obtenemos el objeto sorteo del LocalStorage
  const sorteoLocalStorage = localStorage.getItem('sorteo');
  // Validamos
  if (sorteoLocalStorage === null) {
    console.log('No hay un sorteo en LocalStorage');
    return null;
  }

  // Lo intentamos convertimos a objeto de TS
  try {
    const sorteo: Sorteo = JSON.parse(sorteoLocalStorage) as Sorteo;
    // Regresamos el objeto
    return sorteo;
  } catch (error) {
    console.log('Error al momento de usar parse', error);
    return null;
  }
};

export const guardarSorteo = (sorteo: Sorteo | null): void => {

  if (sorteo !== null) {
    // Lo guardamos nuevamente en LocalStorage
    const sorteoString: string = JSON.stringify(sorteo);
    localStorage.setItem('sorteo', sorteoString);
  }
};
