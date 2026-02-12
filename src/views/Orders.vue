<template>
  <Layout>
    <div class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-md p-8">
        <h1 class="text-3xl font-bold text-brown-900 mb-8">我的订单</h1>

        <!-- 订单状态筛选 -->
        <div class="flex space-x-4 mb-6 pb-4 border-b">
          <button
            v-for="status in orderStatuses"
            :key="status.value"
            @click="selectedStatus = status.value"
            :class="[
              'px-6 py-2 rounded transition-colors',
              selectedStatus === status.value
                ? 'bg-brown-800 text-white'
                : 'bg-gray-100 text-brown-700 hover:bg-brown-100'
            ]"
          >
            {{ status.label }}
          </button>
        </div>

        <!-- 订单列表 -->
        <div v-if="filteredOrders.length > 0" class="space-y-6">
          <div
            v-for="order in filteredOrders"
            :key="order.id"
            class="border border-brown-200 rounded-lg p-6"
          >
            <!-- 订单头部 -->
            <div class="flex items-center justify-between mb-4 pb-4 border-b">
              <div>
                <p class="text-brown-600">
                  订单号: <span class="font-semibold text-brown-900">{{ order.id }}</span>
                </p>
                <p class="text-sm text-brown-500 mt-1">
                  下单时间: {{ formatDate(order.createTime) }}
                </p>
              </div>
              <div class="text-right">
                <p
                  :class="[
                    'font-semibold mb-1',
                    getStatusColor(order.status)
                  ]"
                >
                  {{ getStatusText(order.status) }}
                </p>
                <p class="text-xl font-bold text-red-600">
                  合计: ¥{{ order.totalAmount.toFixed(2) }}
                </p>
              </div>
            </div>

            <!-- 订单商品 -->
            <div class="space-y-4 mb-4">
              <div
                v-for="item in order.items"
                :key="item.bookId"
                class="flex items-center space-x-4"
              >
                <img
                  :src="item.book.cover"
                  :alt="item.book.title"
                  class="w-16 h-20 object-cover rounded"
                />
                <div class="flex-1">
                  <h3 class="font-semibold text-brown-900">{{ item.book.title }}</h3>
                  <p class="text-sm text-brown-600">{{ item.book.author }}</p>
                </div>
                <div class="text-right">
                  <p class="text-brown-700">¥{{ item.price }}</p>
                  <p class="text-sm text-brown-500">x{{ item.quantity }}</p>
                </div>
              </div>
            </div>

            <!-- 订单操作 -->
            <div class="flex justify-end space-x-4 pt-4 border-t">
              <button
                v-if="order.status === 'pending'"
                @click="cancelOrder(order.id)"
                class="px-6 py-2 border border-brown-300 rounded hover:bg-brown-50 text-brown-700"
              >
                取消订单
              </button>
              <button
                v-if="order.status === 'pending'"
                @click="payOrder(order.id)"
                class="px-6 py-2 bg-brown-600 hover:bg-brown-700 text-white rounded"
              >
                立即支付
              </button>
              <button
                v-if="order.status === 'delivered'"
                class="px-6 py-2 border border-brown-300 rounded hover:bg-brown-50 text-brown-700"
              >
                再次购买
              </button>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-else class="text-center py-12">
          <p class="text-brown-600 text-lg mb-4">暂无订单</p>
          <router-link
            to="/"
            class="inline-block bg-brown-600 hover:bg-brown-700 text-white px-6 py-3 rounded-lg"
          >
            去购物
          </router-link>
        </div>

        <!-- 结算表单（从购物车跳转时显示） -->
        <div
          v-if="showCheckout"
          class="mt-8 border-t pt-8"
        >
          <h2 class="text-2xl font-bold text-brown-900 mb-6">确认订单</h2>
          <form @submit.prevent="submitOrder" class="space-y-4 max-w-2xl">
            <div>
              <label class="block text-brown-700 mb-2">收货人</label>
              <input
                v-model="orderForm.receiver"
                type="text"
                required
                class="w-full px-4 py-2 border border-brown-300 rounded focus:outline-none focus:ring-2 focus:ring-brown-500"
              />
            </div>
            <div>
              <label class="block text-brown-700 mb-2">联系电话</label>
              <input
                v-model="orderForm.phone"
                type="tel"
                required
                class="w-full px-4 py-2 border border-brown-300 rounded focus:outline-none focus:ring-2 focus:ring-brown-500"
              />
            </div>
            <div>
              <label class="block text-brown-700 mb-2">收货地址</label>
              <textarea
                v-model="orderForm.address"
                required
                rows="3"
                class="w-full px-4 py-2 border border-brown-300 rounded focus:outline-none focus:ring-2 focus:ring-brown-500"
              ></textarea>
            </div>
            <div class="flex justify-end space-x-4">
              <button
                type="button"
                @click="showCheckout = false"
                class="px-6 py-2 border border-brown-300 rounded hover:bg-brown-50 text-brown-700"
              >
                取消
              </button>
              <button
                type="submit"
                class="px-6 py-2 bg-brown-600 hover:bg-brown-700 text-white rounded"
              >
                提交订单
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Layout from '@/components/Layout.vue'
import { useOrderStore } from '@/stores/order'
import { useCartStore } from '@/stores/cart'
import type { OrderStatus } from '@/types'

const route = useRoute()
const router = useRouter()
const orderStore = useOrderStore()
const cartStore = useCartStore()

const selectedStatus = ref<OrderStatus | 'all'>('all')
const showCheckout = ref(false)
const orderForm = ref({
  receiver: '',
  phone: '',
  address: ''
})

const orderStatuses = [
  { label: '全部', value: 'all' },
  { label: '待支付', value: 'pending' },
  { label: '已支付', value: 'paid' },
  { label: '已发货', value: 'shipped' },
  { label: '已完成', value: 'delivered' },
  { label: '已取消', value: 'cancelled' }
]

const filteredOrders = computed(() => {
  const orders = orderStore.getUserOrders
  if (selectedStatus.value === 'all') {
    return orders
  }
  return orders.filter(order => order.status === selectedStatus.value)
})

const getStatusText = (status: OrderStatus): string => {
  const map: Record<OrderStatus, string> = {
    pending: '待支付',
    paid: '已支付',
    shipped: '已发货',
    delivered: '已完成',
    cancelled: '已取消'
  }
  return map[status]
}

const getStatusColor = (status: OrderStatus): string => {
  const map: Record<OrderStatus, string> = {
    pending: 'text-orange-600',
    paid: 'text-blue-600',
    shipped: 'text-purple-600',
    delivered: 'text-green-600',
    cancelled: 'text-gray-600'
  }
  return map[status]
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN')
}

const cancelOrder = (orderId: string) => {
  if (confirm('确定要取消订单吗？')) {
    orderStore.cancelOrder(orderId)
  }
}

const payOrder = (orderId: string) => {
  orderStore.updateOrderStatus(orderId, 'paid')
  alert('支付成功！')
}

const submitOrder = () => {
  const order = orderStore.createOrderFromCart(
    orderForm.value.address,
    orderForm.value.phone,
    orderForm.value.receiver
  )
  if (order) {
    alert('订单提交成功！')
    showCheckout.value = false
    orderForm.value = { receiver: '', phone: '', address: '' }
    router.replace('/orders')
  }
}

onMounted(() => {
  if (route.query.action === 'checkout') {
    showCheckout.value = true
  }
})
</script>

