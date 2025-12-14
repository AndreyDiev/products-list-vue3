<script setup lang="ts">
import { useProducts } from '@/composables/use-products'

const { products, isLoading, error, fetchProducts } = useProducts()
</script>

<template>
  <div v-if="!isLoading && !error" class="load-more-container">
    <button @click="fetchProducts(products.length + 30)" class="btn-load-more">
      <span>Загрузить еще</span>
      <svg class="icon-refresh" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M21 12a9 9 0 1 1-6.219-8.56" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>
  </div>
</template>

<style scoped lang="scss">
$primary: #6366f1;
$primary-dark: #4f46e5;
$text-main: #1e293b;
$border-color: #e2e8f0;

.load-more-container {
  display: flex;
  justify-content: center;
  padding: 40px 0;
}

.btn-load-more {
  // Сброс дефолтных стилей
  appearance: none;
  background: white;
  border: 1px solid $border-color;
  cursor: pointer;
  outline: none;

  // Геометрия и шрифт
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 32px;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: $text-main;

  // Анимация
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  .icon-refresh {
    width: 18px;
    height: 18px;
    transition: transform 0.5s ease;
  }

  &:hover {
    background-color: #f8fafc;
    border-color: $primary;
    color: $primary;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba($primary, 0.1);

    .icon-refresh {
      transform: rotate(180deg);
    }
  }

  &:active {
    transform: translateY(0);
    background-color: #f1f5f9;
  }

  &.is-loading {
    opacity: 0.7;
    pointer-events: none;

    .icon-refresh {
      animation: spin 1s linear infinite;
    }
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
