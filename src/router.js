import { createRouter, createWebHistory } from 'vue-router';
import store from './store';

// import components globally for routes
import IndexComponent from './components/IndexComponent.vue';
import LoginComponent from './components/LoginComponent.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: IndexComponent, props: true, meta: {requiresAuth: true}},
        {path: '/login', component: LoginComponent, props: true, meta: {requiresAuth: false}},

        // MAKE AN ERROR PAGE
        {path: '/:catchAll(.*)', redirect: '/'}
    ]
});

router.beforeEach(function(to, _, next) {
    if (to.meta.requiresAuth && !store.getters.loggedIn) {
        next('/login');
    } else if (!to.meta.requiresAuth && store.getters.loggedIn) {
        next('/');
    } else {
        next();
    }
});

export default router;