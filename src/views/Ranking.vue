<template>
  <Layout>
    <div class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-md p-8">
        <div class="flex items-center mb-8">
          <div class="w-2 h-12 bg-brown-800 mr-4"></div>
          <h1 class="text-3xl font-bold text-brown-900">排行榜</h1>
        </div>

        <!-- 排行榜列表 -->
        <div class="space-y-4">
          <div
            v-for="(book, index) in rankingBooks"
            :key="book.id"
            class="flex items-center p-4 border border-brown-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div
              :class="[
                'w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mr-6',
                index < 3 ? 'bg-red-500' : 'bg-brown-600'
              ]"
            >
              {{ index + 1 }}
            </div>
            <img
              :src="book.cover"
              :alt="book.title"
              class="w-20 h-28 object-cover rounded mr-6"
            />
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-brown-900 mb-2">
                {{ book.title }}
              </h3>
              <p class="text-brown-600 mb-2">{{ book.author }}</p>
              <div class="flex items-center space-x-4 text-sm text-brown-500">
                <span>销量: {{ book.sales }}</span>
                <span v-if="book.rating">评分: {{ book.rating }}</span>
              </div>
            </div>
            <div class="text-right mr-6">
              <p class="text-2xl font-bold text-red-600 mb-2">¥{{ book.price }}</p>
              <button
                @click="addToCart(book)"
                class="bg-brown-600 hover:bg-brown-700 text-white px-6 py-2 rounded"
              >
                加入购物车
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Layout from '@/components/Layout.vue'
import { useBookStore } from '@/stores/book'
import { useCartStore } from '@/stores/cart'
import type { Book } from '@/types'

const bookStore = useBookStore()
const cartStore = useCartStore()

const rankingBooks = computed(() => bookStore.getRankingBooks)

const addToCart = (book: Book) => {
  cartStore.addItem(book, 1)
  alert('已添加到购物车')
}
</script>

