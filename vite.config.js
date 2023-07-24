import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                selector: resolve(__dirname, 'selector.html'),
                player: resolve(__dirname, 'player.html'),
                finish: resolve(__dirname, 'finish.html'),
            },
        },
    },
})