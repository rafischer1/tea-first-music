import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import ViewTrack from "@/views/ViewTrack.vue";

const Admin = () => import("@/views/Admin.vue");
const About = () => import("@/views/About.vue");

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
  { name: "track", path: "/track/:id", component: ViewTrack },
  { path: "/:catchAll(.*)*", redirect: { name: "home" } },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: "text-orange-400",
});

export default router;
