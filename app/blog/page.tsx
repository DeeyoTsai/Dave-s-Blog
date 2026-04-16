'use client'
import { useMemo, useState } from "react";
import PostCard from "@/components/blog/PostCard";

const MOCK_POSTS = [
    { id: '1', title: 'Next.js App Router 完全指南', slug:                
  'nextjs-app-router', excerpt: '深入了解 App Router 的運作原理', tags: [{
   id: 't1', name: 'Next.js' }], createdAt: new Date('2026-04-01'),       
  author: { id: 'u1', name: 'Dave', image: null }, _count: { comments: 3 }
   },             
    { id: '2', title: 'TypeScript 型別系統入門', slug: 'typescript-types',
   excerpt: '從 interface 到 utility types', tags: [{ id: 't2', name:     
  'TypeScript' }], createdAt: new Date('2026-04-05'), author: { id: 'u1',
  name: 'Dave', image: null }, _count: { comments: 1 } },                 
    { id: '3', title: 'React Hooks 深度解析', slug: 'react-hooks',
  excerpt: 'useState、useEffect、useMemo 完整說明', tags: [{ id: 't3',    
  name: 'React' }, { id: 't2', name: 'TypeScript' }], createdAt: new
  Date('2026-04-08'), author: { id: 'u1', name: 'Dave', image: null },    
  _count: { comments: 5 } },
    { id: '4', title: 'Tailwind CSS 實戰技巧', slug: 'tailwind-tips',
  excerpt: '讓你的 UI 開發速度快三倍', tags: [{ id: 't4', name: 'CSS' }], 
  createdAt: new Date('2026-04-10'), author: { id: 'u1', name: 'Dave',
  image: null }, _count: { comments: 2 } },                               
];

export default function BlogPage() {
  // return <h1 className="p-8 text-3xl font-bold">文章列表 (施工中) </h1>;
  const [selectedTag, setSelectedTag] = useState('');
  const filteredPosts = useMemo(()=>{
    return MOCK_POSTS.filter(post => selectedTag ? post.tags.some(tag => tag.name === selectedTag) : true);
  },[selectedTag]);

  return (
    <div>
      <h1>文章列表</h1>
      {/* 標籤篩選按鈕 */}
      <div className="flex gap-2 mb-6">
        {/* 「全部」按鈕 */}
        <button onClick={() => {
          console.log("點到全部了")
          setSelectedTag('')
        }}>全部</button>
        {MOCK_POSTS.flatMap(post => post.tags).filter((tag, index, self) => self.findIndex(t => t.name === tag.name) === index).map(tag=>(
          <button key={tag.id} onClick={() => setSelectedTag(tag.name)}>{tag.name}</button>
        ))}
        
      </div>
      {/* 文章列表 */}
      { filteredPosts.map(p => (<PostCard key={p.id} post={p}/>) )}
    </div>
  )
}
