import { computed, ref, watch } from "vue"
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
    globalScale: 0.1,
    randomizeScale: 0.2,
    maxRotation: 45,
    dispersionX: 0.5,
    dispersionY: 0.5,
    take: files.length,
    gco: "multiply",
})

function random(min, max) {
    return Math.random() * (max - min) + min
}

export function getImageConfig(image) {
    const defW = image.width * settings.value.globalScale
    const defH = image.height * settings.value.globalScale
    const scale = random(
        1 - settings.value.randomizeScale,
        1 + settings.value.randomizeScale
    )
    const width = defW * scale
    const height = defH * scale
    const cx = windowSize.width.value / 2
    const cy = windowSize.height.value / 2
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
        rotation: random(
            -1 * settings.value.maxRotation,
            settings.value.maxRotation
        ),
        globalCompositeOperation: settings.value.gco,
    }
}

export const imageConfigs = ref([])

export function reload() {
    const shuffled = shuffle(images.value)
    const subset = take(shuffled, settings.value.take)
    imageConfigs.value = subset.map(getImageConfig)
}

watch([images, settings.value], reload, { immediate: true })
