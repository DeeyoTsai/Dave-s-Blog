import Link from "next/link";

const navLinks = [
  { href: "/", label: "首頁" },
  { href: "/blog", label: "文章" },
  { href: "/about", label: "關於" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <nav className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-xl text-gray-900 hover:text-blue-600 transition-colors"
        >
          Dave's Blog
        </Link>
        {/* 導覽連結 */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* 右側操作區（Day 7 加入登入狀態判斷） */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            登入
          </Link>
          <Link
            href="/register"
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            註冊
          </Link>
        </div>
      </nav>
    </header>
  );
}
