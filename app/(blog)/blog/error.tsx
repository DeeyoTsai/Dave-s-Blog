'use client'

export default function BlogError({
    error,
    reset,
}:{
    error: Error
    reset: () => void
}) {
    return (
        <div className="text-center py-20">
            <p className="text-4xl mb-4">😵</p>
            <h2 className="text-xl font-bold text-gray-800 mb-2">頁面發生錯誤</h2>
            <p className="text-gray-500 mb-6 text-sm">{error.message}</p>
            <button onClick={reset} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">重試</button>
        </div>

    )

}