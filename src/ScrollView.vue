<script setup>
import { imageConfigs, windowSize } from "./tools";
import Content from "./Content.vue";
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
