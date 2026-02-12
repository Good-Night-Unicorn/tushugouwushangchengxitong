<template>
  <Layout>
    <div class="container mx-auto px-4 py-8">
      <!-- 特惠专区标题 -->
      <div class="flex items-center mb-8">
        <div class="w-2 h-12 bg-brown-800 mr-4"></div>
        <h1 class="text-3xl font-bold text-brown-900">特惠专区</h1>
      </div>

      <!-- 活动横幅 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div
          v-for="activity in activities"
          :key="activity.id"
          class="relative rounded-lg overflow-hidden shadow-lg"
        >
          <img
            :src="activity.image"
            :alt="activity.title"
            class="w-full h-64 object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
            <h3 class="text-2xl font-bold mb-2">{{ activity.title }}</h3>
            <p class="mb-4">{{ activity.description }}</p>
            <button class="bg-brown-700 hover:bg-brown-600 text-white px-6 py-2 rounded w-fit">
              {{ activity.buttonText }}
            </button>
          </div>
        </div>
      </div>

      <!-- 限时折扣 -->
      <div class="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 class="text-2xl font-bold text-brown-900 mb-6">限时折扣</h2>
        <div class="mb-6">
          <p class="text-brown-600 mb-2">本场折扣剩余时间</p>
          <div class="flex space-x-2">
            <div class="bg-brown-800 text-white px-4 py-2 rounded text-2xl font-bold">
              {{ countdown.hours }}
            </div>
            <span class="text-2xl font-bold text-brown-800">:</span>
            <div class="bg-brown-800 text-white px-4 py-2 rounded text-2xl font-bold">
              {{ countdown.minutes }}
            </div>
            <span class="text-2xl font-bold text-brown-800">:</span>
            <div class="bg-brown-800 text-white px-4 py-2 rounded text-2xl font-bold">
              {{ countdown.seconds }}
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div
            v-for="book in discountBooks"
            :key="book.id"
            class="bg-white border border-brown-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div class="relative">
              <img
                :src="book.cover"
                :alt="book.title"
                class="w-full h-48 object-cover"
              />
              <span
                v-if="book.discount"
                class="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
              >
                {{ (book.discount * 10).toFixed(1) }}折
              </span>
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-brown-900 mb-2 line-clamp-2">{{ book.title }}</h3>
              <p class="text-sm text-brown-600 mb-2">{{ book.author }}</p>
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-lg font-bold text-red-600">¥{{ book.price }}</span>
                  <span
                    v-if="book.originalPrice"
                    class="text-sm text-gray-400 line-through ml-2"
                  >
                    ¥{{ book.originalPrice }}
                  </span>
                </div>
                <button
                  @click="addToCart(book)"
                  class="bg-brown-600 hover:bg-brown-700 text-white px-3 py-1 rounded"
                >
                  <font-awesome-icon icon="shopping-cart" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 优惠券专区 -->
      <div class="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 class="text-2xl font-bold text-brown-900 mb-6">优惠券专区</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="coupon in coupons"
            :key="coupon.id"
            class="bg-gradient-to-r from-brown-600 to-brown-800 text-white p-6 rounded-lg"
          >
            <div class="flex items-center justify-between mb-4">
              <div>
                <p class="text-3xl font-bold">¥{{ coupon.amount }}</p>
                <p class="text-sm mt-2">
                  {{ coupon.type === 'sitewide' ? '全场通用券' : coupon.type === 'category' ? '文学小说类专用券' : '新书专享券' }}
                </p>
              </div>
            </div>
            <p class="text-sm mb-2">满{{ coupon.condition }}元可用</p>
            <p class="text-sm mb-4">有效期至{{ coupon.validUntil }}</p>
            <button class="w-full bg-white text-brown-800 py-2 rounded font-semibold hover:bg-brown-50">
              立即领取
            </button>
          </div>
        </div>
      </div>

      <!-- 会员专属福利 -->
      <div class="bg-brown-900 text-white p-8 rounded-lg">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold mb-2">会员专属福利</h2>
            <p class="text-brown-200">
              成为我们的会员，即可享受专属折扣、积分返利、生日礼遇等多重福利，阅读不止，好礼不断！
            </p>
          </div>
          <div class="bg-brown-800 px-6 py-3 rounded-lg">
            <span class="text-xl font-bold">VIP会员</span>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Layout from '@/components/Layout.vue'
import { useBookStore } from '@/stores/book'
import { useCartStore } from '@/stores/cart'
import { mockActivities, mockCoupons } from '@/data/mockData'
import type { Book } from '@/types'

const bookStore = useBookStore()
const cartStore = useCartStore()
const activities = mockActivities
const coupons = mockCoupons

const countdown = ref({ hours: 23, minutes: 59, seconds: 53 })
let timer: number | null = null

const discountBooks = computed(() => {
  return bookStore.books.filter(book => book.discount || book.originalPrice).slice(0, 5)
})

const addToCart = (book: Book) => {
  cartStore.addItem(book, 1)
  alert('已添加到购物车')
}

onMounted(() => {
  timer = setInterval(() => {
    countdown.value.seconds--
    if (countdown.value.seconds < 0) {
      countdown.value.seconds = 59
      countdown.value.minutes--
      if (countdown.value.minutes < 0) {
        countdown.value.minutes = 59
        countdown.value.hours--
        if (countdown.value.hours < 0) {
          countdown.value.hours = 23
        }
      }
    }
  }, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

