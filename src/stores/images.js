import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useImagesStore = defineStore("images", () => {
    const files = JSON.parse(document.body.dataset.files);

    const images = ref([]);

    const imageNames = computed(() => {
        return images.value.map((img) => img.dataset.name);
    });

    const selectedNames = useStorage("bhj-selected-image-names", []);

    const selectedImages = computed(() => {
        return selectedNames.value
            .map((name) => getImage(name))
            .filter((i) => i);
    });

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
        if (selectedNames.value.length === 0) {
            selectedNames.value = imageNames.value;
        }
    }

    function getImage(name) {
        return images.value.find((img) => img.dataset.name == name);
    }

    return {
        files,
        images,
        imageNames,
        selectedNames,
        selectedImages,
        loadImages,
        getImage,
    };
});
