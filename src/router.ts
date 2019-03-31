import Vue from 'vue';
import Router from 'vue-router';
import RSA from './views/RSA.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: RSA,
        },
        {
            path: '/about',
            name: 'about',
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        },
        {
            path: '/rsa',
            name: 'rsa',
            component: RSA,
        },
    ],
});
