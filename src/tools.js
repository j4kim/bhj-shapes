import { computed, ref } from "vue"
import { useStorage, useWindowSize } from "@vueuse/core"
import { shuffle, take } from "lodash-es"

export const files = JSON.parse(document.body.dataset.files)

export const images = ref([])

function loadImage(filename) {
    return new Promise((resolve) => {
        const image = new Image()
        image.src = `shapes/${filename}`
        image.onload = () => resolve(image)
    })
}

export async function loadImages() {
    const promises = files.map(loadImage)
    images.value = await Promise.all(promises)
}

export const windowSize = useWindowSize()

export const windowRatio = computed(
    () => windowSize.width.value / windowSize.height.value
)

export const settings = useStorage("settings", {
    open: false,
    minScale: 0.5,
    maxScale: 1,
    maxRotation: 0.2,
    dispersionX: 0.5,
    dispersionY: 0.5,
    take: files.length,
})

function random(min, max) {
    return Math.random() * (max - min) + min
}

export function getImageConfig(image) {
    const ratio = image.width / image.height
    const ww = windowSize.width.value
    const wh = windowSize.height.value
    const maxW = ratio > windowRatio.value ? ww : wh * ratio
    const scale = random(settings.value.minScale, settings.value.maxScale)
    const width = maxW * scale
    const height = width / ratio
    const cx = ww / 2
    const cy = wh / 2
    const dispX = settings.value.dispersionX
    const dispY = settings.value.dispersionY
    const x = cx + random(-1 * cx * dispX, cx * dispX)
    const y = cy + random(-1 * cy * dispY, cy * dispY)
    return {
        image,
        x,
        y,
        offsetX: width / 2,
        offsetY: height / 2,
        width,
        height,
        rotation: random(0, 180 * settings.value.maxRotation),
        globalCompositeOperation: "multiply",
    }
}

export const imageConfigs = computed(() => {
    const shuffled = shuffle(images.value)
    const subset = take(shuffled, settings.value.take)
    return subset.map(getImageConfig)
})
