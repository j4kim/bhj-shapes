import { computed, reactive, ref } from "vue"
import { useWindowSize } from "@vueuse/core"
import { shuffle, take } from "lodash-es"

const files = JSON.parse(document.body.dataset.files)

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

export const settings = reactive({
    minScale: 0.5,
    maxScale: 1,
    maxRotation: 0.2,
    dispersion: 0.5,
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
    const scale = random(settings.minScale, settings.maxScale)
    const width = maxW * scale
    const height = width / ratio
    const cx = ww / 2
    const cy = wh / 2
    const disp = settings.dispersion
    const x = cx + random(-1 * cx * disp, cx * disp)
    const y = cy + random(-1 * cy * disp, cy * disp)
    return {
        image,
        x,
        y,
        offsetX: width / 2,
        offsetY: height / 2,
        width,
        height,
        rotation: random(0, 180 * settings.maxRotation),
        globalCompositeOperation: "multiply",
    }
}

export const imageConfigs = computed(() => {
    const shuffled = shuffle(images.value)
    const subset = take(shuffled, settings.take)
    return subset.map(getImageConfig)
})
