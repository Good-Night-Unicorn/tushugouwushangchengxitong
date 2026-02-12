<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <!-- 顶部栏 -->
      <div class="flex items-center justify-between py-4">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <div class="text-2xl font-bold text-brown-800">书海悦读</div>
        </router-link>

        <!-- 搜索框 -->
        <div class="flex-1 max-w-2xl mx-8">
          <div class="relative">
            <input
              v-model="searchKeyword"
              @keyup.enter="handleSearch"
              type="text"
              placeholder="搜索书籍、作者、出版社..."
              class="w-full px-4 py-2 pl-10 pr-4 border border-brown-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brown-500"
            />
            <font-awesome-icon
              icon="search"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-brown-400"
            />
          </div>
        </div>

        <!-- 用户操作 -->
        <div class="flex items-center space-x-6">
          <template v-if="userStore.isLoggedIn">
            <router-link
              to="/profile"
              class="flex items-center space-x-2 text-brown-700 hover:text-brown-900"
            >
              <font-awesome-icon icon="user" />
              <span>{{ userStore.user?.username }}</span>
            </router-link>
            <router-link
              to="/cart"
              class="flex items-center space-x-2 text-brown-700 hover:text-brown-900 relative"
            >
              <font-awesome-icon icon="shopping-cart" />
              <span>购物车</span>
              <span
                v-if="cartStore.totalCount > 0"
                class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {{ cartStore.totalCount }}
              </span>
            </router-link>
            <button
              @click="handleLogout"
              class="text-brown-700 hover:text-brown-900"
            >
              退出
            </button>
          </template>
          <template v-else>
            <router-link
              to="/login"
              class="flex items-center space-x-2 text-brown-700 hover:text-brown-900"
            >
              <font-awesome-icon icon="sign-in-alt" />
              <span>登录/注册</span>
            </router-link>
            <router-link
              to="/cart"
              class="flex items-center space-x-2 text-brown-700 hover:text-brown-900 relative"
            >
              <font-awesome-icon icon="shopping-cart" />
              <span>购物车</span>
              <span
                v-if="cartStore.totalCount > 0"
                class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {{ cartStore.totalCount }}
              </span>
            </router-link>
          </template>
        </div>
      </div>

      <!-- 导航栏 -->
      <nav class="border-t border-brown-200">
        <ul class="flex space-x-8 py-3">
          <li>
            <router-link
              to="/"
              class="text-brown-700 hover:text-brown-900 font-medium"
              active-class="text-brown-900 border-b-2 border-brown-900"
            >
              首页
            </router-link>
          </li>
          <li>
            <router-link
              to="/category"
              class="text-brown-700 hover:text-brown-900 font-medium"
              active-class="text-brown-900 border-b-2 border-brown-900"
            >
              分类
            </router-link>
          </li>
          <li>
            <router-link
              to="/ranking"
              class="text-brown-700 hover:text-brown-900 font-medium"
              active-class="text-brown-900 border-b-2 border-brown-900"
            >
              排行榜
            </router-link>
          </li>
          <li>
            <router-link
              to="/new-arrivals"
              class="text-brown-700 hover:text-brown-900 font-medium"
              active-class="text-brown-900 border-b-2 border-brown-900"
            >
              新书上架
            </router-link>
          </li>
          <li>
            <router-link
              to="/promotion"
              class="text-brown-700 hover:text-brown-900 font-medium"
              active-class="text-brown-900 border-b-2 border-brown-900"
            >
              特惠专区
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useCartStore } from '@/stores/cart'
import { useBookStore } from '@/stores/book'

const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()
const bookStore = useBookStore()

const searchKeyword = ref('')

const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    bookStore.searchBooks(searchKeyword.value)
    router.push({ name: 'search', query: { q: searchKeyword.value } })
  }
}

const handleLogout = () => {
  userStore.logout()
  router.push('/')
}
</script>

