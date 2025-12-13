<script setup lang="ts">
import { useProducts } from '@/composables/use-products'
import productCard from './components/product-card.vue'

const {
  products,
  //isLoading, error, totalProducts, refetch
} = useProducts()
</script>

<template>
  <div class="products-grid">
    <productCard v-for="product in products" :key="product.id" :product="product"></productCard
    ><br />
  </div>
</template>

<style scoped lang="scss">
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  padding: 20px;
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
