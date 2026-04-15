import { useState } from "react";

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

const [selectedTag, setSelectedTag] = useState('');



export default function BlogPage() {
  return <h1 className="p-8 text-3xl font-bold">文章列表 (施工中) </h1>;
}
