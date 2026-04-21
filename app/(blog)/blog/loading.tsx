export default function BlogLoading() {
    return (
        <div>
            <div className="mb-10">
                <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-24 bg-gray-100 rounded animate-pulse"/>                
            </div>
            <div className="h-12 bg-gray-100 rounded-xl animate-pulse mb-8"/>
            <div className="grid gap-6">
                {[1,2,3].map(i => (
                    <div key={i} className="bg-white rounded-2xl border p-6 space-y-3">
                        <div className="flex gap-2">
                            <div className="h-6 w-16 bg-blue-100 rounded-full animate-pulse"/>
                        </div>
                        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"/>
                        <div className="h-4 w-full bg-gray-100 rounded animate-pulse"/>
                        <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse"/>
                    </div>
                ))}
            </div>
        </div>
    )
}