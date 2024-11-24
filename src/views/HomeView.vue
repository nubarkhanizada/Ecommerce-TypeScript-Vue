<script setup lang="ts">
import { ref, onMounted } from "vue";
import ProductCard from "../components/ProductCard.vue";
import ProductCardSkeleton from "../components/ProductCardSkeleton.vue";
import Slider from "../components/Slider.vue";
import productService from "../api/productService";
import { Product } from "../types/types";

const products = ref<Product[]>([]); // Products type
const isLoading = ref(true); // is loading

// Get products
onMounted(async () => {
  try {
    products.value = await productService.getAllProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="home-page">
    <!-- Home Slider -->
    <section class="sliders-section">
      <Slider />
    </section>

    <!-- Products List -->
    <div class="container">
      <section class="products-section">
        <div class="products-section-all">
          <div class="products-section-heading">
            <div class="products-section-heading-left">
              <div class="products-section-title">
                <h2>All sneakers</h2>
              </div>
            </div>
            <div class="products-section-heading-right">
              <div class="products-section-filter-bar">
                <input type="text" placeholder="Price: Low To High" />
              </div>
              <div class="products-section-search-bar">
                <input type="text" placeholder="Search..." />
              </div>
            </div>
          </div>
          <div class="products-section-container">

            <template v-if="isLoading">
              <ProductCardSkeleton
                v-for="skeleton in products.length > 0 ? products.length : 10"
                :key="skeleton"
              />
            </template>

            <template v-else-if="products.length === 0">
              <div class="no-products-message">
                <p>
                  Currently, there are no available products. Please check back
                  later!
                </p>
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
  </div>
</template>

<style lang="scss">
@use "../assets/styles/main" as *;

.home-page {
  .sliders-section {
    padding: 40px 0;
  }
  .products-section {
    .products-section-all {
      .products-section-heading {
        display: flex;
        justify-content: space-between;

        .products-section-heading-left {
          .products-section-title {
            h2 {
              font-size: 32px;
            }
          }
        }
        .products-section-heading-right {
          display: flex;
          justify-content: space-between;
          gap: 50px;

          //   .products-section-filter-bar {
          //     input {
          //     }
          //   }
          //   .products-section-search-bar {
          //     input {
          //     }
          //   }
        }
      }
      .products-section-container {
        display: flex;
        flex-wrap: wrap;
        gap: 50px;
        padding: 40px 0;

        .no-products-message {
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
          margin: auto;

          p {
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>
