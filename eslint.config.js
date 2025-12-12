import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import reactDom from "eslint-plugin-react-dom";
import tsPlugin from "@typescript-eslint/eslint-plugin";
// removed unused eslint-plugin-ts import

export default tseslint.config(
  { ignores: ["dist", "n8n-reference"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "react-dom": reactDom,
      "@typescript-eslint": tsPlugin,
// removed ts plugin reference
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "react-dom/no-unsafe-target-blank": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
);
