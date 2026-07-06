import { ArrowLeft } from "lucide-react";

export function BackButton({ onClick, darkMode }: { onClick: () => void; darkMode: boolean }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-1.5 text-[14px] font-semibold mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
      <ArrowLeft className="w-4 h-4" /> Kembali
    </button>
  );
}
