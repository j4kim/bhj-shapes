<script setup>
import { files, imageConfigs, images, reload, windowSize } from "./tools";
import Content from "./Content.vue";
import { watch } from "vue";

const settings = {
    globalScale: windowSize.width.value < 600 ? 0.05 : 0.1,
    randomizeScale: 0.1,
    maxRotation: 45,
    dispersionX: 0.8,
    dispersionY: 0.8,
    transparency: 0,
    take: files.length,
    gco: "multiply",
};

watch(
    images,
    () => {
        if (images.value.length) {
            reload(settings);
        }
    },
    { immediate: true }
);
</script>

<template>
    <div class="fixed top-0 z-0">
        <v-stage
            :config="{
                width: windowSize.width.value,
                height: windowSize.height.value,
            }"
        >
            <v-layer>
                <v-image
                    v-for="imageConfig in imageConfigs"
                    :config="imageConfig"
                ></v-image>
            </v-layer>
        </v-stage>
    </div>
    <Content class="relative z-10 bg-white/50 p-4 backdrop-blur-xs"></Content>
</template>
