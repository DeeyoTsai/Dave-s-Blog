# Day 2 練習挑戰 ｜ useState / useMemo / useCallback

📅 日期：2026-04-15
🔗 專案：Dave's Blog（Next.js 10天學習計劃）

---

## 練習 1：`useState` — Navbar 手機選單開關

**目標檔案：** `components/layout/Navbar.tsx`

**完成條件：**
- 右側加一個漢堡按鈕，只在手機顯示（`md:hidden`）
- 點擊後展開/收合導覽連結
- 按鈕文字根據狀態切換（「選單」/ 「關閉」）

**關鍵觀念：**
- 元件有互動 → 第一行加 `'use client'`
- state 型別：`boolean`，初始值 `false`（預設關閉）
- toggle 寫法：`setHamburgerOpen(prev => !prev)`（函式形式，避免 stale closure）
- 下拉選單用條件渲染：`{hamburgerOpen && <div>...</div>}`
- 按鈕要在永遠可見的區域，不能放在條件渲染的區塊裡

**常見錯誤：**
- `<div>` 放在 `<button>` 內部（無效 HTML）
- 按鈕放進 `{hamburgerOpen && (...)}` 裡，導致無法開啟選單
- 忘記加 `'use client'`，useState 報錯

---

## 練習 2：`useMemo` — 文章標籤篩選

**目標檔案：** `app/blog/page.tsx`

**完成條件：**
- 顯示假資料文章列表（MOCK_POSTS）
- 顯示所有標籤篩選按鈕（全部 / 各標籤）
- 點選標籤後只顯示對應文章
- 篩選結果用 `useMemo` 計算

**關鍵觀念：**
- state 只需要一個：`selectedTag`，初始值為空字串 `''`（代表「全部」）
- `useMemo` 依賴：`[selectedTag]`（MOCK_POSTS 是模組層常數，不需要列入）
- 篩選邏輯：`selectedTag` 為空 → 回傳全部；有值 → 用 `.filter()` + `.some()` 篩選
- 標籤清單從資料動態產生：`MOCK_POSTS.flatMap(p => p.tags)` 再去重複
- 為什麼用 `useMemo` 而不是 `useState + useEffect`：避免多一次渲染，衍生值直接在渲染時計算
- Hook 必須在元件函式**內部**呼叫，不能放在元件外（模組層）

**完整實作：**
```tsx
'use client'
import { useMemo, useState } from "react"
import PostCard from "@/components/blog/PostCard"

const MOCK_POSTS = [ ... ]  // 模組層常數，元件外定義沒問題

export default function BlogPage() {
  const [selectedTag, setSelectedTag] = useState('')

  const filteredPosts = useMemo(() => {
    return MOCK_POSTS.filter(post =>
      selectedTag ? post.tags.some(tag => tag.name === selectedTag) : true
    )
  }, [selectedTag])

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <button onClick={() => setSelectedTag('')}>全部</button>
        {MOCK_POSTS
          .flatMap(post => post.tags)
          .filter((tag, index, self) =>
            self.findIndex(t => t.name === tag.name) === index
          )
          .map(tag => (
            <button key={tag.id} onClick={() => setSelectedTag(tag.name)}>
              {tag.name}
            </button>
          ))}
      </div>
      {filteredPosts.map(p => <PostCard key={p.id} post={p} />)}
    </div>
  )
}
```

**`.some()` 用法：**
```tsx
// 只要陣列中有一個元素符合條件，就回傳 true
post.tags.some(tag => tag.name === selectedTag)
```

**去重複標籤：**
```tsx
.filter((tag, index, self) => self.findIndex(t => t.name === tag.name) === index)
// findIndex 回傳「第一次出現這個 name 的位置」
// 若等於目前的 index → 第一次出現 → 保留
// 若不等於 → 重複 → 過濾掉
```

**踩過的坑：**
- ❌ `useState` / `useMemo` 寫在元件外面 → React 報錯「Hook cannot be called at top level」
- ❌ `filter` callback 的 false 分支回傳 `MOCK_POSTS`（陣列）而非 `true` → 邏輯錯誤但偶然能跑
- ❌ 去重複用 `self.indexOf(tag)` → 物件參考比較，永遠無法去重複
- ❌ 去重複用 `self.findIndex(...)` 但沒加 `=== index` → findIndex 回傳數字，index=0 時為 falsy，第一個標籤被錯誤過濾

---

## 練習 3：`useCallback` — 搜尋輸入元件

**目標檔案：**
- 新建 `components/ui/SearchInput.tsx`
- 修改 `app/blog/page.tsx`

**完成條件：**
- 建立 `SearchInput` 元件，用 `React.memo` 包住
- 從父元件傳入 `value` 和 `onChange` handler
- `onChange` 用 `useCallback` 包住，避免子元件不必要的重新渲染
- 在 `SearchInput` 裡加 `console.log`，觀察有無 `useCallback` 的渲染次數差異

**關鍵觀念：**
- React 每次渲染都會重建函式物件，參考位址不同
- `memo` 用參考相等（`===`）比較 props，函式每次都是新的 → memo 失效
- `useCallback` 讓函式在依賴不變時維持同一個參考 → memo 生效
- 依賴陣列：handler 裡有用到外部變數就要列，沒有就填 `[]`

**SearchInput Props 設計：**
```tsx
interface SearchInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
```

**整合到 blog/page.tsx 後的最終效果：**
```
[ 搜尋框 ]
[ 全部 ] [ Next.js ] [ TypeScript ] [ React ] [ CSS ]

┌──────────────────────────┐
│ Next.js App Router 指南   │
└──────────────────────────┘
```

---

## 完成檢核

| 練習 | 檔案 | 狀態 |
|------|------|------|
| useState — 手機選單 | `components/layout/Navbar.tsx` | ✅ 完成 |
| useMemo — 標籤篩選 | `app/blog/page.tsx` | 🔄 實作完成，除錯中 |
| useCallback — 搜尋元件 | `components/ui/SearchInput.tsx` | ⏳ 待開始 |
