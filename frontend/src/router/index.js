import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CityView from '../views/CityView.vue'
import Register from '../components/Auth/Register.vue'
import Login from '../components/Auth/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta:{
        title:'Home',
      },
    },
    {
      path: '/weather/:state/:city/:country',
      name: 'cityView',
      component: CityView,
      meta:{
        title:'City View',
      },
    },
    {
      path: '/auth/register',
      name: 'registerView',
      component: Register,
      meta:{
        title:'Register',
      },
    },
    {
      path: '/auth/login',
      name: 'loginView',
      component: Login,
      meta:{
        title:'Login',
      },
    },
  ]
});

router.beforeEach((to,from,next) => {
  document.title = `${to.meta.title} | Weather App`;
  next();
});

export default router
