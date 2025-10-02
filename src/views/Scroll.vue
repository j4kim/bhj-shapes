<script setup>
import Content from "../components/Content.vue";
import { computed, onMounted, ref, useTemplateRef } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useWindowSize } from "@vueuse/core";
import { useScrollStore } from "../stores/scroll";
import { RouterLink } from "vue-router";
import Konva from "konva";
import { easeInOutSine, easeInSine } from "easing-utils";

const windowSize = useWindowSize();
const scroll = useScrollStore();

const content = useTemplateRef("content");
const footer = useTemplateRef("footer");

gsap.registerPlugin(ScrollTrigger);

const vImages = useTemplateRef("v-images");

const step = ref(1);
const progress = ref(0);

const states = computed(() => {
    return [
        [scroll.startState, scroll.middleState],
        [scroll.middleState, scroll.endState],
    ][step.value - 1];
});

const animateStep = (i, ease) => (scroll) => {
    step.value = i;
    progress.value = ease(scroll.progress);
};

const animateStep1 = animateStep(1, easeInOutSine);

const animateStep2 = animateStep(2, easeInSine);

onMounted(() => {
    vImages.value.forEach((vImage, index) => {
        const node = vImage.getNode();
        const anim = new Konva.Animation((frame) => {
            node.setAttrs(
                scroll.getShapeAttrs(index, states.value, progress.value)
            );
        }, node.getLayer());
        anim.start();
    });

    ScrollTrigger.create({
        trigger: content.value,
        start: "top top",
        end: "bottom bottom",
        onUpdate: animateStep1,
        onEnter: animateStep1,
    });

    ScrollTrigger.create({
        trigger: footer.value,
        start: "top center",
        end: "bottom bottom",
        onUpdate: animateStep2,
        onEnter: animateStep2,
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
                    ref="v-images"
                ></v-image>
            </v-layer>
        </v-stage>
    </div>
    <div ref="content" class="relative z-10 pt-48 pb-[100vh]">
        <Content class="bg-white/60 p-4 backdrop-blur-xs"></Content>
    </div>
    <div ref="footer" class="relative z-10 h-[400vh]"></div>
    <RouterLink
        to="/"
        class="absolute top-0 right-0 px-1 text-sm z-20 opacity-50 hover:underline bg-white/40 backdrop-blur-sm"
        >randomizer</RouterLink
    >
</template>
