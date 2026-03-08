import '../styles/shared/footer.css';

class Footer extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <div class="flex items-center justify-center p-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock-icon lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <p class="text-slate-500 mx-2 text-xs md:text-lg">Tus datos se guardan de manera segura en LocalStorage</p>
      </div>
    `;
  }
}

customElements.define("footer-component", Footer);
