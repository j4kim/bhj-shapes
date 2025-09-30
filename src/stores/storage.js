import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref, toRaw } from "vue";
import { useDrawingStore } from "./drawing";
import { cloneDeep } from "lodash-es";

export const useStorageStore = defineStore("storage", () => {
    const drawing = useDrawingStore();

    const counter = useStorage("bhj-stored-counter", 1);
    const compositions = useStorage("bhj-stored-compositions", []);

    const selected = ref(null);

    function storeCurrent() {
        compositions.value.push({
            id: counter.value,
            shapes: cloneDeep(toRaw(drawing.shapes)),
        });
        selected.value = counter.value;
        counter.value = counter.value + 1;
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
