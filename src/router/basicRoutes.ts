import { CustomRoute } from "@/router/types";
export const basicRoutes: Array<CustomRoute> = [
  {
    path: "/",
    name: "root",
    redirect: "/userLogin",
  },
  {
    path: "/userLogin",
    name: "userLogin",
    component: () => import("@/views/userLogin.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/userLogin.vue"),
  },
  // ! 404 配置 必须放置最后
  // { path: "**", redirect: "/404" },
];
