import { createRouter, createWebHistory } from 'vue-router'
import productPage from '@/pages/product-page.vue';
import CatalogPage from '@/pages/catalog-page.vue';

const routes = [
  { 
    path: '/', 
    name: 'catalog', 
    component: CatalogPage 
  },
  { 
    path: '/product/:id', 
    name: 'product-details', 
    component: productPage,
    props: true 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router