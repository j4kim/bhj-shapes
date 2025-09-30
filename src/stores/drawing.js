import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";
import { files, getShapes, images } from "../tools";
import { useStorageStore } from "./storage";

export const useDrawingStore = defineStore("drawing", () => {
    const storage = useStorageStore();

    const settings = useStorage("settings", {
        globalScale: 0.1,
        randomizeScale: 0.2,
        maxRotation: 45,
        dispersionX: 0.5,
        dispersionY: 0.5,
        transparency: 0,
        take: files.length,
        gco: "multiply",
        shuffle: true,
    });

    const enableTransformer = ref(false);

    const shapes = ref([]);

    function reload() {
        storage.selected = null;
        shapes.value = getShapes(settings.value);
    }

    function restore(configs) {
        shapes.value = configs.map((c) => {
            const image = images.value.find(
                (img) => img.dataset.name == c.name
            );
            return { ...c, image };
        });
    }

    return {
        settings,
        enableTransformer,
        shapes,
        reload,
        restore,
    };
});
