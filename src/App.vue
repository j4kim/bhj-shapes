<script setup>
import Settings from "./Settings.vue"
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
    <Settings class="absolute bottom-0 left-0 p-1"></Settings>
</template>
