<script setup>
import { files } from "./tools";
import Slider from "./Slider.vue";
import gco from "./gco";
import { useStorage } from "@vueuse/core";
import { ref } from "vue";
import { useDrawingStore } from "./stores/drawing";

const drawing = useDrawingStore();

const open = useStorage("settings-open", false);

const store = useStorage("settings-store", []);

const selectedStored = ref();

function handleStoreChange(e) {
    const value = e.target.value;
    if (!value) return;
    if (value === "Store current") {
        const last = store.value[store.value.length - 1];
        const id = last ? last.id + 1 : 1;
        store.value.push({
            id,
            shapes: drawing.shapes,
        });
        selectedStored.value = null;
        alert("Stored with id " + id);
        return;
    }
    const config = store.value.find(({ id }) => id == value);
    if (!config) {
        console.warn("no config found for id", id, "in store", store.value);
        return;
    }
    drawing.restore(config.shapes);
}

function removeSelectedStored() {
    const index = store.value.findIndex(({ id }) => id == selectedStored.value);
    if (index > -1) {
        store.value.splice(index, 1);
    }
    selectedStored.value = null;
}

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
                        v-if="selectedStored > 0"
                        @click="removeSelectedStored"
                    >
                        ×
                    </button>
                </small>
                <select
                    v-model="selectedStored"
                    @input="handleStoreChange"
                    class="px-1 py-0 text-sm"
                >
                    <option></option>
                    <option>Store current</option>
                    <option
                        v-for="storedConfig in store"
                        :value="storedConfig.id"
                    >
                        {{ storedConfig.id }}
                    </option>
                </select>
            </div>
            <a class="text-xs" download="scene.json" @click="download"
                >Download json</a
            >
        </div>
    </div>
</template>
