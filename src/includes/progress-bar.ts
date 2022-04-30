import { Router } from "vue-router";
import NProgress from "nprogress";

export default (router: Router) => {
  router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
  });
  router.afterEach(() => NProgress.done());
};
