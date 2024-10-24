import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";


export default [
  {files: ["**/*.{js,mjs,cjs,ts,vue}"]},
  {languageOptions: { globals: globals.browser }},
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}},
  //adding more rules
  {
    rules: { 
      "no-console": "warn", 
      "no-debugger": "warn",
      "allow-object-types": 'off',
      "@typescript-eslint/no-empty-object-type": 'off',
      "@typescript-eslint/triple-slash-reference": 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      "@typescript-eslint/ban-ts-comment": 'off',
      "vue/multi-word-component-names": 'off',
    }
}
];