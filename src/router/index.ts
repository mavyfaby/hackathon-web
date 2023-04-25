import { createRouter, createWebHistory } from "vue-router";
import { setPage } from "../utils/page";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/home/HomePage.vue")
  },
  {
    path: '/login',
    name: "Login",
    component: () => import("../pages/login/LoginPage.vue")
  },
  {
    path: '/admin',
    name: "Admin",
    component: () => import("../pages/admin/AdminPage.vue")
  },
  {
    path: '/techlead',
    name: "Techlead",
    component: () => import("../pages/techlead/TechleadPage.vue")
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.afterEach(to => {
  setPage(to.name?.toString() || "Employee Tracker");
});

export default router;