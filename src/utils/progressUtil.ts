export function animarProgress(progress: HTMLProgressElement, objetivo: number): void {
  progress.max = 100;
  progress.value = 0;

  // Esperamos que el navegador renderice unos frames (doble llamada) esto para darle tiempo al navegador de renderizar cambios antes de
  // actualizar el progreso
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      // Para ahora si mostrar la animacion asignandole un valor al progress
      progress.value = objetivo;
    });
  });
}
