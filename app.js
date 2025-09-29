const files = JSON.parse(document.body.dataset.files);

const SIZE = 1000;

const stage = new Konva.Stage({
    container: "container",
    width: SIZE,
    height: SIZE,
});

const layer = new Konva.Layer();
files.forEach(function (file, i) {
    Konva.Image.fromURL(`shapes/${file}`, function (node) {
        const image = node.image();
        const ratio = image.width / image.height;
        const [width, height] =
            ratio > 1 ? [SIZE, SIZE / ratio] : [SIZE * ratio, SIZE];
        console.log(file, width, height);
        node.setAttrs({
            width,
            height,
            globalCompositeOperation: "multiply",
        });
        layer.add(node);
    });
});
stage.add(layer);
