import path from "node:path";
import { defineConfig } from "vite";
import usePHP from "vite-plugin-php";
import tailwindcss from "@tailwindcss/vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    base: "",
    plugins: [
        usePHP(),
        tailwindcss(),
        viteStaticCopy({
            targets: [
                {
                    src: "shapes",
                    dest: ".",
                },
            ],
        }),
        vue(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
