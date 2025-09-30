import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref, toRaw } from "vue";
import { useDrawingStore } from "./drawing";
import { cloneDeep } from "lodash-es";

export const useStorageStore = defineStore("storage", () => {
    const drawing = useDrawingStore();

    const compositions = useStorage("bhj-stored-compositions", []);

    const selected = ref(null);

    const nextId = computed(() => {
        const last = compositions.value[compositions.value.length - 1];
        return last ? last.id + 1 : 1;
    });

    function storeCurrent() {
        const id = nextId.value;
        compositions.value.push({
            id,
            shapes: cloneDeep(toRaw(drawing.shapes)),
        });
        selected.value = null;
        alert("Stored with id " + id);
    }

    function restore(id) {
        const comp = compositions.value.find((c) => c.id == id);
        if (!comp) {
            return;
        }
        drawing.restore(comp.shapes);
    }

    function handleChange(e) {
        const value = e.target.value;
        if (!value) return;
        if (value === "Store current") {
            return storeCurrent();
        }
        restore(value);
    }

    function removeSelected() {
        const index = compositions.value.findIndex(
            (c) => c.id == selected.value
        );
        if (index > -1) {
            compositions.value.splice(index, 1);
        }
        selected.value = null;
    }

    return { compositions, selected, handleChange, removeSelected };
});
