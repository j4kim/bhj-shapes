import { defineConfig } from "vite";
import usePHP from "vite-plugin-php";
import tailwindcss from "@tailwindcss/vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

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
    ],
});
