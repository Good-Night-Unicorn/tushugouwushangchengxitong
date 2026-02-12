<template>
  <Layout>
    <div class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-md p-8">
        <!-- 搜索框 -->
        <div class="mb-8">
          <div class="relative max-w-2xl mx-auto">
            <input
              v-model="searchKeyword"
              @keyup.enter="handleSearch"
              type="text"
              placeholder="搜索书籍、作者、出版社..."
              class="w-full px-4 py-3 pl-12 pr-4 border-2 border-brown-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brown-500 text-lg"
            />
            <font-awesome-icon
              icon="search"
              class="absolute left-4 top-1/2 transform -translate-y-1/2 text-brown-400 text-xl"
            />
            <button
              @click="handleSearch"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-brown-600 hover:bg-brown-700 text-white px-6 py-2 rounded-full"
            >
              搜索
            </button>
          </div>
        </div>

        <!-- 搜索结果 -->
        <div v-if="searchKeyword">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-brown-900">
              搜索结果 ({{ searchResults.length }})
            </h2>
            <div class="flex space-x-2">
              <button
                v-for="sort in sortOptions"
                :key="sort.value"
                @click="bookStore.setSortBy(sort.value)"
                :class="[
                  'px-4 py-2 rounded transition-colors',
                  bookStore.sortBy === sort.value
                    ? 'bg-brown-800 text-white'
                    : 'bg-gray-100 text-brown-700 hover:bg-brown-100'
                ]"
              >
                {{ sort.label }}
              </button>
            </div>
          </div>

          <div v-if="searchResults.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <BookCard
              v-for="book in searchResults"
              :key="book.id"
              :book="book"
            />
          </div>
          <div v-else class="text-center py-12">
            <p class="text-brown-600 text-lg">没有找到相关图书</p>
          </div>
        </div>

        <!-- 热门搜索 -->
        <div v-else>
          <h2 class="text-2xl font-bold text-brown-900 mb-6">热门搜索</h2>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="keyword in hotKeywords"
              :key="keyword"
              @click="searchKeyword = keyword; handleSearch()"
              class="px-4 py-2 bg-brown-100 hover:bg-brown-200 text-brown-700 rounded-full transition-colors"
            >
              {{ keyword }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Layout from '@/components/Layout.vue'
import BookCard from '@/components/BookCard.vue'
import { useBookStore } from '@/stores/book'

const route = useRoute()
const router = useRouter()
const bookStore = useBookStore()
const searchKeyword = ref('')

const sortOptions = [
  { label: '默认', value: 'default' },
  { label: '销量', value: 'sales' },
  { label: '价格↑', value: 'price-asc' },
  { label: '价格↓', value: 'price-desc' }
]

const hotKeywords = ['百年孤独', '认知觉醒', '活着', '平凡的世界', '解忧杂货店']

const searchResults = computed(() => {
  if (!searchKeyword.value) return []
  bookStore.searchBooks(searchKeyword.value)
  return bookStore.filteredBooks
})

const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    bookStore.searchBooks(searchKeyword.value)
    router.replace({ query: { q: searchKeyword.value } })
  }
}

onMounted(() => {
  const q = route.query.q as string
  if (q) {
    searchKeyword.value = q
    handleSearch()
  }
})
</script>

