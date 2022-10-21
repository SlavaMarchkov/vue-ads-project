import Vue from "vue";
import VueRouter from "vue-router";
import AuthGuard from "@/router/auth-guard";

import AppHome from "@/components/AppHome";
import AuthLogin from "@/components/Auth/AuthLogin";
import AuthRegistration from "@/components/Auth/AuthRegistration";
import UserOrders from "@/components/User/UserOrders";
import AdsList from "@/components/Ads/AdsList";
import AdCreate from "@/components/Ads/AdCreate";
import AdView from "@/components/Ads/AdView";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    name: "home",
    component: AppHome,
  },
  {
    path: "/login",
    name: "login",
    component: AuthLogin,
  },
  {
    path: "/registration",
    name: "registration",
    component: AuthRegistration,
  },
  {
    path: "/orders",
    name: "orders",
    component: UserOrders,
    beforeEnter: AuthGuard,
  },
  {
    path: "/list",
    name: "list",
    component: AdsList,
    beforeEnter: AuthGuard,
  },
  {
    path: "/new",
    name: "newAd",
    component: AdCreate,
    beforeEnter: AuthGuard,
  },
  {
    path: "/ad/:id",
    props: true,
    name: "ad",
    component: AdView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
