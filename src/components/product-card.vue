<template>
  <article class="product-card" :class="cardClass">
    <div class="product-card__image-wrapper">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="product-card__image"
        loading="lazy"
        @error="handleImageError"
      />
      
      <div class="product-card__status" :class="statusClass">
        {{ product.availabilityStatus }}
      </div>
      
    </div>

    <div class="product-card__content">
      <div class="product-card__header">
        <h3 class="product-card__title">
          {{ product.title }}
        </h3>
        <p class="product-card__description">
          {{ truncatedDescription }}
        </p>
      </div>

      <div class="product-card__rating">
        <div class="rating-stars">
          <span
            v-for="star in 5"
            :key="star"
            class="rating-star"
            :class="getStarClass(star)"
          >
            ★
          </span>
        </div>
        <span class="rating-value">{{ product.rating.toFixed(1) }}</span>
      </div>

      <div class="product-card__footer">
        <div class="product-card__price-wrapper">
          <span class="product-card__price">
            {{ formattedPrice }}
          </span>
        </div>
        
        <button 
          class="product-card__action-btn"
          :disabled="isOutOfStock"
          :class="{ 'product-card__action-btn--disabled': isOutOfStock }"
          @click="handleAddToCart"
        >
          <span v-if="isOutOfStock">Нет в наличии</span>
          <span v-else>В корзину</span>
          <svg 
            v-if="!isOutOfStock"
            class="action-btn__icon" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M6 19.5C6 20.328 6.672 21 7.5 21C8.328 21 9 20.328 9 19.5C9 18.672 8.328 18 7.5 18C6.672 18 6 18.672 6 19.5Z" fill="currentColor"/>
            <path d="M16.5 21C17.328 21 18 20.328 18 19.5C18 18.672 17.328 18 16.5 18C15.672 18 15 18.672 15 19.5C15 20.328 15.672 21 16.5 21Z" fill="currentColor"/>
            <path d="M20.5 6H5.5L4.5 3H1V5H3L6.5 15H18L21.5 6H20.5Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Product } from '@/types';
import { computed, type PropType } from 'vue'


const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true
  },
  compact: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  addToCart: [id: number]
  click: [product: Product]
}>()

// Вычисляемые свойства
const formattedPrice = computed(() => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(props.product.price)
})

const isOutOfStock = computed(() => 
  props.product.availabilityStatus === 'Out of Stock'
)

const statusClass = computed(() => {
  const status = props.product.availabilityStatus
  return {
    'product-card__status--in-stock': status === 'In Stock',
    'product-card__status--low-stock': status === 'Low Stock',
    'product-card__status--out-of-stock': status === 'Out of Stock'
  }
})

const cardClass = computed(() => ({
  'product-card--compact': props.compact,
  'product-card--out-of-stock': isOutOfStock.value
}))

const truncatedDescription = computed(() => {
  const maxLength = props.compact ? 60 : 80
  return props.product.description.length > maxLength
    ? props.product.description.substring(0, maxLength) + '...'
    : props.product.description
})

// Методы
const getStarClass = (starNumber: number) => {
  const rating = props.product.rating
  if (starNumber <= Math.floor(rating)) return 'rating-star--full'
  if (starNumber === Math.ceil(rating) && rating % 1 > 0.3) return 'rating-star--half'
  return ''
}

const handleAddToCart = (event: MouseEvent) => {
  event.stopPropagation()
  if (!isOutOfStock.value) {
    emit('addToCart', props.product.id)
  }
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xNTAgODBDMTIxLjEgODAgOTggMTAzLjEgOTggMTMyQzk4IDE2MC45IDEyMS4xIDE4NCAxNTAgMTg0QzE3OC45IDE4NCAyMDIgMTYwLjkgMjAyIDEzMkMyMDIgMTAzLjEgMTc4LjkgODAgMTUwIDgwWiIgZmlsbD0iI0RDRENEQyIvPgo8cGF0aCBkPSJNMTcwLjUgMTE3TDE1MCAxMzcuNUwxMjkuNSAxMTdMMTE3IDEyOS41TDEzNy41IDE1MEwxMTcgMTcwLjVMMTI5LjUgMTgzTDE1MCAxNjIuNUwxNzAuNSAxODNMMTgzIDE3MC41TDE2Mi41IDE1MEwxODMgMTI5LjVMMTcwLjUgMTE3WiIgZmlsbD0iI0I4QjhCOCIvPgo8L3N2Zz4K'
}
</script>

<style scoped>
/* Базовые стили карточки */
.product-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  cursor: pointer;
  border: 1px solid #f0f0f0;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 8px 24px rgba(0, 0, 0, 0.12),
    0 2px 6px rgba(0, 0, 0, 0.05);
  border-color: #e0e0e0;
}

.product-card--out-of-stock {
  opacity: 0.85;
}

.product-card--out-of-stock:hover {
  transform: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* Контейнер изображения */
.product-card__image-wrapper {
  position: relative;
  aspect-ratio: 4/3;
  background: #f8f9fa;
  overflow: hidden;
}

.product-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%);
}

.product-card:hover .product-card__image {
  transform: scale(1.05);
}

.product-card--out-of-stock .product-card__image {
  filter: grayscale(0.2);
  opacity: 0.9;
}

/* Бейджи */
.product-card__status {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  z-index: 2;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-card__status--in-stock {
  background: rgba(46, 204, 113, 0.95);
  color: white;
  border: 1px solid rgba(46, 204, 113, 0.3);
}

.product-card__status--low-stock {
  background: rgba(241, 196, 15, 0.95);
  color: #2c3e50;
  border: 1px solid rgba(241, 196, 15, 0.3);
}

.product-card__status--out-of-stock {
  background: rgba(231, 76, 60, 0.95);
  color: white;
  border: 1px solid rgba(231, 76, 60, 0.3);
}

.product-card__discount {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 10px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  color: white;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
  }
  50% {
    box-shadow: 0 4px 20px rgba(255, 107, 107, 0.5);
  }
  100% {
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
  }
}

/* Контент карточки */
.product-card__content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;
}

.product-card__header {
  flex: 1;
}

.product-card__title {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 8px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-card__description {
  font-size: 14px;
  color: #7f8c8d;
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Рейтинг */
.product-card__rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 4px 0;
}

.rating-stars {
  display: flex;
  gap: 2px;
}

.rating-star {
  color: #e0e0e0;
  font-size: 16px;
  transition: color 0.2s;
}

.rating-star--full {
  color: #ffd700;
}

.rating-star--half {
  background: linear-gradient(90deg, #ffd700 50%, #e0e0e0 50%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.rating-value {
  font-size: 14px;
  font-weight: 600;
  color: #34495e;
}

/* Футер с ценой и кнопкой */
.product-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.product-card__price-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.product-card__price {
  font-size: 22px;
  font-weight: 700;
  color: #2c3e50;
  line-height: 1;
}

.product-card__price-old {
  font-size: 14px;
  color: #95a5a6;
  text-decoration: line-through;
}

/* Кнопка добавления в корзину */
.product-card__action-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.2);
}

.product-card__action-btn:hover:not(.product-card__action-btn--disabled) {
  transform: translateY(-1px);
  background: linear-gradient(135deg, #2980b9 0%, #2471a3 100%);
  box-shadow: 0 4px 16px rgba(52, 152, 219, 0.3);
}

.product-card__action-btn:active:not(.product-card__action-btn--disabled) {
  transform: translateY(0);
}

.product-card__action-btn--disabled {
  background: #bdc3c7;
  cursor: not-allowed;
  box-shadow: none;
}

.product-card__action-btn--disabled:hover {
  transform: none;
  background: #bdc3c7;
  box-shadow: none;
}

.action-btn__icon {
  width: 16px;
  height: 16px;
}

/* Адаптивность */
@media (max-width: 768px) {
  .product-card {
    border-radius: 12px;
  }
  
  .product-card__content {
    padding: 16px;
    gap: 12px;
  }
  
  .product-card__title {
    font-size: 16px;
  }
  
  .product-card__description {
    font-size: 13px;
  }
  
  .product-card__price {
    font-size: 20px;
  }
  
  .product-card__action-btn {
    padding: 8px 16px;
    font-size: 13px;
  }
  
  .rating-star {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .product-card {
    border-radius: 10px;
  }
  
  .product-card__content {
    padding: 14px;
    gap: 10px;
  }
  
  .product-card__title {
    font-size: 15px;
    -webkit-line-clamp: 2;
  }
  
  .product-card__description {
    font-size: 12px;
    -webkit-line-clamp: 2;
  }
  
  .product-card__footer {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  
  .product-card__price-wrapper {
    align-items: center;
  }
  
  .product-card__action-btn {
    width: 100%;
    justify-content: center;
  }
  
  .product-card__status {
    font-size: 11px;
    padding: 5px 10px;
  }
  
  .product-card__discount {
    font-size: 12px;
    padding: 5px 8px;
    border-radius: 10px;
  }
}

/* Компактная версия */
.product-card--compact .product-card__content {
  padding: 16px;
  gap: 12px;
}

.product-card--compact .product-card__title {
  font-size: 16px;
  -webkit-line-clamp: 1;
}

.product-card--compact .product-card__description {
  display: none;
}

.product-card--compact .product-card__rating {
  margin: 0;
}

.product-card--compact .product-card__footer {
  padding-top: 12px;
  border-top-width: 1px;
}

.product-card--compact .product-card__price {
  font-size: 18px;
}

.product-card--compact .product-card__action-btn {
  padding: 8px 16px;
  font-size: 13px;
}

/* Темная тема (опционально) */
@media (prefers-color-scheme: dark) {
  .product-card {
    background: #2c3e50;
    border-color: #34495e;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
  
  .product-card:hover {
    box-shadow: 
      0 8px 24px rgba(0, 0, 0, 0.3),
      0 2px 6px rgba(0, 0, 0, 0.15);
    border-color: #4a6572;
  }
  
  .product-card__title {
    color: #ecf0f1;
  }
  
  .product-card__description {
    color: #bdc3c7;
  }
  
  .product-card__price {
    color: #ecf0f1;
  }
  
  .product-card__footer {
    border-top-color: #34495e;
  }
  
  .product-card__image-wrapper {
    background: #34495e;
  }
  
  .product-card__image {
    background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
  }
  
  .rating-value {
    color: #bdc3c7;
  }
}

/* Анимация добавления в корзину */
@keyframes addToCart {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}

.product-card__action-btn:active:not(.product-card__action-btn--disabled) {
  animation: addToCart 0.3s ease;
}

/* Поддержка высокого контраста */
@media (prefers-contrast: high) {
  .product-card {
    border: 2px solid #000;
  }
  
  .product-card__status {
    border: 2px solid currentColor;
  }
  
  .product-card__discount {
    border: 2px solid #ff0000;
  }
}

/* Адаптация для планшетов */
@media (min-width: 481px) and (max-width: 768px) {
  .product-card {
    max-width: 100%;
  }
  
  .product-card__image-wrapper {
    aspect-ratio: 3/2;
  }
}

/* Адаптация для десктопов */
@media (min-width: 769px) and (max-width: 1024px) {
  .product-card__title {
    font-size: 17px;
  }
  
  .product-card__action-btn {
    padding: 10px 18px;
  }
}

/* Большие экраны */
@media (min-width: 1025px) {
  .product-card {
    max-width: 320px;
  }
}

/* Поддержка RTL (Right-to-Left) */
[dir="rtl"] .product-card__status,
[dir="rtl"] .product-card__discount {
  left: auto;
  right: 12px;
}

[dir="rtl"] .product-card__discount {
  right: auto;
  left: 12px;
}

/* Для печати */
@media print {
  .product-card {
    box-shadow: none;
    border: 1px solid #ddd;
    break-inside: avoid;
  }
  
  .product-card__action-btn {
    display: none;
  }
}
</style>