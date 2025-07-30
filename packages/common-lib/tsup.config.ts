// packages/common-lib/tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true, // Generálja a .d.ts fájlokat
    clean: true, // Tisztítja a dist mappát buildelés előtt
    sourcemap: true,
});
