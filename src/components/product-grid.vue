<script setup lang="ts">
import { useProducts } from '@/composables/use-products'
import productCard from '@/components/product-card.vue'
import moreButton from './more-button.vue';

const { filteredProducts, isLoading, error } = useProducts()
</script>

<template>
  <div class="products-grid">
    <productCard
      v-for="product in filteredProducts"
      :key="product.id"
      :product="product"
    ></productCard>
  </div>
  <moreButton></moreButton>

  <p v-if="isLoading">Loading...</p>
  <p v-if="!isLoading && error">{{ error }}</p>
  <p v-if="!isLoading && !error && filteredProducts.length === 0">Не найдено ни одного товара.</p>
</template>

<style>
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  padding: 20px 0;
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
    padding: 16px;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
