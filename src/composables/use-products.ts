import { ref, computed, onMounted } from 'vue'
import { productsApi } from '@/api/products'
import type { Product } from '@/types/product'

export const useProducts = () => {
  const products = ref<Product[]>([])
  const isLoading = ref(true)
  const error = ref<string | null>(null)

  const fetchProducts = async (limit: number = 10, skip: number = 0) => {
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

  const totalProducts = computed(() => products.value.length)

  onMounted(() => {
    fetchProducts()
  })

  return {
    products,
    isLoading,
    error,
    totalProducts,
    refetch: fetchProducts,
  }
}