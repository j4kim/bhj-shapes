<script setup>
import { useStorageStore } from "@/stores/storage";

const storage = useStorageStore();
</script>

<template>
    <div class="flex flex-col">
        <small class="flex justify-between">
            Store
            <button v-if="storage.selected > 0" @click="storage.removeSelected">
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
            <option v-for="comp in storage.compositions" :value="comp.id">
                {{ comp.id }}
            </option>
        </select>
    </div>
</template>
