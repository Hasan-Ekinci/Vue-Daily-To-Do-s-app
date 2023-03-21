import { createRouter, createWebHistory } from 'vue-router';

// import components globally for routes
import IndexComponent from './components/IndexComponent.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: IndexComponent, props: true},

        // MAKE AN ERROR PAGE
        {path: '/:catchAll(.*)', redirect: '/'}
    ]
});

export default router;