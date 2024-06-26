import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "@/layout/AppLayout.vue";
import SuperLayout from "@/layout/SuperLayout.vue";
// import { useAuthStore } from '@/store/auth';
// const { userLogin } = useAuthStore();

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "crud",
      component: () => import("@/views/pages/Crud.vue"),
    },
  ],
});

export default router;
