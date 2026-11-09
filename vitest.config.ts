import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

/**
 * The suite had no Vitest config, so the `@/*` path alias from tsconfig.json
 * was never applied and any test importing `@/...` failed to collect with
 * "Failed to load url @/...". Three test files (parseQuery, searchUrl, slugs)
 * were silently unrunnable for that reason.
 *
 * Mirrors tsconfig.json compilerOptions.paths: "@/*" -> "./src/*".
 */
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    environment: 'node',
  },
});
