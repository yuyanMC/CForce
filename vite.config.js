import {resolve} from 'path';
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    base: "./",
    build: {
        rollupOptions: {
            input: {
                selector: resolve(__dirname, 'selector.html'),
                player: resolve(__dirname, 'player.html'),
                finish: resolve(__dirname, 'finish.html'),
                maker: resolve(__dirname, 'maker.html'),
            },
        },
    },
    plugins: [vue()],
});