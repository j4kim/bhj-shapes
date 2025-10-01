import { defineStore } from "pinia";
import { ref } from "vue";

export const useImagesStore = defineStore("images", () => {
    const files = JSON.parse(document.body.dataset.files);

    const images = ref([]);

    function loadImage(filename) {
        return new Promise((resolve) => {
            const image = new Image();
            image.src = `shapes/${filename}`;
            image.dataset.name = filename;
            image.onload = () => resolve(image);
        });
    }

    async function loadImages() {
        const promises = files.map(loadImage);
        images.value = await Promise.all(promises);
    }

    return { files, images, loadImages };
});
