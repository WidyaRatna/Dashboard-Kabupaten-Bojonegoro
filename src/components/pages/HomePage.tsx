import { Building2, ChevronRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Legend } from "recharts";
import { COMMENTS_ALL } from "../../data/sentimen";
import { MENU_ITEMS } from "../../data/menuItems";
import { TRANSACTIONS } from "../../data/transactions";
import { useCountUp } from "../../hooks/useCountUp";
import { SentimentBadge } from "../shared/SentimentBadge";
import type { Page } from "../../types";

const COMPARISON_DATA = [
  { name: "Belanja", Realisasi: 1.57, Target: 6.50 },
  { name: "Pendapatan", Realisasi: 1.70, Target: 4.57 },
];

function HeroCard({ darkMode }: { darkMode: boolean }) {
  const pct = useCountUp(29.1);
  return (
    <div className="rounded-2xl p-5 text-white relative overflow-hidden"
      style={{ background: darkMode ? "linear-gradient(135deg, #14495B 0%, #0E3A66 100%)" : "linear-gradient(135deg, #1F9EB0 0%, #1565C0 100%)" }}>
      <div className="absolute top-0 right-0 w-40 h-40 opacity-10">
        <svg viewBox="0 0 120 120" fill="white"><circle cx="100" cy="20" r="90" /></svg>
      </div>
      <div className="relative">
        <p className="text-[12px] font-bold uppercase tracking-wider opacity-80 mb-1">Tahun Anggaran Berjalan 2026</p>
        <div className="flex items-end gap-3 mb-3">
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl font-extrabold">Rp 8.07 T</h2>
          <span className="text-lg font-bold opacity-90 mb-0.5">{pct.toFixed(1)}%</span>
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${pct}%` }} />
        </div>
        <div className="grid grid-cols-4 gap-3 lg:gap-4 mt-2">
          <div className="rounded-2xl p-4 col-span-2 sm:col-span-1 shadow-md text-white relative overflow-hidden transition-all duration-300 hover:scale-[1.02]"
            style={{ background: darkMode ? "linear-gradient(150deg, #2D4A7A 0%, #1E3560 55%, #14264A 100%)" : "linear-gradient(150deg, #3B82F6 0%, #1E40AF 55%, #0F2E8C 100%)" }}>
            <div className="flex items-start justify-between gap-1 mb-2">
              <p className="text-[12px] font-bold opacity-90 leading-tight">Realisasi Belanja</p>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-extrabold flex-shrink-0">34.9%</span>
            </div>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-black tracking-tight mt-1">Rp 1.57 T</p>
            <p className="text-[11px] opacity-75 mt-2 font-semibold">Pagu Belanja</p>
          </div>

          <div className="rounded-2xl p-4 col-span-2 sm:col-span-1 shadow-md text-white relative overflow-hidden transition-all duration-300 hover:scale-[1.02]"
            style={{ background: darkMode ? "linear-gradient(150deg, #7A5228 0%, #603D18 55%, #452B10 100%)" : "linear-gradient(150deg, #FFA733 0%, #E8730C 55%, #B85700 100%)" }}>
            <div className="flex items-start justify-between gap-1 mb-2">
              <p className="text-[12px] font-bold opacity-90 leading-tight">Target Belanja</p>
            </div>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-black tracking-tight mt-1">Rp 6.50 T</p>
            <p className="text-[11px] opacity-75 mt-2 font-semibold">Total Belanja</p>
          </div>

          <div className="rounded-2xl p-4 col-span-2 sm:col-span-1 shadow-md text-white relative overflow-hidden transition-all duration-300 hover:scale-[1.02]"
            style={{ background: darkMode ? "linear-gradient(150deg, #1F6B54 0%, #17513F 55%, #103A2E 100%)" : "linear-gradient(150deg, #34E4B0 0%, #0AA67E 55%, #06805F 100%)" }}>
            <div className="flex items-start justify-between gap-1 mb-2">
              <p className="text-[12px] font-bold opacity-90 leading-tight">Realisasi Pendapatan</p>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-extrabold flex-shrink-0">31.9%</span>
            </div>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-black tracking-tight mt-1">Rp 1.70 T</p>
            <p className="text-[11px] opacity-75 mt-2 font-semibold">Pagu Pendapatan</p>
          </div>

          <div className="rounded-2xl p-4 col-span-2 sm:col-span-1 shadow-md text-white relative overflow-hidden transition-all duration-300 hover:scale-[1.02]"
            style={{ background: darkMode ? "linear-gradient(150deg, #1E5C33 0%, #164726 55%, #0F331B 100%)" : "linear-gradient(150deg, #22C55E 0%, #0E7F35 55%, #0A5F28 100%)" }}>
            <div className="flex items-start justify-between gap-1 mb-2">
              <p className="text-[12px] font-bold opacity-90 leading-tight">Target Pendapatan</p>
            </div>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-black tracking-tight mt-1">Rp 4.57 T</p>
            <p className="text-[11px] opacity-75 mt-2 font-semibold">Total Pendapatan</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComparisonChartCard({ darkMode }: { darkMode: boolean }) {
  const card = darkMode ? "bg-gray-800" : "bg-white";
  const txt = darkMode ? "text-gray-100" : "text-gray-800";

  return (
    <div className={`${card} rounded-2xl p-4 shadow-sm`}>
      <h2 className={`text-base font-bold ${txt} mb-4`}>Perbandingan Realisasi vs Target (Rp Triliun)</h2>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={COMPARISON_DATA} margin={{ top: 5, right: 10, bottom: 5, left: -15 }}>
          <defs>
            <linearGradient id="gradRealisasi" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22D3EE" />
              <stop offset="100%" stopColor="#0E6E7D" />
            </linearGradient>
            <linearGradient id="gradTarget" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFB84D" />
              <stop offset="100%" stopColor="#D9720A" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#f0f0f0"} />
          <XAxis dataKey="name" tick={{ fontSize: 13, fill: darkMode ? "#E5E7EB" : "#6B7280" }} axisLine={{ stroke: darkMode ? "#4B5563" : "#e5e7eb" }} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: darkMode ? "#E5E7EB" : "#6B7280" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: darkMode ? "#1F2937" : "#fff", border: darkMode ? "1px solid #374151" : "none", borderRadius: 10, fontSize: 13 }}
            labelStyle={{ color: darkMode ? "#F9FAFB" : "#111827", fontWeight: 600 }}
            itemStyle={{ color: darkMode ? "#E5E7EB" : "#374151" }}
            formatter={(v: number) => [`Rp ${v} T`, ""]}
          />
          <Legend wrapperStyle={{ fontSize: 13, color: darkMode ? "#E5E7EB" : "#374151" }} />
          <Bar dataKey="Realisasi" fill="url(#gradRealisasi)" radius={[8, 8, 0, 0]} />
          <Bar dataKey="Target" fill="url(#gradTarget)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function HomePage({
  setPage,
  darkMode,
  onOpenAllMenus,
}: {
  setPage: (p: Page) => void;
  darkMode: boolean;
  onOpenAllMenus: () => void;
}) {
  const card = darkMode ? "bg-gray-800" : "bg-white";
  const txt = darkMode ? "text-gray-100" : "text-gray-800";
  const sub = darkMode ? "text-gray-400" : "text-gray-500";
  const sep = darkMode ? "border-gray-700" : "border-gray-50";

  return (
    <div className="px-4 py-4 space-y-4 lg:px-8 lg:py-6 lg:space-y-6">
      <HeroCard darkMode={darkMode} />

      <ComparisonChartCard darkMode={darkMode} />

      <div className="space-y-4 lg:space-y-6 animate-fade-in">
        <div className={`${card} rounded-2xl p-4 shadow-sm`}>
          <div className="flex items-center justify-between mb-3">
            <h2 className={`text-base font-bold ${txt}`}>Menu Cepat</h2>
            <span className={`text-[12px] ${sub}`}>Akses cepat ke semua menu</span>
          </div>
          <div className="grid grid-cols-4 gap-3 lg:gap-4">
            {MENU_ITEMS.map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  if (item.page) {
                    setPage(item.page);
                    return;
                  }
                  onOpenAllMenus();
                }}
                className="flex flex-col items-center gap-1.5 transition-transform hover:scale-105 duration-200"
              >
                <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.fg} flex items-center justify-center`}>{item.icon}</div>
                <span className={`text-[11px] ${sub} text-center leading-tight font-medium`}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={`${card} rounded-2xl p-4 shadow-sm`}>
          <div className="flex items-center justify-between mb-3">
            <h2 className={`text-base font-bold ${txt}`}>Realisasi Terkini</h2>
            <button onClick={() => setPage("realisasi-list")} className="text-[13px] text-[#1F9EB0] flex items-center gap-0.5 font-medium">
              Selengkapnya <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {TRANSACTIONS.slice(0, 4).map((item, i) => (
              <div key={i} className={`flex items-start gap-3 pb-3 border-b ${sep} last:border-0 last:pb-0`}>
                <div className="w-8 h-8 bg-[#CCEEF2] rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Building2 className="w-4 h-4 text-[#1F9EB0]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[13px] font-bold ${txt}`}>{item.kec}</p>
                  <p className={`text-[12px] ${sub} leading-tight mt-0.5 line-clamp-2`}>{item.cat}</p>
                  <p className={`text-[11px] ${darkMode ? "text-gray-500" : "text-gray-400"} mt-0.5`}>{item.date}</p>
                </div>
                <span className="text-[13px] font-bold text-[#1F9EB0] flex-shrink-0 pt-0.5">{item.amount}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`${card} rounded-2xl p-4 shadow-sm`}>
          <div className="flex items-center justify-between mb-3">
            <h2 className={`text-base font-bold ${txt}`}>Komentar Instagram Terbaru</h2>
            <button onClick={() => setPage("sentimen")} className="text-[13px] text-[#1F9EB0] flex items-center gap-0.5 font-medium">
              Selengkapnya <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {COMMENTS_ALL.map((item, i) => (
              <div key={i} className={`flex items-start gap-3 pb-3 border-b ${sep} last:border-0 last:pb-0`}>
                <div className={`w-8 h-8 ${item.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-xs font-bold">{item.user[0].toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[13px] font-bold ${txt}`}>{item.user}</p>
                  <p className={`text-[12px] ${sub} mt-0.5 line-clamp-2`}>{item.comment}</p>
                </div>
                <div className="flex-shrink-0 pt-0.5"><SentimentBadge sentiment={item.sentiment} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}