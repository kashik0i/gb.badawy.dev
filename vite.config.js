import {defineConfig} from "vite";
import {svelte} from "@sveltejs/vite-plugin-svelte";
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte(), mkcert()],
    server: {
        headers: {
            'Cross-Origin-Embedder-Policy': 'require-corp',
            'Cross-Origin-Opener-Policy': 'same-origin',
        },

        https: true
    }
});
