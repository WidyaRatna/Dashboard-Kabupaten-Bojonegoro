import { useState } from "react";
import { ChevronRight, Search, X } from "lucide-react";
import { ALL_MENUS } from "../../data/menuItems";
import type { Page } from "../../types";

export function SemualMenuModal({ onClose, setPage }: { onClose: () => void; setPage: (p: Page) => void }) {
  const [q, setQ] = useState("");
  const filtered = ALL_MENUS.filter(m => m.title.toLowerCase().includes(q.toLowerCase()) || m.cat.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end justify-center" onClick={onClose}>
      <div className="w-full max-w-md bg-white rounded-t-3xl flex flex-col" style={{ maxHeight: "85vh" }} onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-extrabold text-gray-800">Semua Menu</h2>
            <button onClick={onClose} aria-label="Tutup"><X className="w-5 h-5 text-gray-400" /></button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={q} onChange={e => setQ(e.target.value)}
              className="w-full bg-gray-50 rounded-xl pl-9 pr-4 py-2.5 text-[15px] border border-gray-100 outline-none placeholder:text-gray-400"
              placeholder="Cari menu..." />
          </div>
        </div>
        <div className="overflow-y-auto flex-1 p-4 space-y-1">
          {filtered.map((item, i) => (
            <button key={i} onClick={() => { setPage(item.page); onClose(); }}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className={`w-11 h-11 ${item.bg} ${item.fg} rounded-xl flex items-center justify-center flex-shrink-0`}>{item.icon}</div>
              <div className="flex-1 text-left">
                <p className="text-[15px] font-semibold text-gray-800">{item.title}</p>
                <p className=" text-[15px] text-gray-400">{item.cat}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
