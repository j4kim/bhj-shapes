<script setup>
import { ref } from "vue"
import { files, settings } from "./tools"

const open = ref(false)
</script>

<template>
    <div class="bg-gray-100">
        <div v-if="open" class="flex gap-4">
            <button @click="open = false">←</button>
            <div class="flex gap-2 flex-wrap">
                <div class="flex flex-col">
                    <small>Scale min</small>
                    <input
                        type="range"
                        v-model.number="settings.minScale"
                        min="0"
                        max="2"
                        step="0.1"
                    />
                </div>
                <div class="flex flex-col">
                    <small>Scale max</small>
                    <input
                        type="range"
                        v-model.number="settings.maxScale"
                        min="0"
                        max="2"
                        step="0.1"
                    />
                </div>
                <div class="flex flex-col">
                    <small>Rotation</small>
                    <input
                        type="range"
                        v-model.number="settings.maxRotation"
                        min="0"
                        max="1"
                        step="0.1"
                    />
                </div>
                <div class="flex flex-col">
                    <small>Dispersion</small>
                    <input
                        type="range"
                        v-model.number="settings.dispersion"
                        min="0"
                        max="1"
                        step="0.1"
                    />
                </div>
                <div class="flex flex-col">
                    <small>Shapes</small>
                    <input
                        type="range"
                        v-model.number="settings.take"
                        min="1"
                        :max="files.length"
                    />
                </div>
            </div>
        </div>
        <button v-else @click="open = true">→</button>
    </div>
</template>
