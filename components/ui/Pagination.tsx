"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Button from "./Button";

interface Props {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (pageNum: number) => {
    // 你的程式碼：建立新的 URLSearchParams
    // 提示：const params = new URLSearchParams(searchParams.toString())
    // 然後：params.set('page', pageNum.toString())
    // 最後：router.push(`/blog?${params.toString()}`)
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNum.toString());
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <div className="flex justify-center gap-2 mt-8">
      {/* 上一頁按鈕 */}
      <Button
        variant="secondary"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        上一頁
      </Button>

      {/* 頁碼按鈕 */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <Button
          key={pageNum}
          variant={pageNum === currentPage ? "primary" : "secondary"}
          onClick={() => goToPage(pageNum)}
        >
          {pageNum}
        </Button>
      ))}

      {/* 下一頁按鈕 */}
      <Button
        variant="secondary"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        下一頁
      </Button>
    </div>
  );
}
