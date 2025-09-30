<script setup>
import { imageConfigs, windowSize } from "./tools";
import Content from "./Content.vue";
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
                :config="imageConfig"
            ></v-image>
        </v-layer>
    </v-stage>
    <Content></Content>
</template>
