import { createApp } from "vue";
import App from "./App.vue";
import VueKonva from "vue-konva";
import { loadImages } from "./tools";
import { router } from "./router";

const app = createApp(App);
app.use(router);
app.use(VueKonva);
app.mount("#app");

loadImages();
