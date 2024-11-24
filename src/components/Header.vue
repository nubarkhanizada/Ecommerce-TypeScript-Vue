<script setup lang="ts">
import { computed } from "vue";
import Logo from "../assets/logo.svg";
import CartIcon from "./icons/CartIcon.vue";
import EmptyHeartIcon from "./icons/EmptyHeartIcon.vue";
import UserIcon from "./icons/UserIcon.vue";
import { useCartStore } from "../store/CartStore";
import { useWishlistStore } from "../store/WishlistStore";

// Wishlist
const wishlistStore = useWishlistStore();
const uniqueFavoriteCount = computed(() => wishlistStore.uniqueFavoriteCount);

// Cart
const cartStore = useCartStore();
const uniqueItemCount = computed(() => cartStore.uniqueItemCount);
</script>

<template>
  <header>
    <div class="container">
      <div class="header-all">
        <!-- Left Side -->
        <router-link to="/">
          <div class="left-side">
            <div class="logo">
              <img :src="Logo" alt="Logo" />
            </div>
            <div class="text-content">
              <h1>BEST OF SNEAKERS</h1>
              <p>Shop the best sneakers</p>
            </div>
          </div>
        </router-link>

        <!-- Right Side -->
        <div class="right-side">
          <router-link to="/cart" class="menu-item">
            <CartIcon />
            <span>Cart ({{ uniqueItemCount }})</span>
          </router-link>

          <router-link to="/wishlist" class="menu-item">
            <EmptyHeartIcon />
            <span>Wishlist ({{ uniqueFavoriteCount }})</span>
          </router-link>

          <div class="menu-item">
            <UserIcon />
            <span>Profile</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use "../assets/styles/main" as *;

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index: 1;

  .header-all {
    display: flex;
    justify-content: space-between;
    padding: 40px 0;
    border-bottom: 1px solid $secondaryTextColor;

    .left-side {
      display: flex;
      align-items: center;
      gap: 20px;

      .logo {
        img {
          width: 40px;
        }
      }
      .text-content {
        h1 {
          color: $primaryTextColor;
          font-size: 25px;
        }
        p {
          font-size: 16px;
          color: $secondaryTextColor;
        }
      }
    }

    .right-side {
      display: flex;
      align-items: center;
      gap: 50px;

      .menu-item {
        display: flex;
        align-items: center;
        gap: 5px;
        color: $secondaryTextColor;
        transition: 0.4s;

        svg {
          width: 20px;
          height: 20px;
        }

        &:hover {
          color: $primaryColor;
        }
      }
    }
  }
}
</style>
