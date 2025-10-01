import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useStorageStore } from "./storage";
import { useImagesStore } from "./images";
import { useToolsStore } from "./tools";

export const useDrawingStore = defineStore("drawing", () => {
    const storage = useStorageStore();
    const imagesStore = useImagesStore();
    const tools = useToolsStore();

    const settings = useStorage("bhj-settings", {
        globalScale: 0.1,
        randomizeScale: 0.2,
        maxRotation: 45,
        dispersionX: 0.5,
        dispersionY: 0.5,
        transparency: 0,
        take: imagesStore.files.length,
        gco: "multiply",
        shuffle: true,
    });

    const enableTransformer = ref(false);

    const shapes = ref([]);

    function reload() {
        storage.selected = null;
        shapes.value = tools.getShapes(settings.value, true);
    }

    function restore(configs) {
        shapes.value = configs.map((c) => ({
            ...c,
            image: imagesStore.getImage(c.name),
        }));
    }

    return {
        settings,
        enableTransformer,
        shapes,
        reload,
        restore,
    };
});
