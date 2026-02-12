<template>
  <footer class="bg-brown-900 text-white mt-auto">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- 关于我们 -->
        <div>
          <h3 class="text-lg font-bold mb-4">关于我们</h3>
          <p class="text-brown-200 text-sm leading-relaxed">
            书海悦读致力于为读者提供优质的阅读体验，汇聚海量图书资源，打造一站式图书购物平台。阅读，让思想在书香中徜徉。
          </p>
          <p class="text-brown-200 text-sm mt-4 italic">
            书籍是人类知识的宝库。——————莎士比亚
          </p>
        </div>

        <!-- 客户服务 -->
        <div>
          <h3 class="text-lg font-bold mb-4">客户服务</h3>
          <ul class="space-y-2 text-brown-200 text-sm">
            <li>
              <a href="#" class="hover:text-white">配送说明</a>
            </li>
            <li>
              <a href="#" class="hover:text-white">退换货政策</a>
            </li>
            <li>
              <a href="#" class="hover:text-white">购物指南</a>
            </li>
            <li>
              <a href="#" class="hover:text-white">常见问题</a>
            </li>
          </ul>
        </div>

        <!-- 商务合作 -->
        <div>
          <h3 class="text-lg font-bold mb-4">商务合作</h3>
          <ul class="space-y-2 text-brown-200 text-sm">
            <li>
              <a href="#" class="hover:text-white">商家入驻</a>
            </li>
            <li>
              <a href="#" class="hover:text-white">广告合作</a>
            </li>
            <li>
              <a href="#" class="hover:text-white">联系我们</a>
            </li>
            <li>
              <a href="#" class="hover:text-white">加入我们</a>
            </li>
          </ul>
        </div>

        <!-- 关注我们 -->
        <div>
          <h3 class="text-lg font-bold mb-4">关注我们</h3>
          <div class="flex space-x-4 mb-4">
            <a href="#" class="w-10 h-10 bg-brown-800 rounded-full flex items-center justify-center hover:bg-brown-700">
              <span class="text-sm">微</span>
            </a>
            <a href="#" class="w-10 h-10 bg-brown-800 rounded-full flex items-center justify-center hover:bg-brown-700">
              <span class="text-sm">微</span>
            </a>
            <a href="#" class="w-10 h-10 bg-brown-800 rounded-full flex items-center justify-center hover:bg-brown-700">
              <span class="text-sm">Q</span>
            </a>
          </div>
          <div class="mt-4">
            <p class="text-brown-200 text-sm mb-2">订阅邮件</p>
            <div class="flex">
              <input
                type="email"
                placeholder="您的邮箱地址"
                class="flex-1 px-3 py-2 bg-brown-800 border border-brown-700 rounded-l text-sm focus:outline-none focus:ring-2 focus:ring-brown-500"
              />
              <button
                class="px-4 py-2 bg-brown-700 hover:bg-brown-600 rounded-r text-sm"
              >
                发送
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 版权信息 -->
      <div class="border-t border-brown-800 mt-8 pt-8 text-center text-brown-200 text-sm">
        <p class="mb-2">■ 书海悦读 - 与好书为伴，与智慧同行</p>
        <p>© 2024 书海悦读. All rights reserved.</p>
        <p class="mt-2">浙ICP备XXXXXXXX号-X</p>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

