<script setup>
import Konva from "konva";
import { getKonvaImage, loadImages, SIZE } from "./tools.js";
import { onMounted, useTemplateRef } from "vue";

const konvaContainer = useTemplateRef("konva-container");

onMounted(async () => {
    const stage = new Konva.Stage({
        container: konvaContainer.value,
        width: SIZE,
        height: SIZE,
    });

    const layer = new Konva.Layer();
    stage.add(layer);

    const images = await loadImages();

    images.forEach(function (image, i) {
        layer.add(getKonvaImage(image));
    });
})
</script>

<template>
    <div ref="konva-container"></div>
</template>
