import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import About from "@/views/About.vue";
import Admin from "@/views/Admin.vue";
import Home from "@/views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
