<script setup>
import { files } from "./tools";
import Slider from "./Slider.vue";
import gco from "./gco";
import { useStorage } from "@vueuse/core";
import { useDrawingStore } from "./stores/drawing";
import { useStorageStore } from "./stores/storage";

const drawing = useDrawingStore();
const storage = useStorageStore();

const open = useStorage("settings-open", false);

function download(e) {
    e.target.href =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(drawing.shapes));
}
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
                :max="files.length"
                :step="1"
            />
            <div class="flex flex-col">
                <small>Blending mode</small>
                <select
                    v-model="drawing.settings.gco"
                    class="px-1 py-0 text-sm"
                >
                    <option v-for="mode in gco">{{ mode }}</option>
                </select>
            </div>
            <label class="flex items-center gap-1">
                <input type="checkbox" v-model="drawing.enableTransformer" />
                Transformer
            </label>
            <div class="flex flex-col">
                <small class="flex justify-between">
                    Store
                    <button
                        v-if="storage.selected > 0"
                        @click="storage.removeSelected"
                    >
                        ×
                    </button>
                </small>
                <select
                    v-model="storage.selected"
                    @input="storage.handleChange"
                    class="px-1 py-0 text-sm"
                >
                    <option></option>
                    <option>Store current</option>
                    <option
                        v-for="comp in storage.compositions"
                        :value="comp.id"
                    >
                        {{ comp.id }}
                    </option>
                </select>
            </div>
            <a class="text-xs" download="scene.json" @click="download"
                >Download json</a
            >
        </div>
    </div>
</template>
