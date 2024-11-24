import { defineStore } from "pinia";
import { Product } from "../types/types";

export const useWishlistStore = defineStore("wishlist", {
  state: () => ({
    favorites: JSON.parse(localStorage.getItem("wishlist") || '[]') as Product[],
  }),

  actions: {
    toggleFavorite(product: Product) {
      const existingItem = this.favorites.find(item => item.id === product.id);
      if (existingItem) {
        this.favorites = this.favorites.filter(item => item.id !== product.id);
      } else {
        this.favorites.push(product);
      }
      this.updateLocalStorage();
    },

    updateLocalStorage() {
      localStorage.setItem("wishlist", JSON.stringify(this.favorites));
    },
  },

  getters: {
    // Unique product count for wishlist nav
    uniqueFavoriteCount: (state) => state.favorites.length,

    // Is in wishlist
    isInWishlist: (state) => (id: number) =>
      state.favorites.some(item => item.id === id),
  },
});
