import { createRouter, createWebHistory } from "vue-router";
import { setPage } from "../utils/page";
import { useStore } from "~/store";
import { getStore } from "~/utils/storage";

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
    path: '/employee',
    name: 'Employee',
    component: () => import("../pages/employee/EmployeePage.vue")
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
  },
  {
    path: '/admin/features/hazard-pay',
    name: "Hazard Pay Information",
    component: () => import("../pages/admin/features/HazardPayInfo.vue")
  },
  {
    path: '/admin/features/attendance-bonus',
    name: "Attendance Bonus Information",
    component: () => import("../pages/admin/features/AttendanceBonus.vue")
  },
  {
    path: '/admin/features/pto',
    name: "Paid Time Off (PTO) Information",
    component: () => import("../pages/admin/features/PaidTimeOff.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name == 'Login' || to.name == 'Landing') {
    next();
    return;
  }

  // If naa sa authenticated apge
  if (getStore("id") == null || getStore("id")!.length === 0) {
    next({ name: "Login" });
    return;
  }

  next();
});

router.afterEach(to => {
  let title = to.name?.toString() || "Employee Tracker";
  setPage(title);
  
  if (["Landing", "Login"].includes(to.name?.toString() || "")) {
    title = "Employee Tracker";
  }

  useStore().appbarTitle = title;
});

export default router;