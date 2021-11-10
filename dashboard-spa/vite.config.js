import { defineConfig, searchForWorkspaceRoot } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { babel } from '@rollup/plugin-babel';

export default defineConfig({
    envPrefix: 'CC_DASHBOARD_',
    esbuild: false,
    plugins: [
        svelte({
            emitCss: false,
        }),
        babel({
            include: ['./src/**'],
            presets: ['@babel/preset-env'],
            babelHelpers: 'bundled',
        }),
    ],
    build: {
        sourcemap: true,
        lib: {
            entry: 'src/main.js',
            formats: ['iife'],
            name: 'CoronaCheckDashboard',
            fileName: () => 'dashboard.js',
        },
    },
    server: {
        fs: {
            allow: [searchForWorkspaceRoot(process.cwd()), '../public'],
        },
    },
});
