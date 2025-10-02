import { useWindowSize } from "@vueuse/core";
import { cloneDeep } from "lodash-es";
import { ref, toRaw } from "vue";
import { defineStore } from "pinia";
import { useToolsStore } from "./tools";

export const useScrollStore = defineStore("scroll", () => {
    const windowSize = useWindowSize();
    const tools = useToolsStore();

    function scaleToScreen(v) {
        const multiplier = windowSize.width.value < 600 ? 0.5 : 1;
        return v * multiplier;
    }

    const take = 10;

    const startSettings = {
        globalScale: scaleToScreen(0.15),
        randomizeScale: 0.2,
        maxRotation: 720,
        dispersionX: 1,
        dispersionY: 1,
        transparency: 0,
        take,
        gco: "multiply",
    };

    const middleSettings = {
        globalScale: scaleToScreen(0.05),
        randomizeScale: 0,
        maxRotation: 0,
        dispersionX: 0,
        dispersionY: 0,
        transparency: 0,
        take,
        gco: "multiply",
    };

    const endSettings = {
        globalScale: scaleToScreen(-0.8),
        randomizeScale: 1,
        maxRotation: 360,
        dispersionX: 5,
        dispersionY: 5,
        transparency: 1,
        take,
        gco: "multiply",
    };

    const fineTuning = [
        {
            // BRAS_1
            x: scaleToScreen(-100),
        },
        {
            // BRAS_2
            x: scaleToScreen(100),
        },
        {
            // FORME
            y: scaleToScreen(30),
            scaleX: scaleToScreen(-0.02),
            scaleY: scaleToScreen(-0.02),
        },
        {
            // LAC
            y: scaleToScreen(60),
        },
        {
            // LUNE
            x: scaleToScreen(60),
            y: scaleToScreen(-200),
        },
        {
            // NEZ
            y: scaleToScreen(-120),
        },
        {
            // PIED
            x: scaleToScreen(-100),
            y: scaleToScreen(150),
        },
        {
            // PIED_2
            x: scaleToScreen(100),
            y: scaleToScreen(200),
        },
        {
            // YEUX_1
            x: scaleToScreen(-100),
            y: scaleToScreen(-50),
        },
        {
            // YEUX_2
            x: scaleToScreen(100),
            y: scaleToScreen(-80),
            rotation: 30,
            scaleX: scaleToScreen(0.03),
            scaleY: scaleToScreen(0.03),
        },
    ];

    function fineTune(shapes) {
        shapes.forEach((shape, index) => {
            const tuning = fineTuning[index];
            if (!tuning) return;
            for (const key in tuning) {
                shape[key] = shape[key] + tuning[key];
            }
        });
        return shapes;
    }

    const shapes = ref(tools.getShapes(startSettings));
    const startState = cloneDeep(toRaw(shapes.value));
    const middleState = fineTune(tools.getShapes(middleSettings));
    const endState = tools.getShapes(endSettings);

    const attrs = ["x", "y", "scaleX", "scaleY", "rotation", "opacity"];

    function lerp(start, end, t) {
        return start + (end - start) * t;
    }

    function getShapeAttrs(shapeIndex, fromToStates, progress) {
        const start = fromToStates[0][shapeIndex];
        const end = fromToStates[1][shapeIndex];
        const values = [];
        attrs.forEach((attr) => {
            values[attr] = lerp(start[attr], end[attr], progress);
        });
        return values;
    }

    return {
        shapes,
        startState,
        middleState,
        endState,
        getShapeAttrs,
    };
});
