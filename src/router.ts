import Vue from 'vue';
import Router from 'vue-router';
import RSA from './views/RSA.vue';
import DES from './views/DES.vue';
import MD5 from './views/MD5.vue';
import AES from './views/AES.vue';
import encrypt from './views/Encrypt.vue';
Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: '/encrypt/rsa'
        },
        {
            path: '/about',
            name: 'about',
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        },
        {
            path: '/encrypt',
            name: 'encrypt',
            component: encrypt,
            children:[
                {
                    path: 'rsa',
                    name: 'rsa',
                    component: RSA,
                },
                {
                    path: 'des',
                    name: 'des',
                    component: DES,
                },
                {
                    path: 'md5',
                    name: 'md5',
                    component: MD5,
                },
                {
                    path: 'aes',
                    name: 'aes',
                    component: AES,
                },
            ]
        }

    ],
});
