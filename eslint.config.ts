import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import type { ConfigArray } from 'typescript-eslint';

const config: ConfigArray = tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**', '*.config.js', '*.config.ts'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-console': 'off',
      'no-debugger': 'error',
    },
  }
);

export default config;
