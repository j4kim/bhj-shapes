<script setup>
import { useTemplateRef } from "vue";
import DropdownMenuItem from "./ui/dropdown-menu/DropdownMenuItem.vue";

const form = useTemplateRef("form");
</script>

<template>
    <form ref="form" method="post" enctype="multipart/form-data">
        <label>
            <DropdownMenuItem class="font-medium"
                >Upload images</DropdownMenuItem
            >
            <input
                type="file"
                name="images[]"
                multiple
                hidden
                accept="image/*"
                @change="form.submit"
            />
        </label>
    </form>
</template>
