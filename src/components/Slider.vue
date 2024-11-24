<script setup lang="ts">
import SliderImage from "../assets/images/sliderImage.svg";
</script>

<template>
  <div class="container">
    <section>
      <div class="img-container">
        <img :src="SliderImage" alt="Kermit" />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/styles/main" as *;
section {
  .img-container {

    img {
      width: 100%;
    }
  }
}
</style>
