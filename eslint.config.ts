import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  // Configuración base recomendada de JavaScript
  js.configs.recommended,

  // Reglas básicas recomendadas para TypeScript
  ...tseslint.configs.recommended,

  // Reglas que requieren información de tipos del compilador
  // Detecta problemas como promesas sin await, comparaciones inseguras, etc.
  ...tseslint.configs.recommendedTypeChecked,

  // Nivel más estricto de validación de tipos
  // Fuerza mejores prácticas y manejo explícito de errores
  ...tseslint.configs.strictTypeChecked,

  {
    // Aplica esta configuración solo a archivos TypeScript
    files: ["**/*.ts"],

    languageOptions: {
      // Variables globales del navegador (window, document, etc.)
      globals: globals.browser,

      parserOptions: {
        // Busca automáticamente el tsconfig.json para análisis de tipos
        project: true,
      },
    },

    // Reglas personalizadas
    rules: {
      // Obliga a usar punto y coma al final de cada sentencia
      "semi": ["error", "always"],

      // Requiere que todas las funciones declaren explícitamente su tipo de retorno
      "@typescript-eslint/explicit-function-return-type": "error",

      // Prohíbe el uso del tipo 'any'
      "@typescript-eslint/no-explicit-any": "error",
    }
  }
];
