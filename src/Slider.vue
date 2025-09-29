<script setup>
defineProps({
    label: String,
    min: {
        type: Number,
        default: 0,
    },
    max: {
        type: Number,
        default: 1,
    },
    step: {
        type: Number,
        default: 0.1,
    },
})
const model = defineModel({ type: Number })
</script>

<template>
    <div class="flex flex-col">
        <small>{{ label }}</small>
        <input type="range" v-model.number="model" :min :max :step />
    </div>
</template>
