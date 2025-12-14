import { ref, computed, onMounted } from 'vue'
import { productsApi } from '@/api/products'
import type { Product } from '@/types/product'

const products = ref<Product[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)
// Реактивные фильтры
const minPrice = ref<number>(0) // Минимальная цена
const onlyInStock = ref<boolean>(false) // Флаг "Только в наличии"

export const useProducts = () => {
  const fetchProducts = async (limit: number = 30, skip: number = 0) => {
    try {
      isLoading.value = true
      error.value = null
      products.value = await productsApi.getProducts(limit, skip)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Неизвестная ошибка'
    } finally {
      isLoading.value = false
    }
  }

  const filteredProducts = computed(() => {
    return products.value.filter((product) => {
      // Фильтр по цене
      const matchesPrice = product.price >= (minPrice.value || 0)

      // Фильтр по статусу наличия
      // Если галочка включена, убираем 'Out of Stock'
      // Если выключена — показываем всё
      const isAvailable = product.availabilityStatus !== 'Out of Stock'
      const matchesStock = onlyInStock.value ? isAvailable : true

      return matchesPrice && matchesStock
    })
  })

  onMounted(() => {
    fetchProducts()
  })

  return {
    products,
    isLoading,
    error,
    filteredProducts,
    minPrice,
    onlyInStock,
    fetchProducts,
    refetch: fetchProducts,
  }
}
