import { createRouter, createWebHistory } from "vue-router";
import { setPage } from "../utils/page";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: () => import("../pages/LandingPage.vue")
  },
  {
    path: '/login',
    name: "Login",
    component: () => import("../pages/login/LoginPage.vue")
  },
  {
    path: '/admin',
    name: "Admin",
    component: () => import("../pages/admin/AdminPage.vue"),
  },
  {
    path: '/techlead',
    name: "Techlead",
    component: () => import("../pages/techlead/TechleadPage.vue")
  },

  {
    path: '/admin/users',
    name: "AdminUsers",
    component: () => import("../pages/admin/UsersPage.vue")
  },
  {
    path: '/admin/departments',
    name: "AdminDepartments",
    component: () => import("../pages/admin/DepartmentsPage.vue")
  },
  {
    path: '/admin/teams',
    name: "AdminTeams",
    component: () => import("../pages/admin/TeamsPage.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.afterEach(to => {
  setPage(to.name?.toString() || "Employee Tracker");
});

export default router;