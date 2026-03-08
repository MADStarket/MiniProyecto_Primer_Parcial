import { navigateTo } from '../utils/navigationUtil';
import '../styles/shared/header.css';

class Header extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <!--Lo programamos primero para el iPhone 12 Pro-->
      <!--md es para pantallas mayores o iguales a 768px (Esto para el iPad Mini y escritorio)-->
      <nav class="flex text-sm justify-between p-4 gap-5 md:justify-between md:text-3xl">

        <div class="flex items-center" id="logo">
          <!--Logo SVG-->
          <div class="bg-blue-600 rounded-xl p-2 shadow-md ">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-box-icon lucide-box"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
          </div>
          <p class="mx-2 text-slate-800 font-black">Regalo<span class="text-blue-600">Magico</span></p>
        </div>

        <div class="flex items-center">
          <p class="text-xs font-black text-slate-500 bg-white px-3 py-1 rounded-full shadow-md border border-slate-100 md:text-sm">Miniproyecto #1</p>
        </div>
      </nav>
    `;

    // Evento de click en el logo
    this.querySelector('#logo')?.addEventListener('click', () => {
      // Utilizamos nuestro util
      navigateTo('index.html');
    });
  }
}

customElements.define("header-component", Header);
