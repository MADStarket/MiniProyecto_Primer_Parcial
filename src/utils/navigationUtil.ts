/**
 * Obtiene la ruta base de la aplicación
 * En desarrollo: '/'
 * En producción (GitHub Pages): '/MiniProyecto_Primer_Parcial/'
 */
function getBasePath(): string {
  // Obtenemos la constante global inyectada por Vite para obtener la URL desde donde se sirvio la aplicacion
  return import.meta.env.BASE_URL;
}

// Recibimos la ruta tal y como esta en el proyecto
export function navigateTo(path: string): void {
  // Obtenemos nuestra constante
  const basePath = getBasePath();
  // Remover el / inicial si existe en path
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Hacemos el redireccionamiento correspondiente
  window.location.href = basePath + cleanPath;
}
