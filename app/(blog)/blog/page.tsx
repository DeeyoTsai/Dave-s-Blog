import { Suspense } from "react";
import PostCard from "@/components/blog/PostCard";
import SearchBar from "@/components/blog/SearchBar";
import TagFilter from "@/components/blog/TagFilter";


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
  searchParams: Promise<{q?: string; tag?: string}>
}

export default async function BlogPage({ searchParams }: Props) {
  const { q = '', tag } = await searchParams

  // 本地篩選(Day 6 後換成資料庫查詢)
  const filtered = mockPosts.filter(post => {
    const matchesQuery = !q || 
      post.title.toLowerCase().includes(q.toLocaleLowerCase()) ||
      post.excerpt.toLowerCase().includes(q.toLocaleLowerCase())
    
    const matchesTag = !tag || post.tags.some(t => t.name === tag)
    
    return matchesQuery && matchesTag
  })

  // const allTags = () => {
  //   const tagSet = new Set<string>();
  //   mockPosts.map(e => {
  //     const tagObjects = [...e.tags]
  //     tagObjects.map(obj=> tagSet.add(obj.name))
  //   })
  //   return [...tagSet]
  // }
  const allTags = [...new Set<string>(
    mockPosts.flatMap(post => post.tags.map(t => t.name))
  )]
  // Day 3：練習2...
  // const POSTS_PER_PAGE = 2 // 每頁幾篇（測試用，資料少先設 2）
  // // 1. 從 searchParams 取出 page，預設第 1 頁                                  
  // const page = ...                                                              
                                                                                
  // // 2. 計算總頁數                                                              
  // const totalPages = ...
                                                                                
  // // 3. 切出當頁資料（從 filtered 切）
  // const paginatedPosts = filtered.slice()

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">所有文章</h1>
        <p className="text-gray-500">共 {filtered.length} 篇文章</p>
      </div>
      
      {/* SearchBar是Client Component,需要包在Suspense裡 */}
      <Suspense fallback={<div className="h-12 bg-gray-100 rounded-xl animate-pulse mb-8"/>}>
        <SearchBar defaultValue={q}/>
      </Suspense>

      <Suspense fallback={<div className="h-8 bg-gray-100 rounded animate-pulse mb-4"/>}>
        <TagFilter tags={allTags} currentTag={tag}/>
      </Suspense>
      
      
      {filtered.length > 0 ? (
        <div className="grid gap-6">
          {filtered.map(post => (
            <PostCard key={post.id} post={post}/>
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
