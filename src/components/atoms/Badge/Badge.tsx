import { IBadgeProps } from "./types";

export const Badge = ({ label, background = 'rgba(255,255,255,0.85)', color = '#0f172a' }: IBadgeProps) => {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold shadow"
      style={{ background, color }}
    >
      {label}
    </span>
  );
}
