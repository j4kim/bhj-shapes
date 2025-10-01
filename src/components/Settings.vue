<script setup>
import Slider from "./Slider.vue";
import { useStorage } from "@vueuse/core";
import { useDrawingStore } from "../stores/drawing";
import { useImagesStore } from "../stores/images";
import Storage from "./Storage.vue";

const drawing = useDrawingStore();
const imagesStore = useImagesStore();

const open = useStorage("bhj-settings-open", false);
</script>

<template>
    <div class="flex items-end gap-2">
        <button
            @click="drawing.reload"
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
                v-model="drawing.settings.globalScale"
                label="Global scale"
                :step="0.01"
                :max="2"
            />
            <Slider
                v-model="drawing.settings.randomizeScale"
                label="Randomize scale"
            />
            <Slider
                v-model="drawing.settings.maxRotation"
                label="Rotation"
                :max="180"
                :step="1"
            />
            <Slider
                v-model="drawing.settings.dispersionX"
                label="Dispersion X"
            />
            <Slider
                v-model="drawing.settings.dispersionY"
                label="Dispersion Y"
            />
            <Slider
                v-model="drawing.settings.transparency"
                label="Transparency"
            />
            <Slider
                v-model="drawing.settings.take"
                label="Shapes"
                :max="imagesStore.files.length"
                :step="1"
            />
            <div class="flex flex-col">
                <small>Blending mode</small>
                <select
                    v-model="drawing.settings.gco"
                    class="px-1 py-0 text-sm"
                >
                    <option></option>
                    <option>lighter</option>
                    <option>xor</option>
                    <option>multiply</option>
                    <option>screen</option>
                    <option>overlay</option>
                    <option>darken</option>
                    <option>lighten</option>
                    <option>color-dodge</option>
                    <option>color-burn</option>
                    <option>hard-light</option>
                    <option>soft-light</option>
                    <option>difference</option>
                    <option>exclusion</option>
                    <option>hue</option>
                    <option>saturation</option>
                    <option>color</option>
                    <option>luminosity</option>
                </select>
            </div>
            <label class="flex items-center gap-1">
                <input type="checkbox" v-model="drawing.enableTransformer" />
                Transformer
            </label>
            <Storage></Storage>
        </div>
    </div>
</template>
