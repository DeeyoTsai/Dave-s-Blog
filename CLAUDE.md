# Dave's Blog - Next.js 10天學習計劃

## 專案狀態記錄

### ✅ Day 1 完成（2026-04-08）
- Next.js 專案初始化
- 建立基本路由結構
- 完成所有 Day 1 練習挑戰

### ✅ Day 2 完成（2026-04-14）
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
- ✅ Layout 元件
  - `components/layout/Navbar.tsx` - 導覽列（響應式設計）
- ✅ Blog 元件
  - `components/blog/PostCard.tsx` - 文章卡片元件
- ✅ 頁面路由
  - `/` - 首頁
  - `/blog` - 文章列表
  - `/about` - 關於頁面
  - `/login` - 登入頁面
  - `/register` - 註冊頁面
  - `/dashboard` - 儀表板
  - `/tags` - 標籤頁面

**學習筆記：**
- `SKD/Day2-筆記-Props與State.md`
- `SKD/Day2-筆記-useEffect.md`
- `SKD/Day2-筆記-進階Hooks與TypeScript.md`

---

## 最近異動

**2026-04-14**
- 完成 Day 2 所有實作內容
- 建立完整的元件系統（Button, Badge, Navbar, PostCard）
- 建立基本路由結構（7 個頁面）
- 建立 Day 2 學習筆記（3 份）

**2026-04-08**
- 完成 Day 1 練習挑戰
- 加入學習筆記至 SKD 資料夾
- 建立元件系統與學習筆記

---

## 下一步計劃

### Day 3 預計內容
- [ ] API Routes 實作
- [ ] 資料庫整合（Prisma）
- [ ] CRUD 操作實作
- [ ] 表單驗證

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
│   │   └── Badge.tsx
│   ├── layout/           # 佈局元件
│   │   └── Navbar.tsx
│   └── blog/             # 部落格相關元件
│       └── PostCard.tsx
└── SKD/                  # 學習筆記
    └── Day2-筆記-*.md
```

---

## 開發指令

```bash
npm run dev      # 啟動開發伺服器
npm run build    # 建置專案
npm run start    # 啟動正式環境
npm run lint     # 執行 ESLint
```
