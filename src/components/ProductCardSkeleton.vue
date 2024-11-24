<template>
    <div class="product-card-skeleton">
      <div class="skeleton-image"></div>
      <div class="skeleton-title"></div>
      <div class="skeleton-category"></div>
      <div class="skeleton-price"></div>
      <div class="skeleton-plus-icon"></div>
    </div>
  </template>
  
<style scoped lang="scss">
@keyframes shimmer {
  0% {
    background-position: -50% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.product-card-skeleton {
  position: relative;
  width: calc(20% - 40.5px);
  flex: 0 0 auto;
  padding: 40px;
  border-radius: 30px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .skeleton-image,
  .skeleton-title,
  .skeleton-category,
  .skeleton-price,
  .skeleton-plus-icon {
    background-color: #f0f0f0;
    border-radius: 5px;
    animation: shimmer 1.5s infinite linear;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 300% 100%;
  }

  .skeleton-image {
    width: 100%;
    height: 200px;
    border-radius: 8px;
  }

  .skeleton-title {
    height: 20px;
    width: 60%;
    margin-top: 13px;
  }

  .skeleton-category {
    height: 15px;
    width: 40%;
    margin-bottom: 13px;
  }

  .skeleton-price {
    height: 20px;
    width: 50%;
  }

  .skeleton-plus-icon {
    position: absolute;
    bottom: 40px;
    right: 40px;
    width: 30px;
    height: 30px;
  }
}
</style>

  