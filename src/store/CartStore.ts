import { defineStore } from "pinia";
import { Product } from "../types/types";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useCartStore = defineStore("cart", {
  state: () => ({
    // Get from localStorage or create empty array
    items: JSON.parse(localStorage.getItem("cart") || "[]") as Array<{
      product: Product;
      quantity: number;
    }>,
  }),

  actions: {
    // Add to cart
    addToCart(product: Product) {
      const existingItem = this.items.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        existingItem.quantity++;
        toast.success("Product quantity updated in the cart!");
      } else {
        this.items.push({ product, quantity: 1 });
        toast.success("Product added to cart!");
      }
      this.updateLocalStorage();
    },

    // Remove from cart
    removeFromCart(productId: number) {
      this.items = this.items.filter((item) => item.product.id !== productId);
      this.updateLocalStorage();
    },

    // Update quantity of product
    updateQuantity(productId: number, quantity: number) {
      const existingItem = this.items.find(
        (item) => item.product.id === productId
      );
      if (existingItem && quantity > 0) {
        existingItem.quantity = quantity;
      } else if (existingItem && quantity <= 0) {
        this.removeFromCart(productId);
      }
      this.updateLocalStorage();
    },

    // Clear cart
    clearCart() {
      this.items = [];
      this.updateLocalStorage();
    },

    // Update localStorage
    updateLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.items));
    },
  },

  getters: {
    // Unique product count for cart nav
    uniqueItemCount: (state) => state.items.length,

    // Total product count for cart
    totalItems: (state) =>
      state.items.reduce((acc, item) => acc + item.quantity, 0),

    // Total price
    totalPrice: (state) =>
      state.items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      ),

    // Is in cart
    isInCart: (state) => (id: number) =>
      state.items.some((item) => item.product.id === id),
  },
});
