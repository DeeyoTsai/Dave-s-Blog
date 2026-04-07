# Dave's Personal Website — 專案工作規則

> Claude Code 會自動往上讀取父目錄的 CLAUDE.md，所以
> `Claude-workspace/.claude/CLAUDE.md` 裡的通用規則已自動套用，
> 這裡只補充這個專案專屬的設定。

---

## 專案簡介
- 技術棧：Next.js（前端框架）
- 目的：個人部落格，分享 AI 技能學習、演算法筆記、工作心得
- 語言：繁體中文（介面和文章內容均以繁中為主）

## 開發規則
- 使用 `npm run dev` 啟動本地開發伺服器（port 3000）
- 建立新頁面或元件前，先確認 `src/` 或 `app/` 目錄結構，不要亂開資料夾
- 元件命名使用 PascalCase（如 `BlogCard.tsx`），工具函式使用 camelCase
- CSS 優先使用 Tailwind，不要混用多種樣式方案

## 檔案存放
- 部落格文章（Markdown）→ `content/posts/` 或 `src/posts/`
- 靜態圖片 → `public/images/`
- 可重複使用的元件 → `src/components/`
- 頁面 → `src/app/` 或 `src/pages/`（依專案結構而定）

## 修改記錄
- 每次修改後，更新專案根目錄的 `Prograss.md`
- 格式：時間 + 修改主題 + 條列式重點（每點不超過 400 字）
