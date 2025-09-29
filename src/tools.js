import { ref } from "vue";

export const images = ref([]);

export async function loadImages() {
    const files = JSON.parse(document.body.dataset.files);

    const promises = files.map((file) => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = `shapes/${file}`;
            image.onload = () => resolve(image);
        });
    });

    images.value = await Promise.all(promises);
}
