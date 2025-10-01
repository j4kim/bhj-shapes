<script setup>
import { ref, useTemplateRef } from "vue";
import DropdownMenu from "./ui/dropdown-menu/DropdownMenu.vue";
import DropdownMenuCheckboxItem from "./ui/dropdown-menu/DropdownMenuCheckboxItem.vue";
import DropdownMenuContent from "./ui/dropdown-menu/DropdownMenuContent.vue";
import DropdownMenuLabel from "./ui/dropdown-menu/DropdownMenuLabel.vue";
import DropdownMenuSeparator from "./ui/dropdown-menu/DropdownMenuSeparator.vue";
import DropdownMenuTrigger from "./ui/dropdown-menu/DropdownMenuTrigger.vue";
import { onClickOutside } from "@vueuse/core";
import { useImagesStore } from "@/stores/images";
import { useDrawingStore } from "@/stores/drawing";

const imageStore = useImagesStore();
const drawing = useDrawingStore();

const menu = useTemplateRef("menu");

const open = ref(false);

onClickOutside(menu, () => (open.value = false), {
    ignore: ["[data-reka-popper-content-wrapper]"],
});

function toggle(name) {
    if (imageStore.selectedNames.includes(name)) {
        imageStore.selectedNames = imageStore.selectedNames.filter(
            (n) => n !== name
        );
    } else {
        imageStore.selectedNames.push(name);
    }
    drawing.settings.take = imageStore.selectedNames.length;
}
</script>

<template>
    <DropdownMenu ref="menu" :open>
        <DropdownMenuTrigger @click="open = true">Library</DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
            <DropdownMenuLabel>Shapes</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
                v-for="name in imageStore.imageNames"
                :value="name"
                @update:modelValue="toggle(name)"
                :modelValue="imageStore.selectedNames.includes(name)"
            >
                <img :src="imageStore.getImage(name).src" class="w-4 h-4 object-contain"></img> {{ name }}
            </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
