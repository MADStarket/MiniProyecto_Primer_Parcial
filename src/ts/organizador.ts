// Importamos los componentes
import '../components/header';
import '../components/footer';

// Importamos la libreria
import Swal from 'sweetalert2';

document.addEventListener('DOMContentLoaded', () => {
  // Obtenemos los elementos
  const input = document.getElementById('nombreOrganizador') as HTMLInputElement;
  const boton = document.getElementById('botonPasarOrganizador') as HTMLButtonElement;
  const checkbox = document.getElementById('incluirOrganizador') as HTMLInputElement;

  // Verificamos que los elementos existan
  if (!input || !boton || !checkbox) {
    console.log('Elementos no encontrados');
    return;
  }

  // Definimos la funcion que se ejecutara al momento de hacer click
  const manejarClick = () => {

    // Obtenemos el valor insertado del input
    const nombreOrganizador = input.value.trim();

    // Verificamos si no se ingreso informacion
    if (nombreOrganizador === '') {
      // Mandamos mensaje de error
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El intercambio debe de tener un organizador",
      });
    }
    else {
      // Guardamos al organizador en el LocalStorage
      localStorage.setItem('organizador', nombreOrganizador);

      // Verificamos si el organizador participa o no
      const participa = checkbox.checked;

      // Guardamos el true/false en el LocalStorage
      localStorage.setItem('incluirOrganizador', participa.toString());

      // Aqui redireccionamos a la siguiente pagina
      // window.location.href = window.location.origin + '/src/pages/participantes.html';
    }
  };

  // Creamos el listener para el boton
  boton.addEventListener('click', manejarClick);

});
