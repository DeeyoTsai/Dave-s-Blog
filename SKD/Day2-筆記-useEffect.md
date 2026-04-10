# Day 2 課程筆記 ｜ useEffect 深度解析

📅 日期：2026-04-10
🔗 專案：Dave's Blog（Next.js 10天學習計劃）

---

## 一、useEffect 內的 async 模式

**重點：**
- `useEffect` 的 callback 只能回傳「清理函式」或 `undefined`
- `async function` 回傳的是 `Promise`，兩者衝突，React 會報錯
- 解法：在 callback 內部另外定義一個 `async function`，再呼叫它

```tsx
// ❌ 錯誤：直接 async callback
useEffect(async () => {
  const data = await fetch('/api/posts')
}, [])

// ✅ 正確：內部包一層 async function
useEffect(() => {
  async function fetchPosts() {
    setLoading(true)
    const res = await fetch('/api/posts')
    const data = await res.json()
    setPosts(data)
    setLoading(false)
  }
  fetchPosts()
}, [])
```

**為什麼不建議宣告在元件外（全域）：**
- 存取 state 需要傳參數，程式碼變醜
- ESLint 無法自動追蹤相依性，容易漏掉依賴造成 Bug
- 元件卸載後，全域函式仍在背景執行，跑完還會呼叫 `setPosts`，但元件已不存在，React 會報 warning 甚至 crash

---

## 二、清理函式（Cleanup）

**重點：**
- 不是每個元件都需要清理函式
- 只有「啟動後會持續佔用資源」的副作用才需要清理
- 清理函式在元件卸載時執行

**需要清理的情境：**

```tsx
// 計時器 — 不清理會一直跑
useEffect(() => {
  const timer = setInterval(() => console.log('tick'), 1000)
  return () => clearInterval(timer)
}, [])

// 事件監聽 — 不清理會重複綁定
useEffect(() => {
  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
}, [])

// WebSocket — 不清理會造成連線洩漏
useEffect(() => {
  const ws = new WebSocket('wss://...')
  return () => ws.close()
}, [])
```

**不需要清理的情境：**

```tsx
// 一次性的 fetch — 跑完就結束，不占用資源
useEffect(() => {
  async function fetchPosts() { ... }
  fetchPosts()
  // 不需要 return
}, [])
```

**對應關係速查：**

| 開啟 | 清理 |
|---|---|
| `setInterval` | `clearInterval` |
| `addEventListener` | `removeEventListener` |
| `new WebSocket` | `.close()` |
| 一次性 `fetch` | 不需要 |

> 口訣：**開了就要關，訂了就要退**

---

## 三、dependency array 三種模式

```tsx
// 空陣列 — 只在掛載時執行一次
useEffect(() => { fetchPosts() }, [])

// 有依賴 — 當 id 改變時重新執行
useEffect(() => { fetchPost(id) }, [id])

// 不傳陣列 — 每次渲染都執行（幾乎不用）
useEffect(() => { console.log('每次渲染') })
```

---

## 四、重點整理

| 概念 | 說明 |
|------|------|
| async in useEffect | 不能直接用，要在內部包一層 async function |
| fetchPosts 定義在內部 | 防止元件卸載後仍操作不存在的 state |
| 清理函式 | 只有持續占用資源的才需要（計時器、事件、WebSocket）|
| `[]` dependency | 空陣列代表只執行一次，等同 componentDidMount |
