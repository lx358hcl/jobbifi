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

import Secret from "../views/Secret.vue";
import Bruker from "../views/Bruker.vue";
import Logout from "../views/Logout.vue";
import Dashboard from "../views/Dashboard.vue";
import Innstillinger from "../views/Innstillinger.vue";
import Meldinger from "../views/Meldinger.vue";
import Varsler from "../views/Varsler.vue";
import GlemtPassord from "../views/GlemtPassord.vue";
import Feed from "../views/Feed.vue";
import BesteSelskaper from "../views/BesteSelskaper.vue";
import Selskap from "../views/Selskap.vue";

import firebaseApp from "../../../firebase/firebaseconfig.js";

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
    path: "/feed",
    name: "Feed",
    component: Feed,
  },
  {
    path: "/glemtpassord",
    name: "GlemtPassord",
    component: GlemtPassord,
    beforeEnter: async (to, from, next) => {
      if(firebaseApp.auth().currentUser) next();
      else next(); 
    }
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
    path: "/stillinger/:searchQuery?",
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
    path: "/besteselskaper",
    name: "BesteSelskaper",
    component: BesteSelskaper,
  },
  {
    path: "/selskap/:navn",
    name: "Selskap",
    component: Selskap,
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
    path: "/konto",
    name: "konto",
    component: Secret,
    meta: { requiresAuth: true },
    beforeEnter: async (to, from, next) => {
      if(firebaseApp.auth().currentUser) next();
      else next(); 
    }
  },
  {
    path: "/bruker/:brukernavn",
    name: "Bruker",
    component: Bruker,
    props: true,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    beforeEnter: async (to, from, next) => {
      if(firebaseApp.auth().currentUser) next();
      else next(); 
    }
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
    beforeEnter: async (to, from, next) => {
      if(firebaseApp.auth().currentUser) next("konto");
      else next(); 
    }
  },
  {
    path: "/dashboard/:query?",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: async (to, from, next) => {
      if(firebaseApp.auth().currentUser) next();
      else next(); 
    }
  },
  {
    path: "/innstillinger",
    name: "Innstillinger",
    component: Innstillinger,
  },
  {
    path: "/dashboard/meldinger",
    name: "Meldinger",
    component: Meldinger,
    beforeEnter: async (to, from, next) => {
      if(firebaseApp.auth().currentUser) next();
      else next(); 
    }
  },
  {
    path: "/varsler",
    name: "Varsler",
    component: Varsler,
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

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebaseApp.auth().currentUser;
  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } 
  else {
    next();
  }
});

export default router;