// 暫時使用假資料（Day 6 換成 Prisma）
const mockPosts = [
  {
    id: "1",
    title: "Next.js App Router 完全指南",
    slug: "nextjs-app-router",
    excerpt:
      "深入探討 Next.js 14 的 App Router，包含 Server Components、Streaming 等新特性...",
    content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    published: true,
    createdAt: new Date("2026-04-01"),
    updatedAt: new Date("2026-04-01"),
    author: { id: "1", name: "Dave", image: null },
    tags: [
      { id: "1", name: "Next.js" },
      { id: "2", name: "前端" },
    ],
    _count: { comments: 5 },
  },
  {
    id: "2",
    title: "TypeScript 實用技巧大全",
    slug: "typescript-tips",
    excerpt:
      "整理了 15 個在實際專案中最常用的 TypeScript 技巧，從型別推斷到泛型應用...",
    content: "Fake content for TypeScript tips. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    published: true,
    createdAt: new Date("2026-04-03"),
    updatedAt: new Date("2026-04-03"),
    author: { id: "1", name: "Dave", image: null },
    tags: [
      { id: "3", name: "TypeScript" },
      { id: "2", name: "前端" },
    ],
    _count: { comments: 3 },
  },
];

export { mockPosts };