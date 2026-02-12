## 书海悦读 - Vue3 图书购物商城
**毕业设计所有选题地址： https://github.com/Good-Night-Unicorn?tab=repositories**

**完整代码收费可以加QQ：3042127848 咨询接毕业设计论文**

**作者QQ：3042127848 备用q：2777345948 (支持修改、部署调试、支持代做毕设)**

**接网站建设、小程序、H5、APP、各种系统等**

**选题+开题报告+任务书+程序定制+安装调试+论文+答辩ppt都可以做**
**详细视频演示**
# 书海悦读 - Vue3 图书购物商城

一个基于 Vue3 + TypeScript + Vite 的纯前端图书购物商城系统。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 类型安全的 JavaScript
- **Vite** - 下一代前端构建工具
- **Pinia** - Vue 的状态管理库
- **Vue Router** - Vue.js 官方路由管理器
- **TailwindCSS** - 实用优先的 CSS 框架
- **FontAwesome** - 图标库
- **Swiper** - 轮播图组件

## 功能特性

### 页面功能
- ✅ 首页 - 轮播图展示、精选推荐、主题分类、读者心得、特惠活动
- ✅ 分类浏览页 - 图书分类筛选、排序功能
- ✅ 排行榜页 - 按销量排序的图书排行榜
- ✅ 新书推荐页 - 展示最新上架的图书
- ✅ 促销活动页 - 限时折扣、优惠券、会员福利
- ✅ 搜索页 - 智能搜索功能
- ✅ 图书详情页 - 图书详细信息、目录、评论
- ✅ 购物车页 - 购物车管理、结算功能
- ✅ 订单页 - 订单管理、订单状态跟踪
- ✅ 个人中心 - 个人信息管理、收藏管理
- ✅ 登录/注册页 - 用户认证

### 核心功能
- ✅ 智能搜索 - 支持书名、作者、出版社搜索
- ✅ 状态管理 - 使用 Pinia 管理用户、购物车、订单、收藏等状态
- ✅ 轮播图 - 使用 Swiper 实现首页轮播
- ✅ 收藏系统 - 图书收藏功能
- ✅ 购物车 - 添加、删除、修改数量、全选等功能
- ✅ 订单管理 - 创建订单、查看订单、订单状态管理
- ✅ 本地存储 - 使用 localStorage 持久化数据
- ✅ 路由守卫 - 保护需要登录的页面
- ✅ 响应式设计 - 适配不同屏幕尺寸

### Vue 特性使用
- ✅ 组件通信 - prop/emit 父子组件通信
- ✅ 指令使用 - v-if, v-for, v-on, v-model, v-bind
- ✅ 计算属性 - computed 响应式计算
- ✅ 响应式数据 - ref, reactive 数据管理

## 项目结构

```
tushugouwushangcheng/
├── src/
│   ├── components/          # 公共组件
│   │   ├── Header.vue      # 头部导航
│   │   ├── Footer.vue      # 页脚
│   │   ├── BookCard.vue    # 图书卡片
│   │   └── Layout.vue      # 布局组件
│   ├── views/              # 页面组件
│   │   ├── Home.vue        # 首页
│   │   ├── Category.vue    # 分类页
│   │   ├── Ranking.vue     # 排行榜
│   │   ├── NewArrivals.vue # 新书推荐
│   │   ├── Promotion.vue   # 促销活动
│   │   ├── Search.vue      # 搜索页
│   │   ├── BookDetail.vue  # 图书详情
│   │   ├── Cart.vue        # 购物车
│   │   ├── Orders.vue      # 订单页
│   │   ├── Profile.vue     # 个人中心
│   │   ├── Login.vue       # 登录页
│   │   └── Register.vue    # 注册页
│   ├── stores/             # Pinia stores
│   │   ├── user.ts         # 用户状态
│   │   ├── cart.ts         # 购物车状态
│   │   ├── order.ts        # 订单状态
│   │   └── book.ts         # 图书状态
│   ├── router/             # 路由配置
│   │   └── index.ts        # 路由定义和守卫
│   ├── types/              # TypeScript 类型定义
│   │   └── index.ts        # 类型定义
│   ├── data/               # 模拟数据
│   │   └── mockData.ts     # 图书、分类等数据
│   ├── App.vue             # 根组件
│   ├── main.ts             # 入口文件
│   └── style.css           # 全局样式
├── index.html              # HTML 模板
├── package.json            # 项目配置
├── vite.config.ts          # Vite 配置
├── tsconfig.json           # TypeScript 配置
└── tailwind.config.js      # TailwindCSS 配置
```

## 安装和运行

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 使用说明

### 登录/注册
- 访问登录页或注册页创建账户
- 登录后可以收藏图书、管理购物车和订单

### 浏览图书
- 首页查看精选推荐和分类图书
- 分类页按分类筛选图书
- 排行榜查看热门图书
- 新书推荐查看最新上架图书

### 搜索功能
- 在顶部搜索框输入关键词
- 支持搜索书名、作者、出版社

### 购物车
- 点击图书卡片上的购物车图标添加到购物车
- 在购物车页面管理商品数量
- 选择商品后可以结算

### 订单管理
- 从购物车结算创建订单
- 在订单页面查看所有订单
- 可以取消待支付订单

### 个人中心
- 编辑个人信息
- 查看收藏的图书
- 管理购物车和订单

## 数据存储

本项目使用 localStorage 进行数据持久化：
- 用户信息存储在 `user` 和 `token` key
- 购物车数据存储在 `cart` key
- 订单数据存储在 `orders` key

## 注意事项

- 本项目为纯前端项目，无后端数据库
- 所有数据存储在浏览器 localStorage 中
- 刷新页面后数据会保留（localStorage 持久化）
- 清除浏览器缓存会丢失所有数据

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT License

效果图:
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/deb62a371d6043089972ed9bb546cea8.png)
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/566a77eb4c904615a97c3c97114db486.png)
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/4c534f62dc254f3ca2330984eef16142.png)
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/5d7ca30256dd4780a8e0180b11410fde.png)
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/d365e541961145da8a74f0659906cf52.png)
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/8711515f09814ba688a0224fd4ba37eb.png)
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/62f928623dc246fdb88bffa0554ca1d5.png)
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/8e7026186585459f95edec39ec490bbd.png)
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/9a8f91449749415ba3a02202b913d41a.png)
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/8b29628b195d4119beb2b04ab67b5818.png)




