<template>
  <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
    <div class="relative">
      <router-link :to="`/book/${book.id}`">
        <img
          :src="book.cover"
          :alt="book.title"
          class="w-full h-64 object-cover"
          @error="handleImageError"
        />
      </router-link>
      <!-- 标签 -->
      <div class="absolute top-2 right-2 flex flex-col space-y-2">
        <span
          v-if="book.isHot"
          class="bg-red-500 text-white text-xs px-2 py-1 rounded"
        >
          热销
        </span>
        <span
          v-if="book.isNew"
          class="bg-green-500 text-white text-xs px-2 py-1 rounded"
        >
          新书
        </span>
        <span
          v-if="book.isClassic"
          class="bg-yellow-500 text-white text-xs px-2 py-1 rounded"
        >
          经典
        </span>
      </div>
      <!-- 收藏按钮 -->
      <button
        @click="toggleFavorite"
        class="absolute top-2 left-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors"
      >
        <font-awesome-icon
          :icon="isFavorite ? 'heart' : 'heart'"
          :class="isFavorite ? 'text-red-500' : 'text-gray-400'"
        />
      </button>
    </div>

    <div class="p-4">
      <router-link :to="`/book/${book.id}`">
        <h3 class="text-lg font-semibold text-brown-900 mb-2 line-clamp-2 hover:text-brown-700">
          {{ book.title }}
        </h3>
      </router-link>
      <p class="text-sm text-brown-600 mb-2">{{ book.author }}</p>
      <div class="flex items-center justify-between">
        <div>
          <span class="text-xl font-bold text-red-600">¥{{ book.price }}</span>
          <span
            v-if="book.originalPrice && book.originalPrice > book.price"
            class="text-sm text-gray-400 line-through ml-2"
          >
            ¥{{ book.originalPrice }}
          </span>
        </div>
        <button
          @click="addToCart"
          class="bg-brown-600 hover:bg-brown-700 text-white px-4 py-2 rounded transition-colors"
        >
          <font-awesome-icon icon="shopping-cart" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Book } from '@/types'
import { useUserStore } from '@/stores/user'
import { useCartStore } from '@/stores/cart'

interface Props {
  book: Book
}

const props = defineProps<Props>()

const userStore = useUserStore()
const cartStore = useCartStore()

const isFavorite = computed(() => {
  return userStore.isFavorite(props.book.id)
})

const toggleFavorite = () => {
  if (!userStore.isLoggedIn) {
    alert('请先登录')
    return
  }
  if (isFavorite.value) {
    userStore.removeFavorite(props.book.id)
  } else {
    userStore.addFavorite(props.book.id)
  }
}

const addToCart = () => {
  cartStore.addItem(props.book, 1)
  // 可以添加提示
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
    <svg width="300" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle" dy=".3em">图片加载失败</text>
    </svg>
  `)
}
</script>

