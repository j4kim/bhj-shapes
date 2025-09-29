export const SIZE = 1000;

/**
 * @returns {Promise<HtmlImageElement[]>}
 */
export async function loadImages() {
    const files = JSON.parse(document.body.dataset.files);

    const promises = files.map((file) => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = `shapes/${file}`;
            image.onload = () => resolve(image);
        });
    });

    return await Promise.all(promises);
}

/**
 * @param {HtmlImageElement} image
 * @returns {Konva.Image}
 */
export function getKonvaImage(image) {
    const ratio = image.width / image.height;
    const [width, height] =
        ratio > 1 ? [SIZE, SIZE / ratio] : [SIZE * ratio, SIZE];
    return new Konva.Image({
        image,
        width,
        height,
        globalCompositeOperation: "multiply",
    });
}
