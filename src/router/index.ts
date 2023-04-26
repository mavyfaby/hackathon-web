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
    path: '/admin/features',
    name: "Admin Features",
    component: () => import("../pages/admin/AdminFeatureList.vue")
  },
  {
    path: '/techlead',
    name: "Techlead",
    component: () => import("../pages/techlead/TechleadPage.vue")
  },

  {
    path: '/admin/features/users',
    name: "Users",
    component: () => import("../pages/admin/features/UsersPage.vue")
  },
  {
    path: '/admin/features/departments',
    name: "Departments",
    component: () => import("../pages/admin/features/DepartmentsPage.vue")
  },
  {
    path: '/admin/features/teams',
    name: "Teams",
    component: () => import("../pages/admin/features/TeamsPage.vue")
  },
  {
    path: '/admin/features/shift-schedule',
    name: "Shift Schedule",
    component: () => import("../pages/admin/features/ShiftSchedule.vue")
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