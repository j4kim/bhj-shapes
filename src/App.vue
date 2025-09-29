<script setup>
import { computed } from "vue";
import { images } from "./tools";
import { useWindowSize } from "@vueuse/core";

const windowSize = useWindowSize();

const windowRatio = computed(
    () => windowSize.width.value / windowSize.height.value
);

const imageConfigs = computed(() => {
    return images.value.map((image) => {
        const ratio = image.width / image.height;
        const ww = windowSize.width.value;
        const wh = windowSize.height.value;
        const [maxW, maxH] =
            ratio > windowRatio.value ? [ww, ww / ratio] : [wh * ratio, wh];
        return {
            image,
            width: maxW,
            height: maxH,
            globalCompositeOperation: "multiply",
        };
    });
});
</script>

<template>
    <v-stage
        :config="{
            width: windowSize.width.value,
            height: windowSize.height.value,
        }"
    >
        <v-layer>
            <v-image
                v-for="imageConfig in imageConfigs"
                v-bind="imageConfig"
            ></v-image>
        </v-layer>
    </v-stage>
</template>
