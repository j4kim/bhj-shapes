<script setup>
import Content from "../components/Content.vue";
import { onMounted, useTemplateRef } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useWindowSize } from "@vueuse/core";
import { useScrollStore } from "../stores/scroll";
import { RouterLink } from "vue-router";

const windowSize = useWindowSize();
const scroll = useScrollStore();

const content = useTemplateRef("content");
const footer = useTemplateRef("footer");

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
    ScrollTrigger.create({
        trigger: content.value,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => scroll.updateShapes1(self.progress),
        onRefresh: (self) => scroll.updateShapes1(self.progress),
    });

    ScrollTrigger.create({
        trigger: footer.value,
        start: "top center",
        end: "bottom bottom",
        onUpdate: (self) => scroll.updateShapes2(self.progress),
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
    <div ref="content" class="relative z-10 pt-48 pb-[100vh]">
        <Content class="bg-white/60 p-4 backdrop-blur-xs"></Content>
    </div>
    <div ref="footer" class="h-[400vh]"></div>
    <RouterLink
        to="/"
        class="absolute top-0 right-0 px-1 text-sm z-20 opacity-50 hover:underline bg-white/40 backdrop-blur-sm"
        >randomizer</RouterLink
    >
</template>
