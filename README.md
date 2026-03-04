# MiniProyecto Primer Parcial

## Tecnologías Utilizadas
Este proyecto ha sido desarrollado utilizando las siguientes tecnologías:
*   **HTML**
*   **CSS**
*   **TypeScript**
*   **Vite**
*   **Tailwind CSS**

## Breakpoints
El diseño responsivo contempla principalmente 2 breakpoints para los siguientes dispositivos:
*   **iPhone 12 Pro**
*   **iPad Mini y escritorio**

## Requisitos previos

Para trabajar en este proyecto, asegúrate de cumplir con lo siguiente:

### VS Code

Se recomienda instalar la extensión de **EditorConfig for VS Code** para mantener la consistencia en el estilo del código.
*   ID: `EditorConfig.EditorConfig`
*   Nombre: EditorConfig for VS Code

### Entorno de desarrollo

Este proyecto utiliza **Nix** para gestionar el entorno de desarrollo de manera reproducible.

1.  Debes tener **Nix** instalado en tu computadora. Puedes seguir las instrucciones de instalación en el [sitio oficial de Nix](https://nixos.org/download.html).
2.  Para activar el entorno, ejecuta el siguiente comando en la raíz del proyecto:

    ```bash
    nix-shell
    ```

Esto configurará todas las dependencias necesarias.

## Cómo correr el proyecto

Una vez que tengas el entorno configurado (y activado con `nix-shell` si lo usas), sigue estos pasos:

1.  Instala las dependencias de NPM:

    ```bash
    npm install
    ```

2.  Ejecuta el servidor de desarrollo:

    ```bash
    npm run dev
    ```
