# Day 2 課程筆記 ｜ 進階 Hooks + TypeScript 核心用法

📅 日期：2026-04-10
🔗 專案：Dave's Blog（Next.js 10天學習計劃）

---

## 一、useState vs useMemo vs useCallback

### 核心定位

| Hook | 存的是什麼 | 使用情境 |
|---|---|---|
| `useState` | 獨立的狀態，由使用者或事件改變 | 搜尋關鍵字、表單欄位、loading 狀態 |
| `useMemo` | 從現有 state 推算出來的值（衍生值） | 過濾結果、排序、複雜統計 |
| `useCallback` | 函式本身的參考，避免每次渲染重建 | 傳給子元件的事件處理函式 |

> 判斷口訣：**「這個值是獨立存在的，還是從別的 state 算出來的？」**
> - 獨立存在 → `useState`
> - 算出來的 → `useMemo`
> - 是函式 → `useCallback`

---

## 二、useMemo

**重點：**
- 記憶「運算結果」，只有依賴改變時才重新計算
- 適合用在計算複雜或資料量大的衍生值
- 不要對簡單計算過度使用，useMemo 本身也有成本

**為什麼不用 useState + useEffect 取代？**

```tsx
// ❌ useState + useEffect — 觸發兩次渲染
const [filteredPosts, setFilteredPosts] = useState([])
useEffect(() => {
  setFilteredPosts(posts.filter(p => p.title.includes(query)))
}, [posts, query])
// 流程：第一次渲染 → useEffect 跑 → setFilteredPosts → 第二次渲染

// ✅ useMemo — 只觸發一次渲染
const filteredPosts = useMemo(() => {
  return posts.filter(p => p.title.includes(query))
}, [posts, query])
// 流程：渲染時同步計算，畫面直接拿到正確值
```

**什麼時候不值得用：**

```tsx
// ❌ 計算太簡單，useMemo 開銷反而更大
const fullName = useMemo(() => `${firstName} ${lastName}`, [firstName, lastName])

// ✅ 直接算就好
const fullName = `${firstName} ${lastName}`

// ✅ 值得用 — 資料量大或計算複雜
const filteredAndSorted = useMemo(() => {
  return posts
    .filter(p => p.tags.includes(selectedTag))
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 10)
}, [posts, selectedTag])
```

---

## 三、useCallback

**重點：**
- 記憶「函式本身」，依賴沒變就回傳同一個函式物件
- 主要目的：搭配 `memo` 避免子元件不必要的重新渲染
- 不只能傳給 HTML element，任何子元件的 prop 或 useEffect 依賴都可以用

**為什麼函式每次渲染都是「新的」？**

```tsx
// React 每次渲染都會重新執行函式本體
// 裡面定義的函式，每次都是全新的物件（記憶體位址不同）
function Parent() {
  const handleClick = () => console.log('clicked')
  // 下一次渲染的 handleClick !== 這次的 handleClick
  // 就像 {} === {} 是 false
}
```

**有無 useCallback 的差異：**

```tsx
// ❌ 沒有 useCallback
// count 改變 → 父元件渲染 → handleFilter 是新函式
// → 子元件的 onFilter prop 改變 → memo 失效 → 子元件重新渲染
const handleFilterBad = (tag: string) => {
  setSelectedTag(tag)
}

// ✅ 空依賴 — 整個生命週期內永遠是同一個函式
// count 改變不會讓這個函式重建
const handleFilterGood = useCallback((tag: string) => {
  setSelectedTag(tag)
}, [])

// ✅ 有依賴 — posts 改變才重建函式
const handleFilterWithDep = useCallback((tag: string) => {
  const found = posts.find(p => p === tag)  // 用到 posts，必須列依賴
  if (found) setSelectedTag(found)
}, [posts])

// ⚠️ 常見錯誤：用到外部變數但沒列依賴 → stale closure，拿到舊值
const handleBug = useCallback(() => {
  fetchUserPosts(userId)  // userId 永遠是初始值！
}, [])  // ESLint 會警告
```

**useCallback 傳遞的對象不只 HTML element：**

```tsx
// 傳給自訂子元件
<SearchBar onSearch={handleSearch} />

// 傳給 HTML element
<input onChange={handleSearch} />

// 放進 useEffect 依賴（函式每次都變 → useEffect 無限觸發）
useEffect(() => {
  handleSearch(defaultQuery)
}, [handleSearch])  // ← 需要 useCallback 確保函式穩定
```

---

## 四、TypeScript 在 React 中的核心用法

### 常用型別定義

```tsx
// Union type — 限定只能是這幾個值
type Variant = 'primary' | 'secondary' | 'danger'
type Size = 'sm' | 'md' | 'lg'

// 函式型別
type Handler = () => void                    // 無參數、無回傳
type ClickHandler = (id: string) => void     // 有參數
type AsyncHandler = () => Promise<void>      // 非同步
```

### React 內建型別

```tsx
React.ReactNode     // 任何可渲染的內容（JSX、字串、數字、null、陣列）
React.ReactElement  // 只有 JSX 元素（比 ReactNode 更嚴格）
React.FC<Props>     // Function Component 型別（現在通常不需要，直接 function 就好）

// 事件型別
React.MouseEvent<HTMLButtonElement>          // 點擊事件
React.ChangeEvent<HTMLInputElement>          // input onChange
React.ChangeEvent<HTMLTextAreaElement>       // textarea onChange
React.FormEvent<HTMLFormElement>             // form onSubmit
React.KeyboardEvent<HTMLInputElement>        // 鍵盤事件
```

### 實際使用範例

```tsx
interface ButtonProps {
  label: string
  variant?: 'primary' | 'secondary'
  onClick: () => void                          // 無參數函式
  onHover?: (label: string) => void            // 有參數函式
  children?: React.ReactNode                   // 可傳入任何 JSX 內容
  className?: string
}

function Button({ label, variant = 'primary', onClick, children }: ButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onClick()
  }
  return <button onClick={handleClick}>{children ?? label}</button>
}
```

### Utility Types（泛用型別工具）

```tsx
interface Post {
  id: string
  title: string
  content: string
  published: boolean
  author: User
}

Partial<Post>               // 所有欄位變選填（適合更新 API 的 payload）
Required<Post>              // 所有欄位變必填
Pick<Post, 'id' | 'title'>  // 只取某些欄位 → { id, title }
Omit<Post, 'content'>       // 排除某些欄位 → { id, title, published, author }
```

**實際情境：**

```tsx
// 建立文章：author 由後端產生，不需要前端傳
type CreatePostInput = Omit<Post, 'id' | 'author'>

// 更新文章：所有欄位都是選填（只傳要改的）
type UpdatePostInput = Partial<Pick<Post, 'title' | 'content' | 'published'>>

// PostCard 不需要 content（太長），只取需要的欄位
type PostCardProps = Pick<Post, 'id' | 'title' | 'published'>
```

---

## 五、重點整理

| 概念 | 說明 |
|---|---|
| `useMemo` | 記憶「值」，避免重複計算衍生資料 |
| `useCallback` | 記憶「函式」，避免子元件不必要的重新渲染 |
| `memo` | 包住子元件，只有 props 真的改變才重新渲染 |
| Union type | `'a' \| 'b'` 限定變數只能是特定幾個值 |
| `React.ReactNode` | 可渲染的所有型別，children 的標準型別 |
| `Partial<T>` | 所有欄位選填，適合更新操作 |
| `Pick<T, K>` | 只取需要的欄位，避免傳多餘資料 |
| `Omit<T, K>` | 排除不需要的欄位 |
