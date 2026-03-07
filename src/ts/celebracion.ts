// Importamos los componentes
import '../components/header';
import '../components/footer';

// Importamos las clases

import { Sorteo } from '../model/Sorteo';

import Swal from 'sweetalert2';

// Importamos los utils

import { obtenerSorteo, guardarSorteo } from '../utils/sorteoUtil';


// Variable global para guardar el sorteo
const sorteo: Sorteo = obtenerSorteo() || new Sorteo();

// Funcion para seleccionar el tipo de celebracion
function establecerTipoCelebracion(boton: HTMLButtonElement, tipodeCelebracionInput: HTMLInputElement, celebracionBtns: NodeListOf<HTMLButtonElement>): void {
  const valor = boton.dataset.value;

  //Removemos la clase activa de todos los botones
  celebracionBtns.forEach(btn => btn.classList.remove('border-blue-500', 'bg-blue-100'));

  // Agregamos la clase al boton seleccionado
  boton.classList.add('border-blue-500', 'bg-blue-100');

  // Habilitamos el input según la seleccion del tipo de festejo
  if (valor === 'Otro') {
    tipodeCelebracionInput.disabled = false;
    tipodeCelebracionInput.focus();
  } else {
    tipodeCelebracionInput.disabled = true;
    tipodeCelebracionInput.value = '';
  }

  // Guardamos el valor
  sorteo.nombreCelebracion = valor || '';
}

// Funcion para validar la celebracion
function validarDatos(): boolean {
  if (!sorteo.nombreCelebracion) {
    Swal.fire({
      icon: 'warning',
      title: 'Celebracion requerida',
      text: 'Por favor seleccione o ingresa el tipo de celebracion',
    });
    return false;
  }

  if (!sorteo.fechaCelebracion) {
    Swal.fire({
      icon: 'warning',
      title: 'Fecha requerida',
      text: 'Por favor seleccione la fecha de celebracion',
    });
    return false;
  }

  const fechaSeleccionada = new Date(`${sorteo.fechaCelebracion}T00:00:00`);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  if (fechaSeleccionada < hoy) {
    Swal.fire({
      icon: 'warning',
      title: 'Fecha invalida',
      text: 'La fecha debe ser hoy o posterior',
    });
    return false;
  }

  return true;
}
document.addEventListener('DOMContentLoaded', () => {


  const botonRegresar = document.getElementById('botonRegresar') as HTMLButtonElement;
  const botonPasaraPresupuesto = document.getElementById('botonPasaraPresupuesto') as HTMLButtonElement;
  const celebracionBtns = document.querySelectorAll('.celebracionBtn') as NodeListOf<HTMLButtonElement>;
  const tipodeCelebracionInput = document.getElementById('tipodeCelebracion') as HTMLInputElement;
  const fechaCelebracionInput = document.getElementById('fechaCelebracion') as HTMLInputElement;

  // Agregamos listeners a los botones de celebración
  celebracionBtns.forEach(btn => {
    btn.addEventListener('click', () => establecerTipoCelebracion(btn, tipodeCelebracionInput, celebracionBtns));
  });

  // Agregamos listener para cambios en el input de texto
  tipodeCelebracionInput.addEventListener('change', (e) => {
    const input = e.target as HTMLInputElement;
    sorteo.nombreCelebracion = input.value;
  });

  // Agregamos listener para cambios en la fecha
  fechaCelebracionInput.addEventListener('change', (e) => {
    const input = e.target as HTMLInputElement;
    sorteo.fechaCelebracion = input.value;
  });
  const manejarRegresar = () => {
    window.location.href = window.location.origin + '/src/pages/exclusiones.html';
  };

  const manejarPasaraPresupuesto = () => {
    if (validarDatos()) {
      guardarSorteo(sorteo);
      window.location.href = window.location.origin + '/src/pages/cuanto-gastar.html';
    }
  };

  if (botonRegresar) botonRegresar.addEventListener('click', manejarRegresar);
  if (botonPasaraPresupuesto) botonPasaraPresupuesto.addEventListener('click', manejarPasaraPresupuesto);


});
