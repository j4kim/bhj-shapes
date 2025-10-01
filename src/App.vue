<script setup>
import { useImagesStore } from "./stores/images";

const imageStore = useImagesStore();

imageStore.loadImages();
</script>

<template>
    <RouterView v-if="imageStore.images.length" />
</template>
