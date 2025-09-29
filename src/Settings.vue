<script setup>
import { ref } from "vue"
import { files, settings } from "./tools"
import Slider from "./Slider.vue"

const open = ref(false)
</script>

<template>
    <div>
        <div v-if="open" class="flex items-end gap-2">
            <button
                @click="open = false"
                class="bg-gray-200/50 backdrop-blur-sm px-2 py-1"
            >
                ←
            </button>
            <div
                class="flex gap-3 flex-wrap bg-gray-200/50 backdrop-blur-sm p-2"
            >
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
                    :step="1"
                />
            </div>
        </div>
        <button
            v-else
            @click="open = true"
            class="bg-gray-200/50 backdrop-blur-sm px-2 py-1"
        >
            →
        </button>
    </div>
</template>
