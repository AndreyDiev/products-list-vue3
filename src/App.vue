<script setup lang="ts">
import productGrid from './components/product-grid.vue';
import filterForm from './components/filter-form.vue';

</script>

<template>
  <main class="main-content">
    <filterForm></filterForm>
    <productGrid></productGrid>
  </main>
</template>

<style>
body {
  padding: 0;
  margin: 0;
  background: #f0f8ff;
}

.main-content {
  padding: 12px 16px;
}
</style>
