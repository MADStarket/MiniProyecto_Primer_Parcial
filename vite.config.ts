import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'

// Si se ejecuta vite entra en modo desarrollo y en produccion si se hace build
export default defineConfig(({ mode }) => {
  // Obtenemos el .env (todas las variables) correspondiente segun el modo
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // Carganmos la base segun el modo en el que estemos
    base: env.VITE_BASE_URL || '/',
    plugins: [
      tailwindcss(),
    ],
    build: {
      // Para hacer minify y mangling
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        mangle: true,
      },
      // Dado que es un proyecto que necesita muchas paginas, necesitamos cargar cada una de ellas para el build
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          celebracion: resolve(__dirname, 'src/pages/celebracion.html'),
          cuantoGastar: resolve(__dirname, 'src/pages/cuanto-gastar.html'),
          exclusiones: resolve(__dirname, 'src/pages/exclusiones.html'),
          organizador: resolve(__dirname, 'src/pages/organizador.html'),
          participantes: resolve(__dirname, 'src/pages/participantes.html'),
          resultados: resolve(__dirname, 'src/pages/resultados.html'),
          resumen: resolve(__dirname, 'src/pages/resumen.html'),
        },
      },
    },
  }
})
