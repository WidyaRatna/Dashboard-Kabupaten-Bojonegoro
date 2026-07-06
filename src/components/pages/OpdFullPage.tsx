import { OPD_DATA } from "../../data/transactions";
import { BackButton } from "../shared/BackButton";
import type { Page } from "../../types";

export function OpdFullPage({ darkMode, setPage }: { darkMode: boolean; setPage: (p: Page) => void }) {
  const card = darkMode ? "bg-gray-800" : "bg-white";
  const txt = darkMode ? "text-gray-100" : "text-gray-800";
  const sub = darkMode ? "text-gray-400" : "text-gray-500";
  const track = darkMode ? "bg-gray-700" : "bg-gray-100";
  return (
    <div className="px-4 py-4 lg:px-8 lg:py-6">
      <BackButton onClick={() => setPage("realisasi")} darkMode={darkMode} />
      <h2 className={`text-sm font-bold ${txt} mb-4`}>Seluruh OPD — Peringkat Realisasi</h2>
      <div className={`${card} rounded-2xl p-4 shadow-sm`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 space-y-4 lg:space-y-0">
          {OPD_DATA.map((item, i) => (
            <div key={i} className="lg:py-2">
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[14px] ${txt} font-medium`}>{i + 1}. {item.name}</span>
                <span className="text-[14px] font-bold text-[#1F9EB0]">{item.pct}%</span>
              </div>
              <div className={`h-1.5 ${track} rounded-full overflow-hidden`}>
                <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: "#2BB2C2" }} />
              </div>
              <div className="flex justify-between mt-1">
                <span className={`text-[11px] ${sub}`}>{item.real}</span>
                <span className={`text-[11px] ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{item.target}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}