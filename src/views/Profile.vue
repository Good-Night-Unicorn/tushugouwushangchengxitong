<template>
  <Layout>
    <div class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-md p-8">
        <h1 class="text-3xl font-bold text-brown-900 mb-2">个人中心</h1>
        <p class="text-brown-600 mb-8">管理您的账户信息和阅读收藏</p>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- 左侧边栏 -->
          <div class="bg-brown-50 rounded-lg p-6">
            <!-- 用户信息 -->
            <div class="text-center mb-6">
              <div class="w-20 h-20 bg-brown-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <font-awesome-icon icon="user" class="text-4xl text-brown-700" />
              </div>
              <h2 class="text-xl font-bold text-brown-900">{{ userStore.user?.username }}</h2>
            </div>

            <!-- 统计 -->
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="bg-white rounded-lg p-4 text-center">
                <p class="text-2xl font-bold text-brown-900">{{ favoritesCount }}</p>
                <p class="text-sm text-brown-600 mt-1">收藏书籍</p>
              </div>
              <div class="bg-white rounded-lg p-4 text-center">
                <p class="text-2xl font-bold text-brown-900">{{ cartStore.totalCount }}</p>
                <p class="text-sm text-brown-600 mt-1">购物车</p>
              </div>
            </div>

            <!-- 导航 -->
            <nav class="space-y-2">
              <router-link
                to="/profile"
                class="flex items-center space-x-2 px-4 py-3 rounded-lg bg-brown-800 text-white"
              >
                <font-awesome-icon icon="user" />
                <span>个人信息</span>
              </router-link>
              <router-link
                to="/profile?tab=favorites"
                class="flex items-center space-x-2 px-4 py-3 rounded-lg text-brown-700 hover:bg-brown-100"
              >
                <font-awesome-icon icon="heart" />
                <span>我的收藏</span>
              </router-link>
              <router-link
                to="/cart"
                class="flex items-center space-x-2 px-4 py-3 rounded-lg text-brown-700 hover:bg-brown-100"
              >
                <font-awesome-icon icon="shopping-cart" />
                <span>购物车</span>
              </router-link>
              <router-link
                to="/orders"
                class="flex items-center space-x-2 px-4 py-3 rounded-lg text-brown-700 hover:bg-brown-100"
              >
                <font-awesome-icon icon="list" />
                <span>我的订单</span>
              </router-link>
            </nav>
          </div>

          <!-- 右侧内容 -->
          <div class="md:col-span-3">
            <!-- 个人信息 -->
            <div v-if="activeTab === 'info'">
              <h2 class="text-2xl font-bold text-brown-900 mb-6">个人信息</h2>
              <form @submit.prevent="saveProfile" class="space-y-6 max-w-2xl">
                <div>
                  <label class="block text-brown-700 mb-2">用户名</label>
                  <input
                    v-model="profileForm.username"
                    type="text"
                    required
                    class="w-full px-4 py-2 border border-brown-300 rounded focus:outline-none focus:ring-2 focus:ring-brown-500"
                  />
                </div>
                <div>
                  <label class="block text-brown-700 mb-2">手机号</label>
                  <input
                    v-model="profileForm.phone"
                    type="tel"
                    required
                    class="w-full px-4 py-2 border border-brown-300 rounded focus:outline-none focus:ring-2 focus:ring-brown-500"
                  />
                </div>
                <div>
                  <label class="block text-brown-700 mb-2">邮箱</label>
                  <input
                    v-model="profileForm.email"
                    type="email"
                    required
                    class="w-full px-4 py-2 border border-brown-300 rounded focus:outline-none focus:ring-2 focus:ring-brown-500"
                  />
                </div>
                <div>
                  <label class="block text-brown-700 mb-2">生日</label>
                  <input
                    v-model="profileForm.birthday"
                    type="date"
                    class="w-full px-4 py-2 border border-brown-300 rounded focus:outline-none focus:ring-2 focus:ring-brown-500"
                  />
                </div>
                <div>
                  <label class="block text-brown-700 mb-2">个人简介</label>
                  <textarea
                    v-model="profileForm.bio"
                    rows="4"
                    placeholder="介绍一下自己..."
                    class="w-full px-4 py-2 border border-brown-300 rounded focus:outline-none focus:ring-2 focus:ring-brown-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  class="bg-brown-600 hover:bg-brown-700 text-white px-8 py-3 rounded-lg font-semibold"
                >
                  保存更改
                </button>
              </form>
            </div>

            <!-- 我的收藏 -->
            <div v-if="activeTab === 'favorites'">
              <h2 class="text-2xl font-bold text-brown-900 mb-6">我的收藏</h2>
              <div v-if="favoriteBooks.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <BookCard
                  v-for="book in favoriteBooks"
                  :key="book.id"
                  :book="book"
                />
              </div>
              <div v-else class="text-center py-12">
                <p class="text-brown-600 text-lg mb-4">暂无收藏</p>
                <router-link
                  to="/"
                  class="inline-block bg-brown-600 hover:bg-brown-700 text-white px-6 py-3 rounded-lg"
                >
                  去逛逛
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Layout from '@/components/Layout.vue'
import BookCard from '@/components/BookCard.vue'
import { useUserStore } from '@/stores/user'
import { useCartStore } from '@/stores/cart'
import { useBookStore } from '@/stores/book'

const route = useRoute()
const userStore = useUserStore()
const cartStore = useCartStore()
const bookStore = useBookStore()

const activeTab = ref('info')
const profileForm = ref({
  username: '',
  phone: '',
  email: '',
  birthday: '',
  bio: ''
})

const favoritesCount = computed(() => {
  return userStore.user?.favorites.length || 0
})

const favoriteBooks = computed(() => {
  if (!userStore.user) return []
  return userStore.user.favorites
    .map(id => bookStore.getBookById(id))
    .filter(book => book !== undefined)
})

const saveProfile = () => {
  userStore.updateUser(profileForm.value)
  alert('保存成功！')
}

onMounted(() => {
  if (route.query.tab === 'favorites') {
    activeTab.value = 'favorites'
  }
  if (userStore.user) {
    profileForm.value = {
      username: userStore.user.username,
      phone: userStore.user.phone,
      email: userStore.user.email,
      birthday: userStore.user.birthday || '',
      bio: userStore.user.bio || ''
    }
  }
})
</script>

