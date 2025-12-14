<script setup lang="ts">
import { useProducts } from '@/composables/use-products'
import { ref } from 'vue'

const isFiltersOpen = ref(false)
const { minPrice, onlyInStock } = useProducts()
</script>

<template>
  <div class="filter-component">
    <!-- Основная кнопка -->
    <button
      @click="isFiltersOpen = !isFiltersOpen"
      class="filter-toggle"
      :class="{ 'is-active': isFiltersOpen }"
    >
      <span class="filter-icon"></span>
      Фильтры
    </button>

    <!-- Выпадающая панель -->
    <transition name="dropdown">
      <div v-if="isFiltersOpen" class="filter-dropdown">
        <div class="filter-group">
          <label class="filter-label">Минимальная цена</label>
          <div class="price-input">
            <input type="number" v-model.number="minPrice" placeholder="0" />
            <span class="currency-mark">$</span>
          </div>
        </div>

        <div class="filter-group">
          <label class="toggle-switch">
            <input type="checkbox" v-model="onlyInStock" />
            <div class="toggle-track">
              <div class="toggle-thumb"></div>
            </div>
            <span class="toggle-text">Только в наличии</span>
          </label>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
// Переменные
$primary: #6366f1;
$text-main: #1e293b;
$text-muted: #64748b;
$border-color: #e2e8f0;
$bg-white: #ffffff;
$shadow:
  0 10px 15px -3px rgba(0, 0, 0, 0.1),
  0 4px 6px -2px rgba(0, 0, 0, 0.05);

.filter-component {
  position: sticky;
  top: 12px;
  z-index: 3;
  display: inline-block;
  font-family: 'Inter', sans-serif;

  .filter-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    background: $bg-white;
    border: 1px solid $border-color;
    border-radius: 12px;
    font-weight: 600;
    color: $text-main;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: $primary;
      background: mix($primary, #ffffff, 15%);
    }

    &.is-active {
      background: $primary;
      color: white;
      border-color: $primary;
    }
  }

  .filter-dropdown {
    position: absolute;
    top: calc(100% + 12px);
    left: 0;
    z-index: 50;
    width: 280px;
    padding: 20px;
    background: $bg-white;
    border: 1px solid $border-color;
    border-radius: 16px;
    box-shadow: $shadow;

    .filter-group {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }

      .filter-label {
        display: block;
        font-size: 13px;
        font-weight: 600;
        color: $text-muted;
        margin-bottom: 8px;
      }
    }

    .price-input {
      position: relative;
      display: flex;
      align-items: center;

      input {
        width: 100%;
        padding: 10px 35px 10px 12px;
        border: 1.5px solid $border-color;
        border-radius: 8px;
        font-size: 14px;
        outline: none;
        transition: border-color 0.2s;

        &:focus {
          border-color: $primary;
        }
      }

      .currency-mark {
        position: absolute;
        right: 12px;
        color: $text-muted;
        font-size: 14px;
      }
    }
  }
}

// Стили переключателя (Toggle)
.toggle-switch {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;

  input {
    display: none;

    &:checked + .toggle-track {
      background: $primary;

      .toggle-thumb {
        transform: translateX(16px);
      }
    }
  }

  .toggle-track {
    width: 36px;
    height: 20px;
    background: $border-color;
    border-radius: 20px;
    position: relative;
    transition: 0.3s;

    .toggle-thumb {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 14px;
      height: 14px;
      background: white;
      border-radius: 50%;
      transition: 0.3s;
    }
  }

  .toggle-text {
    font-size: 14px;
    font-weight: 500;
    color: $text-main;
  }
}

// Анимация Vue Transition
.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
