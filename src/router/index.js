import Vue from 'vue'
import VueRouter from 'vue-router'
import RecreationHome from '../views/recreation/RecreationHome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/standardHome/wenxue'
  },
  {
    path: '/recreationHome',
    name: 'RecreationHome',
    component: RecreationHome,
  },
  {
    path: '/recreation/search',
    name: 'recreationSearch',
    component: () => import("../views/recreation/Search.vue")
  }, {

    path: '/recreation/bookInfo',
    name: 'recreationBookInfo',
    component: () => import("../views/recreation/BookInfo.vue")

  },
  {
    path: '/standardHome/:type',
    name: 'StandardHome',
    component: () => import('../views/standard/StandardHome')
  },
  {
    path: '/standard/bookInfo',
    name: 'BookInfo',
    component: () => import('../views/standard/BookInfo')
  },
  {
    path: '/loginRegisterForget',
    name: 'LoginRegisterForget',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginRegisterForget.vue'),
    children: [{
      path: '',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      redirect: 'login'
    },
    {
      path: 'login',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../components/login/Login.vue')
    },
    {
      path: 'register',
      name: 'Register',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../components/login/Register.vue')
    },
    {
      path: 'forget',
      name: 'Forget',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../components/login/Forget.vue')
    }]
  },
  {
    path: '/user/:type',
    name: 'User',
    component: () => import('../views/User')
  },
  {
    path: '/middlePage',
    name: 'MiddlePage',
    component: () => import('../views/MiddlePage')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
