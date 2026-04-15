interface CardPost {
  children: React.ReactNode;
  padding?: "sm" | "md" | "lg";
  className?: string;
}

const paddingMap = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Card({
  children,
  padding = "md",
  className = "",
}: CardPost) {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm ${paddingMap[padding]} ${className}`}
    >
      {children}
    </div>
  );
}
