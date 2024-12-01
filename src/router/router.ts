import { createRouter, createWebHistory } from 'vue-router'
import LoginComponent from '../components/_login/LoginComponent.vue'
import ScheduleComponent from '../components/_schedule/ScheduleComponent.vue'
import HomeComponent from '../components/_home/HomeComponent.vue'
import UserListComponent from '../components/_user/UserListComponent.vue'
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
