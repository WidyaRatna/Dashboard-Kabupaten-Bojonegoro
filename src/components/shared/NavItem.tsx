import type { ReactNode } from "react";

export function NavItem({ icon, label, active, onClick }: { icon: ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} aria-label={label} className="flex flex-col items-center gap-0.5 px-2 py-1 min-w-[48px]">
      <span style={{ color: active ? "#1F9EB0" : "#9CA3AF" }}>{icon}</span>
      <span className="text-[10px] font-semibold leading-tight" style={{ color: active ? "#1F9EB0" : "#9CA3AF" }}>{label}</span>
    </button>
  );
}