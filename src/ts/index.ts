// Importamos los componentes
import '../components/header';
import '../components/footer';
// Importamos la clase
import { Sorteo } from '../model/Sorteo';
// Importamos el util
import { guardarSorteo } from '../utils/sorteoUtil';

document.querySelector('#botonComenzar')?.addEventListener('click', () => {
  // Dado que se inicio el sorteo, creamos el objeto para este mismo
  const sorteo = new Sorteo();
  // Lo guardamos usando nuestra funcion
  guardarSorteo(sorteo);

  window.location.href = window.location.origin + '/src/pages/organizador.html';
});
