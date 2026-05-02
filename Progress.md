# 修改記錄

## 2026-05-02

**Day 3 練習 3 完成：動態路由文章詳情頁（`generateStaticParams` + `generateMetadata`）**

- 新增 `lib/mockData.ts`
  - 將 `mockPosts` 從 `app/(blog)/blog/page.tsx` 抽離為共用模組
  - 補充兩篇假文章的 `content` 欄位，供詳情頁顯示使用
- 新增 `app/(blog)/blog/[slug]/page.tsx`
  - `generateStaticParams`：回傳所有 slug，Build 時預先產生靜態頁面
  - `generateMetadata`：動態設定每篇文章的 `<title>` 與 `<meta description>`
  - 頁面元件：`await params` 取得 slug → `mockPosts.find()` 查詢文章 → 找不到呼叫 `notFound()`
  - 顯示文章標題、作者、日期（`toLocaleDateString("zh-TW")`）、標籤（`map` 出 `<span>`）、內容
- 修改 `app/(blog)/blog/page.tsx`：改用 `import { mockPosts } from "@/lib/mockData"`
- 補充 `.claude/CLAUDE.md`：加入 iPad + ngrok 開發啟動流程說明
- 補充 `SKD/Next.js-深度學習計劃-Day1-3.md`：新增 `params` vs `generateStaticParams` 常見混淆點說明（含對照表與圖解）

---

## 2026-04-30

**Day 3 練習 2 完成：分頁元件 Pagination（?page=N URL SearchParams）**

- 新增 `components/ui/Pagination.tsx`（Client Component）
  - `useSearchParams()` 讀取目前 URL 參數，保留 `q`、`tag` 同時切換頁碼
  - `router.push()` 更新 URL，保留其他篩選條件
  - 動態產生頁碼按鈕（`Array.from`），當前頁用 `variant="primary"`
  - 上/下一頁按鈕依邊界條件自動 `disabled`
- 修改 `app/(blog)/blog/page.tsx`
  - 加入 `POSTS_PER_PAGE` 常數（測試設 1，正式設 2+）
  - 計算 `totalPages`、`currentPage`，切出 `paginatedPosts`
  - 用 `<Suspense>` 包住 `<Pagination>`，避免 Hydration Mismatch
  - `<Pagination>` 放在 grid 外層，正確顯示在文章列表下方
- 環境問題排除記錄
  - Ubuntu code-server 透過 proxy URL 需設 `ASSET_PREFIX`（`.env.local` 設定）
  - iPad Safari 無法執行 Turbopack dev 輸出 → 改用 `npm run build && npm run start`
  - 新增 `package.json` `preview` script：`npm run build && npm run start`
- 移除 `app/layout.tsx` 中臨時除錯用的 `window.onerror` script

---

## 2026-04-22

**Day 3 練習 1 完成：標籤篩選按鈕列（URL SearchParams）**

- 新增 `components/blog/TagFilter.tsx`（Client Component）
  - 用 `useSearchParams()` 讀取目前 URL 參數
  - 點擊標籤時用 `router.push()` 更新 URL，保留 `q` 參數
  - 點「全部」時用 `q_params.delete('tag')` 清除標籤篩選
  - 使用 `components/ui/Button.tsx`，active 狀態用 `variant="primary"`，未選用 `variant="ghost"`
  - 容器加 `flex flex-wrap gap-2` 讓按鈕自動換行
- 修改 `app/(blog)/blog/page.tsx`
  - 用 `flatMap + Set` 收集所有不重複標籤
  - 用 `<Suspense>` 包住 `TagFilter`，傳入 `tags` 與 `currentTag`
- 除錯記錄：透過 IP 存取 dev server 時 Client Component 無法 hydrate，改用 `localhost:3000` 正常

---

## 2026-04-20

**Day 3 教材複習 + 筆記補充**

- 複習 Day 3 核心概念（尚未實作，純理論複習）
- 補充 `Suspense` 完整解析至教材
  - 說明 Hydration Mismatch 根源（伺服器 vs 瀏覽器資訊不對稱）
  - 三種使用情境：`useSearchParams` / 等待資料的 Server Component / 多區塊獨立載入
- 補充 Day 2 vs Day 3 搜尋寫法差異
  - 情境說明：搜尋後複製連結給朋友，Day 2 失效、Day 3 正常
  - 程式碼並排對照，說明各自適用場景
- 補充 `Link` / `useRouter` / `redirect` 詳細說明
  - 核心判斷邏輯（JSX → Link、事件邏輯 → useRouter、伺服器邏輯 → redirect）
  - `push` vs `replace` 的瀏覽器歷史差異
  - 一句話記憶表格 + 常見誤用範例
- 補充路由群組 `(group)` 與特殊 Layout 完整說明
  - Layout 繼承機制與問題說明
  - 兩種用途：隔離視覺外框 / 整理程式碼結構
  - Layout 套疊順序與 Navbar 隔離解法
- 完成手把手實作 Step 4：Loading 與 Error 頁面
  - 新增 `app/(blog)/blog/loading.tsx`（骨架屏動畫）
  - 新增 `app/(blog)/blog/error.tsx`（錯誤邊界頁面，含重試按鈕）

---

## 2026-04-17

**Day 2 練習挑戰全部完成**

- 完成練習 3：`useCallback` + `React.memo` 搜尋元件
  - 新建 `components/ui/SearchInput.tsx`（用 `React.memo` 包住）
  - `app/blog/page.tsx` 加入 `searchTerm` state 與 `handleSearch`（`useCallback`）
  - `filteredPosts` 的 `useMemo` 同時依據標題與標籤做雙條件過濾
  - 驗證：點標籤時 `SearchInput` 不重新渲染，useCallback 效果確認

---

## 2026-04-15

**Day 2 核心實作**

- Navbar 加入手機版漢堡選單（`useState` 練習）
- 新增 Avatar、Card UI 元件
- PostCard 加入閱讀時間估算
- `app/blog/page.tsx` 完成標籤篩選功能（`useMemo` 練習）
- 新增 Day 2 學習筆記（SKD 資料夾）

---

## 2026-04-08

**Day 1 完成**

- Next.js 專案初始化
- 建立基本路由結構（7 個頁面）
- 完成所有 Day 1 練習挑戰
- 加入 Day 1 學習筆記
