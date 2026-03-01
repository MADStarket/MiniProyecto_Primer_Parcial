import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{ts, js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  {
    rules: {
      // "error" hace que el IDE lo marque como error
      // always obliga a que siempre haya punto y coma
      "semi": ["error", "always"]
    }
  }
]);
