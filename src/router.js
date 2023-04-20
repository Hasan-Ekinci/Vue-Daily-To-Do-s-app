import { createRouter, createWebHistory } from "vue-router";
import store from "./store";

// import components globally for routes
import LoginComponent from "./components/LoginComponent.vue";
import IndexComponent from "./components/IndexComponent.vue";
import TaskShowComponent from "./components/TaskShowComponent.vue";
import TasksDoneComponent from "./components/TasksDoneComponent.vue";
import TasksActiveComponent from "./components/TasksActiveComponent.vue";
import TasksArchivedComponent from "./components/TasksArchivedComponent.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      component: LoginComponent,
      props: true,
      meta: { requiresAuth: false },
    },
    {
      path: "/",
      component: IndexComponent,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: "/done",
      component: TasksDoneComponent,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: "/active",
      component: TasksActiveComponent,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: "/archived",
      component: TasksArchivedComponent,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: "/task/:id",
      name: "show",
      component: TaskShowComponent,
      props: true,
      meta: { requiresAuth: true },
    },

    // MAKE AN ERROR PAGE
    { path: "/:catchAll(.*)", redirect: "/" },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.loggedIn) {
    next("/login");
  } else if (!to.meta.requiresAuth && store.getters.loggedIn) {
    next("/");
  } else {
    next();
  }
});

export default router;
