<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { Product } from "../types/types";
import { useWishlistStore } from "../store/WishlistStore";
import ProductCard from "../components/ProductCard.vue";

const wishlistStore = useWishlistStore();
const products = ref<Product[]>([]); // Empty array for favorites

// update "products" when favorites change
watchEffect(() => {
  products.value = wishlistStore.favorites; // products = favorites
});
</script>

<template>
  <div class="container">
    <section class="wishlist-section">
      <div class="wishlist-section-all">
        <div class="wishlist-section-heading">
          <div class="wishlist-section-title">
            <h2>My wishlist</h2>
          </div>
        </div>
        <div class="wishlist-section-container">
          <template v-if="products.length === 0">
            <div class="no-wishlist-message">
              <h2>No wish!</h2>
              <p>You haven't added anything to your wishlist.</p>
              <router-link to="/" class="button">
                <span>GO BACK</span>
              </router-link>
            </div>
          </template>
          <template v-else>
            <ProductCard
              v-for="product in products"
              :key="product.id"
              :id="product.id"
              :title="product.title"
              :price="product.price"
              :category="product.category"
              :image="product.image"
            />
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
@use "../assets/styles/main" as *;
.wishlist-section {
  .wishlist-section-all {
    .wishlist-section-heading {
      padding-top: 40px;

      .wishlist-section-title {
        h2 {
          font-size: 32px;
        }
      }
    }
    .wishlist-section-container {
      display: flex;
      flex-wrap: wrap;
      gap: 50px;
      padding: 40px 0;

      .no-wishlist-message {
        width: 50%;
        text-align: center;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        padding: 100px 50px;
        margin: auto;

        p {
          font-weight: 500;
          color: $secondaryTextColor;
          padding: 10px 0 40px 0;
        }
        .button {
          color: #fff;
          background-color: $primaryColor;
          border-radius: 10px;
          padding: 10px 40px;
        }
      }
    }
  }
}
</style>
