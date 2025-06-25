// eslint.config.js

import globals from 'globals';
import js from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';

export default [
  {
    ignores: ['dist/'],
  },

  js.configs.recommended,

  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },

      globals: {
        ...globals.browser,
      },
    },

    settings: {
      react: {
        // 'detect' is apparently better than hardcoding a version like '18.2'
        version: 'detect',
      },
    },

    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      // The 'plugin:react/jsx-runtime' extends is now just this one rule
      'react/react-in-jsx-scope': 'off',
    },
  },

  // Vite-specific plugin for HMR (Hot Module Replacement)
  // This replaces 'plugins: ["react-refresh"]' and its rule
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      'react-refresh': pluginReactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];