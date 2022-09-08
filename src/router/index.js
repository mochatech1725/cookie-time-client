import Router from 'vue-router';
import Vue from 'vue';
import HomeView from '../views/HomeView.vue'

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
   routes: [
      {
        path: '/',
        name: 'home',
        component: HomeView
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
      },
      {
        path: '/agents',
        name: 'agents',
        component: () => import(/* webpackChunkName: "table" */ '../views/TableView.vue')
      },
      {
        path: '/customers',
        name: 'customers',
        component: () => import(/* webpackChunkName: "table" */ '../views/TableView.vue')
      },
      {
        path: '/products',
        name: 'products',
        component: () => import(/* webpackChunkName: "table" */ '../views/TableView.vue')
      },
      {
        path: '/inventory',
        name: 'inventory',
        component: () => import(/* webpackChunkName: "table" */ '../views/TableView.vue')
      },
      {
        path: '/orders',
        name: 'orders',
        component: () => import(/* webpackChunkName: "table" */ '../views/TableView.vue')
      },
      {
        path: '/payments',
        name: 'payments',
        component: () => import(/* webpackChunkName: "table" */ '../views/TableView.vue')
      },
    ]
  });

export default router
