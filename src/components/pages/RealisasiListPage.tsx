import { useState } from "react";
import { Building2, Search } from "lucide-react";
import { TRANSACTIONS } from "../../data/transactions";
import { BackButton } from "../shared/BackButton";
import type { Page } from "../../types";

export function RealisasiListPage({ darkMode, setPage }: { darkMode: boolean; setPage: (p: Page) => void }) {
  const [q, setQ] = useState("");
  const card = darkMode ? "bg-gray-800" : "bg-white";
  const txt = darkMode ? "text-gray-100" : "text-gray-800";
  const sub = darkMode ? "text-gray-400" : "text-gray-500";
  const sep = darkMode ? "border-gray-700" : "border-gray-50";
  const filtered = TRANSACTIONS.filter(t => t.kec.toLowerCase().includes(q.toLowerCase()) || t.cat.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="px-4 py-4 space-y-4 lg:px-8 lg:py-6">
      <BackButton onClick={() => setPage("home")} darkMode={darkMode} />
      <h2 className={`text-base font-extrabold ${txt}`}>Realisasi Keuangan</h2>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input value={q} onChange={e => setQ(e.target.value)}
          className={`w-full ${card} rounded-xl pl-9 pr-4 py-2.5 text-[13px] outline-none border ${darkMode ? "border-gray-700 text-gray-100" : "border-gray-100"} placeholder:text-gray-400`}
          placeholder="Cari transaksi..." />
      </div>
      <div className={`${card} rounded-2xl p-4 shadow-sm`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 space-y-3 lg:space-y-0">
          {filtered.map((item, i) => (
            <div key={i} className={`flex items-start gap-3 pb-3 border-b ${sep} last:border-0 last:pb-0 lg:last:border-b-0`}>
              <div className="w-8 h-8 bg-[#CCEEF2] rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                <Building2 className="w-4 h-4 text-[#1F9EB0]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-[14px] font-bold ${txt}`}>{item.kec}</p>
                <p className={`text-[12px] ${sub} leading-tight mt-0.5 line-clamp-2`}>{item.cat}</p>
                <p className={`text-[11px] ${darkMode ? "text-gray-500" : "text-gray-400"} mt-0.5`}>{item.date}</p>
              </div>
              <span className="text-[14px] font-bold text-[#1F9EB0] flex-shrink-0 pt-0.5">{item.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}