<script setup>
import { useImagesStore } from "./stores/images";
import { Toaster } from "@/components/ui/sonner";
import { onMounted } from "vue";
import { toast } from "vue-sonner";
import "vue-sonner/style.css";

const imageStore = useImagesStore();

imageStore.loadImages();

onMounted(() => {
    const toasts = JSON.parse(document.body.dataset.toasts);
    toasts.forEach(({ type, message }) => {
        toast[type](message);
    });
});
</script>

<template>
    <Toaster />
    <RouterView v-if="imageStore.images.length" />
</template>
