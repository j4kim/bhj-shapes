import { createRouter, createWebHashHistory } from "vue-router";

import Drawing from "./views/Drawing.vue";
import Scroll from "./views/Scroll.vue";

const routes = [
    { path: "/", component: Drawing },
    { path: "/scroll", component: Scroll },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
