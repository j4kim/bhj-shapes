import { computed, ref } from "vue"
import { useWindowSize } from "@vueuse/core"

export const images = ref([])

export async function loadImages() {
    const files = JSON.parse(document.body.dataset.files)

    const promises = files.map((file) => {
        return new Promise((resolve, reject) => {
            const image = new Image()
            image.src = `shapes/${file}`
            image.onload = () => resolve(image)
        })
    })

    images.value = await Promise.all(promises)
}

export const windowSize = useWindowSize()

export const windowRatio = computed(
    () => windowSize.width.value / windowSize.height.value
)

export function getImageConfig(image) {
    const ratio = image.width / image.height
    const ww = windowSize.width.value
    const wh = windowSize.height.value
    const [maxW, maxH] =
        ratio > windowRatio.value ? [ww, ww / ratio] : [wh * ratio, wh]
    return {
        image,
        x: (ww - maxW) / 2,
        y: (wh - maxH) / 2,
        width: maxW,
        height: maxH,
        globalCompositeOperation: "multiply",
    }
}

export const imageConfigs = computed(() => {
    return images.value.map(getImageConfig)
})
