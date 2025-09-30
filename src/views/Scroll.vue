<script setup>
import { getShapes, windowSize } from "../tools";
import Content from "../components/Content.vue";
import { onMounted, ref, toRaw, watch } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cloneDeep } from "lodash-es";

gsap.registerPlugin(ScrollTrigger);

const settings = {
    globalScale: windowSize.width.value < 600 ? 0.05 : 0.1,
    randomizeScale: 0.1,
    maxRotation: 720,
    dispersionX: 0.8,
    dispersionY: 0.8,
    transparency: 0,
    take: 1, //imagesStore.files.length,
    gco: "multiply",
};

const shapes = ref(getShapes(settings));
const initialState = ref(cloneDeep(toRaw(shapes.value)));

const endState = [
    {
        name: "BRAS_1.png",
        x: windowSize.width.value / 2,
        y: windowSize.height.value / 2,
        scaleX: 0.04,
        scaleY: 0.04,
        rotation: 0,
    },
];

const attrs = ["x", "y", "scaleX", "scaleY", "rotation"];

function lerp(start, end, t) {
    return start + (end - start) * t;
}

function updateShapes(progress) {
    if (!shapes.value.length) return;
    shapes.value.forEach((shape, i) => {
        const start = initialState.value[i];
        const end = endState[i];
        if (!start || !end) return;
        attrs.forEach((attr) => {
            shape[attr] = lerp(start[attr], end[attr], progress);
        });
    });
}

onMounted(() => {
    ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => updateShapes(self.progress),
        onRefresh: (self) => updateShapes(self.progress),
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
                    v-for="imageConfig in shapes"
                    :config="imageConfig"
                ></v-image>
            </v-layer>
        </v-stage>
    </div>
    <div class="relative z-10 pt-48 pb-[100vh]">
        <Content class="bg-white/50 p-4 backdrop-blur-xs"></Content>
    </div>
</template>
