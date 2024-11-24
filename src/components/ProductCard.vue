<script setup lang="ts">
import { computed, defineProps } from "vue";
import EmptyHeartIcon from "./icons/EmptyHeartIcon.vue";
import PlusIcon from "./icons/PlusIcon.vue";
import { useWishlistStore } from "../store/WishlistStore";
import HeartIcon from "./icons/HeartIcon.vue";
import { Product } from "../types/types";
import { useCartStore } from "../store/CartStore";

const props = defineProps<Product>();

// Wishlist
const wishlistStore = useWishlistStore();
const isInWishlist = computed(() => wishlistStore.isInWishlist(props.id));
const toggleFavorite = () => {
  wishlistStore.toggleFavorite(props); // send props directly
};

// Cart
const cartStore = useCartStore();
const isInCart = computed(() => cartStore.isInCart(props.id));
const addToCart = () => {
  cartStore.addToCart(props); // send props directly
};
</script>

<template>
  <div class="product-card">
    <div class="product-details-all">
      <div
        class="heart-icon"
        @click="toggleFavorite"
        :class="{ 'bg-red': isInWishlist, 'bg-white': !isInWishlist }"
      >
        <component :is="isInWishlist ? HeartIcon : EmptyHeartIcon" />
      </div>
      <div class="product-image">
        <img :src="props.image" alt="Product Image" />
      </div>
      <div class="product-details">
        <p class="product-title">{{ props.title }}</p>
        <p class="product-category">{{ props.category }}</p>
        <p class="product-price">{{ props.price }} $</p>
        <div
          class="plus-icon"
          @click="addToCart"
          :class="{ 'bg-green': isInCart, 'bg-white': !isInCart }"
        >
          <PlusIcon />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/styles/main" as *;

.product-card {
  position: relative;
  width: calc(20% - 40.5px);
  flex: 0 0 auto;
  padding: 40px;
  border-radius: 30px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  .product-details-all {
    .heart-icon {
      position: absolute;
      top: 40px;
      left: 40px;
      background-color: #fff;
      border-radius: 5px;
      padding: 5px;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      transition: 0.4s;

      svg {
        width: 20px;
        height: 20px;
        vertical-align: bottom;
        color: $secondaryTextColor;
      }

      &:hover {
        box-shadow: 0 1px 5px $errorColor;
      }
    }

    .bg-red {
      background-color: $errorColor;
      svg {
        color: #fff;
      }
    }

    .product-image {
      img {
        width: 100%;
        height: 200px;
        vertical-align: bottom;
      }
    }

    .product-details {
      margin-top: 25px;

      .product-title {
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .product-category {
        color: $secondaryTextColor;
        font-size: 12px;
        font-weight: 600;
        margin: 5px 0 25px 0;
      }

      .product-price {
        font-size: 20px;
        font-weight: 600;
      }

      .plus-icon {
        position: absolute;
        bottom: 40px;
        right: 40px;
        background-color: #fff;
        border-radius: 5px;
        padding: 5px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        transition: 0.4s;

        svg {
          width: 20px;
          height: 20px;
          vertical-align: bottom;
          color: $secondaryTextColor;
        }

        &:hover {
          box-shadow: 0 1px 5px $successColor;
        }
      }

      .bg-green {
        background-color: $successColor;
        svg {
          color: #fff;
        }
      }
    }
  }
}
</style>
