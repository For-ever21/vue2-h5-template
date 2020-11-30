import { basicRoutes } from "./basicRoutes";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: basicRoutes,
  base: process.env.BASE_URL,
  scrollBehavior(savedPosition: any): { x: number; y: number } {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;
