<script setup lang="ts">
// import { computed } from "vue";
import { storeToRefs } from 'pinia';
import { useCartStore } from "../store/CartStore";

const cartStore = useCartStore();

// Functions from CartStore with computed
// const cartItems = computed(() => cartStore.items);
// const totalPrice = computed(() => cartStore.totalPrice);
// const totalItems = computed(() => cartStore.totalItems);
// const uniqueItemCount = computed(() => cartStore.uniqueItemCount);

// Functions from CartStore with storeToRefs
const { items: cartItems, totalPrice, totalItems, uniqueItemCount } = storeToRefs(cartStore);

// Update quantity of product 
const updateQuantity = (productId: number, quantity: number) => {
  cartStore.updateQuantity(productId, quantity);
};

// Remove from cart
const removeFromCart = (productId: number) => {
  cartStore.removeFromCart(productId);
};

// Clear cart
const clearCart = () => {
  cartStore.clearCart();
};
</script>

<template>
  <div class="container">
    <section class="cart-section">
      <div class="cart-section-all">
        <div class="cart-section-heading">
          <div class="cart-section-title">
            <h2>My cart ({{ uniqueItemCount }})</h2>
          </div>
        </div>
        <div class="cart-section-container">
          <template v-if="totalItems === 0">
            <div class="no-cart-message">
              <h2>You have no orders!</h2>
              <p>You can start shopping right now.</p>
              <router-link to="/" class="button">
                <span>GO BACK</span>
              </router-link>
            </div>
          </template>
          <template v-else>
            <div class="cart-items">
              <div
                class="cart-item"
                v-for="item in cartItems"
                :key="item.product.id"
              >
                <div class="item-details">
                  <img :src="item.product.image" alt="Product Image" />
                  <div class="item-info">
                    <h2 class="item-title">{{ item.product.title }}</h2>
                    <p class="item-category">{{ item.product.category }}</p>
                    <p class="item-price">
                      {{ item.product.price.toFixed(2) }} $
                    </p>
                  </div>
                </div>
                <div class="item-quantity">
                  <input
                    type="number"
                    v-model.number="item.quantity"
                    @change="updateQuantity(item.product.id, item.quantity)"
                    min="1"
                  />
                  <button @click="removeFromCart(item.product.id)">
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <div class="cart-summary">
              <p>
                <strong>Total Price: {{ totalPrice.toFixed(2) }} $</strong>
              </p>
              <button @click="clearCart">Clear Cart</button>
            </div>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
@use "../assets/styles/main" as *;

.cart-section {
  .cart-section-all {
    .cart-section-heading {
      padding-top: 40px;
      .cart-section-title {
        h2 {
          font-size: 32px;
        }
      }
    }
    .cart-section-container {
      display: flex;
      flex-direction: column;
      padding: 40px 0;

      .no-cart-message {
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

      .cart-items {
        margin-bottom: 20px;

        .cart-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid #ddd;
          padding: 15px;
          margin-bottom: 10px;
          border-radius: 5px;

          .item-details {
            display: flex;
            align-items: center;

            img {
              width: 80px;
              height: 80px;
              margin-right: 15px;
            }

            .item-info {
              .item-title {
                font-size: 16px;
              }
              .item-category {
                color: $secondaryTextColor;
                font-weight: 600;
                margin: 5px 0;
              }
            }
          }

          .item-quantity {
            display: flex;
            align-items: center;

            input {
              width: 70px;
              margin-right: 10px;
              padding: 3px 5px;
            }

            button {
              background-color: $errorColor;
              color: #fff;
              border: none;
              padding: 5px 10px;
              border-radius: 5px;
              cursor: pointer;
              transition: background-color 0.4s;

              &:hover {
                background-color: darken($errorColor, 10%);
              }
            }
          }
          &:nth-last-child(1) {
            margin-bottom: 0;
          }
        }
      }

      .cart-summary {
        display: flex;
        justify-content: space-between;
        align-items: center;

        p {
          font-size: 20px;
          font-weight: bold;
        }

        button {
          color: #fff;
          background-color: $warningColor;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          padding: 10px 40px;
          cursor: pointer;
          transition: background-color 0.4s;

          &:hover {
            background-color: darken($warningColor, 10%);
          }
        }
      }
    }
  }
}
</style>
