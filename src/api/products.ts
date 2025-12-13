import axios from 'axios';
import type { Product, ProductResponse } from '@/types';

const API_BASE_URL = 'https://dummyjson.com'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productsApi = {
  async getProducts(limit: number, skip: number = 0): Promise<Product[]> {
    try {
      const { data } = await api.get<ProductResponse>(`/products?limit=${limit}&skip=${skip}`)
      return data.products
    } catch (error) {
      console.error('Failed to fetch products:', error)
      throw new Error('Не удалось загрузить товары. Попробуйте позже.')
    }
  },
}
