<script setup>
import {
    enableTransformer,
    files,
    imageConfigs,
    reload,
    restore,
    storedSettings,
} from "./tools";
import Slider from "./Slider.vue";
import gco from "./gco";
import { useStorage } from "@vueuse/core";
import { ref } from "vue";

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
            imageConfigs: imageConfigs.value,
        });
        selectedStored.value = null;
        alert("Stored with id " + id);
        return;
    }
    const config = store.value.find(({ id }) => id == value);
    restore(config.imageConfigs);
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
        encodeURIComponent(JSON.stringify(imageConfigs.value));
}
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
                v-model="storedSettings.globalScale"
                label="Global scale"
                :step="0.01"
                :max="2"
            />
            <Slider
                v-model="storedSettings.randomizeScale"
                label="Randomize scale"
            />
            <Slider
                v-model="storedSettings.maxRotation"
                label="Rotation"
                :max="180"
                :step="1"
            />
            <Slider v-model="storedSettings.dispersionX" label="Dispersion X" />
            <Slider v-model="storedSettings.dispersionY" label="Dispersion Y" />
            <Slider
                v-model="storedSettings.transparency"
                label="Transparency"
            />
            <Slider
                v-model="storedSettings.take"
                label="Shapes"
                :max="files.length"
                :step="1"
            />
            <div class="flex flex-col">
                <small>Blending mode</small>
                <select v-model="storedSettings.gco" class="px-1 py-0 text-sm">
                    <option v-for="mode in gco">{{ mode }}</option>
                </select>
            </div>
            <label class="flex items-center gap-1">
                <input type="checkbox" v-model="enableTransformer" />
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
