# 🚀 Next.js 深度學習計劃（Day 8–10 + GitHub 工作流程）

---

# ═══════════════════════════════════
# Day 8 ｜ 部落格 CRUD + Markdown 編輯器
# ═══════════════════════════════════

## 🎯 今日目標
- 完整的文章新增/編輯/刪除/發布流程
- 整合 Markdown 編輯器（含即時預覽）
- 圖片上傳功能
- 文章管理 Dashboard

## 📚 核心知識點

### 1. Markdown 渲染生態

```
react-markdown      → 基礎 Markdown 渲染（轉成 React 元件）
remark-gfm          → GitHub Flavored Markdown（表格、刪除線等）
rehype-highlight    → 程式碼語法高亮
rehype-sanitize     → 防止 XSS 攻擊（清理危險 HTML）
@tailwindcss/typography → 美化 prose 樣式
```

### 2. 路由平行與 Intercepting（進階）

```
app/
├── @modal/              # Parallel Route（modal 浮層）
│   └── (.)blog/[slug]/  # Intercepting Route（攔截路由）
│       └── page.tsx     # 在列表頁直接顯示文章浮層
└── blog/
    ├── page.tsx         # 直接訪問時正常顯示
    └── [slug]/
        └── page.tsx
```

### 3. 樂觀更新（Optimistic Update）

```tsx
'use client'
import { useOptimistic } from 'react'

function LikeButton({ postId, initialLikes, userLiked }: Props) {
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    { count: initialLikes, liked: userLiked },
    (state, newLiked: boolean) => ({
      count: newLiked ? state.count + 1 : state.count - 1,
      liked: newLiked,
    })
  )

  const handleLike = async () => {
    // 立即更新 UI（樂觀），不等待伺服器回應
    addOptimisticLike(!optimisticLikes.liked)
    // 背景同步到伺服器
    await toggleLikeAction(postId)
  }

  return (
    <button onClick={handleLike}>
      {optimisticLikes.liked ? '❤️' : '🤍'} {optimisticLikes.count}
    </button>
  )
}
```

## 🛠️ 手把手實作

### Step 1：安裝 Markdown 套件

```bash
pnpm add react-markdown remark-gfm rehype-highlight rehype-sanitize
pnpm add @tailwindcss/typography
```

### Step 2：建立 Markdown 預覽元件

```tsx
// components/blog/MarkdownRenderer.tsx
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeSanitize from 'rehype-sanitize'
import 'highlight.js/styles/github-dark.css'

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none
      prose-headings:font-bold
      prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
      prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded
      prose-pre:bg-gray-900 prose-pre:rounded-xl">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeSanitize]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
```

### Step 3：建立文章編輯器

```tsx
// components/blog/PostEditor.tsx
'use client'

import { useState, useTransition } from 'react'
import dynamic from 'next/dynamic'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

// 動態載入預覽元件（避免 SSR 問題）
const MarkdownRenderer = dynamic(() => import('./MarkdownRenderer'), { ssr: false })

interface PostEditorProps {
  initialData?: {
    title: string
    excerpt: string
    content: string
    tags: string[]
  }
  onSubmit: (data: FormData, published: boolean) => Promise<void>
}

export default function PostEditor({ initialData, onSubmit }: PostEditorProps) {
  const [isPending, startTransition] = useTransition()
  const [form, setForm] = useState({
    title: initialData?.title ?? '',
    excerpt: initialData?.excerpt ?? '',
    content: initialData?.content ?? '',
    tagInput: '',
    tags: initialData?.tags ?? [] as string[],
  })
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write')

  const addTag = () => {
    const tag = form.tagInput.trim()
    if (tag && !form.tags.includes(tag) && form.tags.length < 5) {
      setForm(p => ({ ...p, tags: [...p.tags, tag], tagInput: '' }))
    }
  }

  const handleSubmit = (published: boolean) => {
    startTransition(async () => {
      const formData = new FormData()
      formData.set('title', form.title)
      formData.set('excerpt', form.excerpt)
      formData.set('content', form.content)
      formData.set('tags', JSON.stringify(form.tags))
      await onSubmit(formData, published)
    })
  }

  return (
    <div className="space-y-6">
      {/* 標題 */}
      <input
        value={form.title}
        onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
        placeholder="文章標題..."
        className="w-full text-3xl font-bold bg-transparent border-b-2 border-gray-200 focus:border-blue-500 pb-2 focus:outline-none dark:text-white"
      />

      {/* 摘要 */}
      <input
        value={form.excerpt}
        onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))}
        placeholder="文章摘要（顯示在列表頁，建議 50-100 字）"
        className="w-full text-gray-600 bg-transparent border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* 標籤 */}
      <div>
        <div className="flex flex-wrap gap-2 mb-2">
          {form.tags.map(tag => (
            <span key={tag} className="flex items-center gap-1 bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
              {tag}
              <button
                onClick={() => setForm(p => ({ ...p, tags: p.tags.filter(t => t !== tag) }))}
                className="hover:text-red-500 ml-1"
              >×</button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={form.tagInput}
            onChange={e => setForm(p => ({ ...p, tagInput: e.target.value }))}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
            placeholder="輸入標籤後按 Enter（最多 5 個）"
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button variant="secondary" size="sm" onClick={addTag}>新增</Button>
        </div>
      </div>

      {/* 編輯器 / 預覽 Tab */}
      <div className="border border-gray-200 rounded-2xl overflow-hidden">
        <div className="flex border-b border-gray-200 bg-gray-50">
          {(['write', 'preview'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'write' ? '✏️ 編輯' : '👁️ 預覽'}
            </button>
          ))}
          <div className="ml-auto px-4 py-2 text-xs text-gray-400 self-center">
            支援 Markdown 語法
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'write' ? (
            <textarea
              value={form.content}
              onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
              placeholder={`# 文章標題\n\n開始用 Markdown 寫文章...\n\n## 小標題\n\n**粗體** *斜體* \`程式碼\`\n\n\`\`\`javascript\nconsole.log('Hello!')\n\`\`\``}
              rows={24}
              className="w-full font-mono text-sm bg-transparent focus:outline-none resize-none text-gray-800 dark:text-gray-200"
            />
          ) : (
            <div className="min-h-[400px]">
              {form.content ? (
                <MarkdownRenderer content={form.content} />
              ) : (
                <p className="text-gray-400 text-center py-20">還沒有內容可以預覽</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 操作按鈕 */}
      <div className="flex justify-between items-center pt-4 border-t">
        <p className="text-sm text-gray-400">
          {form.content.length} 字 · 約 {Math.ceil(form.content.length / 500)} 分鐘閱讀
        </p>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => handleSubmit(false)}
            loading={isPending}
          >
            💾 儲存草稿
          </Button>
          <Button
            onClick={() => handleSubmit(true)}
            loading={isPending}
          >
            🚀 發布文章
          </Button>
        </div>
      </div>
    </div>
  )
}
```

### Step 4：文章管理 Dashboard

```tsx
// app/(dashboard)/dashboard/page.tsx
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const [posts, totalComments] = await prisma.$transaction([
    prisma.post.findMany({
      where: { authorId: session.user.id },
      include: { _count: { select: { comments: true, likes: true } } },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.comment.count({
      where: { post: { authorId: session.user.id } },
    }),
  ])

  const publishedCount = posts.filter(p => p.published).length
  const draftCount = posts.length - publishedCount

  return (
    <div className="space-y-8">
      {/* 頂部統計 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: '已發布', value: publishedCount, icon: '✅', color: 'text-green-600' },
          { label: '草稿', value: draftCount, icon: '📝', color: 'text-yellow-600' },
          { label: '總留言', value: totalComments, icon: '💬', color: 'text-blue-600' },
          { label: '總文章', value: posts.length, icon: '📚', color: 'text-purple-600' },
        ].map(stat => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* 文章列表 */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">我的文章</h2>
          <Link href="/dashboard/new-post">
            <Button size="sm">+ 寫新文章</Button>
          </Link>
        </div>

        <div className="space-y-3">
          {posts.map(post => (
            <div key={post.id}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 flex items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    post.published
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {post.published ? '已發布' : '草稿'}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString('zh-TW')}
                  </span>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white truncate">{post.title}</h3>
                <div className="text-xs text-gray-400 mt-1">
                  💬 {post._count.comments} 留言 · ❤️ {post._count.likes} 讚
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {post.published && (
                  <Link href={`/blog/${post.slug}`} target="_blank"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    查看
                  </Link>
                )}
                <Link href={`/dashboard/edit/${post.id}`}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  編輯
                </Link>
                <DeletePostButton postId={post.id} />
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">✍️</p>
              <p>還沒有文章，開始寫第一篇吧！</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

## 📝 每日 Git Commit 範本

```bash
git add .
git commit -m "feat(day8): 部落格 CRUD + Markdown 編輯器

- PostEditor 元件（含即時預覽）
- MarkdownRenderer（react-markdown + 語法高亮）
- 文章管理 Dashboard（統計卡片 + 文章列表）
- 樂觀更新（按讚功能）
- 標籤管理（新增/刪除）"
```

---

# ═══════════════════════════════════
# Day 9 ｜ 留言系統 + 個人資料 + 進階功能
# ═══════════════════════════════════

## 🎯 今日目標
- 完整留言 CRUD（新增、刪除、巢狀回覆）
- 個人資料頁面（編輯頭像、自我介紹）
- 按讚功能（樂觀更新）
- 文章瀏覽數統計

## 🛠️ 手把手實作

### Step 1：留言 Server Action

```typescript
// lib/actions/comment.ts
'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const CommentSchema = z.object({
  content: z.string().min(1, '留言不能為空').max(1000, '留言最多 1000 字'),
  postId: z.string(),
  parentId: z.string().optional(),
})

export async function createCommentAction(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('請先登入')

  const parsed = CommentSchema.safeParse({
    content: formData.get('content'),
    postId: formData.get('postId'),
    parentId: formData.get('parentId') ?? undefined,
  })
  if (!parsed.success) throw new Error(parsed.error.issues[0].message)

  await prisma.comment.create({
    data: {
      content: parsed.data.content,
      postId: parsed.data.postId,
      authorId: session.user.id,
      parentId: parsed.data.parentId,
    },
  })

  revalidatePath(`/blog/[slug]`, 'page')
}

export async function deleteCommentAction(commentId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('請先登入')

  const comment = await prisma.comment.findUnique({ where: { id: commentId } })
  if (!comment) throw new Error('留言不存在')

  // 只能刪除自己的留言（或管理員）
  if (comment.authorId !== session.user.id && session.user.role !== 'ADMIN') {
    throw new Error('沒有權限刪除此留言')
  }

  await prisma.comment.delete({ where: { id: commentId } })
  revalidatePath(`/blog/[slug]`, 'page')
}
```

### Step 2：留言元件

```tsx
// components/blog/CommentSection.tsx
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { createCommentAction, deleteCommentAction } from '@/lib/actions/comment'
import { formatDistanceToNow } from 'date-fns'
import { zhTW } from 'date-fns/locale'

// Server Component — 直接從資料庫取留言
async function CommentList({ postId }: { postId: string }) {
  const comments = await prisma.comment.findMany({
    where: { postId, parentId: null },  // 只取頂層留言
    include: {
      author: { select: { id: true, name: true, image: true } },
      replies: {
        include: { author: { select: { id: true, name: true, image: true } } },
        orderBy: { createdAt: 'asc' },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  const session = await auth()

  return (
    <div className="space-y-6">
      {comments.map(comment => (
        <div key={comment.id} className="space-y-4">
          {/* 主留言 */}
          <CommentItem
            comment={comment}
            currentUserId={session?.user?.id}
            currentUserRole={session?.user?.role}
          />
          {/* 回覆 */}
          {comment.replies.length > 0 && (
            <div className="ml-10 pl-4 border-l-2 border-gray-100 space-y-4">
              {comment.replies.map(reply => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  currentUserId={session?.user?.id}
                  currentUserRole={session?.user?.role}
                />
              ))}
            </div>
          )}
        </div>
      ))}
      {comments.length === 0 && (
        <p className="text-center text-gray-400 py-8">還沒有留言，來當第一個留言的人！</p>
      )}
    </div>
  )
}

function CommentItem({ comment, currentUserId, currentUserRole }: any) {
  const canDelete = comment.authorId === currentUserId || currentUserRole === 'ADMIN'
  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), {
    addSuffix: true, locale: zhTW
  })

  return (
    <div className="flex gap-3">
      <div className="w-9 h-9 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-sm font-bold text-blue-600">
        {comment.author.name?.[0]?.toUpperCase() ?? '?'}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {comment.author.name ?? '匿名'}
          </span>
          <span className="text-xs text-gray-400">{timeAgo}</span>
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          {comment.content}
        </p>
        {canDelete && (
          <form action={deleteCommentAction.bind(null, comment.id)}>
            <button type="submit" className="text-xs text-red-400 hover:text-red-600 mt-1">
              刪除
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

// 留言表單
async function CommentForm({ postId }: { postId: string }) {
  const session = await auth()

  if (!session?.user) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center text-sm text-gray-500">
        <a href="/login" className="text-blue-600 hover:underline">登入</a> 後才能留言
      </div>
    )
  }

  return (
    <form action={createCommentAction} className="space-y-3">
      <input type="hidden" name="postId" value={postId} />
      <div className="flex gap-3">
        <div className="w-9 h-9 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-sm font-bold text-white">
          {session.user.name?.[0]?.toUpperCase()}
        </div>
        <textarea
          name="content"
          placeholder="寫下你的想法..."
          rows={3}
          required
          className="flex-1 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          送出留言
        </button>
      </div>
    </form>
  )
}

// 組合元件（這個放在文章頁面）
export default async function CommentSection({ postId }: { postId: string }) {
  const count = await prisma.comment.count({ where: { postId } })

  return (
    <section className="mt-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-8">
      <h3 className="text-xl font-bold mb-6">💬 留言 ({count})</h3>
      <CommentForm postId={postId} />
      <div className="mt-8">
        <CommentList postId={postId} />
      </div>
    </section>
  )
}
```

### Step 3：瀏覽數統計

```typescript
// lib/actions/post.ts（新增）
'use server'
import { prisma } from '@/lib/prisma'

export async function incrementViewCount(postId: string) {
  await prisma.post.update({
    where: { id: postId },
    data: { viewCount: { increment: 1 } },
  })
}
```

在文章頁面加入：
```tsx
// app/(blog)/blog/[slug]/page.tsx
import { incrementViewCount } from '@/lib/actions/post'

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  // 非同步增加瀏覽數（不阻塞頁面渲染）
  incrementViewCount(post.id)

  return (
    <article>
      {/* 文章頂部資訊 */}
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => <Badge key={tag.id} label={tag.name} />)}
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>✍️ {post.author.name}</span>
          <span>📅 {new Date(post.createdAt).toLocaleDateString('zh-TW')}</span>
          <span>👁️ {post.viewCount} 次瀏覽</span>
          <span>💬 {post._count.comments} 則留言</span>
        </div>
      </header>

      {/* 文章內容 */}
      <MarkdownRenderer content={post.content} />

      {/* 留言區 */}
      <Suspense fallback={<div className="h-40 bg-gray-50 rounded-2xl animate-pulse mt-12" />}>
        <CommentSection postId={post.id} />
      </Suspense>
    </article>
  )
}
```

## 📝 每日 Git Commit 範本

```bash
git add .
git commit -m "feat(day9): 留言系統與進階功能

- 留言 CRUD（新增、刪除、巢狀回覆）
- Server Action 版留言表單
- 巢狀留言 UI（含縮排設計）
- 瀏覽數自動統計
- date-fns 相對時間顯示"
```

---

# ═══════════════════════════════════
# Day 10 ｜ 部署 + 效能優化 + SEO + 監控
# ═══════════════════════════════════

## 🎯 今日目標
- 完整部署到 Vercel（含環境變數設定）
- 效能優化（圖片、字體、Bundle 分析）
- SEO 完善（Open Graph、Sitemap、robots.txt）
- 加入 Vercel Analytics 監控
- 最終清單檢查

## 📚 核心知識點

### 1. Next.js 效能優化清單

```tsx
// 1. next/image（自動優化圖片）
import Image from 'next/image'
<Image
  src="/avatar.jpg"
  alt="Dave"
  width={96} height={96}
  priority           // 首屏圖片加 priority（避免 LCP 問題）
  className="rounded-full"
/>

// 2. next/font（Google Fonts 零 Layout Shift）
import { Inter, JetBrains_Mono } from 'next/font/google'
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

// 3. dynamic import（Code Splitting）
import dynamic from 'next/dynamic'
const PostEditor = dynamic(() => import('@/components/blog/PostEditor'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-2xl" />,
  ssr: false,  // 編輯器不需要 SSR
})

// 4. 圖片域名白名單
// next.config.ts
module.exports = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
}
```

### 2. 完整 SEO 設定

```typescript
// app/sitemap.ts
import { prisma } from '@/lib/prisma'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  })

  const baseUrl = process.env.NEXTAUTH_URL ?? 'https://your-blog.vercel.app'

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...posts.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ]
}
```

```typescript
// app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXTAUTH_URL ?? 'https://your-blog.vercel.app'
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/dashboard/', '/api/'] },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
```

### 3. Open Graph（社群分享圖）

```typescript
// app/layout.tsx 全站 OG
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? 'https://your-blog.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    siteName: "Dave's Blog",
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@dave',
  },
}

// app/(blog)/blog/[slug]/page.tsx 文章 OG
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug((await params).slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt ?? '',
    openGraph: {
      title: post.title,
      description: post.excerpt ?? '',
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      authors: [post.author.name ?? 'Dave'],
    },
  }
}
```

## 🛠️ 手把手實作

### Step 1：推送到 GitHub

```bash
# 確認所有變更已 commit
git status

# 最終 commit
git add .
git commit -m "feat(day10): 部署準備完成

- SEO：sitemap.xml、robots.txt、Open Graph
- 效能：next/image、dynamic import、字體優化
- Vercel Analytics 整合
- 環境變數文件更新"

git push origin main
```

### Step 2：Vercel 部署

1. 前往 https://vercel.com → New Project → 選你的 GitHub repo
2. Framework Preset 選 **Next.js**（自動偵測）
3. 設定環境變數（**重要！**）：

```
DATABASE_URL          → Neon PostgreSQL 連接字串
NEXTAUTH_SECRET       → 執行 openssl rand -base64 32 產生
NEXTAUTH_URL          → https://你的專案名.vercel.app
```

4. 點擊 Deploy！約 2 分鐘完成 🎉

### Step 3：部署後執行資料庫遷移

```bash
# 安裝 Vercel CLI
npm i -g vercel

# 連結專案
vercel link

# 用 Vercel 的環境變數執行 migrate
vercel env pull .env.production.local
DATABASE_URL=$(cat .env.production.local | grep DATABASE_URL | cut -d= -f2) \
  pnpm prisma migrate deploy
```

### Step 4：Vercel Analytics

```bash
pnpm add @vercel/analytics @vercel/speed-insights
```

更新 `app/layout.tsx`：
```tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### Step 5：最終完整清單

```
基礎功能：
✅ 首頁（Hero、統計、最新文章、CTA）
✅ 文章列表（含搜尋、標籤篩選）
✅ 文章詳情（Markdown 渲染、瀏覽數）
✅ 關於頁面
✅ 404 頁面、Error 頁面

會員系統：
✅ 使用者註冊（Zod 驗證、bcrypt 加密）
✅ 使用者登入（NextAuth JWT）
✅ 路由保護（Middleware）
✅ 登出功能
✅ Session 在 Navbar 顯示

文章管理：
✅ 新增文章（Markdown 編輯器、即時預覽）
✅ 編輯文章
✅ 刪除文章
✅ 發布/取消發布
✅ 個人 Dashboard

留言系統：
✅ 新增留言（需登入）
✅ 巢狀回覆
✅ 刪除留言（自己的或管理員）
✅ 顯示相對時間

效能與 SEO：
✅ Sitemap.xml
✅ robots.txt
✅ Open Graph（社群分享）
✅ next/image 圖片優化
✅ 動態路由 generateMetadata
✅ Vercel Analytics

部署：
✅ 環境變數設定
✅ 資料庫遷移（prisma migrate deploy）
✅ 網站成功訪問
```

## 📝 每日 Git Commit 範本

```bash
git add .
git commit -m "feat(day10): 網站部署完成 🎉

- Vercel 雲端部署
- SEO：sitemap.xml / robots.txt / Open Graph
- Vercel Analytics + Speed Insights
- 效能優化：next/image、dynamic import
- 完整功能清單驗證通過"
```

---

# ═══════════════════════════════════
# 📋 每日 GitHub 工作流程指南
# ═══════════════════════════════════

## 固定工作流程（每天都做）

```bash
# ── 開始新的一天 ──────────────────────

# 1. 確認在正確的 branch（建議用 feature branch）
git checkout -b day-N-description  # 例如：git checkout -b day-1-setup

# 2. 查看今天要做什麼
cat "Next.js-深度學習計劃-Day1-3.md"  # 查看學習計劃

# ── 工作中 ───────────────────────────

# 3. 隨時存檔（不需要完美，先存）
git add .
git status  # 確認要提交的檔案

# 4. 每完成一個小功能就 commit
git commit -m "feat: 完成 Navbar 元件"

# ── 完成當天目標 ──────────────────────

# 5. 最終整理 commit（按照範本）
git add .
git commit -m "feat(dayN): 今天的學習主題

學習內容：
- 知識點 1
- 知識點 2

完成項目：
✅ 功能 1
✅ 功能 2

遇到問題：
- 問題描述及解決方法"

# 6. 推送到 GitHub
git push origin day-N-description

# 7. 在 GitHub 建立 Pull Request（記錄每天進度）
# → 標題：[Day N] 學習主題
# → 描述：今天學到的重點
# → 之後 merge 到 main
```

## Commit Message 格式（Conventional Commits）

```
格式：<type>(<scope>): <description>

type：
  feat      → 新功能
  fix       → 修 bug
  docs      → 文件
  style     → 樣式（不影響邏輯）
  refactor  → 重構
  test      → 測試
  chore     → 雜務（套件更新等）

範例：
  feat(day1): 環境建置完成
  feat(navbar): 加入暗色模式切換
  fix(auth): 修正登入後未 refresh 問題
  docs: 更新 README 安裝說明
  refactor(post): 將 PostCard 拆分為更小的元件
```

## GitHub Repository 建議結構

```
my-blog/
├── .github/
│   └── LEARNING_LOG.md      # 記錄每天學習進度（手動更新）
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── app/
├── components/
├── lib/
├── types/
├── public/
├── .env.local               # 不 commit（在 .gitignore）
├── .env.example             # commit（供他人參考，不含真實值）
└── README.md
```

建立 `.env.example`：
```env
# 複製此檔案為 .env.local 並填入真實值
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
```

---

# ═══════════════════════════════════
# 📓 Notion 學習日誌設定指南
# ═══════════════════════════════════

## Notion 資料庫設計

建立一個名為「🚀 Next.js 學習日誌」的資料庫，包含以下欄位：

| 欄位名稱 | 類型 | 說明 |
|---------|------|------|
| 標題 | Title | Day 1 - 環境建置 + Next.js 基礎 |
| 日期 | Date | 實際學習日期 |
| 天數 | Number | 1~10 |
| 狀態 | Select | 未開始 / 進行中 / 完成 |
| 自評分數 | Select | ⭐⭐⭐ / ⭐⭐⭐⭐ / ⭐⭐⭐⭐⭐ |
| GitHub Commit | URL | 當天的 commit 連結 |
| 學習時數 | Number | 今天花了幾小時 |
| 標籤 | Multi-select | 前端、後端、資料庫、部署 |

## 每日頁面範本（複製到每天的 Notion 頁面）

```markdown
# Day N ｜ 主題名稱

📅 日期：
⏱️ 學習時數：
🔗 GitHub：

---

## 🎯 今日完成目標

- [ ] 目標 1
- [ ] 目標 2
- [ ] 目標 3

---

## 📚 學到的核心概念

### 概念 1
（解釋用自己的話說一遍——能說出來才是真的理解）

### 概念 2

---

## 💻 今天寫的重要程式碼

\`\`\`tsx
// 貼上今天最有收穫的程式碼片段
\`\`\`

**為什麼這樣寫：**

---

## ⚠️ 踩過的坑

| 問題 | 原因 | 解決方法 |
|------|------|---------|
| | | |

---

## 💡 延伸想法 / 明天待辦

-
-

---

## 🌟 今日金句

（今天最有感觸的一句話或一個觀念）

---

自評：⭐⭐⭐⭐
心情：😊
```

## 使用 Claude 自動匯入

當你完成每天的學習後，告訴 Claude：

```
「幫我把今天（Day N）的學習摘要匯入 Notion，
 我今天完成了：[列出完成的項目]，
 學到的重點是：[重點 1、2、3]，
 遇到的問題：[問題]，
 GitHub commit：[URL]」
```

Claude 會自動在 Notion 建立今天的學習頁面！

---

# 🎓 10 天後你將擁有

```
技術能力：
  ✅ Next.js App Router 完整開發能力
  ✅ TypeScript + React 現代開發流程
  ✅ Prisma + PostgreSQL 資料庫設計
  ✅ NextAuth.js 認證系統實作
  ✅ Vercel 雲端部署

實際作品：
  ✅ 個人部落格網站（已上線！）
  ✅ 會員系統（註冊/登入/保護路由）
  ✅ 文章管理（CRUD + Markdown + 標籤）
  ✅ 留言系統（含巢狀回覆）
  ✅ GitHub 10 天版控歷史

學習紀錄：
  ✅ Notion 10 天學習日誌
  ✅ 完整的 Git Commit 歷史
  ✅ 每天的 PR 記錄

可延伸功能：
  → Google / GitHub OAuth 登入
  → 圖片上傳（Cloudinary / Uploadthing）
  → 全文搜尋（Algolia）
  → 電子報訂閱（Resend）
  → 更豐富的文字編輯器（Tiptap）
```

**加油！每天 commit，記錄你的成長！🚀**
