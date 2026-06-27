import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        <rect width="36" height="36" rx="10" fill="#0B2E1F" />
        <circle cx="18" cy="14" r="4.5" fill="#F2B229" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1="18"
            y1="5.5"
            x2="18"
            y2="3"
            stroke="#F2B229"
            strokeWidth="1.4"
            strokeLinecap="round"
            transform={`rotate(${angle} 18 14)`}
          />
        ))}
        <rect x="9" y="23" width="18" height="3.4" rx="0.8" fill="#1E9E5A" />
        <rect x="9" y="27.4" width="18" height="3.4" rx="0.8" fill="#15573A" />
      </svg>
      <div className="leading-tight">
        <p
          className={cn(
            "font-display font-extrabold text-base tracking-tight",
            isDark ? "text-white" : "text-forest-800"
          )}
        >
          PRAKHAR
        </p>
        <p
          className={cn(
            "text-[10px] font-semibold tracking-wide",
            isDark ? "text-leaf-300" : "text-leaf-600"
          )}
        >
          GREEN ENERGY SOLUTIONS
        </p>
      </div>
    </div>
  );
}
