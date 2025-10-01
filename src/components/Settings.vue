<script setup>
import Slider from "./Slider.vue";
import { useStorage } from "@vueuse/core";
import { useDrawingStore } from "../stores/drawing";
import { useImagesStore } from "../stores/images";
import Storage from "./Storage.vue";
import Library from "./Library.vue";
import { RotateCw, Settings2, X } from "lucide-vue-next";

const drawing = useDrawingStore();
const imagesStore = useImagesStore();

const open = useStorage("bhj-settings-open", false);
</script>

<template>
    <div class="flex items-end gap-2">
        <div class="flex gap-2 shrink-0">
            <div class="p-1 hover:opacity-60 bg-white/20 backdrop-blur-sm">
                <RotateCw @click="drawing.reload" />
            </div>
            <div class="p-1 hover:opacity-60 bg-white/20 backdrop-blur-sm">
                <Settings2 v-if="!open" @click="open = true" />
                <X v-if="open" @click="open = false" />
            </div>
        </div>
        <div
            v-if="open"
            class="flex gap-4 flex-wrap bg-white/20 backdrop-blur-sm p-2 px-4"
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
                :max="imagesStore.selectedNames.length"
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
            <Storage />
            <Library />
        </div>
    </div>
</template>
