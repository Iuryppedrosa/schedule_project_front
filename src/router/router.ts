import { createRouter, createWebHistory } from 'vue-router'
import LoginComponent from '../components/LoginComponent.vue'
import ScheduleComponent from '../components/ScheduleComponent.vue'
import HomeComponent from '../components/HomeComponent.vue'
import UserListComponent from '../components/UserListComponent.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginComponent,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeComponent,
      redirect: { name: 'schedule' },
      children: [
        {
          path: '',
          name: 'schedule',
          component: ScheduleComponent,
        },
        {
          path: 'users',
          name: 'users',
          component: UserListComponent,
        },
      ],
    },
  ],
})

export default router
