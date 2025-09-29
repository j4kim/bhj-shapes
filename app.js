const files = JSON.parse(document.body.dataset.files);

const promises = files.map((file) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = `shapes/${file}`;
        image.onload = () => resolve(image);
    });
});

const SIZE = 1000;

const stage = new Konva.Stage({
    container: "container",
    width: SIZE,
    height: SIZE,
});

const layer = new Konva.Layer();
stage.add(layer);

const images = await Promise.all(promises);

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
