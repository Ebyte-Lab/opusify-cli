import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    // Apply this config to all JavaScript files
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // It is a CLI, so we want to allow console.log
      "no-console": "off",
      "no-unused-vars": "warn",
      "no-undef": "error"
    },
  },
];