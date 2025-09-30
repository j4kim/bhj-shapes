<script setup>
import { ref, useTemplateRef, watch } from "vue";
import Settings from "./Settings.vue";
import { images, windowSize } from "./tools";
import { useDrawStore } from "./stores/draw";

const dStore = useDrawStore();

watch(
    [images, dStore.settings],
    () => {
        if (images.value.length) {
            dStore.reload();
        }
    },
    { immediate: true }
);

const transformer = useTemplateRef("transformer");
const selectedShapeName = ref("");

function handleDragEnd(e) {
    if (e.target.className !== "Image") return;

    const shape = dStore.shapes.find((i) => i.name === e.target.name());

    shape.x = e.target.x();
    shape.y = e.target.y();
}

function handleTransformEnd(e) {
    // find element in our state
    const shape = dStore.shapes.find((i) => i.name === selectedShapeName.value);
    if (!shape) return;

    // update the state with new properties
    shape.x = e.target.x();
    shape.y = e.target.y();
    shape.rotation = e.target.rotation();
    shape.scaleX = e.target.scaleX();
    shape.scaleY = e.target.scaleY();
}

function updateTransformer() {
    const transformerNode = transformer.value.getNode();
    const stage = transformerNode.getStage();
    const selected = selectedShapeName.value;

    const selectedNode = stage.findOne("." + selected);
    // do nothing if selected node is already attached
    if (selectedNode === transformerNode.node()) {
        return;
    }

    if (selectedNode) {
        // attach to selected node
        transformerNode.nodes([selectedNode]);
    } else {
        // remove transformer
        transformerNode.nodes([]);
    }
}

function handleStageMouseDown(e) {
    if (!dStore.enableTransformer) return;

    // clicked on stage - clear selection
    if (e.target === e.target.getStage()) {
        selectedShapeName.value = "";
        updateTransformer();
        return;
    }

    // clicked on transformer - do nothing
    const clickedOnTransformer =
        e.target.getParent().className === "Transformer";
    if (clickedOnTransformer) {
        return;
    }

    // find clicked shape by its name
    const name = e.target.name();
    const shape = dStore.shapes.find((r) => r.name === name);
    if (shape) {
        selectedShapeName.value = name;
    } else {
        selectedShapeName.value = "";
    }
    updateTransformer();
}

watch(
    () => dStore.enableTransformer,
    (val) => {
        if (!val) {
            selectedShapeName.value = "";
            updateTransformer();
        }
    }
);
</script>

<template>
    <v-stage
        :config="{
            width: windowSize.width.value,
            height: windowSize.height.value,
        }"
        @mousedown="handleStageMouseDown"
        @touchstart="handleStageMouseDown"
        @dragend="handleDragEnd"
    >
        <v-layer>
            <v-image
                v-for="shape in dStore.shapes"
                :config="shape"
                :draggable="dStore.enableTransformer"
                @transformend="handleTransformEnd"
            ></v-image>
            <v-transformer ref="transformer" />
        </v-layer>
    </v-stage>
    <Settings class="absolute bottom-0 left-0 p-2"></Settings>
</template>
