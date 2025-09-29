import Konva from "konva";
import { getKonvaImage, loadImages, SIZE } from "./tools.js";

const stage = new Konva.Stage({
    container: "container",
    width: SIZE,
    height: SIZE,
});

const layer = new Konva.Layer();
stage.add(layer);

const images = await loadImages();

images.forEach(function (image, i) {
    layer.add(getKonvaImage(image));
});
