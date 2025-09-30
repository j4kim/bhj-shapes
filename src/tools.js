import { computed, ref, watch } from "vue";
import { useStorage, useWindowSize } from "@vueuse/core";
import { shuffle, take } from "lodash-es";

export const files = JSON.parse(document.body.dataset.files);

export const images = ref([]);

function loadImage(filename) {
    return new Promise((resolve) => {
        const image = new Image();
        image.src = `shapes/${filename}`;
        image.dataset.name = filename;
        image.onload = () => resolve(image);
    });
}

export async function loadImages() {
    const promises = files.map(loadImage);
    images.value = await Promise.all(promises);
}

export const windowSize = useWindowSize();

export const windowRatio = computed(
    () => windowSize.width.value / windowSize.height.value
);

export const storedSettings = useStorage("settings", {
    globalScale: 0.1,
    randomizeScale: 0.2,
    maxRotation: 45,
    dispersionX: 0.5,
    dispersionY: 0.5,
    transparency: 0,
    take: files.length,
    gco: "multiply",
});

export const enableTransformer = ref(false);

function random(min, max) {
    return Math.random() * (max - min) + min;
}

export function getImageConfig(image, settings) {
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

export const imageConfigs = ref([]);

export function reload(settings) {
    const shuffled = shuffle(images.value);
    const subset = take(shuffled, settings.take);
    imageConfigs.value = subset.map((img) => getImageConfig(img, settings));
}

export function restore(configs) {
    imageConfigs.value = configs.map((c) => {
        const image = images.value.find((img) => img.dataset.name == c.name);
        return { ...c, image };
    });
}
