<script setup>
import Content from "../components/Content.vue";
import { onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useWindowSize } from "@vueuse/core";
import { useScrollStore } from "../stores/scroll";

const windowSize = useWindowSize();
const scroll = useScrollStore();

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
    ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => scroll.updateShapes(self.progress),
        onRefresh: (self) => scroll.updateShapes(self.progress),
    });
});
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
                    v-for="imageConfig in scroll.shapes"
                    :config="imageConfig"
                ></v-image>
            </v-layer>
        </v-stage>
    </div>
    <div class="relative z-10 pt-48 pb-[100vh]">
        <Content class="bg-white/60 p-4 backdrop-blur-xs"></Content>
    </div>
</template>
