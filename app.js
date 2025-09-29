import { loadImages } from "./tools.js";

const SIZE = 1000;

const stage = new Konva.Stage({
    container: "container",
    width: SIZE,
    height: SIZE,
});

const layer = new Konva.Layer();
stage.add(layer);

const images = await loadImages();

images.forEach(function (image, i) {
    const ratio = image.width / image.height;
    const [width, height] =
        ratio > 1 ? [SIZE, SIZE / ratio] : [SIZE * ratio, SIZE];
    const shape = new Konva.Image({
        image,
        width,
        height,
        globalCompositeOperation: "multiply",
    });
    layer.add(shape);
});
