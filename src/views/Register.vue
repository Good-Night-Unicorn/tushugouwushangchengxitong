<template>
  <div class="min-h-screen bg-brown-50 flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-3xl font-bold text-brown-900 text-center mb-2">用户注册</h1>
      <p class="text-brown-600 text-center mb-8">创建您的账户，开始阅读之旅</p>

      <form @submit.prevent="handleRegister" class="space-y-6">
        <!-- 用户名 -->
        <div>
          <label class="block text-brown-700 mb-2">用户名</label>
          <div class="relative">
            <font-awesome-icon
              icon="user"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-brown-400"
            />
            <input
              v-model="form.username"
              type="text"
              placeholder="请输入用户名"
              required
              class="w-full pl-10 pr-4 py-3 bg-brown-50 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
            />
          </div>
        </div>

        <!-- 手机号 -->
        <div>
          <label class="block text-brown-700 mb-2">手机号</label>
          <div class="relative">
            <font-awesome-icon
              icon="phone"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-brown-400"
            />
            <input
              v-model="form.phone"
              type="tel"
              placeholder="请输入手机号"
              required
              class="w-full pl-10 pr-4 py-3 bg-brown-50 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
            />
          </div>
        </div>

        <!-- 邮箱 -->
        <div>
          <label class="block text-brown-700 mb-2">邮箱</label>
          <div class="relative">
            <font-awesome-icon
              icon="envelope"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-brown-400"
            />
            <input
              v-model="form.email"
              type="email"
              placeholder="请输入邮箱"
              required
              class="w-full pl-10 pr-4 py-3 bg-brown-50 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
            />
          </div>
        </div>

        <!-- 密码 -->
        <div>
          <label class="block text-brown-700 mb-2">密码</label>
          <div class="relative">
            <font-awesome-icon
              icon="lock"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-brown-400"
            />
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="请输入密码"
              required
              class="w-full pl-10 pr-10 py-3 bg-brown-50 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-brown-400 hover:text-brown-600"
            >
              <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" />
            </button>
          </div>
        </div>

        <!-- 确认密码 -->
        <div>
          <label class="block text-brown-700 mb-2">确认密码</label>
          <div class="relative">
            <font-awesome-icon
              icon="lock"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-brown-400"
            />
            <input
              v-model="form.confirmPassword"
              :type="showPassword ? 'text' : 'password'"
              placeholder="请再次输入密码"
              required
              class="w-full pl-10 pr-10 py-3 bg-brown-50 border border-brown-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
            />
          </div>
        </div>

        <!-- 注册按钮 -->
        <button
          type="submit"
          class="w-full bg-brown-600 hover:bg-brown-700 text-white py-3 rounded-lg font-semibold text-lg transition-colors"
        >
          注册
        </button>
      </form>

      <!-- 登录链接 -->
      <div class="mt-6 text-center">
        <p class="text-brown-600">
          已有账号?
          <router-link to="/login" class="text-brown-800 hover:text-brown-900 font-semibold">
            立即登录
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const form = ref({
  username: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: ''
})
const showPassword = ref(false)

const handleRegister = () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert('两次输入的密码不一致')
    return
  }
  const success = userStore.register(
    form.value.username,
    form.value.phone,
    form.value.email,
    form.value.password
  )
  if (success) {
    alert('注册成功！')
    router.push('/')
  } else {
    alert('注册失败，请检查输入信息')
  }
}
</script>

