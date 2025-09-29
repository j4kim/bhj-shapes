<script setup>
import { ref } from "vue"
import { files, settings } from "./tools"
import Slider from "./Slider.vue"

const open = ref(false)
</script>

<template>
    <div class="bg-gray-200/60">
        <div v-if="open" class="flex gap-4">
            <button @click="open = false">←</button>
            <div class="flex gap-2 flex-wrap">
                <Slider
                    v-model="settings.minScale"
                    label="Scale min"
                    :max="2"
                />
                <Slider
                    v-model="settings.maxScale"
                    label="Scale max"
                    :max="2"
                />
                <Slider v-model="settings.maxRotation" label="Rotation" />
                <Slider v-model="settings.dispersionX" label="Dispersion X" />
                <Slider v-model="settings.dispersionY" label="Dispersion Y" />
                <Slider
                    v-model="settings.take"
                    label="Shapes"
                    :max="files.length"
                />
            </div>
        </div>
        <button v-else @click="open = true">→</button>
    </div>
</template>
