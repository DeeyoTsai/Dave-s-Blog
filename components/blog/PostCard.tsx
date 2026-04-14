import Link from "next/link";
import Badge from "@/components/ui/Badge";
import type { Post } from "@/types";
import Avatar from "@/components/ui/Avatar";

interface PostCardProps {
  post: Pick<
    Post,
    | "id"
    | "title"
    | "slug"
    | "excerpt"
    | "createdAt"
    | "author"
    | "tags"
    | "_count"
  >;
}

// 閱讀時間計算函式：字數 ÷ 250 = 分鐘，最少顯示 1 分鐘
function calcReadTime(text: string): number {
  const words = text.trim().length;
  return Math.max(1, Math.ceil(words / 250));
}

export default function PostCard({ post }: PostCardProps) {
  const readTime = calcReadTime(post.excerpt ?? post.title);

  return (
    <article className="group bg-white rounded-2xl border border-gray-100 p-6 hover:border-blue-200 hover:shadow-md transition-all">
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag) => (
            <Badge key={tag.id} label={tag.name} />
          ))}
        </div>
      )}
      <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>
      {post.excerpt && (
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {post.excerpt}
        </p>
      )}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <Avatar name={post.author.name} image={post.author.image} size="sm" />
          <span>{post.author.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span>{readTime} 分鐘閱讀</span>
          {post._count && <span>留言 {post._count.comments}</span>}
          <span>{new Date(post.createdAt).toLocaleDateString("zh-TW")}</span>
        </div>
      </div>
    </article>
  );
}
