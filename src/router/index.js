import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true,
    meta: { requiresLogin: true }
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    meta: { checkToken: true }
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue'),
    meta: { checkToken: true }
  },
  {
    path: '/auth/facebook/callback',
    name: 'auth/facebook/callback',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "vote" */ '../views/LoginFacebook.vue'),
  },
  {
    path: '/list-vote-other-user',
    name: 'list-vote-other-user',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "list-vote-other-user" */ '../views/Users.vue'),
    meta: { requiresLogin: true },
  },
  {
    path: '/createvote',
    // name: 'CreateVote',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "vote" */ '../views/Vote.vue'),
    meta: { requiresLogin: true },

    children: [
      // UserHome will be rendered inside User's <router-view>
      // when /user/:id is matched
      {
        path: '',
        name: "createvote",
        component: () => import(/* webpackChunkName: "vote" */ '../views/CreateVote.vue'),
        meta: { isGoBackformOptions: true }

      },

      // UserProfile will be rendered inside User's <router-view>
      // when /user/:id/profile is matched
      {
        path: 'options',
        name: "options",
        component: () => import(/* webpackChunkName: "options" */ '../views/OptionsVote.vue'),
        meta: { isRedirectToOptions: true }
      }
    ]
  },
  {
    path: '/change-password',
    name: 'changePassword',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "changePassword" */ '../views/ChangePassword.vue'),
    meta: { requiresLogin: true }
  },
  {
    path: '**',
    name: 'NotFound',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PageNotFound.vue'),
    meta: { requiresLogin: true }
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  let { commit } = store;
  if (to.meta.requiresLogin) {
    console.log(store.state)
    // You can use store variable here to access globalError or commit mutation 
    if (!store.state.auth.auth) {
      console.log("isLogIn", store.state.auth.auth)
      next("login")
    } else {
      next()
    }
  } else if (to.meta.isGoBackformOptions) {
    if (to.name === "createvote" && from.name === "options") {
      // commit("vote/clearOptions")
      next()
    } else {
      next()
    }
    next()
  } else if (to.meta.isRedirectToOptions) {
    if (to.name === "options" && from.name === "createvote") {
      commit("vote/clearOptions")
      next()
    } else {
      next()
    }
  } else if (to.meta.checkToken) {
    if (store.state.auth.auth) {
      next("/")
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
