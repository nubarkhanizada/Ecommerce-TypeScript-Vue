import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/cart",
      name: "Cart",
      component: () => import("../views/CartView.vue"),
    },
    {
      path: "/wishlist",
      name: "Wishlist",
      component: () => import("../views/WishlistView.vue"),
    },
  ],
  scrollBehavior(_, __, savedPosition) {
    // Wherever you were on the page, it will be there when you come back
    if (savedPosition) {
      return savedPosition;
    }
    // If you are not in any part of the page, it will return to the top when you come back
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
