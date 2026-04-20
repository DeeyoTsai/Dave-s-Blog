'use client'

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useCallback } from "react"

export default function SearchBar({ defaultValue = '' }: { defaultValue?: string }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const handleSearch = useCallback((term: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (term) {
            params.set('q',term)
        } else {
            params.delete('q')
        }
        params.delete('page') //搜尋時重置頁碼
        router.push(`${pathname}?${params.toString()}`)
    },[pathname, router, searchParams])

    return (
        <div className="relative mb-8">
            <input  
                defaultValue={defaultValue}
                onChange={e=> handleSearch(e.target.value)}
                placeholder="搜尋文章標題或內容"
                className="w-full pl-10 pr-4 py-3 bg-white border 
                border-gray-200 rounded-xl 
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-500 
                focus:border-transparent"
            />
            <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>

        </div>
    )
}