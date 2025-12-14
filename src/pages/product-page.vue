<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProducts } from '@/composables/use-products'

const route = useRoute()
const { products } = useProducts()

const product = products.value.find((p) => p.id === Number(route.params.id))

const activeImageIndex = ref(0)

const setActiveImage = (index: number) => {
  activeImageIndex.value = index
}

const getStarClass = (starNumber: number) => {
  if (product) {
    const rating = product.rating
    if (starNumber <= Math.floor(rating)) return 'rating-star--full'
    if (starNumber === Math.ceil(rating) && rating % 1 > 0.3) return 'rating-star--half'
    return ''
  }
}
</script>

<template>
  <div v-if="product" class="product-detail-container">
    <router-link to="/" class="back-button">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      Назад в каталог
    </router-link>

    <div class="product-layout">
      <!-- ГАЛЕРЕЯ -->
      <section class="product-gallery">
        <div class="main-image">
          <img :src="product.images[activeImageIndex]" :alt="product.title" />
        </div>
        <div class="thumbnails" v-if="product.images.length > 1">
          <button
            v-for="(img, index) in product.images"
            :key="index"
            class="thumb-btn"
            :class="{ active: activeImageIndex === index }"
            @click="setActiveImage(index)"
          >
            <img :src="img" alt="thumbnail" />
          </button>
        </div>
      </section>

      <section class="product-info">
        <span :class="['status-badge', product.availabilityStatus.replace(' ', '-').toLowerCase()]">
          {{ product.availabilityStatus }}
        </span>

        <h1 class="product-title">{{ product.title }}</h1>

        <div class="product-card__rating">
          <div class="rating-stars">
            <span v-for="star in 5" :key="star" class="rating-star" :class="getStarClass(star)">
              ★
            </span>
          </div>
          <span class="rating-value">{{ product.rating.toFixed(1) }}</span>
        </div>
        
        <p class="product-price">{{ product.price.toLocaleString() }} ₽</p>


        <div class="product-description">
          <h3>Описание</h3>
          <p>{{ product.description }}</p>
        </div>

        <button class="add-to-cart-btn">Добавить в корзину</button>
      </section>
    </div>
  </div>

  <div v-else class="not-found">
    <h2>Товар не найден</h2>
    <router-link to="/">Вернуться на главную</router-link>
  </div>
</template>

<style scoped lang="scss">
$primary: #6366f1;
$text-dark: #1e293b;
$text-light: #64748b;
$border: #e2e8f0;

.product-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Inter', sans-serif;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: $text-light;
  font-weight: 500;
  margin-bottom: 30px;
  transition: color 0.2s;

  &:hover {
    color: $primary;
  }
}

.product-layout {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 60px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

// Стили галереи
.product-gallery {
  .main-image {
    width: 100%;
    aspect-ratio: 4 / 3;
    background: #f8fafc;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid $border;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .thumbnails {
    display: flex;
    gap: 12px;
    margin-top: 20px;

    .thumb-btn {
      width: 80px;
      height: 80px;
      border-radius: 10px;
      border: 2px solid transparent;
      overflow: hidden;
      cursor: pointer;
      padding: 0;
      background: none;
      transition: all 0.2s;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &.active {
        border-color: $primary;
      }
      &:hover:not(.active) {
        border-color: lighten($primary, 30%);
      }
    }
  }
}

// Стили инфо
.product-info {
  .product-title {
    font-size: 2.5rem;
    color: $text-dark;
    margin: 12px 0;
  }

  .product-price {
    font-size: 1.8rem;
    font-weight: 700;
    color: $primary;
    margin-bottom: 30px;
  }

  .status-badge {
    padding: 6px 12px;
    border-radius: 99px;
    font-size: 0.85rem;
    font-weight: 600;
    &.in-stock {
      background: #dcfce7;
      color: #166534;
    }
    &.low-stock {
      background: #fef9c3;
      color: #854d0e;
    }
    &.out-of-stock {
      background: #fee2e2;
      color: #991b1b;
    }
  }

  .product-description {
    margin-bottom: 40px;
    h3 {
      font-size: 1.1rem;
      color: $text-dark;
      margin-bottom: 10px;
    }
    p {
      color: $text-light;
      line-height: 1.6;
    }
  }

  .add-to-cart-btn {
    width: 100%;
    padding: 16px;
    background: $primary;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: darken($primary, 10%);
    }
  }
}
</style>
