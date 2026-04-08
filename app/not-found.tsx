import Link from "next/link";
export default function NotFound() {
  return (
    <div className="p-8 flex flex-col items-center justify-center text-center gap-6">
      <h1 className="text-9xl font-bold text-gray-200">404</h1>
      <h2 className="text-3xl font-bold text-gray-900">找不到這個頁面</h2>
      <p className="text-base text-gray-500">你要找的內容可能已移除或不存在</p>
      <Link href="/" className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800">
        回到首頁
      </Link>
    </div>
  );
}