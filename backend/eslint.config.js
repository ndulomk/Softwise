import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: globals.node, // mudou de browser pra node (é backend né?)
    },
  },

  // Pega a config recomendada
  ...tseslint.configs.recommended,

  // === AQUI É A MÁGICA ===
  {
    rules: {
      // Deixa passar any, mas ainda avisa no terminal (fica amarelo em vez de vermelho)
      "@typescript-eslint/no-explicit-any": "warn",

      // Bonus: se quiser ser ainda mais relaxado em testes
      // "@typescript-eslint/no-explicit-any": "off",

      // Ou só em arquivos de teste:
      // "no-explicit-any": "off" em arquivos __tests__ ou *.test.ts
    },
  },

  // Opcional: desabilitar completamente em testes (muito comum)
  {
    files: ["**/__tests__/**/*.ts", "**/*.test.ts", "**/*.spec.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  }
);