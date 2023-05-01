import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import Billing from "../views/Billing.vue";
import VirtualReality from "../views/VirtualReality.vue";
import RTL from "../views/Rtl.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";

import store from '../store/index'; // Importa tu store de Vuex

import tokens from "../services/tokens";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/signin",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      roles: ['Super Administrador', 'Administrador', 'Supervisor', 'Asesor', 'Usuario']// Agregamos esta propiedad para indicar que la ruta es protegida
    }
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
    meta: {
      requiresAuth: true,// Agregamos esta propiedad para indicar que la ruta es protegida
      roles: ['Super Administrador', 'Administrador', 'Supervisor', 'Asesor', 'Usuario']
    }
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
    meta: {
      requiresAuth: true, // Agregamos esta propiedad para indicar que la ruta es protegida
      roles: ['Super Administrador', 'Administrador', 'Supervisor', 'Asesor', 'Usuario']
    }
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
    meta: {
      requiresAuth: true,// Agregamos esta propiedad para indicar que la ruta es protegida
      roles: ['Super Administrador', 'Administrador', 'Supervisor', 'Asesor', 'Usuario']
    }
  },
  {
    path: "/rtl-page",
    name: "RTL",
    component: RTL,
    meta: {
      requiresAuth: true, // Agregamos esta propiedad para indicar que la ruta es protegida
      roles: ['Super Administrador', 'Administrador', 'Supervisor', 'Asesor', 'Usuario']
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true,// Agregamos esta propiedad para indicar que la ruta es protegida
      roles: ['Super Administrador', 'Administrador', 'Supervisor', 'Asesor', 'Usuario']
    }
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
    beforeEnter: async (to, from, next) => {
      const isLoggedIn = sessionStorage.getItem('isLoggedIn');
      const roleToken = localStorage.getItem("roleToken");
      if (roleToken) {
        if (store.getters.isLoggedIn || isLoggedIn) { // Si el usuario ha iniciado sesión...
          next("/dashboard"); // Permitimos el acceso a la ruta
        } else { // Si el usuario no ha iniciado sesión...
          const rememberMeCookie = document.cookie
            .split(';')
            .find(cookie => cookie.startsWith('rememberMe='))

          if (rememberMeCookie) {
            const token = decodeURIComponent(rememberMeCookie.split('=')[1]);
            const info = await tokens.sendToken({ token })
            if (info.token) {
              next("/dashboard");
            } else {
              next();
            }
          } else {
            next(); // Redirigimos al usuario a la página de inicio de sesión
          }
        }
      } else {
        next();
      }
    }
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach(async (to, from, next) => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  if (to.matched.some(record => record.meta.requiresAuth)) { // Si la ruta es protegida...
    if (store.getters.isLoggedIn || isLoggedIn) { // Si el usuario ha iniciado sesión...
      next(); // Permitimos el acceso a la ruta
    } else { // Si el usuario no ha iniciado sesión...
      const rememberMeCookie = document.cookie
        .split(';')
        .find(cookie => cookie.startsWith('rememberMe='))
      if (rememberMeCookie) {
        const token = decodeURIComponent(rememberMeCookie.split('=')[1]);
        const info = await tokens.sendToken({ token })
        console.log(info.token);
        if (info.token) {
          next();
        } else {
          next("/");
        }
      } else {
        next('/'); // Redirigimos al usuario a la página de inicio de sesión
      }
    }
  } else {
    next(); // Permitimos el acceso a rutas no protegidas
  }
});

export default router;
