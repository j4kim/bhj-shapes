<script setup>
import { getKonvaImage, loadImages } from "./tools.js";
import { ref } from "vue";

const stageSize = {
    width: window.innerWidth,
    height: window.innerHeight
};

const images = ref([])

loadImages().then(imgs => {
    images.value = imgs.map(img => getKonvaImage(img))
});
</script>

<template>
    <v-stage :config="stageSize">
        <v-layer>
            <v-image v-for="img in images" v-bind="img"></v-image>
        </v-layer>
    </v-stage>
</template>
