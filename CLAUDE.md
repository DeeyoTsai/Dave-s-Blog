# Dave's Blog - Next.js 10天學習計劃

## 專案狀態記錄

### ✅ Day 1 完成（2026-04-08）
- Next.js 專案初始化
- 建立基本路由結構
- 完成所有 Day 1 練習挑戰

### ✅ Day 2 完成（2026-04-17）
**學習內容：**
- Props 與 Interface 深度解析
- 物件 State 管理
- useEffect 與副作用處理
- useMemo / useCallback 效能優化
- TypeScript 進階型別應用

**實作成果：**
- ✅ UI 元件系統
  - `components/ui/Button.tsx` - 完整按鈕元件（支援 variant, size, loading）
  - `components/ui/Badge.tsx` - 標籤元件（多色系統）
  - `components/ui/Avatar.tsx` - 頭像元件（圖片或首字母顯示）
  - `components/ui/card.tsx` - Card 容器元件（支援 padding 大小）
- ✅ Layout 元件
  - `components/layout/Navbar.tsx` - 導覽列（響應式 + 手機漢堡選單）
- ✅ Blog 元件
  - `components/blog/PostCard.tsx` - 文章卡片元件（含閱讀時間估算）
- ✅ 頁面路由
  - `/` - 首頁
  - `/blog` - 文章列表
  - `/about` - 關於頁面
  - `/login` - 登入頁面
  - `/register` - 註冊頁面
  - `/dashboard` - 儀表板
  - `/tags` - 標籤頁面

**練習挑戰進度：**
- ✅ 練習 1：useState — Navbar 手機選單開關
- ✅ 練習 2：useMemo — 文章標籤篩選
- ✅ 練習 3：useCallback — 搜尋輸入元件

**學習筆記：**
- `SKD/Day2-筆記-Props與State.md`
- `SKD/Day2-筆記-useEffect.md`
- `SKD/Day2-筆記-進階Hooks與TypeScript.md`
- `SKD/Day2-練習挑戰.md`

### 📖 Day 3 複習中（2026-04-20）
**複習內容（尚未實作）：**
- App Router 完整路由模式（動態路由、路由群組）
- `generateStaticParams` — Build 時預先產生靜態頁面
- URL SearchParams 搜尋（Server Component 取代 useState）
- `Suspense` — 解決 Hydration Mismatch，三種常見使用情境
- Day 2 `useState` 搜尋 vs Day 3 URL SearchParams 差異
- `Link` / `useRouter` / `redirect` 三者差異與使用情境
- 路由群組 `(group)` 與特殊 Layout 隔離

**下一步：** 開始 Day 3 實作練習挑戰

---

## 最近異動

**2026-04-20**
- Day 3 教材複習（`SKD/Next.js-深度學習計劃-Day1-3.md`）
- 補充 Suspense 完整解析（含三種使用情境、Hydration Mismatch 說明）
- 補充 Day 2 vs Day 3 搜尋寫法對比（情境說明 + 程式碼並排）
- 補充 `Link` / `useRouter` / `redirect` 差異、使用情境、常見誤用
- 補充路由群組 `(group)` 概念、Layout 套疊順序、實際應用場景

**2026-04-15**
- Navbar 加入手機版漢堡選單（useState 練習）
- 新增 Avatar、Card 元件
- PostCard 加入閱讀時間估算功能
- 新增 Day 2 練習挑戰筆記（SKD/Day2-練習挑戰.md）
- 新增進階 Hooks 與 TypeScript 學習筆記

**2026-04-14**
- 完成 Day 2 核心實作內容
- 建立完整的元件系統（Button, Badge, Navbar, PostCard）
- 建立基本路由結構（7 個頁面）
- 建立 Day 2 學習筆記（3 份）

**2026-04-08**
- 完成 Day 1 練習挑戰
- 加入學習筆記至 SKD 資料夾
- 建立元件系統與學習筆記

---

## 下一步計劃

### Day 3 進行中
- [ ] 練習 1：文章列表加入標籤篩選按鈕列
- [ ] 練習 2：分頁元件 `Pagination.tsx`（`?page=N`）
- [ ] 練習 3：`app/(blog)/blog/[slug]/page.tsx` + `generateMetadata` + `generateStaticParams`

---

## 技術棧

- **框架：** Next.js 15 (App Router)
- **語言：** TypeScript
- **樣式：** Tailwind CSS
- **資料庫：** （待整合）
- **ORM：** （待整合 Prisma）

---

## 專案結構

```
my-blog/
├── app/                    # Next.js App Router 頁面
│   ├── page.tsx           # 首頁
│   ├── blog/              # 文章相關頁面
│   ├── dashboard/         # 儀表板
│   ├── login/             # 登入頁面
│   ├── register/          # 註冊頁面
│   ├── about/             # 關於頁面
│   └── tags/              # 標籤頁面
├── components/            # React 元件
│   ├── ui/               # 基礎 UI 元件
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Avatar.tsx
│   │   └── card.tsx
│   ├── layout/           # 佈局元件
│   │   └── Navbar.tsx
│   └── blog/             # 部落格相關元件
│       └── PostCard.tsx
└── SKD/                  # 學習筆記
    ├── Day2-筆記-Props與State.md
    ├── Day2-筆記-useEffect.md
    ├── Day2-筆記-進階Hooks與TypeScript.md
    └── Day2-練習挑戰.md
```

---

## 開發指令

```bash
npm run dev      # 啟動開發伺服器
npm run build    # 建置專案
npm run start    # 啟動正式環境
npm run lint     # 執行 ESLint
```
