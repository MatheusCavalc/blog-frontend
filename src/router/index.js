import { createRouter, createWebHistory } from 'vue-router'

let authUser = localStorage.getItem("bearerToken") === null ? false : true

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/App/AuthHome.vue'),
    beforeEnter: (to, from, next) => {
      if (!authUser) {
        return next({
          name: 'index'
        })
      }

      next()
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Auth/LoginView.vue'),
    beforeEnter: (to, from, next) => {
      if (authUser) {
        return next({
          name: 'home'
        })
      }

      next()
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Auth/RegisterView.vue'),
    beforeEnter: (to, from, next) => {
      if (authUser) {
        return next({
          name: 'home'
        })
      }

      next()
    }
  },
  {
    path: '/new-story',
    name: 'new_story',
    component: () => import(/* webpackChunkName: "about" */ '../views/App/Editor/EditorView.vue'),
    beforeEnter: (to, from, next) => {
      if (!authUser) {
        return next({
          name: 'login'
        })
      }

      next()
    }
  },
  {
    path: '/home',
    name: 'index',
    component: () => import(/* webpackChunkName: "about" */ '../views/App/GuestHome.vue'),
    beforeEnter: (to, from, next) => {
      if (authUser) {
        return next({
          name: 'home'
        })
      }

      next()
    }
  },
  {
    path: '/story/:slug/:id',
    name: 'story',
    component: () => import(/* webpackChunkName: "about" */ '../views/App/StoryView.vue'),
    beforeEnter: (to, from, next) => {
      if (!authUser) {
        return next({
          name: 'index'
        })
      }

      next()
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
