# Day 2 課程筆記 ｜ Props 深度解析 + 物件 State

📅 日期：2026-04-08
🔗 專案：Dave's Blog（Next.js 10天學習計劃）

---

## 一、Props 是什麼？

**Props 就是元件的「參數」**，跟函式傳參數概念完全一樣。

```tsx
// 一般函式傳參數
function greet(name: string) {
  return `Hello, ${name}`
}
greet("Dave")

// React 元件傳 Props — 概念一樣
function Greeting({ name }: { name: string }) {
  return <h1>Hello, {name}</h1>
}
<Greeting name="Dave" />
```

---

## 二、Interface — 定義 Props 的規格書

**Interface 就是「規格書」**，告訴 TypeScript 這個元件接受哪些參數。

```tsx
interface ButtonProps {
  label: string                           // 必填，字串
  onClick: () => void                     // 必填，點了會觸發的函式
  variant?: 'primary' | 'secondary'      // 選填（有 ? 就是選填）
  disabled?: boolean                      // 選填
}
```

- 有 `?` → 選填，沒傳不報錯，可以設預設值
- 沒有 `?` → 必填，不傳 TypeScript 直接報錯

---

## 三、解構賦值 — 把 Props 物件拆開來用

```tsx
// ❌ 不用解構 — 每次都要 props.xxx，很囉嗦
function Button(props: ButtonProps) {
  return <button onClick={props.onClick}>{props.label}</button>
}

// ✅ 用解構 + 預設值 — 乾淨很多
function Button({
  label,
  onClick,
  variant = 'primary',   // 沒傳就用 'primary'
  disabled = false,       // 沒傳就用 false
}: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{label}</button>
}
```

---

## 四、完整 Button 元件範例

```tsx
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
  className?: string
}

export default function Button({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
}: ButtonProps) {

  const baseStyle = 'px-4 py-2 rounded-lg font-medium transition-colors'

  // 用物件對應樣式，比 if/else 乾淨
  const variants = {
    primary:   'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    danger:    'bg-red-600 text-white hover:bg-red-700',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {label}
    </button>
  )
}
```

**使用方式：**
```tsx
<Button label="送出" onClick={() => console.log('clicked')} />
<Button label="刪除" onClick={handleDelete} variant="danger" disabled={isLoading} />
<Button label="取消" onClick={handleCancel} variant="secondary" className="w-full" />
```

---

## 五、物件 State（常見模式）

### 為什麼用物件 State？

```tsx
// ❌ 每個欄位都要一個 useState — 很囉嗦
const [title, setTitle] = useState('')
const [content, setContent] = useState('')
const [published, setPublished] = useState(false)

// ✅ 一個物件 state 管理所有欄位 — 乾淨
const [form, setForm] = useState({ title: '', content: '', published: false })
```

---

### 完整範例解析

```tsx
// 1. 定義 State 形狀
interface FormState {
  title: string
  content: string
  published: boolean
}

function PostForm() {
  // 2. 初始值是物件
  const [form, setForm] = useState<FormState>({
    title: '',
    content: '',
    published: false,
  })

  // 3. 通用更新函式（重點！）
  const updateField = (field: keyof FormState, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form>
      <input
        value={form.title}
        onChange={e => updateField('title', e.target.value)}
      />
      <textarea
        value={form.content}
        onChange={e => updateField('content', e.target.value)}
      />
      <input
        type="checkbox"
        checked={form.published}
        onChange={e => updateField('published', e.target.checked)}
        // checkbox 用 checked，不是 value
      />
    </form>
  )
}
```

---

### updateField 三個關鍵概念

**① `keyof FormState`**

```tsx
// keyof FormState = 'title' | 'content' | 'published'
// 限制只能傳這三個字串，打錯字 TypeScript 會報錯
const updateField = (field: keyof FormState, value: string | boolean) => { ... }
```

**② `...prev`（Spread 展開運算子）**

```tsx
// prev = { title: 'Hello', content: '', published: false }

{ ...prev }
// → { title: 'Hello', content: '', published: false }  // 完整複製

{ ...prev, title: '新標題' }
// → { title: '新標題', content: '', published: false }  // 只改 title，其他不動
```

> ⚠️ 為什麼不能直接改 state？
> React 需要收到一個**新物件**才知道要重新渲染，直接修改舊物件不會觸發更新。

**③ `[field]: value`（動態 key）**

```tsx
const field = 'title'

{ title: '新標題' }    // 一般寫法，key 是固定的
{ [field]: '新標題' }  // 動態寫法，key 從變數來，結果一樣
```

---

### 整體資料流

```
使用者輸入文字
  → onChange 觸發
  → 呼叫 updateField('title', '新文字')
  → setForm(prev => ({ ...prev, title: '新文字' }))
  → React 偵測到新物件
  → 重新渲染，input 顯示新文字
```

---

## 六、重點整理

| 概念 | 一句話說明 |
|------|-----------|
| Interface | 定義元件接受哪些 Props，哪些必填/選填 |
| Props | 父元件傳給子元件的資料（元件的參數） |
| 解構賦值 | 把 Props 物件拆開，方便直接用變數名稱 |
| 預設值 | 選填 Props 沒傳時的備用值 |
| 物件 State | 用一個 useState 管理多個相關欄位 |
| `...prev` | 複製舊 state，只更新需要改的欄位 |
| `[field]` | 動態 key，讓一個函式能更新任意欄位 |
| keyof | 限制參數只能是物件的某個 key 名稱 |
