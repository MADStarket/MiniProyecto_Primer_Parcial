// Importamos los componentes
import '../components/header';
import '../components/footer';

document.querySelector('#botonComenzar')?.addEventListener('click', () => {
  window.location.href = window.location.origin + '/src/pages/organizador.html';
});
