# 🚀 Next.js 深度學習計劃（Day 4–7）

---

# ═══════════════════════════════════
# Day 4 ｜ Tailwind CSS 深度 + 響應式 UI 設計系統
# ═══════════════════════════════════

## 🎯 今日目標
- 深入理解 Tailwind CSS 設計哲學與運作原理
- 建立部落格完整視覺設計（首頁 Hero、文章列表、關於頁）
- 實作暗色模式（Dark Mode）
- 建立 Design Token 系統（自定義顏色、字體、間距）

## 📚 核心知識點

### 1. Tailwind CSS 運作原理

傳統 CSS 的問題：
```css
/* ❌ 傳統方式：每個元件都要寫一堆 CSS */
.blog-card { background: white; border-radius: 12px; padding: 24px; }
.blog-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
.blog-card-title { font-size: 20px; font-weight: 700; color: #111; }
/* 隨著專案增長，CSS 檔案越來越肥 */
```

Tailwind 的解法（原子化 CSS）：
```tsx
{/* ✅ 直接在 HTML 上組合工具類別 */}
<div className="bg-white rounded-2xl p-6 hover:shadow-md transition-shadow">
  <h2 className="text-xl font-bold text-gray-900">標題</h2>
</div>
{/* 優點：
  - 零額外 CSS 檔案
  - Build 時只打包用到的 class（PurgeCSS）
  - 不需要取名（最難的事之一！）
*/}
```

### 2. Tailwind 核心系統

**間距系統（Spacing Scale）：**
```
每個數字 = 4px（1 rem = 16px）
p-1 = 4px    p-2 = 8px    p-4 = 16px
p-6 = 24px   p-8 = 32px   p-12 = 48px   p-16 = 64px

margin: m-4、mx-4（左右）、my-4（上下）、mt-4（top）
padding: p-4、px-4、py-4、pt-4
```

**顏色系統：**
```
格式：{顏色}-{深淺}（50最淺，950最深）
bg-blue-50    bg-blue-100   bg-blue-500   bg-blue-900
text-gray-500  text-gray-700  text-gray-900
border-gray-200  border-blue-500
```

**字體系統：**
```
大小：text-xs(12px) text-sm(14px) text-base(16px)
     text-lg(18px) text-xl(20px) text-2xl(24px)
     text-3xl(30px) text-4xl(36px) text-5xl(48px)
粗細：font-normal font-medium font-semibold font-bold
行高：leading-tight leading-normal leading-relaxed leading-loose
```

**Flex & Grid：**
```tsx
{/* Flexbox */}
<div className="flex items-center justify-between gap-4">
  {/* items-center = 垂直置中 */}
  {/* justify-between = 兩端對齊 */}
  {/* gap-4 = 子元素間距 16px */}
</div>

{/* Grid */}
<div className="grid grid-cols-3 gap-6">
  {/* 3欄，每格間距 24px */}
</div>

{/* 響應式 Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* 手機:1欄 → 平板:2欄 → 桌機:3欄 */}
</div>
```

### 3. 響應式設計（Mobile First）

```tsx
{/* Tailwind 斷點（Mobile First：先寫手機，再加前綴覆蓋大螢幕） */}
{/*
  無前綴  → 所有尺寸（手機優先）
  sm:     → ≥640px（大手機/小平板）
  md:     → ≥768px（平板）
  lg:     → ≥1024px（桌機）
  xl:     → ≥1280px（大桌機）
  2xl:    → ≥1536px（超寬螢幕）
*/}

<div className="
  text-sm          {/* 手機：小字 */}
  md:text-base     {/* 平板：正常大小 */}
  lg:text-lg       {/* 桌機：大字 */}

  px-4             {/* 手機：小內距 */}
  md:px-8          {/* 平板：中內距 */}
  lg:px-16         {/* 桌機：大內距 */}

  grid-cols-1      {/* 手機：單欄 */}
  md:grid-cols-2   {/* 平板：兩欄 */}
  lg:grid-cols-3   {/* 桌機：三欄 */}
">
```

### 4. 暗色模式

```tsx
{/* tailwind.config.ts 設定 */}
module.exports = {
  darkMode: 'class',  // 使用 class 控制（在 html 加 dark class）
}

{/* 使用 dark: 前綴 */}
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <h1 className="text-gray-900 dark:text-white">標題</h1>
  <p className="text-gray-600 dark:text-gray-400">內容</p>
</div>
```

```tsx
{/* 暗色模式切換按鈕 */}
'use client'
import { useState, useEffect } from 'react'

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    // 讀取使用者偏好
    const saved = localStorage.getItem('darkMode')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = saved ? saved === 'true' : prefersDark
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    localStorage.setItem('darkMode', String(next))
    document.documentElement.classList.toggle('dark', next)
  }

  return (
    <button onClick={toggle} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
      {dark ? '☀️' : '🌙'}
    </button>
  )
}
```

### 5. 自定義 Tailwind 設定

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 品牌主色（可以用 CSS 變數）
        brand: {
          50:  '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      typography: {
        // prose 樣式（Markdown 渲染用）
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'inherit',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
```

## 🛠️ 手把手實作

### Step 1：安裝 Typography 套件

```bash
pnpm add @tailwindcss/typography
```

### Step 2：建立完整首頁

```tsx
// app/page.tsx
import Link from 'next/link'
import PostCard from '@/components/blog/PostCard'

const stats = [
  { label: '篇文章', value: '12', icon: '📝' },
  { label: '學習天數', value: '10', icon: '📅' },
  { label: '訪客留言', value: '48', icon: '💬' },
]

const recentPosts = [
  {
    id: '1', title: 'Next.js App Router 完全指南', slug: 'nextjs-app-router',
    excerpt: '深入探討 Next.js 14 的 App Router，包含 Server Components 等新特性',
    content: '', published: true,
    createdAt: new Date('2026-04-01'), updatedAt: new Date('2026-04-01'),
    author: { id: '1', name: 'Dave', image: null },
    tags: [{ id: '1', name: 'Next.js' }], _count: { comments: 5 },
  },
]

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20">
        <div className="relative inline-block mb-8">
          <div className="w-28 h-28 bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center text-5xl shadow-lg">
            👨‍💻
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-400 rounded-full border-4 border-white flex items-center justify-center text-xs">
            ✓
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
          Dave's Blog
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          紀錄學習旅程，分享技術心得。<br className="hidden md:block" />
          歡迎一起交流，共同成長！
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/blog"
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            閱讀文章 →
          </Link>
          <Link
            href="/about"
            className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-8 py-3 rounded-xl font-medium border border-gray-200 dark:border-gray-700 hover:border-blue-300 transition-colors"
          >
            認識我
          </Link>
        </div>
      </section>

      {/* 統計數字 */}
      <section className="grid grid-cols-3 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* 最新文章 */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">最新文章</h2>
          <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
            查看全部 →
          </Link>
        </div>
        <div className="grid gap-6">
          {recentPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-10 text-white text-center">
        <h2 className="text-3xl font-bold mb-3">一起學習成長</h2>
        <p className="text-blue-100 mb-6">加入會員，留言交流，分享你的想法</p>
        <Link
          href="/register"
          className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors inline-block"
        >
          免費加入
        </Link>
      </section>
    </div>
  )
}
```

### Step 3：建立關於頁面

```tsx
// app/about/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = { title: '關於我' }

const skills = [
  { category: '前端', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
  { category: '後端', items: ['Node.js', 'Prisma', 'PostgreSQL', 'REST API'] },
  { category: '工具', items: ['Git', 'VS Code', 'Vercel', 'Figma'] },
]

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-12">
      {/* 個人介紹 */}
      <section className="text-center">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-6xl">
          👨‍💻
        </div>
        <h1 className="text-3xl font-bold mb-3">Hi，我是 Dave 👋</h1>
        <p className="text-gray-600 leading-relaxed">
          一個熱愛學習的開發者，這個部落格用來記錄我的學習心得與技術筆記。
          希望透過分享，讓知識不只停留在我腦中，也能幫助到需要的人。
        </p>
      </section>

      {/* 技能 */}
      <section>
        <h2 className="text-xl font-bold mb-6 text-center">技術技能</h2>
        <div className="grid gap-4">
          {skills.map(group => (
            <div key={group.category} className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map(skill => (
                  <span key={skill} className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-lg font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
```

## 🏋️ 練習挑戰

1. **[基礎]** 為所有頁面加入暗色模式支援（`dark:` 前綴）
2. **[進階]** 建立 `components/ui/SkeletonLoader.tsx`，實作通用的骨架屏
3. **[挑戰]** 用 Tailwind Animation 實作滾動進入動畫（`animate-fade-in`）

## 📝 每日 Git Commit 範本

```bash
git add .
git commit -m "feat(day4): 完整 UI 設計系統

- 首頁 Hero、統計卡片、最新文章、CTA Banner
- 關於頁面技能展示
- 暗色模式支援
- Tailwind Typography 套件設定
- 響應式設計（手機/平板/桌機）"
```

---

# ═══════════════════════════════════
# Day 5 ｜ 資料取得策略 + Server Actions
# ═══════════════════════════════════

## 🎯 今日目標
- 深入理解 Next.js 的快取與重新驗證機制
- 掌握 Server Actions（Next.js 的革命性新特性）
- 理解 React Suspense 與 Streaming
- 建立資料層抽象（Data Access Layer）

## 📚 核心知識點

### 1. Next.js 快取系統（Cache）

Next.js 有 4 層快取，理解它們能避免很多奇怪的 Bug：

```
請求記憶化（Request Memoization）
  → 同一個請求中，相同 URL 的 fetch 只執行一次
  → 自動，不需要設定

資料快取（Data Cache）
  → fetch 的回應會被快取到磁碟
  → 預設：永久快取（直到 revalidate 或部署更新）
  → 控制：fetch(url, { next: { revalidate: 60 } })  // 60 秒更新一次

完整路由快取（Full Route Cache）
  → 靜態路由的 HTML 在 build time 產生並快取
  → 動態路由不會被快取

路由快取（Router Cache）
  → 瀏覽器端快取已訪問過的路由
  → 避免重複請求
```

**實際應用：**
```typescript
// lib/data.ts

// ✅ 靜態資料：永久快取（適合：設定、標籤列表）
async function getTags() {
  const res = await fetch('/api/tags', { cache: 'force-cache' })
  return res.json()
}

// ✅ ISR：每 60 秒重新驗證（適合：文章列表）
async function getPosts() {
  const res = await fetch('/api/posts', { next: { revalidate: 60 } })
  return res.json()
}

// ✅ 即時資料：不快取（適合：留言、通知）
async function getComments(postId: string) {
  const res = await fetch(`/api/posts/${postId}/comments`, { cache: 'no-store' })
  return res.json()
}
```

### 2. Server Actions（革命性功能！）

Server Action 讓你可以直接在元件裡寫「伺服器端函式」，**不需要自己建 API Route**：

```tsx
// ❌ 舊方式：需要建立 API Route + 前端 fetch
// POST /api/posts → app/api/posts/route.ts
// 然後前端：await fetch('/api/posts', { method: 'POST', body: JSON.stringify(data) })

// ✅ 新方式（Server Action）：直接在元件裡
async function createPost(formData: FormData) {
  'use server'  // ← 這行宣告這是 Server Action

  const title = formData.get('title') as string
  const content = formData.get('content') as string

  // 直接操作資料庫！不需要 API Route！
  await prisma.post.create({ data: { title, content, authorId: '...' } })

  revalidatePath('/blog')  // 清除快取，讓頁面重新取資料
  redirect('/dashboard')   // 導向其他頁面
}

// 在表單的 action 屬性使用
export default function NewPostForm() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="標題" />
      <textarea name="content" placeholder="內容" />
      <button type="submit">發布</button>
    </form>
  )
}
```

**搭配 `useFormState` 和 `useFormStatus`：**
```tsx
'use client'
import { useFormState, useFormStatus } from 'react-dom'

// 顯示提交狀態的按鈕
function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending}>
      {pending ? '提交中...' : '送出'}
    </button>
  )
}

// 帶錯誤回饋的表單
function ContactForm() {
  const [state, formAction] = useFormState(submitContact, null)
  return (
    <form action={formAction}>
      {state?.error && <p className="text-red-500">{state.error}</p>}
      {state?.success && <p className="text-green-500">送出成功！</p>}
      <input name="message" />
      <SubmitButton />
    </form>
  )
}
```

### 3. React Suspense 與 Streaming

```tsx
// Streaming：讓頁面的不同部分獨立載入
import { Suspense } from 'react'

export default function BlogPage() {
  return (
    <div>
      {/* 標題立即顯示 */}
      <h1>文章列表</h1>

      {/* 文章列表非同步載入，顯示 skeleton */}
      <Suspense fallback={<PostListSkeleton />}>
        <PostList />  {/* 這個元件是 async Server Component */}
      </Suspense>

      {/* 側欄獨立載入，不影響主要內容 */}
      <Suspense fallback={<TagsSkeleton />}>
        <TagCloud />
      </Suspense>
    </div>
  )
}

// async Server Component
async function PostList() {
  // 即使這個很慢，也不會阻塞其他 Suspense 邊界
  const posts = await prisma.post.findMany({ ... })
  return <div>{posts.map(p => <PostCard key={p.id} post={p} />)}</div>
}
```

### 4. 建立資料存取層（Data Access Layer）

將所有資料庫操作集中在 `lib/` 資料夾，保持元件乾淨：

```typescript
// lib/actions/post.ts
'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

// 使用 Zod 做輸入驗證
const PostSchema = z.object({
  title: z.string().min(1, '標題不能為空').max(100, '標題最多 100 字'),
  content: z.string().min(10, '內容至少 10 字'),
  excerpt: z.string().max(200).optional(),
  published: z.boolean().default(false),
})

export type PostActionState = {
  errors?: Record<string, string[]>
  message?: string
}

export async function createPostAction(
  prevState: PostActionState,
  formData: FormData
): Promise<PostActionState> {
  // 1. 驗證身份
  const session = await auth()
  if (!session?.user?.id) {
    return { message: '請先登入' }
  }

  // 2. 驗證輸入
  const validated = PostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    excerpt: formData.get('excerpt'),
    published: formData.get('published') === 'true',
  })

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  // 3. 建立 slug（URL 友善識別碼）
  const slug = `${validated.data.title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/(^-|-$)/g, '')}-${Date.now()}`

  // 4. 寫入資料庫
  try {
    await prisma.post.create({
      data: {
        ...validated.data,
        slug,
        authorId: session.user.id,
      },
    })
  } catch (error) {
    return { message: '建立文章失敗，請稍後再試' }
  }

  // 5. 清除快取並導向
  revalidatePath('/blog')
  revalidatePath('/dashboard')
  redirect('/dashboard')
}
```

## 🛠️ 手把手實作

### Step 1：安裝 Zod

```bash
pnpm add zod
```

### Step 2：建立資料存取層結構

```bash
mkdir -p lib/actions lib/queries
```

建立 `lib/queries/post.ts`（只讀取資料）：
```typescript
import { prisma } from '@/lib/prisma'
import type { Post } from '@/types'

export async function getPublishedPosts(options?: {
  query?: string
  tag?: string
  page?: number
  limit?: number
}) {
  const { query, tag, page = 1, limit = 10 } = options ?? {}

  const [posts, total] = await prisma.$transaction([
    prisma.post.findMany({
      where: {
        published: true,
        ...(query && {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { excerpt: { contains: query, mode: 'insensitive' } },
          ],
        }),
        ...(tag && { tags: { some: { name: tag } } }),
      },
      include: {
        author: { select: { id: true, name: true, image: true } },
        tags: true,
        _count: { select: { comments: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.post.count({ where: { published: true } }),
  ])

  return { posts, total, totalPages: Math.ceil(total / limit) }
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: { slug, published: true },
    include: {
      author: { select: { id: true, name: true, image: true } },
      tags: true,
      _count: { select: { comments: true } },
    },
  })
}
```

### Step 3：建立 `revalidate` 工具

```typescript
// lib/actions/revalidate.ts
'use server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function revalidateBlog() {
  revalidatePath('/blog')
  revalidatePath('/')
}
```

## 📝 每日 Git Commit 範本

```bash
git add .
git commit -m "feat(day5): 資料取得策略與 Server Actions

- 建立 lib/queries/ 資料查詢層
- 建立 lib/actions/ Server Action（含 Zod 驗證）
- 實作文章列表搜尋查詢（含分頁）
- Suspense Streaming 架構設計"
```

---

# ═══════════════════════════════════
# Day 6 ｜ Prisma + PostgreSQL 完整實作
# ═══════════════════════════════════

## 🎯 今日目標
- 完整設計並建立資料庫 Schema
- 實作所有 CRUD API Routes
- 掌握 Prisma 進階查詢（Relations、Aggregation、Transaction）
- 建立資料庫 Seed 腳本（測試資料）

## 📚 核心知識點

### 1. 關聯式資料庫設計原則

**我們的資料模型：**
```
User（使用者）
  ├── Post[]（有很多文章）
  └── Comment[]（有很多留言）

Post（文章）
  ├── User（屬於一個作者）
  ├── Comment[]（有很多留言）
  └── Tag[]（有很多標籤，多對多）

Comment（留言）
  ├── User（屬於一個作者）
  └── Post（屬於一篇文章）

Tag（標籤）
  └── Post[]（屬於很多文章，多對多）
```

**關聯類型：**
```
一對多（One-to-Many）：一個 User 有多個 Post
多對多（Many-to-Many）：一個 Post 有多個 Tag，一個 Tag 屬於多個 Post
一對一（One-to-One）：一個 User 有一個 Profile（之後可擴充）
```

### 2. 完整 Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?   // nullable：支援 OAuth 登入（之後可加）
  bio           String?   // 自我介紹
  role          Role      @default(USER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // NextAuth 需要的關聯
  accounts  Account[]
  sessions  Session[]

  // 業務邏輯關聯
  posts     Post[]
  comments  Comment[]
  likes     Like[]

  @@map("users")
}

model Post {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  excerpt     String?  @db.Text
  content     String   @db.Text
  coverImage  String?  // 封面圖片 URL
  published   Boolean  @default(false)
  viewCount   Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  authorId  String
  author    User      @relation(fields: [authorId], references: [id])

  // 多對多：透過隱式關聯表
  tags      Tag[]

  comments  Comment[]
  likes     Like[]

  @@index([slug])
  @@index([published, createdAt])  // 常用查詢加索引
  @@map("posts")
}

model Comment {
  id        String   @id @default(cuid())
  content   String   @db.Text
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  postId   String
  post     Post   @relation(fields: [postId], references: [id], onDelete: Cascade)

  authorId String
  author   User   @relation(fields: [authorId], references: [id])

  // 巢狀留言（可選，先建好備用）
  parentId String?
  parent   Comment?  @relation("Replies", fields: [parentId], references: [id])
  replies  Comment[] @relation("Replies")

  @@map("comments")
}

model Tag {
  id    String @id @default(cuid())
  name  String @unique
  color String @default("blue")  // 標籤顏色
  posts Post[]

  @@map("tags")
}

model Like {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())

  postId   String
  post     Post   @relation(fields: [postId], references: [id], onDelete: Cascade)
  userId   String
  user     User   @relation(fields: [userId], references: [id])

  @@unique([postId, userId])  // 一個人只能按一次讚
  @@map("likes")
}

// NextAuth 需要的 Models
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}

enum Role {
  USER
  ADMIN
}
```

### 3. Prisma 進階查詢技巧

```typescript
// lib/prisma.ts（Singleton Pattern）
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
```

```typescript
// 常用查詢範例

// 1. 分頁查詢（含總數）
const [posts, total] = await prisma.$transaction([
  prisma.post.findMany({ skip: 0, take: 10, orderBy: { createdAt: 'desc' } }),
  prisma.post.count({ where: { published: true } }),
])

// 2. 按標籤篩選（多對多）
const posts = await prisma.post.findMany({
  where: { tags: { some: { name: 'Next.js' } } },
})

// 3. 聚合查詢
const stats = await prisma.post.aggregate({
  _count: { id: true },      // 文章總數
  _sum: { viewCount: true }, // 總瀏覽數
})

// 4. 含關聯計數
const posts = await prisma.post.findMany({
  include: {
    _count: { select: { comments: true, likes: true } },
    author: { select: { name: true, image: true } },
    tags: true,
  },
})

// 5. Transaction（多個操作要麼全成功，要麼全失敗）
const [post, _] = await prisma.$transaction([
  prisma.post.create({ data: postData }),
  prisma.tag.upsert({           // upsert = 存在就更新，不存在就建立
    where: { name: 'Next.js' },
    update: {},
    create: { name: 'Next.js' },
  }),
])

// 6. 全文搜尋（PostgreSQL）
const posts = await prisma.post.findMany({
  where: {
    OR: [
      { title: { contains: query, mode: 'insensitive' } },
      { content: { contains: query, mode: 'insensitive' } },
      { excerpt: { contains: query, mode: 'insensitive' } },
    ],
  },
})
```

## 🛠️ 手把手實作

### Step 1：設定 Neon PostgreSQL

1. 前往 https://neon.tech → 建立帳號 → 建立新專案
2. 複製 **Connection String**（格式：`postgresql://...`）
3. 更新 `.env.local`：
```env
DATABASE_URL="postgresql://username:password@host/dbname?sslmode=require"
NEXTAUTH_SECRET="執行 openssl rand -base64 32 產生"
NEXTAUTH_URL="http://localhost:3000"
```

### Step 2：安裝並初始化

```bash
pnpm add prisma @prisma/client @auth/prisma-adapter
pnpm prisma migrate dev --name init
```

### Step 3：建立 Seed 腳本（測試資料）

建立 `prisma/seed.ts`：
```typescript
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('開始植入測試資料...')

  // 建立標籤
  const tags = await Promise.all([
    prisma.tag.upsert({ where: { name: 'Next.js' }, update: {}, create: { name: 'Next.js', color: 'blue' } }),
    prisma.tag.upsert({ where: { name: 'React' }, update: {}, create: { name: 'React', color: 'blue' } }),
    prisma.tag.upsert({ where: { name: 'TypeScript' }, update: {}, create: { name: 'TypeScript', color: 'blue' } }),
    prisma.tag.upsert({ where: { name: '學習心得' }, update: {}, create: { name: '學習心得', color: 'green' } }),
  ])

  // 建立測試使用者
  const hashedPassword = await bcrypt.hash('password123', 12)
  const user = await prisma.user.upsert({
    where: { email: 'dave@example.com' },
    update: {},
    create: {
      name: 'Dave',
      email: 'dave@example.com',
      password: hashedPassword,
      role: 'ADMIN',
      bio: '熱愛學習的開發者，記錄技術成長之旅',
    },
  })

  // 建立測試文章
  const post1 = await prisma.post.upsert({
    where: { slug: 'nextjs-app-router-guide' },
    update: {},
    create: {
      title: 'Next.js App Router 完全指南',
      slug: 'nextjs-app-router-guide',
      excerpt: '深入探討 Next.js 14 App Router 的核心概念，從 Server Components 到 Streaming',
      content: `# Next.js App Router 完全指南

## 什麼是 App Router？

App Router 是 Next.js 13 引入的全新路由系統，基於 React Server Components 設計...

## Server Components

Server Components 在伺服器端執行，好處包括：
- 可以直接存取資料庫
- API 金鑰不會暴露給前端
- 減少 JavaScript Bundle 大小

\`\`\`tsx
// Server Component 範例
async function PostList() {
  const posts = await prisma.post.findMany()
  return <div>{posts.map(p => <div key={p.id}>{p.title}</div>)}</div>
}
\`\`\`

## 結論

App Router 是 React 生態系的重大進化，值得深入學習。`,
      published: true,
      viewCount: 128,
      authorId: user.id,
      tags: { connect: [{ name: 'Next.js' }, { name: 'React' }] },
    },
  })

  // 建立留言
  await prisma.comment.createMany({
    data: [
      { content: '非常有幫助的文章！', postId: post1.id, authorId: user.id },
      { content: '請問 Server Actions 和 API Routes 什麼時候用哪個？', postId: post1.id, authorId: user.id },
    ],
  })

  console.log('✅ 測試資料植入完成！')
  console.log(`   使用者: dave@example.com / password123`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

更新 `package.json`：
```json
{
  "scripts": {
    "db:seed": "tsx prisma/seed.ts",
    "db:reset": "prisma migrate reset && pnpm db:seed",
    "db:studio": "prisma studio"
  }
}
```

```bash
pnpm add -D tsx
pnpm db:seed
pnpm db:studio  # 用 UI 查看資料
```

### Step 4：完整 API Routes

建立 `app/api/posts/route.ts`：
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') ?? ''
  const tag = searchParams.get('tag') ?? ''
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const where = {
    published: true,
    ...(q && { OR: [
      { title: { contains: q, mode: 'insensitive' as const } },
      { excerpt: { contains: q, mode: 'insensitive' as const } },
    ]}),
    ...(tag && { tags: { some: { name: tag } } }),
  }

  const [posts, total] = await prisma.$transaction([
    prisma.post.findMany({
      where,
      include: {
        author: { select: { id: true, name: true, image: true } },
        tags: true,
        _count: { select: { comments: true, likes: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.post.count({ where }),
  ])

  return NextResponse.json({ posts, total, totalPages: Math.ceil(total / limit) })
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: '請先登入' }, { status: 401 })
  }

  const body = await req.json()
  const slug = `${body.title.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')}-${Date.now()}`

  const post = await prisma.post.create({
    data: {
      title: body.title,
      slug,
      excerpt: body.excerpt,
      content: body.content,
      published: body.published ?? false,
      authorId: session.user.id,
      tags: {
        connectOrCreate: (body.tags ?? []).map((name: string) => ({
          where: { name },
          create: { name },
        })),
      },
    },
    include: { author: true, tags: true },
  })

  return NextResponse.json(post, { status: 201 })
}
```

## 📝 每日 Git Commit 範本

```bash
git add .
git commit -m "feat(day6): Prisma + PostgreSQL 完整實作

- 完整 Schema 設計（User/Post/Comment/Tag/Like）
- NextAuth 所需 Account/Session Models
- 進階查詢（分頁、多對多、聚合）
- 資料庫 Seed 腳本（測試資料）
- 完整 CRUD API Routes"
```

---

# ═══════════════════════════════════
# Day 7 ｜ NextAuth.js 完整會員系統
# ═══════════════════════════════════

## 🎯 今日目標
- 完整實作帳密登入 + Google OAuth（可選）
- 理解 JWT vs Database Session 的差異
- 建立完整的登入/註冊頁面（含錯誤處理與驗證）
- 實作 Middleware 保護路由
- 建立個人資料頁面

## 📚 核心知識點

### 1. NextAuth.js 架構解析

```
使用者點擊登入
  ↓
NextAuth 處理 → Provider.authorize() 驗證帳密
  ↓
成功 → 建立 JWT Token（存在 HttpOnly Cookie）
  ↓
之後每個請求：
  Server Component → auth() 解析 Cookie → 取得 Session
  Client Component → useSession() → 透過 /api/auth/session 取得
```

**JWT vs Database Session：**
```
JWT Session（我們使用的）：
  - Token 存在 Cookie，不需要資料庫
  - 效能好（不用每次查 DB）
  - 缺點：無法即時撤銷（Token 還沒過期就有效）

Database Session：
  - Session 存在資料庫
  - 可以即時撤銷（刪除資料庫記錄）
  - 需要每次請求查資料庫
```

### 2. Middleware 路由保護

```typescript
// middleware.ts（根目錄）
import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const session = req.auth

  // 需要登入的路由
  const protectedRoutes = ['/dashboard', '/api/posts']
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtected && !session) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('callbackUrl', pathname)  // 登入後導回原頁面
    return NextResponse.redirect(loginUrl)
  }

  // 已登入但訪問 /login 或 /register → 導向 dashboard
  if (session && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
}
```

### 3. Session 型別擴充

NextAuth 的 Session 預設只有 `name`、`email`、`image`，我們需要加入 `id` 和 `role`：

```typescript
// types/next-auth.d.ts
import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: 'USER' | 'ADMIN'
    } & DefaultSession['user']
  }

  interface User {
    role: 'USER' | 'ADMIN'
  }
}
```

## 🛠️ 手把手實作

### Step 1：安裝套件

```bash
pnpm add next-auth@beta @auth/prisma-adapter bcryptjs
pnpm add -D @types/bcryptjs
```

### Step 2：完整 auth.ts 設定

```typescript
// auth.ts（根目錄）
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },

  callbacks: {
    // JWT Token 建立或更新時呼叫
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    // Session 物件建立時呼叫（從 JWT 取資料）
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as 'USER' | 'ADMIN'
      }
      return session
    },
  },

  providers: [
    Credentials({
      credentials: {
        email: { label: '信箱', type: 'email' },
        password: { label: '密碼', type: 'password' },
      },
      async authorize(credentials) {
        // 1. 驗證輸入格式
        const parsed = LoginSchema.safeParse(credentials)
        if (!parsed.success) return null

        // 2. 查詢使用者
        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        })
        if (!user?.password) return null

        // 3. 驗證密碼
        const isValid = await bcrypt.compare(parsed.data.password, user.password)
        if (!isValid) return null

        return { id: user.id, email: user.email, name: user.name, image: user.image, role: user.role }
      },
    }),
  ],

  pages: {
    signIn: '/login',
    error: '/login',  // 錯誤也導向登入頁
  },
})
```

### Step 3：API Handler

```typescript
// app/api/auth/[...nextauth]/route.ts
import { handlers } from '@/auth'
export const { GET, POST } = handlers
```

### Step 4：完整登入頁面

```tsx
// app/(auth)/login/page.tsx
'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard'

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    })

    if (result?.error) {
      setError('信箱或密碼錯誤，請重試')
    } else {
      router.push(callbackUrl)
      router.refresh()  // 重新整理 Server Component 的資料
    }
    setLoading(false)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">登入帳號</h1>
        <p className="text-gray-500 text-sm mt-1">歡迎回來！</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            電子信箱
          </label>
          <input
            type="email"
            value={form.email}
            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
            className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="dave@example.com"
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">密碼</label>
            <Link href="/forgot-password" className="text-xs text-blue-600 hover:underline">
              忘記密碼？
            </Link>
          </div>
          <input
            type="password"
            value={form.password}
            onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
            className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••••"
            required
          />
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        <Button type="submit" className="w-full" loading={loading}>
          登入
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
        還沒有帳號？
        <Link href="/register" className="text-blue-600 hover:underline ml-1 font-medium">
          免費註冊
        </Link>
      </p>
    </div>
  )
}
```

### Step 5：更新 Navbar 顯示登入狀態

```tsx
// components/layout/Navbar.tsx
import Link from 'next/link'
import { auth, signOut } from '@/auth'
import DarkModeToggle from '@/components/ui/DarkModeToggle'

export default async function Navbar() {
  const session = await auth()  // Server Component 直接取得 Session

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
      <nav className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">Dave's Blog</Link>

        <div className="flex items-center gap-3">
          <DarkModeToggle />
          {session?.user ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
                {session.user.name ?? session.user.email}
              </Link>
              <form action={async () => { 'use server'; await signOut({ redirectTo: '/' }) }}>
                <button type="submit" className="text-sm text-gray-500 hover:text-red-600">
                  登出
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2">
                登入
              </Link>
              <Link href="/register" className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700">
                註冊
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
```

### Step 6：Session Provider（Client 端需要）

```tsx
// app/providers.tsx
'use client'
import { SessionProvider } from 'next-auth/react'

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}
```

更新 `app/layout.tsx`：
```tsx
import Providers from './providers'
// body 裡面包上 Providers：
<body>
  <Providers>
    <Navbar />
    <main>...</main>
  </Providers>
</body>
```

## 🏋️ 練習挑戰

1. **[基礎]** 建立完整的 `/register` 頁面（呼叫 `/api/register` POST）
2. **[進階]** 為 API Routes 加入 `role` 權限檢查（只有 ADMIN 可以刪除文章）
3. **[挑戰]** 加入 Google OAuth Provider（需要在 Google Cloud Console 建立 OAuth 應用）

## 📝 每日 Git Commit 範本

```bash
git add .
git commit -m "feat(day7): NextAuth.js 完整會員系統

- NextAuth.js v5 (Auth.js) 設定
- 帳密登入 + JWT Session
- Session 型別擴充（含 id 和 role）
- Middleware 路由保護（未登入 → 導向 /login）
- 完整登入頁面（含錯誤處理）
- Navbar 顯示登入狀態
- SessionProvider 設定"
```
