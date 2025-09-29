const files = JSON.parse(document.body.dataset.files);

const stage = new Konva.Stage({
    container: "container",
    width: 1000,
    height: 1000,
});

const layer = new Konva.Layer();
files.forEach(function (file, i) {
    Konva.Image.fromURL(`shapes/${file}`, function (node) {
        console.log(file, i);
        node.setAttrs({
            width: 1000,
            height: 1000,
            globalCompositeOperation: "multiply",
        });
        layer.add(node);
    });
});
stage.add(layer);
