<script setup>
import { imageConfigs, windowSize } from "./tools"
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
