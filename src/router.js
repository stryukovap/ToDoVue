import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Login from "./pages/Login";

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            beforeEnter: (to, from, next) => {
                if (!JSON.parse(localStorage.getItem("lbUser"))) {
                    next({path: "/login"});
                } else {
                    next();
                    // next(false)
                }
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './pages/About.vue')
        }
    ]
})
