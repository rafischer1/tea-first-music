import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import "./assets/main.css";
import IconDirective from "@/directives/icon.directive";

const app = createApp(App);
app.use(store);
app.use(router);
app.directive("icon", IconDirective);
app.mount("#app");
