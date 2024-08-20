import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AuthView from "@/views/AuthView.vue";
import LoginView from "@/views/LoginView.vue";
import SigninView from "@/views/SigninView.vue";
import useUsers from "@/stores/users";
import useMenu from "@/stores/menu";
import DashboardView from "@/views/DashboardView.vue";
import VueCookies from "vue-cookies";
import NotFound from "@/views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/auth",
    name: "auth",
    component: AuthView,
  },
  {
    path: "/auth/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/auth/signin",
    name: "signin",
    component: SigninView,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const users = useUsers();
  const menu = useMenu();
  let accessToken =
    localStorage.getItem("cookies") === "true"
      ? VueCookies.get("accessToken")
      : users.accessToken;

  if (
    to.path === "/" ||
    to.path === "/auth" ||
    to.path === "/auth/login" ||
    to.path === "/auth/signin"
  )
    menu.setValueShowMainMenu(true);
  else menu.setValueShowMainMenu(false);

  if (
    (to.path === "/" ||
      to.path === "/auth" ||
      to.path === "/auth/login" ||
      to.path === "/auth/signin") &&
    accessToken
  )
    next("/dashboard");

  if (to.path === "/dashboard" && !accessToken) next("/");
  if (to.path === "/auth") next("/auth/login");
  next();
});

export default router;
