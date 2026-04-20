# 修改記錄

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
-手把手進度至Step3完成
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
