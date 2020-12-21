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

const routes = [
  {
    path: "/",
    name: "Hjem",
    component: Stillinger,
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
    path: "/login",
    name: "Login",
    component: Login,
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
    path: "/:pathMatch(.*)",
    name: "Feil",
    component: Feil,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;