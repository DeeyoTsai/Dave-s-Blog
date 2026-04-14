import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Card from "@/components/ui/card";
import Avatar from "@/components/ui/Avatar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Dave's Blog", template: "%s | Dave's Blog" },
  description: "分享 AI 技能學習、演算法筆記與工作心得的個人技術部落格",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-10">{children}</main>
        <footer className="border-t mt-20 py-8 text-center text-sm text-gray-400">
          © 2026 Dave's Blog · Built with Next.js
        </footer>
      </body>
    </html>
  );
}
