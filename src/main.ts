import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import "./assets/main.css";
import IconDirective from "@/directives/icon.directive";
import i18n from "./includes/i18n";

const app = createApp(App).use(i18n);
app.use(store);
app.use(router);
app.directive("icon", IconDirective);
app.mount("#app");
