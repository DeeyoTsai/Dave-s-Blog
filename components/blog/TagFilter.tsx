'use client'

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import Button from "../ui/Button"

interface Props {
    tags: string[]
    currentTag?: string
}

export default function TagFilter({ tags, currentTag }: Props) {
    // 1. 取得 router 和 searchParams
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams() //取得目前query string 
    // 2. 點擊 handler                                           
    const handleQuery = ((tag:string) => {
        console.log('handleQuery called', tag);
        
        const q_params = new URLSearchParams(searchParams.toString())
        if (tag) {
            q_params.set('tag', tag)
        } else {
            q_params.delete('tag')
        }
        // 更新 URL，觸發 Server Component 重新抓資料
        router.push(`${pathname}?${q_params.toString()}`)
    })               
    // 3. 渲染按鈕列（全部 + 各標籤）
    return (
        <div className="flex flex-wrap gap-2 mb-6">                     
            {/* 全部Tag Button */}
            {/* {<button key="All" 
                onClick={() => handleQuery('')}
                className={currentTag === undefined ? 'font-bold': ''}
            >
                全部
            </button>} */}
            <Button
                onClick={() => handleQuery('')}
                variant={currentTag === undefined ? "primary": "ghost"}
                size="sm"
            >
                全部
            </Button>
            {/* 所有tag list Button */}
            {tags.map( tag =>(
                // <button key={tag} 
                //     onClick={() => handleQuery(tag)}
                //     className={currentTag === tag ? 'font-bold':''}
                // >
                //     {tag}
                // </button>
                <Button
                    onClick={() => handleQuery(tag)}
                    variant={currentTag === tag ? "primary": "ghost"}
                    size="sm"
                >
                    {tag}
                </Button>
            ))}
        </div>
    )
}