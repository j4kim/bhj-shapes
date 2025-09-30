import { createRouter, createWebHashHistory } from "vue-router";

import DrawView from "./views/DrawView.vue";
import ScrollView from "./views/ScrollView.vue";

const routes = [
    { path: "/", component: DrawView },
    { path: "/scroll", component: ScrollView },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
