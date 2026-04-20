# 修改記錄

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
