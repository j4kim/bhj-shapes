import { useWindowSize } from "@vueuse/core";
import { shuffle, take } from "lodash-es";
import { useImagesStore } from "./images";
import { defineStore } from "pinia";

export const useToolsStore = defineStore("tools", () => {
    const windowSize = useWindowSize();

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function getImageConfig(image, settings) {
        const scaleFactor = settings.randomizeScale;
        const gScale = settings.globalScale;
        const scale = gScale * random(1 - scaleFactor, 1 + scaleFactor);
        const cx = windowSize.width.value / 2;
        const cy = windowSize.height.value / 2;
        const dispX = settings.dispersionX;
        const dispY = settings.dispersionY;
        const x = cx + random(-1 * cx * dispX, cx * dispX);
        const y = cy + random(-1 * cy * dispY, cy * dispY);
        return {
            image,
            name: image.dataset.name,
            x,
            y,
            offsetX: image.width / 2,
            offsetY: image.width / 2,
            scaleX: scale,
            scaleY: scale,
            width: image.width,
            height: image.height,
            rotation: random(-1 * settings.maxRotation, settings.maxRotation),
            opacity: random(1 - settings.transparency, 1),
            globalCompositeOperation: settings.gco,
        };
    }

    function getShapes(settings, selectedOnly = false) {
        const imgStore = useImagesStore();
        const images = selectedOnly ? imgStore.selectedImages : imgStore.images;
        const shuffled = settings.shuffle ? shuffle(images) : images;
        const subset = take(shuffled, settings.take);
        return subset.map((img) => getImageConfig(img, settings));
    }

    return {
        getShapes,
    };
});
