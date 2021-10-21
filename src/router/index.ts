import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Teacher from "@/views/Teacher.vue";
import Admin from "@/views/Admin.vue";
import Student from "@/views/Student.vue";
import Login from "@/views/Login.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    redirect: "/session/byClass",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/session/:session/",
    name: "Teacher",
    component: Teacher,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
  {
    path: "/student/:regno?",
    name: "Student",
    component: Student,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
