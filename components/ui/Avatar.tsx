// components/ui/Avatar.tsx
interface AvatarProps {
  name: string | null;
  image?: string | null;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-7 h-7 text-xs",
  md: "w-9 h-9 text-sm",
  lg: "w-14 h-14 text-xl",
};

export default function Avatar({ name, image, size = "md" }: AvatarProps) {
  // 取名字第一個字當首字母，沒有名字就用 ?
  const initial = name?.[0]?.toUpperCase() ?? "?";

  return image ? (
    // 有圖片 → 顯示圖片
    <img
      src={image}
      alt={name ?? "使用者"}
      className={`${sizeMap[size]} rounded-full object-cover`}
    />
  ) : (
    // 沒有圖片 → 顯示首字母
    <div
      className={`${sizeMap[size]} rounded-full bg-blue-600 text-white font-bold flex items-center justify-center flex-shrink-0`}
    >
      {initial}
    </div>
  );
}
