# 🚀 Next.js 深度學習計劃（Day 1–3）
> 目標：打造個人部落格 ｜ 含前後端、會員系統、留言功能、GitHub 版控、Notion 學習日誌

---

## 🗺️ 技術棧與工具全覽

| 類別 | 技術 | 為什麼選它 |
|------|------|-----------|
| 框架 | Next.js 14+ (App Router) | 全端整合、SSR/SSG、最多企業使用 |
| 語言 | TypeScript | 型別安全，減少 Bug，IDE 提示強 |
| 樣式 | Tailwind CSS | 原子化 CSS，不用命名 class，快速開發 |
| 資料庫 | PostgreSQL (Neon 雲端免費) | 關聯式資料庫，業界標準 |
| ORM | Prisma | 型別安全的資料庫操作，自動產生 TS 型別 |
| 認證 | NextAuth.js v5 (Auth.js) | Next.js 原生整合，支援多種登入方式 |
| 部署 | Vercel | Next.js 原廠，零設定部署 |
| 版控 | Git + GitHub | 業界標準，每日記錄學習進度 |
| 筆記 | Notion | 自動匯入每日學習摘要 |

---

## 📋 每日學習框架（固定結構）

每一天都按照這個結構進行：
```
🎯 今日目標        → 今天要完成什麼
📚 核心知識點      → 要理解的概念（含原理解釋）
⚠️ 常見誤區        → 初學者最容易踩的坑
🛠️ 手把手實作      → Step by step 程式碼
🏋️ 練習挑戰        → 自己動手延伸練習
📝 每日 Git Commit → 版控指令範本
📓 Notion 摘要模板 → 完成後匯入 Notion
```

---

# ═══════════════════════════════════
# Day 1 ｜ 環境建置 + Next.js 核心概念
# ═══════════════════════════════════

## 🎯 今日目標
- 安裝完整開發環境（Node.js、VS Code、擴充套件）
- 建立並理解 Next.js 專案結構
- 寫出第一個頁面，理解 App Router 運作方式
- 初始化 Git repository 並推送到 GitHub

## 📚 核心知識點

### 1. Next.js 是什麼？為什麼不直接用 React？

**React** 是 UI 函式庫，只負責畫面渲染，你需要自己解決：
- 路由（URL 對應到頁面）
- SEO（React 預設在瀏覽器渲染，搜尋引擎看不到內容）
- 後端 API
- 打包、效能優化

**Next.js** 在 React 之上解決了這些問題：
```
React          →  只有前端 UI
Next.js        →  前端 UI + 路由 + 後端 API + SEO + 部署優化
```

### 2. 渲染策略（非常重要！）

```
SSR (Server-Side Rendering)
  → 每次請求都在伺服器即時渲染 HTML
  → 適合：需要即時資料的頁面（用戶動態、股價）
  → 缺點：每次都要等伺服器

SSG (Static Site Generation)
  → Build 時預先產生 HTML 靜態檔案
  → 適合：不常變動的內容（部落格文章）
  → 優點：超快，可 CDN 快取

ISR (Incremental Static Regeneration)
  → SSG + 可設定自動更新間隔
  → 適合：大多數部落格場景 ← 我們會用這個

CSR (Client-Side Rendering)
  → 原始 React 方式，在瀏覽器執行
  → 適合：高度互動的元件（表單、圖表）
```

### 3. App Router 的核心檔案

```
app/
├── layout.tsx      # 共用外框（每個頁面都會套用）
│                   # → 相當於 HTML 骨架 + 全域 Provider
├── page.tsx        # 該路由的頁面內容
├── loading.tsx     # 載入中的 UI（Suspense 邊界）
├── error.tsx       # 錯誤處理 UI
├── not-found.tsx   # 404 頁面
└── route.ts        # API 端點（後端）
```

### 4. Server Component vs Client Component 深度解析

```tsx
// ✅ Server Component（預設，無需標記）
// 執行環境：Node.js 伺服器
// 優點：可直接存取資料庫、API 金鑰不外洩、無 JS bundle
// 限制：不能用 useState、useEffect、onClick、瀏覽器 API

async function ServerComp() {
  // 可以直接 await！不需要 useEffect
  const data = await fetch('https://api.example.com/posts')
  // 可以直接存取環境變數（不會暴露給前端）
  const secret = process.env.SECRET_KEY
  return <div>{JSON.stringify(data)}</div>
}

// ✅ Client Component（需要加 'use client'）
// 執行環境：瀏覽器
// 優點：可以用 hooks、事件處理、瀏覽器 API
// 限制：不能直接存取資料庫、bundle 較大

'use client'
import { useState } from 'react'

function ClientComp() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

**混用策略（重要！）：**
```
Server Component（外層，取資料）
  └── Client Component（內層，只有需要互動的部分）

好的設計：
  BlogPage（Server）→ 從資料庫取文章列表
    └── LikeButton（Client）→ 只有這個按鈕需要 useState
```

### 5. `next/link` vs `<a>` 的差異

```tsx
// ❌ 不要用原生 <a>（會重新整理整個頁面，像傳統網站）
<a href="/about">關於</a>

// ✅ 用 Link（SPA 導航，不重整頁面，預先載入）
import Link from 'next/link'
<Link href="/about">關於</Link>
```

## ⚠️ 常見誤區

| 誤區 | 正確做法 |
|------|---------|
| 在 Server Component 用 useState | 改用 Client Component 或 Server Action |
| 在 Client Component 直接連資料庫 | 改用 API Route 或 Server Component |
| 用 `<a>` 做站內連結 | 用 `<Link>` |
| 把所有東西都標 `'use client'` | 只有真正需要互動的才標 |
| 忘記 `params` 是 Promise（Next.js 15）| 記得 `await params` |

## 🛠️ 手把手實作

### Step 1：安裝開發工具

**VS Code 必裝擴充套件：**
- ESLint（程式碼品質檢查）
- Prettier（自動格式化）
- Tailwind CSS IntelliSense（自動補全 class 名稱）
- Prisma（Schema 語法高亮）
- GitLens（Git 視覺化）

```bash
# 確認 Node.js 版本 ≥ 18.17
node -v

# 安裝 pnpm（比 npm 快 2-3 倍，且節省磁碟空間）
npm install -g pnpm

# 確認安裝成功
pnpm -v
```

### Step 2：建立專案

```bash
pnpm create next-app@latest my-blog --typescript --tailwind --eslint --app --no-src-dir --no-import-alias

cd my-blog
pnpm dev
```

瀏覽器開啟 http://localhost:3000 ✅

### Step 3：清理預設內容

Next.js 預設有很多範例程式碼，先清掉：

```tsx
// app/page.tsx — 改成乾淨的首頁
export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Dave's Blog
        </h1>
        <p className="text-xl text-gray-500">
          學習筆記 · 技術分享 · 個人成長
        </p>
      </div>
    </main>
  )
}
```

```css
/* app/globals.css — 只留這些 */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 4：建立基本頁面結構

```bash
mkdir -p app/blog app/about app/login app/register app/dashboard
```

每個資料夾建立 `page.tsx`（先寫佔位內容）：

```tsx
// app/about/page.tsx
export default function AboutPage() {
  return <h1 className="p-8 text-3xl font-bold">關於我（施工中）</h1>
}

// app/blog/page.tsx
export default function BlogPage() {
  return <h1 className="p-8 text-3xl font-bold">文章列表（施工中）</h1>
}

// app/dashboard/page.tsx
export default function DashboardPage() {
  return <h1 className="p-8 text-3xl font-bold">個人中心（施工中）</h1>
}
```

### Step 5：初始化 Git

```bash
# 初始化 Git
git init

# 確認 .gitignore 已正確設定（create-next-app 會自動建立）
cat .gitignore  # 應包含 node_modules、.next、.env.local

# 第一次 commit
git add .
git commit -m "feat: initial Next.js blog setup

- Next.js 14 + TypeScript + Tailwind CSS
- 建立基本頁面結構（home, blog, about, dashboard）
- Day 1 學習完成"
```

在 GitHub 建立新 repository（名稱建議：`my-blog`），然後：

```bash
git remote add origin https://github.com/你的帳號/my-blog.git
git branch -M main
git push -u origin main
```

## 🏋️ 練習挑戰

1. **[基礎]** 在 `app/tags/page.tsx` 建立一個標籤頁面
2. **[進階]** 在 `app/layout.tsx` 加入 `<head>` 的 meta description
3. **[挑戰]** 研究 `app/not-found.tsx` 的作用，建立一個漂亮的 404 頁面

## 📝 每日 Git Commit 範本

```bash
git add .
git commit -m "feat(day1): Next.js 環境建置完成

學習內容：
- App Router 檔案結構
- Server vs Client Component 概念
- SSR/SSG/ISR/CSR 渲染策略比較
- 建立基本頁面路由

完成項目：
✅ 開發環境建置
✅ 首頁、文章、關於、Dashboard 頁面
✅ GitHub repository 初始化"
```

## 📓 Notion 每日摘要模板

```
📅 日期：2026-04-XX（Day 1）
🎯 完成目標：環境建置 + 基本頁面

【今天學到的核心概念】
1. Next.js App Router 的 4 種核心檔案（layout/page/loading/error）
2. Server Component 在伺服器執行 → 可直接存資料庫，不洩漏 API Key
3. Client Component 在瀏覽器執行 → 需要 useState/事件時才用
4. SSR vs SSG vs ISR vs CSR 的適用場景

【今天寫的重要程式碼】
- app/page.tsx（首頁）
- app/layout.tsx（全站外框）
- 多個佔位頁面

【遇到的問題 & 解決方式】
（填入今天踩過的坑）

【明天要學的內容】
React 核心概念 + 可重用元件設計

【自我評分】⭐⭐⭐⭐⭐
```

---

# ═══════════════════════════════════
# Day 2 ｜ React 深度 + 元件系統設計
# ═══════════════════════════════════

## 🎯 今日目標
- 深入理解 React 元件、Props、State 的運作原理
- 建立部落格的完整元件系統（Navbar、Footer、PostCard、Badge）
- 掌握 TypeScript Interface 定義型別
- 理解 `useCallback`、`useMemo` 等進階 Hook

## 📚 核心知識點

### 1. JSX 底層原理

JSX 不是真正的 HTML，它會被編譯成 `React.createElement()` 呼叫：

```tsx
// 你寫的 JSX
const element = <h1 className="title">Hello</h1>

// 實際上等同於
const element = React.createElement('h1', { className: 'title' }, 'Hello')
```

這就是為什麼 JSX 有一些規則：
- 必須有一個根元素（或用 `<>` Fragment）
- `class` 要改成 `className`（因為 `class` 是 JS 保留字）
- 事件用駝峰命名：`onClick`、`onChange`

### 2. Props 深度解析

```tsx
// 定義 Props 的型別（TypeScript Interface）
interface ButtonProps {
  label: string           // 必填
  onClick: () => void     // 必填，回呼函式
  variant?: 'primary' | 'secondary' | 'danger'  // 選填，限定值
  disabled?: boolean      // 選填
  className?: string      // 選填，允許外部傳入額外樣式
  children?: React.ReactNode  // 選填，允許巢狀內容
}

// 使用解構賦值接收 Props（搭配預設值）
export default function Button({
  label,
  onClick,
  variant = 'primary',  // 預設值
  disabled = false,
  className = '',
}: ButtonProps) {
  const baseStyle = 'px-4 py-2 rounded-lg font-medium transition-colors'
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {label}
    </button>
  )
}

// 使用方式
<Button label="送出" onClick={handleSubmit} variant="primary" />
<Button label="取消" onClick={handleCancel} variant="secondary" />
<Button label="刪除" onClick={handleDelete} variant="danger" disabled={isLoading} />
```

### 3. useState 深度解析

```tsx
'use client'
import { useState } from 'react'

function Counter() {
  // useState 回傳 [當前值, 更新函式]
  const [count, setCount] = useState(0)

  // ❌ 錯誤：直接修改 state（不會觸發重新渲染！）
  // count = count + 1

  // ✅ 正確：用 setter 函式更新
  const increment = () => setCount(count + 1)

  // ✅ 更好：用函式形式（避免 stale closure 問題）
  const safeIncrement = () => setCount(prev => prev + 1)

  return <button onClick={safeIncrement}>{count}</button>
}

// 物件 state（常見模式）
interface FormState {
  title: string
  content: string
  published: boolean
}

function PostForm() {
  const [form, setForm] = useState<FormState>({
    title: '',
    content: '',
    published: false,
  })

  // 更新單一欄位的通用方式
  const updateField = (field: keyof FormState, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form>
      <input
        value={form.title}
        onChange={e => updateField('title', e.target.value)}
        placeholder="文章標題"
      />
      <textarea
        value={form.content}
        onChange={e => updateField('content', e.target.value)}
        placeholder="文章內容"
      />
      <label>
        <input
          type="checkbox"
          checked={form.published}
          onChange={e => updateField('published', e.target.checked)}
        />
        立即發布
      </label>
    </form>
  )
}
```

### 4. useEffect 完整解析

```tsx
'use client'
import { useEffect, useState } from 'react'

function PostList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  // useEffect(callback, dependencies)
  // dependencies = [] → 只在元件掛載時執行一次（相當於 componentDidMount）
  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      const res = await fetch('/api/posts')
      const data = await res.json()
      setPosts(data)
      setLoading(false)
    }
    fetchPosts()
  }, [])  // 空陣列 = 只執行一次

  // dependencies = [id] → 當 id 改變時重新執行
  // useEffect(() => { fetchPost(id) }, [id])

  // 清理函式（避免 memory leak）
  useEffect(() => {
    const timer = setInterval(() => console.log('tick'), 1000)
    return () => clearInterval(timer)  // ← 這個函式在元件卸載時執行
  }, [])

  if (loading) return <div>載入中...</div>
  return <div>{posts.map(p => <div key={p.id}>{p.title}</div>)}</div>
}
```

### 5. 進階 Hooks

```tsx
'use client'
import { useState, useCallback, useMemo } from 'react'

function SearchablePosts({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState('')

  // useMemo：記憶運算結果，只有 posts 或 query 改變才重新計算
  // 適合：複雜的過濾/排序運算
  const filteredPosts = useMemo(() => {
    return posts.filter(p =>
      p.title.toLowerCase().includes(query.toLowerCase())
    )
  }, [posts, query])  // 依賴項

  // useCallback：記憶函式本身，避免子元件不必要的重新渲染
  // 適合：傳給子元件的事件處理函式
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }, [])  // 沒有依賴，函式永遠是同一個

  return (
    <div>
      <input onChange={handleSearch} placeholder="搜尋文章..." />
      <p>找到 {filteredPosts.length} 篇</p>
      {filteredPosts.map(p => <PostCard key={p.id} {...p} />)}
    </div>
  )
}
```

### 6. TypeScript 在 React 中的核心用法

```tsx
// 常用型別
type Variant = 'primary' | 'secondary'  // Union type（只能是這幾個值）
type Handler = () => void               // 函式型別
type AsyncHandler = () => Promise<void> // 非同步函式

// React 內建型別
React.ReactNode   // 任何可渲染的內容（JSX、字串、數字、null）
React.FC<Props>   // Function Component（通常不需要，直接 function 就好）
React.MouseEvent  // 點擊事件
React.ChangeEvent<HTMLInputElement>  // Input 的 onChange 事件

// 常用 Utility Types
Partial<Post>        // 所有欄位都變成選填
Required<Post>       // 所有欄位都變成必填
Pick<Post, 'id' | 'title'>  // 只取某些欄位
Omit<Post, 'content'>       // 排除某些欄位
```

## 🛠️ 手把手實作

### Step 1：建立型別定義檔

```bash
mkdir types
```

建立 `types/index.ts`（整個專案共用的型別）：

```typescript
// types/index.ts

export interface User {
  id: string
  name: string | null
  email: string
  image: string | null
  role: 'USER' | 'ADMIN'
  createdAt: Date
}

export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  published: boolean
  createdAt: Date
  updatedAt: Date
  author: Pick<User, 'id' | 'name' | 'image'>
  tags: Tag[]
  _count?: { comments: number }
}

export interface Comment {
  id: string
  content: string
  createdAt: Date
  author: Pick<User, 'id' | 'name' | 'image'>
}

export interface Tag {
  id: string
  name: string
}
```

### Step 2：建立元件資料夾結構

```bash
mkdir -p components/ui components/blog components/layout
```

### Step 3：建立通用 UI 元件

建立 `components/ui/Badge.tsx`：
```tsx
interface BadgeProps {
  label: string
  color?: 'blue' | 'green' | 'red' | 'purple' | 'gray'
}

const colorMap = {
  blue:   'bg-blue-100 text-blue-700',
  green:  'bg-green-100 text-green-700',
  red:    'bg-red-100 text-red-700',
  purple: 'bg-purple-100 text-purple-700',
  gray:   'bg-gray-100 text-gray-600',
}

export default function Badge({ label, color = 'blue' }: BadgeProps) {
  return (
    <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${colorMap[color]}`}>
      {label}
    </span>
  )
}
```

建立 `components/ui/Button.tsx`：
```tsx
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500',
    ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  }
  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  }

  return (
    <button
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 font-medium rounded-lg
        transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
      )}
      {children}
    </button>
  )
}
```

建立 `components/layout/Navbar.tsx`：
```tsx
import Link from 'next/link'

const navLinks = [
  { href: '/', label: '首頁' },
  { href: '/blog', label: '文章' },
  { href: '/about', label: '關於' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <nav className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl text-gray-900 hover:text-blue-600 transition-colors">
          Dave's Blog
        </Link>

        {/* 導覽連結 */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* 右側操作區（Day 7 加入登入狀態判斷） */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            登入
          </Link>
          <Link
            href="/register"
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            註冊
          </Link>
        </div>
      </nav>
    </header>
  )
}
```

建立 `components/blog/PostCard.tsx`：
```tsx
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import type { Post } from '@/types'

interface PostCardProps {
  post: Pick<Post, 'id' | 'title' | 'slug' | 'excerpt' | 'createdAt' | 'author' | 'tags' | '_count'>
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group bg-white rounded-2xl border border-gray-100 p-6 hover:border-blue-200 hover:shadow-md transition-all">
      {/* 標籤 */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map(tag => (
            <Badge key={tag.id} label={tag.name} />
          ))}
        </div>
      )}

      {/* 標題 */}
      <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        <Link href={`/blog/${post.slug}`}>
          {post.title}
        </Link>
      </h2>

      {/* 摘要 */}
      {post.excerpt && (
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {post.excerpt}
        </p>
      )}

      {/* 底部資訊 */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-2">
          {post.author.image && (
            <img
              src={post.author.image}
              alt={post.author.name ?? ''}
              className="w-5 h-5 rounded-full"
            />
          )}
          <span>{post.author.name}</span>
        </div>
        <div className="flex items-center gap-3">
          {post._count && (
            <span>💬 {post._count.comments}</span>
          )}
          <span>{new Date(post.createdAt).toLocaleDateString('zh-TW')}</span>
        </div>
      </div>
    </article>
  )
}
```

### Step 4：更新 Layout

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: "Dave's Blog", template: "%s | Dave's Blog" },
  description: '分享學習心得、技術筆記與個人成長',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-10">
          {children}
        </main>
        <footer className="border-t mt-20 py-8 text-center text-sm text-gray-400">
          © 2026 Dave's Blog · Built with Next.js
        </footer>
      </body>
    </html>
  )
}
```

## 🏋️ 練習挑戰

1. **[基礎]** 建立 `components/ui/Card.tsx`，支援不同的 padding 大小
2. **[進階]** 為 `PostCard` 加入閱讀時間估算（字數 ÷ 250 = 分鐘）
3. **[挑戰]** 建立 `components/ui/Avatar.tsx`，支援圖片或名稱首字母顯示

## 📝 每日 Git Commit 範本

```bash
git add .
git commit -m "feat(day2): 建立元件系統

- 新增共用型別定義 types/index.ts
- 建立 UI 元件：Button、Badge
- 建立 Blog 元件：PostCard
- 建立 Layout 元件：Navbar
- 使用 TypeScript Interface 確保型別安全"
```

---

# ═══════════════════════════════════
# Day 3 ｜ 路由系統深度 + 頁面完整實作
# ═══════════════════════════════════

## 🎯 今日目標
- 完全掌握 App Router 的所有路由模式
- 理解 Parallel Routes 和 Intercepting Routes
- 建立完整的部落格文章列表 + 詳情頁
- 實作搜尋功能（使用 URL searchParams）

## 📚 核心知識點

### 1. App Router 完整路由模式

```
基本路由：
app/page.tsx              → /
app/blog/page.tsx         → /blog
app/blog/about/page.tsx   → /blog/about

動態路由：
app/blog/[slug]/page.tsx  → /blog/任何字串
app/[...slug]/page.tsx    → /a/b/c（catch-all）
app/[[...slug]]/page.tsx  → / 或 /a/b/c（optional catch-all）

路由群組（不影響 URL）：
app/(auth)/login/page.tsx    → /login（資料夾名稱不在 URL 中）
app/(auth)/register/page.tsx → /register
→ 可以讓 auth 相關頁面共用一個特殊 layout

私有資料夾（不產生路由）：
app/_components/          → 底線開頭，完全忽略
```

### 2. 動態路由的 generateStaticParams

#### 先理解背景：SSG vs SSR

Next.js 有兩種渲染策略：

**SSR（每次請求才產生頁面）**
```
使用者訪問 /blog/nextjs-tips
→ 伺服器當場去查資料庫
→ 產生 HTML 回傳
→ 每次都要等
```

**SSG（Build 時預先產生好靜態頁面）**
```
npm run build 時
→ 伺服器預先產生 /blog/nextjs-tips、/blog/typescript-guide...
→ 部署後是靜態 HTML 檔案
→ 使用者訪問時直接回傳，超快
```

`generateStaticParams` 就是告訴 Next.js：**「Build 的時候，幫我預先產生這些頁面」**

#### 動態路由的問題

```
app/blog/[slug]/page.tsx  →  /blog/任意字串
```

`[slug]` 是變數，Next.js 不知道有哪些可能的值，要明確告訴它：

```tsx
export async function generateStaticParams() {
  // 回傳格式必須是 [{ slug: "xxx" }, { slug: "yyy" }]
  return [
    { slug: "nextjs-tips" },
    { slug: "typescript-guide" },
    { slug: "react-hooks" },
  ]
}
// Build 時 Next.js 就會預先產生：
// /blog/nextjs-tips、/blog/typescript-guide、/blog/react-hooks
```

#### 實際專案寫法（接資料庫）

```tsx
export async function generateStaticParams() {
  // 從資料庫撈所有已發佈文章的 slug
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },   // 只取 slug，節省效能
  })
  return posts.map(post => ({ slug: post.slug }))
}
```

#### 搭配 generateMetadata 完整範例

```tsx
// app/blog/[slug]/page.tsx

// 1. 告訴 Next.js Build 哪些頁面
export async function generateStaticParams() {
  const posts = await prisma.post.findMany({ select: { slug: true } })
  return posts.map(p => ({ slug: p.slug }))
}

// 2. 每個頁面動態產生不同的 <title> 和 og:image
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,           // → <title>Next.js 完全指南</title>
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt ?? '' },
  }
}

// 3. 頁面本體
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  return <article>{post.content}</article>
}
```

#### 有沒有 generateStaticParams 的差異

| | 有 generateStaticParams | 沒有 |
|---|---|---|
| 渲染時機 | Build 時預先產生 | 第一次請求時才產生 |
| 速度 | 極快（靜態 HTML） | 較慢（等伺服器運算） |
| 適合 | 文章詳情頁（內容不常變） | 即時資料頁面 |

> Day 6 接上 Prisma 後，部落格文章頁就會用這個方式實作。Day 3 先用假資料理解概念即可。

### 3. URL SearchParams（搜尋/篩選功能）

#### 什麼是 SearchParams？

就是 URL 問號後面的東西：

```
/blog?q=nextjs&tag=前端&page=2
       ↑            ↑         ↑
     搜尋關鍵字    標籤篩選   第幾頁
```

好處：
- 可以直接分享連結（別人開同一個 URL 看到一樣的結果）
- 瀏覽器上一頁/下一頁都能回到正確狀態
- SEO 友好（搜尋引擎可以索引篩選結果）

#### Server Component 讀法（推薦）

```tsx
// app/(blog)/blog/page.tsx
// 這是 Server Component，不需要 useState

interface Props {
  searchParams: Promise<{ q?: string; tag?: string; page?: string }>
  //                      ↑ 都是可選的，不一定有值
}

export default async function BlogPage({ searchParams }: Props) {
  const { q = '', tag, page = '1' } = await searchParams
  //           ↑ 沒傳就預設空字串

  // 直接用這些值查資料庫，不需要 useState！
  const posts = await prisma.post.findMany({
    where: {
      published: true,
      ...(q && {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { content: { contains: q, mode: 'insensitive' } },
        ]
      }),
      ...(tag && { tags: { some: { name: tag } } }),
    },
    skip: (parseInt(page) - 1) * 10,
    take: 10,
  })

  return (
    <div>
      <SearchBar defaultValue={q} />
      {posts.map(post => <PostCard key={post.id} post={post} />)}
    </div>
  )
}
```

#### Client Component 讀法（SearchBar 用這個）

```tsx
'use client'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export default function SearchBar() {
  const router = useRouter()
  const pathname = usePathname()          // 目前路徑：/blog
  const searchParams = useSearchParams()  // 目前的 query string

  const handleSearch = (term: string) => {
    // 複製現有的 query string（保留 tag 等其他參數）
    const params = new URLSearchParams(searchParams.toString())

    if (term) {
      params.set('q', term)   // 有值就設定
    } else {
      params.delete('q')      // 空字串就刪掉
    }
    params.delete('page')     // 搜尋時重置頁碼

    // 更新 URL，觸發 Server Component 重新抓資料
    router.push(`${pathname}?${params.toString()}`)
    // 結果：/blog?q=nextjs（保留了 tag 參數）
  }

  return <input onChange={e => handleSearch(e.target.value)} />
}
```

#### 為什麼要用 Suspense 包 SearchBar？

```tsx
// app/(blog)/blog/page.tsx（Server Component）
import { Suspense } from 'react'

export default async function BlogPage() {
  return (
    <div>
      {/* SearchBar 用了 useSearchParams()，需要 Suspense */}
      <Suspense fallback={<div className="h-12 bg-gray-100 rounded-xl animate-pulse" />}>
        <SearchBar />
      </Suspense>
    </div>
  )
}
```

原因：`useSearchParams()` 在 SSR 階段（伺服器端）還不知道瀏覽器的 URL，會造成 hydration 錯誤。用 `Suspense` 包起來，告訴 Next.js「這塊等到瀏覽器端再渲染」。

---

#### Suspense 完整解析

**背景：React 的渲染問題**

想像一個頁面有三個區塊，其中一個需要等資料：

```
┌─────────────────┐
│   標題（快）     │  ← 立刻就能顯示
├─────────────────┤
│   文章列表（慢） │  ← 要等資料庫回應（可能 2 秒）
├─────────────────┤
│   側欄（快）     │  ← 立刻就能顯示
└─────────────────┘
```

- **沒有 Suspense：** 整個頁面都卡住，等最慢的那個完成，才一起顯示。
- **有 Suspense：** 快的部分先顯示，慢的地方先給 `fallback`（骨架屏），等資料到了再換上真實內容。

```tsx
<Suspense fallback={<骨架屏 />}>
  <慢元件 />   {/* 等待資料時顯示 fallback，資料好了換成真實內容 */}
</Suspense>
```

**問題的根源：SSR 與瀏覽器的資訊不對稱**

```
伺服器渲染 HTML 時：
  → 伺服器不知道用戶瀏覽器的 URL 是什麼
  → useSearchParams() 在伺服器端回傳空值

瀏覽器收到 HTML 後（Hydration）：
  → 瀏覽器知道 URL，useSearchParams() 回傳真實值
  → 但這和伺服器給的 HTML 不一樣 → Hydration Mismatch → 崩潰！
```

加上 `Suspense` 等於告訴 Next.js：「這個元件你不用在伺服器渲染，先給 fallback，等瀏覽器接手後再渲染。」這樣就不存在伺服器 vs 瀏覽器資訊不一致的問題了。

**Suspense 的三種常見使用情境**

情境 1：包住有 `useSearchParams()` 的 Client Component（今天的案例）

```tsx
<Suspense fallback={<SearchBarSkeleton />}>
  <SearchBar />
</Suspense>
```

情境 2：包住需要等待資料的 Server Component（最常見）

```tsx
// 頁面框架先顯示，文章列表等資料好了再換上
export default function BlogPage() {
  return (
    <div>
      <h1>所有文章</h1>
      <Suspense fallback={<PostListSkeleton />}>
        <PostList />   {/* 這個元件內部 await fetch，需要等待 */}
      </Suspense>
    </div>
  )
}
```

情境 3：多個區塊各自獨立載入，不互相等待

```tsx
export default function DashboardPage() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <Suspense fallback={<Skeleton />}>
        <UserStats />      {/* 這個先好先顯示 */}
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <RecentPosts />    {/* 不用等 UserStats，各自獨立 */}
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <ActivityLog />    {/* 同上 */}
      </Suspense>
    </div>
  )
}
```

沒有 Suspense 的話，這三個區塊會等最慢的那個，一起顯示。

#### 整體資料流

```
使用者在搜尋框輸入 "nextjs"
        ↓
SearchBar（Client）呼叫 router.push('/blog?q=nextjs')
        ↓
URL 更新 → Next.js 重新執行 Server Component
        ↓
BlogPage（Server）讀取 searchParams.q = "nextjs"
        ↓
用 "nextjs" 查資料庫，回傳符合的文章
        ↓
頁面更新（只有文章列表部分，不是整頁重整）
```

#### Day 2 寫法 vs Day 3 新版本對比

| | Day 2 寫法 | Day 3 寫法 |
|---|---|---|
| Component 類型 | Client（`"use client"`） | Server Component |
| 狀態管理 | `useState` | URL searchParams |
| 搜尋觸發 | `onChange` 改 state | `onChange` 改 URL |
| 可分享連結 | 否（state 不在 URL） | 是 |
| SEO | 較差 | 較好 |
| JS bundle | 較大 | 較小 |

**用情境理解差異：你在 `/blog` 搜尋了「nextjs」，把網址複製給朋友。**

Day 2（useState）的 URL 永遠是：
```
/blog         ← 不管你搜什麼，URL 都不變
```
朋友收到後看到的是全部文章，不是你搜尋的結果。按「上一頁」，搜尋框清空，無法回到剛才的狀態。搜尋狀態只活在這個 Tab 的記憶體，關掉就消失。

Day 3（URL SearchParams）的 URL 會變成：
```
/blog?q=nextjs   ← URL 跟著搜尋內容變化
```
朋友收到後看到一樣的搜尋結果。按「上一頁」回到 `/blog`，頁面正確回到未搜尋狀態。搜尋狀態活在 URL，複製貼上就能重現一模一樣的頁面。

**程式碼結構對比：**

```tsx
// Day 2：整頁是 Client Component，狀態存 state
'use client'
export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const filtered = useMemo(() => posts.filter(p => p.title.includes(searchTerm)), [searchTerm])
  return <input onChange={e => setSearchTerm(e.target.value)} />
}

// Day 3：BlogPage 是 Server Component，狀態存 URL
// SearchBar（Client）只負責更新 URL
export default async function BlogPage({ searchParams }) {
  const { q = '' } = await searchParams   // 直接從 URL 讀，不需要 useState
  const filtered = posts.filter(p => p.title.includes(q))
  return (
    <Suspense fallback={<Skeleton />}>
      <SearchBar defaultValue={q} />     {/* 只有這個是 Client */}
    </Suspense>
  )
}
```

> Day 2 的寫法沒有錯，適合不需要分享連結的互動場景。Day 3 是更貼近 Next.js 設計理念的做法，適合搜尋、篩選、分頁等需要保留狀態的功能。

### 4. useRouter vs Link vs redirect

```tsx
// Link：宣告式導航（在 JSX 中使用）
import Link from 'next/link'
<Link href="/blog">文章列表</Link>
<Link href={`/blog/${post.slug}`}>閱讀更多</Link>
// 帶 query string：
<Link href={{ pathname: '/blog', query: { tag: 'nextjs' } }}>Next.js 文章</Link>

// useRouter：命令式導航（在事件處理函式中使用）
'use client'
import { useRouter } from 'next/navigation'
const router = useRouter()
router.push('/dashboard')     // 導航到新頁面（有瀏覽器歷史）
router.replace('/login')      // 取代當前頁面（無歷史）
router.back()                 // 上一頁
router.refresh()              // 重新整理 Server Component 資料

// redirect：在 Server Component 或 API Route 中使用
import { redirect } from 'next/navigation'
if (!session) redirect('/login')
```

#### 三者差異與使用情境

**核心判斷邏輯：**

```
導航發生在 JSX 裡？          → Link
導航發生在事件 / 邏輯裡？     → useRouter（只能在 Client Component）
導航發生在伺服器邏輯裡？      → redirect（只能在 Server Component / API Route）
```

---

**Link — 宣告式導航，寫在 JSX 中**

最常用的方式。只要是「點了這個東西就去某個頁面」，都用 Link。

```tsx
// ✅ 適合：導覽列、文章標題、按鈕連結
<Link href="/blog">文章列表</Link>
<Link href={`/blog/${post.slug}`}>閱讀更多</Link>

// 帶 query string（篩選、分頁）
<Link href={{ pathname: '/blog', query: { tag: 'nextjs' } }}>
  Next.js 文章
</Link>

// prefetch 行為：滑鼠 hover 時就預先載入目標頁面
// → 點下去幾乎是瞬間完成，這是 Link 最大的優勢
// 如果不想要 prefetch（例如很少用到的頁面）：
<Link href="/about" prefetch={false}>關於</Link>
```

> 原生 `<a href="...">` 會讓整個頁面重新載入（像傳統網站），Link 是 SPA 導航，只更新有變化的部分。

---

**useRouter — 命令式導航，用在事件處理邏輯中**

當導航需要「先做某件事，再跳轉」時使用。只能在 Client Component。

```tsx
'use client'
import { useRouter } from 'next/navigation'

function LoginForm() {
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const result = await login(formData)   // 先打 API

    if (result.success) {
      router.push('/dashboard')    // 成功才跳轉
    } else {
      setError('帳號或密碼錯誤')   // 失敗就顯示錯誤，不跳轉
    }
  }
}
```

`push` vs `replace` 的差異：

```
router.push('/dashboard')
  → 瀏覽器歷史：/login → /dashboard
  → 使用者可以按上一頁回到 /login

router.replace('/dashboard')
  → 瀏覽器歷史：/dashboard（/login 被取代掉了）
  → 使用者按上一頁，不會回到 /login
  → 適合：登入成功後，不希望使用者按上一頁回到登入頁
```

```tsx
router.push('/dashboard')   // 登入成功後導向儀表板
router.replace('/login')    // 登出後導向登入頁（不留歷史）
router.back()               // 「返回」按鈕
router.refresh()            // 表單送出後刷新 Server Component 資料
                            // （不重整整頁，只重新執行 Server Component）
```

---

**redirect — 在伺服器端強制導向**

在伺服器執行時（Server Component、API Route、Server Action）使用。最常見用途是「沒登入就踢回登入頁」。

```tsx
// app/dashboard/page.tsx（Server Component）
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    redirect('/login')   // 在伺服器端直接導向，瀏覽器不會看到 dashboard 的任何內容
  }

  return <div>歡迎，{session.user.name}</div>
}
```

`redirect` 會立即終止函式執行，後面的程式碼不會跑到，效果類似 `throw`。

---

**一句話記憶法：**

| | 一句話 | 執行環境 |
|---|---|---|
| `Link` | 「點這裡去那裡」— 寫在 JSX，最常用 | Client + Server 皆可 |
| `useRouter` | 「做完這件事再去那裡」— 需要先跑非同步邏輯 | Client Component 限定 |
| `redirect` | 「你不能來這裡，去那裡」— 權限保護 | Server Component 限定 |

---

**常見誤用：**

```tsx
// ❌ 在 Server Component 用 useRouter（Server Component 不能用 hooks）
export default async function Page() {
  const router = useRouter()  // 錯誤！
}

// ❌ 在 Client Component 用 redirect
'use client'
import { redirect } from 'next/navigation'
function Page() {
  redirect('/login')  // 錯誤！Client Component 請改用 router.replace('/login')
}

// ❌ 用 Link 做「送出表單後導向」（無法等待非同步邏輯）
<Link href="/dashboard" onClick={submitForm}>送出</Link>  // submitForm 是 async，Link 不會等它完成

// ✅ 改用 button + useRouter
<button onClick={async () => {
  await submitForm()
  router.push('/dashboard')
}}>送出</button>
```

### 5. 路由群組與特殊 Layout

#### 先理解問題：Layout 的繼承機制

Next.js 的 layout 是**層層套疊**的。每個資料夾的 `layout.tsx` 會包住該資料夾內所有頁面：

```
app/
├── layout.tsx          ← 全站 layout（Navbar + Footer，所有頁面都套用）
├── page.tsx            ← 首頁，套用全站 layout
├── blog/
│   ├── layout.tsx      ← blog layout（只有 /blog 底下的頁面套用）
│   └── page.tsx        ← /blog 頁面，套用 blog layout + 全站 layout
└── login/
    └── page.tsx        ← /login 頁面，也套用全站 layout（有 Navbar）
```

**問題來了：** 登入頁通常不需要 Navbar 和 Footer，但它在 `app/` 下，會自動繼承全站 layout。如果要讓登入頁用不同的外框，直接建資料夾的話，URL 就會變成 `/auth/login`，不是我們要的 `/login`。

---

#### 路由群組（Route Groups）

路由群組用括號命名資料夾：`(auth)`、`(blog)`。**括號內的名稱不會出現在 URL 中**，只是用來在程式碼裡做分組。

```
app/
├── layout.tsx                    ← 全站 layout
├── (auth)/
│   ├── layout.tsx                ← auth 專屬 layout（只有登入相關頁面套用）
│   ├── login/
│   │   └── page.tsx              ← URL：/login（不含 auth）
│   └── register/
│       └── page.tsx              ← URL：/register（不含 auth）
├── (blog)/
│   └── blog/
│       └── page.tsx              ← URL：/blog
└── (dashboard)/
    └── dashboard/
        └── page.tsx              ← URL：/dashboard
```

URL 完全不受資料夾分組影響，但每個群組可以有自己的 `layout.tsx`。

---

#### 用途 1：不同頁面套用不同的視覺外框

這個部落格有三種截然不同的頁面外觀：

```
一般頁面（/blog、/about）
  → 有 Navbar + Footer，內容置中，最大寬度 4xl

登入 / 註冊頁（/login、/register）
  → 沒有 Navbar，背景是漸層色，內容垂直置中（像彈窗卡片）

儀表板（/dashboard）
  → 有側欄選單，全寬版面，無 Footer
```

用路由群組就能讓每種頁面套用自己的 layout，而不互相干擾：

```tsx
// app/(auth)/layout.tsx
// 只有 /login, /register 套用這個 layout（沒有 Navbar）
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}

// app/(dashboard)/layout.tsx
// 只有 /dashboard 套用這個 layout（有側欄）
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-6">
        {/* 側欄選單 */}
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}
```

---

#### 用途 2：整理程式碼結構，不影響 URL

即使不需要特殊 layout，路由群組也能讓 `app/` 資料夾更有組織：

```
❌ 沒有分組（所有頁面全部丟在 app/ 下，一眼看不出關係）
app/
├── login/
├── register/
├── blog/
├── dashboard/
├── settings/
├── profile/
└── ...

✅ 用路由群組分類（結構一目了然）
app/
├── (auth)/          ← 會員相關
│   ├── login/
│   └── register/
├── (blog)/          ← 部落格相關
│   ├── blog/
│   └── blog/[slug]/
└── (app)/           ← 需要登入才能用的功能
    ├── dashboard/
    ├── settings/
    └── profile/
```

---

#### Layout 的套疊順序（重要）

以 `/login` 為例，實際渲染結果是這樣：

```
app/layout.tsx（全站：<html><body>）
  └── app/(auth)/layout.tsx（auth：漸層背景 + 置中卡片）
        └── app/(auth)/login/page.tsx（登入表單內容）
```

但**全站 layout 裡有 Navbar**，這樣登入頁不就也有 Navbar 了嗎？

解法：把全站 layout 的 Navbar 也移到一個群組裡：

```tsx
app/
├── layout.tsx               ← 只放 <html><body>，不放 Navbar
├── (main)/
│   ├── layout.tsx           ← 這裡放 Navbar + Footer
│   ├── page.tsx             ← 首頁
│   ├── blog/
│   └── about/
└── (auth)/
    ├── layout.tsx           ← 漸層背景，無 Navbar
    ├── login/
    └── register/
```

這樣 `(main)` 群組的頁面有 Navbar，`(auth)` 群組的頁面沒有 Navbar，兩者互不干擾。

---

#### 一句話記憶

> **路由群組 = 只影響程式碼結構，不影響 URL。** 括號裡的名稱對使用者完全不可見，是給開發者用來整理檔案和隔離 layout 的工具。

## 🛠️ 手把手實作

### Step 1：建立路由群組

```bash
mkdir -p "app/(auth)" "app/(blog)" "app/(dashboard)"
mv app/login "app/(auth)/login"
mv app/register "app/(auth)/register"
mv app/blog "app/(blog)/blog"
mv app/dashboard "app/(dashboard)/dashboard"
```

### Step 2：Auth Layout

建立 `app/(auth)/layout.tsx`：
```tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
```

### Step 3：完整文章列表頁（含搜尋）

建立 `components/blog/SearchBar.tsx`（Client Component）：
```tsx
'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'

export default function SearchBar({ defaultValue = '' }: { defaultValue?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleSearch = useCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (term) {
      params.set('q', term)
    } else {
      params.delete('q')
    }
    params.delete('page')  // 搜尋時重置頁碼
    router.push(`${pathname}?${params.toString()}`)
  }, [pathname, router, searchParams])

  return (
    <div className="relative mb-8">
      <input
        defaultValue={defaultValue}
        onChange={e => handleSearch(e.target.value)}
        placeholder="搜尋文章標題或內容..."
        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <svg
        className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  )
}
```

更新 `app/(blog)/blog/page.tsx`：
```tsx
import { Suspense } from 'react'
import PostCard from '@/components/blog/PostCard'
import SearchBar from '@/components/blog/SearchBar'

// 暫時使用假資料（Day 6 換成 Prisma）
const mockPosts = [
  {
    id: '1', title: 'Next.js App Router 完全指南', slug: 'nextjs-app-router',
    excerpt: '深入探討 Next.js 14 的 App Router，包含 Server Components、Streaming 等新特性...',
    content: '', published: true,
    createdAt: new Date('2026-04-01'), updatedAt: new Date('2026-04-01'),
    author: { id: '1', name: 'Dave', image: null },
    tags: [{ id: '1', name: 'Next.js' }, { id: '2', name: '前端' }],
    _count: { comments: 5 },
  },
  {
    id: '2', title: 'TypeScript 實用技巧大全', slug: 'typescript-tips',
    excerpt: '整理了 15 個在實際專案中最常用的 TypeScript 技巧，從型別推斷到泛型應用...',
    content: '', published: true,
    createdAt: new Date('2026-04-03'), updatedAt: new Date('2026-04-03'),
    author: { id: '1', name: 'Dave', image: null },
    tags: [{ id: '3', name: 'TypeScript' }, { id: '2', name: '前端' }],
    _count: { comments: 3 },
  },
]

interface Props {
  searchParams: Promise<{ q?: string; tag?: string }>
}

export default async function BlogPage({ searchParams }: Props) {
  const { q = '', tag } = await searchParams

  // 本地篩選（Day 6 後換成資料庫查詢）
  const filtered = mockPosts.filter(post => {
    const matchesQuery = !q ||
      post.title.toLowerCase().includes(q.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(q.toLowerCase())
    const matchesTag = !tag || post.tags.some(t => t.name === tag)
    return matchesQuery && matchesTag
  })

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">所有文章</h1>
        <p className="text-gray-500">共 {filtered.length} 篇文章</p>
      </div>

      {/* SearchBar 是 Client Component，需要包在 Suspense 裡 */}
      <Suspense fallback={<div className="h-12 bg-gray-100 rounded-xl animate-pulse mb-8" />}>
        <SearchBar defaultValue={q} />
      </Suspense>

      {filtered.length > 0 ? (
        <div className="grid gap-6">
          {filtered.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-gray-500">找不到符合「{q}」的文章</p>
        </div>
      )}
    </div>
  )
}
```

### Step 4：完整的 Loading 和 Error 頁面

建立 `app/(blog)/blog/loading.tsx`：
```tsx
export default function BlogLoading() {
  return (
    <div>
      <div className="mb-10">
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
      </div>
      <div className="h-12 bg-gray-100 rounded-xl animate-pulse mb-8" />
      <div className="grid gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-2xl border p-6 space-y-3">
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-blue-100 rounded-full animate-pulse" />
            </div>
            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}
```

建立 `app/(blog)/blog/error.tsx`：
```tsx
'use client'

export default function BlogError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="text-center py-20">
      <p className="text-4xl mb-4">😵</p>
      <h2 className="text-xl font-bold text-gray-800 mb-2">頁面發生錯誤</h2>
      <p className="text-gray-500 mb-6 text-sm">{error.message}</p>
      <button
        onClick={reset}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        重試
      </button>
    </div>
  )
}
```

## 🏋️ 練習挑戰

1. **[基礎]** 為文章列表加入標籤篩選按鈕列
2. **[進階]** 實作分頁元件 `components/Pagination.tsx`，支援 URL `?page=N`
3. **[挑戰]** 實作 `app/(blog)/blog/[slug]/page.tsx`，包含 `generateMetadata` 和 `generateStaticParams`

## 📝 每日 Git Commit 範本

```bash
git add .
git commit -m "feat(day3): 路由系統與頁面完整實作

- 建立路由群組 (auth)/(blog)/(dashboard)
- 文章列表頁實作搜尋功能（URL searchParams）
- 建立 SearchBar Client Component
- 完整的 loading.tsx 骨架屏動畫
- error.tsx 錯誤邊界頁面"
```
