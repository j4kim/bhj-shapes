import { defineConfig } from "vite";
import usePHP from "vite-plugin-php";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
    base: "",
    plugins: [
        usePHP(),
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
