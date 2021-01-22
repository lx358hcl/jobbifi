import { createWebHistory, createRouter } from "vue-router";
import Hjem from "@/views/Hjem.vue";
import Om from "@/views/Om.vue";
import Kontakt from "@/views/Kontakt.vue";
import Bedrifter from "@/views/Bedrifter.vue";
import Feil from "@/views/Feil.vue";
import Login from "@/views/Login.vue";
import BliMedlem from "@/views/BliMedlem.vue";
import Stillinger from "@/views/Stillinger.vue";
import Api from "@/views/Api.vue";
import Arrangementer from "@/views/Arrangementer.vue";
import Retningslinjer from "@/views/Retningslinjer.vue";
import ApiRedirect from "./ApiRedirect.vue";
import Stilling from "@/views/Stilling.vue";

import Register from "../views/Register.vue";
import Secret from "../views/Secret.vue";
import About from "../views/About.vue";
import Logout from "../views/Logout.vue";

import * as firebase from "firebase/app";

const routes = [
  {
    path: "/",
    name: "Hjem",
    component: Hjem,
  },
  {
    path: "/kontakt",
    name: "Kontakt",
    component: Kontakt,
  },
  {
    path: "/retningslinjer",
    name: "Retningslinjer",
    component: Retningslinjer,
  },
  {
    path: "/api",
    name: "Api",
    component: Api,
  },
  {
    path: "/om",
    name: "Om",
    component: Om,
  },
  {
    path: "/stillinger",
    name: "Stillinger",
    component: Stillinger,
  },
  {
    path: "/arrangementer",
    name: "Arrangementer",
    component: Arrangementer,
  },
  {
    path: "/blimedlem",
    name: "Bli Medlem",
    component: BliMedlem,
  },
  {
    path: "/bedrifter",
    name: "Bedrifter",
    component: Bedrifter,
  },
  {
    path: "/api/:query",
    name: "Api-en",
    component: ApiRedirect,
  },
  {
    path: "/stilling/:id",
    name: "Stilling",
    component: Stilling,
  },
  {
    path: "/secret",
    name: "secret",
    component: Secret,
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/:pathMatch(.*)",
    name: "Feil",
    component: Feil,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  base: process.env.BASE_URL,
});

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   console.log(requiresAuth);
//   const isAuthenticated = firebase.default.auth().currentUser;
//   console.log("isauthenticated", isAuthenticated);
//   // if (requiresAuth && !isAuthenticated) {
//   //   next("/login");
//   // } else {
//   //   next();
//   // }
//   next();
// });

export default router;