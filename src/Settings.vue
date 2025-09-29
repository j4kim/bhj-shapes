<script setup>
import { ref } from "vue"

const open = ref(false)
</script>

<template>
    <div class="bg-gray-100">
        <div v-if="open">
            <button @click="open = false">←</button>
            settings here
        </div>
        <button v-else @click="open = true">→</button>
    </div>
</template>
