import { useWindowSize } from "@vueuse/core";
import { cloneDeep } from "lodash-es";
import { ref, toRaw } from "vue";
import { defineStore } from "pinia";
import { useToolsStore } from "./tools";
import { useImagesStore } from "./images";

export const useScrollStore = defineStore("scroll", () => {
    const windowSize = useWindowSize();
    const tools = useToolsStore();
    const imagesStore = useImagesStore();

    const startSettings = {
        globalScale: windowSize.width.value < 600 ? 0.05 : 0.1,
        randomizeScale: 0.1,
        maxRotation: 720,
        dispersionX: 0.8,
        dispersionY: 0.8,
        transparency: 0,
        take: imagesStore.files.length,
        gco: "multiply",
    };

    const endSettings = {
        globalScale: windowSize.width.value < 600 ? 0.025 : 0.05,
        randomizeScale: 0,
        maxRotation: 0,
        dispersionX: 0,
        dispersionY: 0,
        transparency: 0,
        take: imagesStore.files.length,
        gco: "multiply",
    };

    const shapes = ref(tools.getShapes(startSettings));
    const startState = cloneDeep(toRaw(shapes.value));
    const endState = tools.getShapes(endSettings);

    const attrs = ["x", "y", "scaleX", "scaleY", "rotation"];

    function lerp(start, end, t) {
        return start + (end - start) * t;
    }

    function updateShapes(progress) {
        if (!shapes.value.length) return;
        shapes.value.forEach((shape, i) => {
            const start = startState[i];
            const end = endState[i];
            if (!start || !end) return;
            attrs.forEach((attr) => {
                shape[attr] = lerp(start[attr], end[attr], progress);
            });
        });
    }

    return { shapes, updateShapes };
});
