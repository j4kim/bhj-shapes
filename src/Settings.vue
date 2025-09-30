<script setup>
import { files, reload, settings } from "./tools";
import Slider from "./Slider.vue";
import gco from "./gco";
import { useStorage } from "@vueuse/core";

const open = useStorage("settings-open", false);
</script>

<template>
    <div class="flex items-end gap-2">
        <button
            @click="reload"
            class="bg-gray-200/50 backdrop-blur-sm px-2 py-1"
        >
            ⟳
        </button>
        <button
            @click="open = !open"
            class="bg-gray-200/50 backdrop-blur-sm px-2 py-1"
        >
            {{ open ? "←" : "→" }}
        </button>
        <div
            v-if="open"
            class="flex gap-4 flex-wrap bg-gray-200/50 backdrop-blur-sm p-2 px-4"
        >
            <Slider
                v-model="settings.globalScale"
                label="Global scale"
                :step="0.01"
            />
            <Slider v-model="settings.randomizeScale" label="Randomize scale" />
            <Slider
                v-model="settings.maxRotation"
                label="Rotation"
                :max="180"
                :step="1"
            />
            <Slider v-model="settings.dispersionX" label="Dispersion X" />
            <Slider v-model="settings.dispersionY" label="Dispersion Y" />
            <Slider v-model="settings.transparency" label="Transparency" />
            <Slider
                v-model="settings.take"
                label="Shapes"
                :max="files.length"
                :step="1"
            />
            <div class="flex flex-col">
                <small>Blending mode</small>
                <select v-model="settings.gco">
                    <option v-for="mode in gco">{{ mode }}</option>
                </select>
            </div>
        </div>
    </div>
</template>
