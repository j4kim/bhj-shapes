<script setup>
import { ref, useTemplateRef } from "vue";
import DropdownMenu from "./ui/dropdown-menu/DropdownMenu.vue";
import DropdownMenuCheckboxItem from "./ui/dropdown-menu/DropdownMenuCheckboxItem.vue";
import DropdownMenuContent from "./ui/dropdown-menu/DropdownMenuContent.vue";
import DropdownMenuLabel from "./ui/dropdown-menu/DropdownMenuLabel.vue";
import DropdownMenuSeparator from "./ui/dropdown-menu/DropdownMenuSeparator.vue";
import DropdownMenuTrigger from "./ui/dropdown-menu/DropdownMenuTrigger.vue";
import { onClickOutside } from "@vueuse/core";

const menu = useTemplateRef("menu");

const open = ref(false);

onClickOutside(menu, () => (open.value = false), {
    ignore: ["[data-reka-popper-content-wrapper]"],
});

const imageNames = ref(["yolo", "yala"]);

const selected = ref(["yolo"]);

function toggle(name) {
    if (selected.value.includes(name)) {
        selected.value.splice(selected.value.indexOf(name), 1);
    } else {
        selected.value.push(name);
    }
}
</script>

<template>
    <DropdownMenu ref="menu" :open>
        <DropdownMenuTrigger @click="open = true">Library</DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
            <DropdownMenuLabel>Shapes</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
                v-for="name in imageNames"
                :value="name"
                @update:modelValue="toggle(name)"
                :modelValue="selected.includes(name)"
            >
                {{ name }}
            </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
