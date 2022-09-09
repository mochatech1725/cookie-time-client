import Router from 'vue-router';
import Vue from 'vue';


Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
   routes: [
      {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: '/products',
        name: 'products',
        component: () => import( '../components/Products.vue')
      },
      {
        path: '/inventory',
        name: 'inventory',
        component: () => import('../components/Inventory.vue')
      },
      {
        path: '/orders',
        name: 'orders',
        component: () => import( '../components/Orders.vue')
      },
      {
        path: '/payments',
        name: 'payments',
        component: () => import('../components/Payments.vue')
      },
      {
        path: '/agents',
        name: 'agents',
        component: () => import('../components/Agents.vue')
      },
      {
        path: '/customers',
        name: 'customers',
        component: () => import('../components/Customers.vue')
      }
    ]
  });

export default router
