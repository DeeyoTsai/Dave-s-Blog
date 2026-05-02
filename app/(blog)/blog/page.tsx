import { Suspense } from "react";
import PostCard from "@/components/blog/PostCard";
import SearchBar from "@/components/blog/SearchBar";
import TagFilter from "@/components/blog/TagFilter";
import Pagination from "@/components/ui/Pagination";
import { mockPosts } from "@/lib/mockData";

interface Props {
  searchParams: Promise<{ q?: string; tag?: string; page?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const { q = "", tag, page = "1" } = await searchParams;

  // 本地篩選(Day 6 後換成資料庫查詢)
  const filtered = mockPosts.filter((post) => {
    const matchesQuery =
      !q ||
      post.title.toLowerCase().includes(q.toLocaleLowerCase()) ||
      post.excerpt.toLowerCase().includes(q.toLocaleLowerCase());

    const matchesTag = !tag || post.tags.some((t) => t.name === tag);

    return matchesQuery && matchesTag;
  });

  // const allTags = () => {
  //   const tagSet = new Set<string>();
  //   mockPosts.map(e => {
  //     const tagObjects = [...e.tags]
  //     tagObjects.map(obj=> tagSet.add(obj.name))
  //   })
  //   return [...tagSet]
  // }
  const allTags = [
    ...new Set<string>(
      mockPosts.flatMap((post) => post.tags.map((t) => t.name)),
    ),
  ];
  // Day 3：練習2...
  const POSTS_PER_PAGE = 1; // 每頁幾篇（測試用，資料少先設 1）
  // // 1. 從 searchParams 取出 page，預設第 1 頁
  const currentPage = Number(page) || 1;
  // // 2. 計算總頁數
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  // // 3. 切出當頁資料（從 filtered 切）
  const paginatedPosts = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">所有文章</h1>
        <p className="text-gray-500">共 {filtered.length} 篇文章</p>
      </div>

      {/* SearchBar是Client Component,需要包在Suspense裡 */}
      <Suspense
        fallback={
          <div className="h-12 bg-gray-100 rounded-xl animate-pulse mb-8" />
        }
      >
        <SearchBar defaultValue={q} />
      </Suspense>

      <Suspense
        fallback={
          <div className="h-8 bg-gray-100 rounded animate-pulse mb-4" />
        }
      >
        <TagFilter tags={allTags} currentTag={tag} />
      </Suspense>

      {filtered.length > 0 ? (
        <div>
          <div className="grid gap-6">
            {paginatedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <Suspense fallback={<div className="h-10 bg-gray-100 rounded animate-pulse mt-8" />}>
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </Suspense>
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-gray-500">找不到符合「{q}」的文章</p>
        </div>
      )}
    </div>
  );
}
