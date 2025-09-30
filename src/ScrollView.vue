<script setup>
import { files, imageConfigs, images, reload, windowSize } from "./tools";
import Content from "./Content.vue";
import { onMounted, useTemplateRef, watch } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
    ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
            console.log(self.progress);
        },
    });
});

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
    <div class="relative z-10 pt-48 pb-[100vh]">
        <Content class="bg-white/50 p-4 backdrop-blur-xs"></Content>
    </div>
</template>
