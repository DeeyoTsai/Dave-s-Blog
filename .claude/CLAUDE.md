# Dave's Personal Website — 專案工作規則

> Claude Code 會自動往上讀取父目錄的 CLAUDE.md，所以
> `Claude-workspace/.claude/CLAUDE.md` 裡的通用規則已自動套用，
> 這裡只補充這個專案專屬的設定。

---

## 專案簡介

- 技術棧：Next.js（前端框架）
- 目的：個人部落格，分享 AI 技能學習、演算法筆記、工作心得
- 語言：繁體中文（介面和文章內容均以繁中為主）

## 跨平台開發環境說明

此專案同時在 **Windows** 與 **Ubuntu (code-server)** 開發，兩者 node_modules 不相容，切換平台時需重新安裝。

### Windows 開發（主要）
```bash
npm install   # 如果 node_modules 不存在或剛從 Ubuntu 切換回來
npm run dev
```

### Ubuntu / code-server 開發
node_modules 必須裝在 Linux 原生路徑，不能直接在 `/mnt/c/` 執行 npm install（NTFS symlink 限制）。

**首次設定（只需做一次）：**
```bash
mkdir -p ~/dev
ln -s "/mnt/c/Users/deeyo/Documents/Claude-workspace/projects/Dave-web/DavePersonalWebsite/my-blog" ~/dev/my-blog
```

**每次從 Windows 切換到 Ubuntu 後：**
```bash
cd ~/dev/my-blog
rm -rf node_modules package-lock.json
npm install
npm run dev
```

> 編輯 `~/dev/my-blog` 內的檔案會直接同步到 Windows 原始資料夾（symlink 雙向同步）。

### 每次對話開始時的環境確認（強制）
1. 用 `uname -s` 確認作業系統（Linux = Ubuntu，其他 = Windows）
2. 若為 Linux，確認是否在 `~/dev/my-blog` 路徑下操作
3. 確認 `node_modules/.bin/next` 是否存在，不存在則提示重新安裝

---

## 開發規則

- 使用 `npm run dev` 啟動本地開發伺服器（port 3000）
- 建立新頁面或元件前，先確認 `src/` 或 `app/` 目錄結構，不要亂開資料夾
- 元件命名使用 PascalCase（如 `BlogCard.tsx`），工具函式使用 camelCase
- CSS 優先使用 Tailwind，不要混用多種樣式方案
- 針對每天的挑戰跟任務，提供完整的學習知識，並引導我完成任務，不要直接提供答案

## 檔案存放

- 部落格文章（Markdown）→ `content/posts/` 或 `src/posts/`
- 靜態圖片 → `public/images/`
- 可重複使用的元件 → `src/components/`
- 頁面 → `src/app/` 或 `src/pages/`（依專案結構而定）

## 修改記錄

- 每次修改後，更新專案根目錄的 `Prograss.md`
- 格式：時間 + 修改主題 + 條列式重點（每點不超過 400 字）
