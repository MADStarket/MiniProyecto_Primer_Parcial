// Importamos los componentes
import '../components/header';
import '../components/footer';
// Importamos la clase
import { Sorteo } from '../model/Sorteo';
// Importamos el util
import { guardarSorteo } from '../utils/sorteoUtil';
import { navigateTo } from '../utils/navigationUtil';

document.querySelector('#botonComenzar')?.addEventListener('click', () => {
  // Dado que se inicio el sorteo, creamos el objeto para este mismo
  const sorteo = new Sorteo();
  // Lo guardamos usando nuestra funcion
  guardarSorteo(sorteo);

  navigateTo('src/pages/organizador.html');
});
