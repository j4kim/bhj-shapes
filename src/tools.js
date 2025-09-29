import { computed, reactive, ref } from "vue"
import { set, useWindowSize } from "@vueuse/core"

export const images = ref([])

function loadImage(filename) {
    return new Promise((resolve) => {
        const image = new Image()
        image.src = `shapes/${filename}`
        image.onload = () => resolve(image)
    })
}

export async function loadImages() {
    const files = JSON.parse(document.body.dataset.files)
    const promises = files.map(loadImage)
    images.value = await Promise.all(promises)
}

export const windowSize = useWindowSize()

export const windowRatio = computed(
    () => windowSize.width.value / windowSize.height.value
)

export const settings = reactive({
    minScale: 0.5,
    maxScale: 1,
})

function random(min, max) {
    return Math.random() * (max - min) + min
}

export function getImageConfig(image) {
    const ratio = image.width / image.height
    const ww = windowSize.width.value
    const wh = windowSize.height.value
    const maxW = ratio > windowRatio.value ? ww : wh * ratio
    const scale = random(settings.minScale, settings.maxScale)
    const width = maxW * scale
    const height = width / ratio
    const x = (ww - width) / 2
    const y = (wh - height) / 2
    return {
        image,
        x,
        y,
        width,
        height,
        globalCompositeOperation: "multiply",
    }
}

export const imageConfigs = computed(() => {
    return images.value.map(getImageConfig)
})
