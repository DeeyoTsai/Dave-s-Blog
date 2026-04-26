# 跨平台環境檢查與設定

執行以下步驟，確認開發環境正確：

## 步驟 1：確認作業系統
用 Bash 執行 `uname -s`：
- 輸出 `Linux` → Ubuntu 環境，繼續步驟 2
- 其他 → Windows 環境，直接執行 `npm run dev` 即可，流程結束

## 步驟 2（Linux）：確認操作路徑
檢查目前路徑是否為 `~/dev/my-blog`（Linux 原生路徑）。

若不是，提示用戶切換：
```bash
cd ~/dev/my-blog
```

若 `~/dev/my-blog` symlink 不存在，則建立：
```bash
mkdir -p ~/dev
ln -s "/mnt/c/Users/deeyo/Documents/Claude-workspace/projects/Dave-web/DavePersonalWebsite/my-blog" ~/dev/my-blog
cd ~/dev/my-blog
```

## 步驟 3（Linux）：確認 node_modules 是否可用
執行 `ls node_modules/.bin/next`：
- 存在 → 環境正常，可直接執行 `npm run dev`
- 不存在 → 提示用戶執行以下指令重新安裝：

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## 完成
回報目前作業系統、路徑、node_modules 狀態，以及是否可以直接啟動開發伺服器。
