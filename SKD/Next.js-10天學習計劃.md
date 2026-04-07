# 🚀 Next.js 10天學習計劃
## 目標：打造個人部落格網站（含會員註冊 & 留言功能）

---

## 📋 技術棧總覽

| 類別 | 技術 | 用途 |
|------|------|------|
| 框架 | **Next.js 14+** | 前後端整合框架 |
| 語言 | **TypeScript** | 型別安全 |
| 樣式 | **Tailwind CSS** | 快速 UI 開發 |
| 資料庫 | **PostgreSQL** | 儲存資料 |
| ORM | **Prisma** | 資料庫操作 |
| 認證 | **NextAuth.js** | 會員登入/註冊 |
| 部署 | **Vercel** | 雲端部署 |

---

## 📅 10 天學習總覽

```
Day 1  → 環境建置 + Next.js 基礎概念
Day 2  → React 核心概念 + 元件設計
Day 3  → 路由系統 + 頁面導航
Day 4  → Tailwind CSS + 部落格 UI 設計
Day 5  → 資料取得 + Server/Client Components
Day 6  → 資料庫 + Prisma ORM
Day 7  → NextAuth.js 會員系統
Day 8  → 部落格文章 CRUD 功能
Day 9  → 留言系統 + 會員功能完善
Day 10 → 部署 + SEO + 效能優化
```

---

# Day 1 ｜ 環境建置 + Next.js 基礎概念

## 🎯 今日目標
建立開發環境，創建第一個 Next.js 專案，了解核心概念。

## 📚 知識點
- Node.js 與 npm/pnpm 的作用
- Next.js App Router vs Pages Router 差異
- 專案資料夾結構說明
- `page.tsx`、`layout.tsx`、`loading.tsx` 的職責
- 什麼是 Server Component 與 Client Component

## 🛠️ 手把手步驟

### Step 1：安裝必要工具
```bash
# 確認 Node.js 版本（需要 18.17 以上）
node -v

# 安裝 pnpm（更快的套件管理器）
npm install -g pnpm
```

### Step 2：建立 Next.js 專案
```bash
pnpm create next-app@latest my-blog
```
**選擇選項時請選：**
- ✅ TypeScript → Yes
- ✅ ESLint → Yes
- ✅ Tailwind CSS → Yes
- ✅ `src/` directory → No
- ✅ App Router → Yes
- ✅ Customize import alias → No

```bash
cd my-blog
pnpm dev
```
打開 http://localhost:3000 確認成功 🎉

### Step 3：認識專案結構
```
my-blog/
├── app/                    # 主要應用程式目錄（App Router）
│   ├── layout.tsx          # 全站共用佈局（HTML head、navbar 等）
│   ├── page.tsx            # 首頁 → 對應 http://localhost:3000/
│   ├── globals.css         # 全域樣式
│   └── favicon.ico
├── public/                 # 靜態資源（圖片等）
├── next.config.ts          # Next.js 設定檔
├── tailwind.config.ts      # Tailwind 設定檔
└── package.json
```

### Step 4：修改首頁，寫第一個元件
編輯 `app/page.tsx`：
```tsx
// app/page.tsx
export default function HomePage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-blue-600">
        歡迎來到我的部落格！
      </h1>
      <p className="mt-4 text-gray-600">
        這是用 Next.js 打造的個人知識分享空間
      </p>
    </main>
  )
}
```

### Step 5：新增一個 About 頁面
```bash
mkdir app/about
```
建立 `app/about/page.tsx`：
```tsx
export default function AboutPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">關於我</h1>
      <p className="mt-4">Hi，我是 Dave，這裡是我的學習筆記空間。</p>
    </div>
  )
}
```
訪問 http://localhost:3000/about 確認頁面出現 ✅

## 💡 今日重點觀念
- `app/` 目錄下的每個 `page.tsx` 就是一個網頁路由
- `layout.tsx` 是共用外框（像 HTML 的骨架）
- Next.js 預設使用 **Server Components**（在伺服器渲染，不含客戶端 JS）

---

# Day 2 ｜ React 核心概念 + 元件設計

## 🎯 今日目標
掌握 React 基礎，建立可重用的 UI 元件（Navbar、Footer、Card）。

## 📚 知識點
- JSX 語法
- Props（元件傳值）
- useState（狀態管理）
- useEffect（副作用）
- Client Component vs Server Component 的使用時機

## 🛠️ 手把手步驟

### Step 1：建立元件資料夾
```bash
mkdir components
mkdir components/ui
```

### Step 2：建立 Navbar 元件
建立 `components/Navbar.tsx`：
```tsx
// components/Navbar.tsx
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          Dave's Blog
        </Link>
        <div className="flex gap-6">
          <Link href="/" className="text-gray-600 hover:text-blue-600">
            首頁
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-600">
            關於
          </Link>
          <Link href="/blog" className="text-gray-600 hover:text-blue-600">
            文章
          </Link>
          <Link href="/login" className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700">
            登入
          </Link>
        </div>
      </div>
    </nav>
  )
}
```

### Step 3：將 Navbar 加入全站 Layout
編輯 `app/layout.tsx`：
```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Dave's Blog",
  description: '個人學習筆記與心得分享',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body className={`${inter.className} bg-gray-50`}>
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
```

### Step 4：建立文章卡片元件
建立 `components/PostCard.tsx`：
```tsx
// components/PostCard.tsx
import Link from 'next/link'

interface PostCardProps {
  id: string
  title: string
  excerpt: string
  date: string
  author: string
  tags: string[]
}

export default function PostCard({ id, title, excerpt, date, author, tags }: PostCardProps) {
  return (
    <article className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex gap-2 mb-3">
        {tags.map(tag => (
          <span key={tag} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <h2 className="text-xl font-bold mb-2">
        <Link href={`/blog/${id}`} className="hover:text-blue-600">
          {title}
        </Link>
      </h2>
      <p className="text-gray-600 text-sm mb-4">{excerpt}</p>
      <div className="flex justify-between text-xs text-gray-400">
        <span>✍️ {author}</span>
        <span>📅 {date}</span>
      </div>
    </article>
  )
}
```

### Step 5：認識 useState（互動元件範例）
建立 `components/LikeButton.tsx`（Client Component）：
```tsx
'use client'  // ← 這行表示這是客戶端元件

import { useState } from 'react'

export default function LikeButton() {
  const [likes, setLikes] = useState(0)
  const [liked, setLiked] = useState(false)

  const handleLike = () => {
    if (liked) {
      setLikes(prev => prev - 1)
    } else {
      setLikes(prev => prev + 1)
    }
    setLiked(!liked)
  }

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
        liked ? 'bg-red-50 border-red-300 text-red-600' : 'border-gray-200 hover:border-red-300'
      }`}
    >
      {liked ? '❤️' : '🤍'} {likes}
    </button>
  )
}
```

## 💡 今日重點觀念
- **Props** = 父元件傳給子元件的資料（像函式的參數）
- **useState** = 讓元件記住狀態，狀態改變時自動重新渲染
- **'use client'** = 需要瀏覽器功能（useState、事件監聽）才需要加

---

# Day 3 ｜ 路由系統 + 頁面導航

## 🎯 今日目標
完整建立部落格的頁面結構，掌握動態路由、巢狀佈局。

## 📚 知識點
- App Router 的檔案路由規則
- 動態路由 `[slug]`
- `Link` 元件 vs `useRouter`
- `loading.tsx` 和 `not-found.tsx`
- Route Groups `(group)`

## 🛠️ 手把手步驟

### Step 1：建立部落格路由結構
```bash
mkdir -p app/blog
mkdir -p "app/blog/[slug]"
```

建立文章列表頁 `app/blog/page.tsx`：
```tsx
import PostCard from '@/components/PostCard'

// 暫時使用假資料（Day 6 會換成真實資料庫）
const mockPosts = [
  {
    id: 'nextjs-getting-started',
    title: 'Next.js 入門心得',
    excerpt: '記錄學習 Next.js 第一天的感受與重要概念...',
    date: '2026-04-01',
    author: 'Dave',
    tags: ['Next.js', '前端'],
  },
  {
    id: 'tailwind-tips',
    title: 'Tailwind CSS 常用技巧整理',
    excerpt: '整理了 10 個最實用的 Tailwind CSS 技巧...',
    date: '2026-04-03',
    author: 'Dave',
    tags: ['CSS', '前端'],
  },
]

export default function BlogPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">所有文章</h1>
      <div className="grid gap-6">
        {mockPosts.map(post => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  )
}
```

### Step 2：建立動態文章詳情頁
建立 `app/blog/[slug]/page.tsx`：
```tsx
interface Props {
  params: Promise<{ slug: string }>
}

// 暫時的假資料
const postContent: Record<string, { title: string; content: string; date: string }> = {
  'nextjs-getting-started': {
    title: 'Next.js 入門心得',
    date: '2026-04-01',
    content: `
      ## 為什麼選擇 Next.js？

      Next.js 是目前最流行的 React 框架，它提供了完整的全端開發解決方案。

      ## 學習重點

      1. App Router 是新版的路由系統
      2. Server Components 可以在伺服器端渲染
      3. 內建的圖片優化和字型優化

      ## 心得總結

      學習曲線不算太陡，配合官方文件很快就能上手。
    `,
  },
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = postContent[slug]

  if (!post) {
    return <div className="text-center py-20 text-gray-400">文章不存在</div>
  }

  return (
    <article className="bg-white rounded-xl shadow-sm p-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-400 text-sm mb-8">📅 {post.date}</p>
      <div className="prose max-w-none">
        <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed">
          {post.content}
        </pre>
      </div>
    </article>
  )
}
```

### Step 3：加入 Loading 狀態
建立 `app/blog/loading.tsx`：
```tsx
export default function BlogLoading() {
  return (
    <div className="grid gap-6">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-full" />
        </div>
      ))}
    </div>
  )
}
```

### Step 4：加入 404 頁面
建立 `app/not-found.tsx`：
```tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
      <p className="text-gray-600 mb-6">找不到你要的頁面</p>
      <Link href="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        回首頁
      </Link>
    </div>
  )
}
```

## 💡 今日重點觀念
- **`[slug]`** 代表動態參數，`/blog/any-name` 都會對應到這個頁面
- `loading.tsx` 是 Next.js 的內建 Loading 機制，自動顯示
- `params` 在新版 Next.js 中是 **Promise**，需要 `await`

---

# Day 4 ｜ Tailwind CSS + 部落格 UI 設計

## 🎯 今日目標
完成部落格完整的視覺設計，包含首頁、響應式設計、暗色模式。

## 📚 知識點
- Tailwind 核心工具類別（Utility Classes）
- 響應式設計（`sm:`, `md:`, `lg:`）
- Flex 和 Grid 布局
- 狀態樣式（`hover:`, `focus:`, `active:`）
- 自定義 Tailwind 設定

## 🛠️ 手把手步驟

### Step 1：完善首頁設計
改寫 `app/page.tsx`：
```tsx
import Link from 'next/link'
import PostCard from '@/components/PostCard'

const featuredPosts = [
  {
    id: 'nextjs-getting-started',
    title: 'Next.js 入門心得',
    excerpt: '記錄學習 Next.js 第一天的感受與重要概念，從環境建置到第一個頁面...',
    date: '2026-04-01',
    author: 'Dave',
    tags: ['Next.js', '前端'],
  },
  {
    id: 'tailwind-tips',
    title: 'Tailwind CSS 常用技巧整理',
    excerpt: '整理了 10 個最實用的 Tailwind CSS 技巧，讓開發效率大幅提升...',
    date: '2026-04-03',
    author: 'Dave',
    tags: ['CSS', '前端'],
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-16 mb-12">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl">
          👨‍💻
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Dave's Blog
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          分享學習心得、技術筆記與生活感想。
          歡迎一起交流！
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/blog"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            閱讀文章
          </Link>
          <Link
            href="/about"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:border-blue-600 hover:text-blue-600 transition-colors"
          >
            關於我
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-4 mb-12">
        {[
          { label: '篇文章', value: '12' },
          { label: '學習天數', value: '10' },
          { label: '訪客留言', value: '48' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Latest Posts */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">最新文章</h2>
          <Link href="/blog" className="text-blue-600 hover:underline text-sm">
            查看全部 →
          </Link>
        </div>
        <div className="grid gap-6">
          {featuredPosts.map(post => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </section>
    </div>
  )
}
```

### Step 2：建立 Footer 元件
建立 `components/Footer.tsx`：
```tsx
export default function Footer() {
  return (
    <footer className="mt-16 py-8 border-t text-center text-gray-500 text-sm">
      <p>© 2026 Dave's Blog · Built with Next.js & Tailwind CSS</p>
    </footer>
  )
}
```
記得加入 `app/layout.tsx` 中。

### Step 3：響應式設計練習
Tailwind 的斷點前綴：
```
sm:  → 640px 以上
md:  → 768px 以上
lg:  → 1024px 以上
xl:  → 1280px 以上
```

範例（手機單欄，電腦雙欄）：
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* 手機: 1欄, 電腦: 2欄 */}
</div>
```

## 💡 今日重點觀念
- Tailwind 是「原子化 CSS」，每個 class 只做一件事
- 響應式是「Mobile First」，預設樣式給手機，用前綴加大螢幕的樣式
- 開發時善用瀏覽器開發者工具的 RWD 模擬器

---

# Day 5 ｜ 資料取得 + Server/Client Components

## 🎯 今日目標
理解 Next.js 的資料取得策略，為接入資料庫做準備。

## 📚 知識點
- Server Components（預設）vs Client Components（`'use client'`）
- `fetch` 在 Server Component 中的使用
- Static Generation (SSG) vs Server-Side Rendering (SSR)
- `revalidate` 控制快取
- 環境變數 `.env.local`

## 🛠️ 手把手步驟

### Step 1：理解 Server vs Client Components

```tsx
// ✅ Server Component（預設）— 沒有 'use client'
// 可以直接 async/await，可以存取資料庫
// 不能用 useState、useEffect、onClick 等

async function ServerComponent() {
  const data = await fetch('https://api.example.com/posts')
  const posts = await data.json()
  return <div>{posts.map(p => <p key={p.id}>{p.title}</p>)}</div>
}

// ✅ Client Component — 需要 'use client'
// 可以用 useState、useEffect、事件處理
// 不能直接 async/await

'use client'
import { useState } from 'react'
function ClientComponent() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

### Step 2：建立 API 資料層（模擬）
建立 `lib/posts.ts`：
```typescript
// lib/posts.ts
export interface Post {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  author: string
  tags: string[]
}

// 之後會替換成真實的資料庫查詢
export const posts: Post[] = [
  {
    id: 'nextjs-getting-started',
    title: 'Next.js 入門心得',
    excerpt: '記錄學習 Next.js 第一天的感受與重要概念...',
    content: '# Next.js 入門心得\n\n這是文章的完整內容...',
    date: '2026-04-01',
    author: 'Dave',
    tags: ['Next.js', '前端'],
  },
]

export function getAllPosts(): Post[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostById(id: string): Post | undefined {
  return posts.find(p => p.id === id)
}
```

### Step 3：建立 Next.js API Route
建立 `app/api/posts/route.ts`：
```typescript
import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/posts'

export async function GET() {
  const posts = getAllPosts()
  return NextResponse.json(posts)
}
```
測試：訪問 http://localhost:3000/api/posts 應該看到 JSON 資料 ✅

### Step 4：設定環境變數
建立 `.env.local`（此檔案不要 commit 到 Git！）：
```env
# 之後會用到
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```
在 Next.js 中使用：
```typescript
const dbUrl = process.env.DATABASE_URL  // 伺服器端可用
const pubKey = process.env.NEXT_PUBLIC_KEY  // 前端也能用（需要 NEXT_PUBLIC_ 前綴）
```

## 💡 今日重點觀念
- Server Component 在伺服器渲染，**更安全**（可直接存取資料庫，不暴露給前端）
- Client Component 在瀏覽器執行，需要互動性時才用
- API Route (`app/api/`) 是 Next.js 內建的後端 API

---

# Day 6 ｜ 資料庫 + Prisma ORM

## 🎯 今日目標
設定 PostgreSQL 資料庫，用 Prisma 建立資料模型，實現真實的 CRUD。

## 📚 知識點
- 關係型資料庫基礎（Table、主鍵、外鍵）
- Prisma Schema 語法
- Prisma Client CRUD 操作
- 資料庫遷移（Migration）

## 🛠️ 手把手步驟

### Step 1：安裝並初始化 Prisma
```bash
pnpm add prisma @prisma/client
pnpm prisma init
```

### Step 2：設定資料庫（使用 Neon 免費 PostgreSQL）
1. 前往 https://neon.tech 註冊免費帳號
2. 建立新專案，複製 Connection String
3. 更新 `.env.local`：
```env
DATABASE_URL="postgresql://username:password@host/dbname?sslmode=require"
```

### Step 3：設計 Prisma Schema
編輯 `prisma/schema.prisma`：
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String    @id @default(cuid())
  name      String?
  email     String    @unique
  password  String?
  image     String?
  role      Role      @default(USER)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  posts     Post[]
  comments  Comment[]

  @@map("users")
}

model Post {
  id        String    @id @default(cuid())
  title     String
  slug      String    @unique
  excerpt   String?
  content   String
  published Boolean   @default(false)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  authorId  String
  author    User      @relation(fields: [authorId], references: [id])
  tags      Tag[]
  comments  Comment[]

  @@map("posts")
}

model Comment {
  id        String   @id @default(cuid())
  content   String
  createdAt DateTime @default(now())

  postId    String
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])

  @@map("comments")
}

model Tag {
  id    String @id @default(cuid())
  name  String @unique
  posts Post[]

  @@map("tags")
}

enum Role {
  USER
  ADMIN
}
```

### Step 4：執行資料庫遷移
```bash
pnpm prisma migrate dev --name init
```

### Step 5：建立 Prisma Client 單例
建立 `lib/prisma.ts`：
```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
```

### Step 6：更新 API Route 使用真實資料
更新 `app/api/posts/route.ts`：
```typescript
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: { select: { name: true } }, tags: true },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(posts)
}
```

### Step 7：Prisma Studio（資料庫視覺化管理）
```bash
pnpm prisma studio
```
打開 http://localhost:5555 可以用 UI 管理資料 🎉

## 💡 今日重點觀念
- Prisma Schema 是「資料庫的設計圖」，改 Schema 要 migrate
- **關聯**：`Post` 有 `authorId` 外鍵指向 `User`（一個作者可以有多篇文章）
- `onDelete: Cascade` = 文章刪除時，留言也一併刪除

---

# Day 7 ｜ NextAuth.js 會員系統

## 🎯 今日目標
實作完整的會員系統：註冊、登入、Session 管理、保護路由。

## 📚 知識點
- NextAuth.js v5 (Auth.js) 工作原理
- Credentials Provider（帳密登入）
- Session 與 JWT
- 保護 API Route 和頁面
- bcrypt 密碼加密

## 🛠️ 手把手步驟

### Step 1：安裝套件
```bash
pnpm add next-auth@beta @auth/prisma-adapter bcryptjs
pnpm add -D @types/bcryptjs
```

### Step 2：設定 Auth.js
建立 `auth.ts`（根目錄）：
```typescript
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      credentials: {
        email: { label: '信箱', type: 'email' },
        password: { label: '密碼', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user || !user.password) return null

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!passwordMatch) return null

        return { id: user.id, email: user.email, name: user.name }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
})
```

### Step 3：建立 API Handler
建立 `app/api/auth/[...nextauth]/route.ts`：
```typescript
import { handlers } from '@/auth'
export const { GET, POST } = handlers
```

### Step 4：建立註冊 API
建立 `app/api/register/route.ts`：
```typescript
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ error: '請填寫必要欄位' }, { status: 400 })
  }

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return NextResponse.json({ error: '此信箱已被使用' }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  })

  return NextResponse.json({ message: '註冊成功', userId: user.id })
}
```

### Step 5：建立登入頁面
建立 `app/login/page.tsx`：
```tsx
'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError('信箱或密碼錯誤')
    } else {
      router.push('/')
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto mt-16">
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">登入</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">信箱</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">密碼</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? '登入中...' : '登入'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          還沒有帳號？
          <Link href="/register" className="text-blue-600 hover:underline ml-1">
            立即註冊
          </Link>
        </p>
      </div>
    </div>
  )
}
```

### Step 6：建立註冊頁面
建立 `app/register/page.tsx`（結構與登入頁類似，改為呼叫 `/api/register`）：
```tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error)
    } else {
      router.push('/login')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16">
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">註冊帳號</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['name', 'email', 'password'].map(field => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field === 'name' ? '暱稱' : field === 'email' ? '信箱' : '密碼'}
              </label>
              <input
                type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                value={form[field as keyof typeof form]}
                onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={field !== 'name'}
              />
            </div>
          ))}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
          >
            註冊
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          已有帳號？
          <Link href="/login" className="text-blue-600 hover:underline ml-1">立即登入</Link>
        </p>
      </div>
    </div>
  )
}
```

### Step 7：更新 Navbar 顯示登入狀態
更新 `components/Navbar.tsx` 加入 Session 判斷（需改為 Client Component 或用 Server Component `auth()`）

## 💡 今日重點觀念
- **NextAuth.js** 處理所有複雜的認證邏輯（Session、Cookie、Token）
- **絕對不要**儲存明文密碼，永遠使用 `bcrypt.hash()` 加密
- `signIn()` 是客戶端呼叫，`auth()` 是伺服器端取得 Session

---

# Day 8 ｜ 部落格文章 CRUD 功能

## 🎯 今日目標
實現完整的文章新增、編輯、刪除、發布功能，加入 Markdown 支援。

## 📚 知識點
- 完整的 CRUD API Route 設計
- Markdown 渲染（`react-markdown`）
- 受保護路由（只有登入者才能新增文章）
- Server Action（Next.js 的新特性）
- 表單驗證

## 🛠️ 手把手步驟

### Step 1：安裝 Markdown 套件
```bash
pnpm add react-markdown remark-gfm rehype-highlight
```

### Step 2：建立文章 CRUD API
建立 `app/api/posts/route.ts`（新增文章）：
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

// GET 所有已發布文章
export async function GET() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: { select: { name: true } }, tags: true },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(posts)
}

// POST 新增文章（需登入）
export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: '請先登入' }, { status: 401 })
  }

  const { title, content, excerpt, tags, published } = await req.json()

  // 從標題自動生成 slug
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/(^-|-$)/g, '')

  const post = await prisma.post.create({
    data: {
      title,
      slug,
      content,
      excerpt,
      published: published ?? false,
      authorId: session.user.id!,
    },
  })

  return NextResponse.json(post)
}
```

### Step 3：建立文章編輯器頁面
建立 `app/dashboard/new-post/page.tsx`：
```tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewPostPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
  })
  const [preview, setPreview] = useState(false)

  const handleSubmit = async (published: boolean) => {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, published }),
    })
    if (res.ok) {
      router.push('/dashboard')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">寫新文章</h1>
      <div className="space-y-4">
        <input
          placeholder="文章標題"
          value={form.title}
          onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
          className="w-full text-2xl font-bold border-0 border-b-2 pb-2 focus:outline-none focus:border-blue-500"
        />
        <input
          placeholder="文章摘要（選填）"
          value={form.excerpt}
          onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="用 Markdown 寫文章內容..."
          value={form.content}
          onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
          rows={20}
          className="w-full border rounded-lg px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-3">
          <button
            onClick={() => handleSubmit(false)}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            儲存草稿
          </button>
          <button
            onClick={() => handleSubmit(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            發布文章
          </button>
        </div>
      </div>
    </div>
  )
}
```

### Step 4：加入 Markdown 渲染
更新文章詳情頁 `app/blog/[slug]/page.tsx`：
```tsx
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { prisma } from '@/lib/prisma'

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await prisma.post.findUnique({
    where: { slug, published: true },
    include: { author: { select: { name: true } }, tags: true },
  })

  if (!post) return <div className="text-center py-20">文章不存在</div>

  return (
    <article className="bg-white rounded-xl shadow-sm p-8">
      <div className="flex gap-2 mb-4">
        {post.tags.map(tag => (
          <span key={tag.id} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
            {tag.name}
          </span>
        ))}
      </div>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-400 text-sm mb-8">
        ✍️ {post.author.name} · 📅 {post.createdAt.toLocaleDateString('zh-TW')}
      </p>
      <div className="prose max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}
```

## 💡 今日重點觀念
- API Route 要先驗證身份（`auth()`）才能執行寫入操作
- Markdown 讓文章可以有格式（標題、粗體、程式碼等）而不需要富文字編輯器
- slug 是 URL 友善的文章識別碼

---

# Day 9 ｜ 留言系統 + 會員功能完善

## 🎯 今日目標
實作留言新增/刪除、個人Dashboard、文章管理頁面。

## 📚 知識點
- 巢狀關聯查詢
- 樂觀更新（Optimistic Update）
- useSession() 在 Client Component 中取得登入狀態
- 角色控制（Admin vs User）

## 🛠️ 手把手步驟

### Step 1：留言 API
建立 `app/api/posts/[id]/comments/route.ts`：
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

// 取得文章留言
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const comments = await prisma.comment.findMany({
    where: { postId: id },
    include: { author: { select: { name: true, image: true } } },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(comments)
}

// 新增留言
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: '請先登入才能留言' }, { status: 401 })
  }

  const { id } = await params
  const { content } = await req.json()

  if (!content?.trim()) {
    return NextResponse.json({ error: '留言不能為空' }, { status: 400 })
  }

  const comment = await prisma.comment.create({
    data: {
      content,
      postId: id,
      authorId: session.user.id!,
    },
    include: { author: { select: { name: true } } },
  })

  return NextResponse.json(comment)
}
```

### Step 2：留言元件
建立 `components/CommentSection.tsx`：
```tsx
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

interface Comment {
  id: string
  content: string
  createdAt: string
  author: { name: string | null }
}

export default function CommentSection({ postId }: { postId: string }) {
  const { data: session } = useSession()
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`/api/posts/${postId}/comments`)
      .then(r => r.json())
      .then(setComments)
  }, [postId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setLoading(true)
    const res = await fetch(`/api/posts/${postId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newComment }),
    })

    if (res.ok) {
      const comment = await res.json()
      setComments(prev => [comment, ...prev])
      setNewComment('')
    }
    setLoading(false)
  }

  return (
    <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-bold mb-6">💬 留言 ({comments.length})</h3>

      {session ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="寫下你的想法..."
            rows={3}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? '送出中...' : '送出留言'}
          </button>
        </form>
      ) : (
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-center text-gray-600">
          <Link href="/login" className="text-blue-600 hover:underline">登入</Link> 後才能留言
        </div>
      )}

      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="border-b pb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-sm">{comment.author.name ?? '匿名'}</span>
              <span className="text-xs text-gray-400">
                {new Date(comment.createdAt).toLocaleDateString('zh-TW')}
              </span>
            </div>
            <p className="text-gray-700 text-sm">{comment.content}</p>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-center text-gray-400 py-4">還沒有留言，來當第一個！</p>
        )}
      </div>
    </div>
  )
}
```

### Step 3：建立個人 Dashboard
建立 `app/dashboard/page.tsx`：
```tsx
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const posts = await prisma.post.findMany({
    where: { authorId: session.user.id },
    include: { _count: { select: { comments: true } } },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">我的文章</h1>
        <Link
          href="/dashboard/new-post"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + 寫新文章
        </Link>
      </div>

      <div className="space-y-3">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-lg p-4 flex justify-between items-center shadow-sm">
            <div>
              <h3 className="font-medium">{post.title}</h3>
              <div className="text-xs text-gray-400 mt-1">
                {post.published ? '✅ 已發布' : '📝 草稿'} ·
                💬 {post._count.comments} 則留言 ·
                {post.createdAt.toLocaleDateString('zh-TW')}
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/dashboard/edit/${post.id}`}
                className="text-sm text-blue-600 hover:underline"
              >
                編輯
              </Link>
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <p className="text-center text-gray-400 py-12">還沒有文章，現在開始寫第一篇！</p>
        )}
      </div>
    </div>
  )
}
```

### Step 4：將留言元件加入文章頁面
在 `app/blog/[slug]/page.tsx` 最後加入：
```tsx
import CommentSection from '@/components/CommentSection'
import { SessionProvider } from 'next-auth/react'

// 在 return 中文章底部加入：
<SessionProvider>
  <CommentSection postId={post.id} />
</SessionProvider>
```

## 💡 今日重點觀念
- `useSession()` 用於 Client Component 取得登入狀態
- `auth()` 用於 Server Component 取得 Session
- Dashboard 頁面要做 **伺服器端保護**（`redirect('/login')` if not logged in）

---

# Day 10 ｜ 部署 + SEO + 效能優化

## 🎯 今日目標
將網站部署到 Vercel，完善 SEO，並進行效能優化。

## 📚 知識點
- Git 版本控制
- Vercel 部署流程
- Next.js Metadata API（SEO）
- 圖片優化（`next/image`）
- `generateStaticParams`（靜態生成動態路由）

## 🛠️ 手把手步驟

### Step 1：初始化 Git 並推送到 GitHub
```bash
# 確保 .gitignore 忽略敏感檔案
echo ".env.local" >> .gitignore
echo "node_modules/" >> .gitignore

git init
git add .
git commit -m "feat: initial blog setup"

# 在 GitHub 建立新 repository，然後：
git remote add origin https://github.com/你的帳號/my-blog.git
git push -u origin main
```

### Step 2：部署到 Vercel
1. 前往 https://vercel.com，用 GitHub 帳號登入
2. 點選 "New Project" → 選擇你的 repository
3. 設定環境變數（非常重要！）：
   - `DATABASE_URL` → 你的 Neon PostgreSQL 連接字串
   - `NEXTAUTH_SECRET` → 執行 `openssl rand -base64 32` 產生
   - `NEXTAUTH_URL` → 你的 Vercel 網址（`https://your-blog.vercel.app`）
4. 點選 Deploy 🚀

### Step 3：完善 SEO Metadata
更新 `app/layout.tsx`：
```tsx
export const metadata: Metadata = {
  title: {
    default: "Dave's Blog",
    template: '%s | Dave\'s Blog',
  },
  description: '分享學習心得、技術筆記與生活感想',
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: 'https://your-blog.vercel.app',
    siteName: "Dave's Blog",
  },
}
```

動態文章 SEO，更新 `app/blog/[slug]/page.tsx`：
```tsx
export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await prisma.post.findUnique({ where: { slug } })
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? '',
    },
  }
}
```

### Step 4：靜態路徑生成（效能優化）
在 `app/blog/[slug]/page.tsx` 加入：
```tsx
export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  })
  return posts.map(post => ({ slug: post.slug }))
}
```

### Step 5：使用 next/image 優化圖片
```tsx
import Image from 'next/image'

// 替換原本的 <img> 標籤
<Image
  src="/avatar.jpg"
  alt="Dave"
  width={96}
  height={96}
  className="rounded-full"
  priority  // 首屏圖片加 priority
/>
```

### Step 6：最終檢查清單
```
✅ 所有頁面在手機上顯示正常（響應式）
✅ 未登入時無法存取 /dashboard
✅ 文章 CRUD 功能正常
✅ 留言功能正常（需登入）
✅ 環境變數在 Vercel 正確設定
✅ 資料庫有成功連線
✅ SEO metadata 正確顯示
✅ 網站成功部署並可訪問
```

## 💡 今日重點觀念
- **環境變數** 在 Vercel 上要重新設定，`.env.local` 不會上傳到 Git
- `generateStaticParams` 讓動態路由在 build time 預先生成，加快載入速度
- 部署後遇到問題先看 Vercel 的 **Function Logs**

---

# 🎓 學習完成！

恭喜你完成了 10 天的 Next.js 學習旅程！🎉

你已經學會了：
- ✅ Next.js App Router 完整路由系統
- ✅ React Server / Client Components
- ✅ Tailwind CSS UI 設計
- ✅ Prisma + PostgreSQL 資料庫操作
- ✅ NextAuth.js 完整會員認證系統
- ✅ 文章 CRUD + Markdown 支援
- ✅ 留言系統實作
- ✅ Vercel 部署 + SEO 優化

## 🚀 延伸學習方向
- **更豐富的編輯器**：整合 Tiptap 富文字編輯器
- **圖片上傳**：整合 Cloudinary 或 Uploadthing
- **全文搜尋**：整合 Algolia 搜尋
- **電子報**：整合 Resend 發送電子郵件通知
- **分析數據**：整合 Vercel Analytics 查看流量

---

*每天完成目標後，記得在 Git 做一次 Commit 紀錄進度！*
*遇到問題可以問 Claude，也可以查閱 [Next.js 官方文件](https://nextjs.org/docs)*
