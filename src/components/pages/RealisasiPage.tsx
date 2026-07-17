import { useState } from "react";
import { ChevronRight, Clock } from "lucide-react";
import {
  BarChart,
  Bar,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { MONTHS_DATA, OPD_DATA } from "../../data/transactions";
import { useCountUp } from "../../hooks/useCountUp";
import type { Page } from "../../types";

// Parses strings like "Rp 1.6 T", "Rp 800 M", "Rp 0" into a numeric value in Triliun (T)
function parseToTriliun(value: string): number {
  if (!value) return 0;
  const cleaned = value.replace(/rp/i, "").trim();
  const num = parseFloat(cleaned.replace(",", "."));
  if (isNaN(num)) return 0;
  if (/t\b/i.test(cleaned)) return num;
  if (/m\b/i.test(cleaned)) return num / 1000;
  if (/jt\b/i.test(cleaned)) return num / 1000000;
  return num;
}

export function RealisasiPage({ darkMode, setPage }: { darkMode: boolean; setPage: (p: Page) => void }) {
  const [viewMode, setViewMode] = useState<"card" | "chart">("card");
  const card = darkMode ? "bg-gray-800" : "bg-white";
  const txt = darkMode ? "text-gray-100" : "text-gray-800";
  const sub = darkMode ? "text-gray-400" : "text-gray-500";
  const track = darkMode ? "bg-gray-700" : "bg-gray-100";
  const heroPct = useCountUp(24.2);

  const chartData = MONTHS_DATA.map(m => ({
    name: m.m,
    realisasi: parseToTriliun(m.real),
    target: parseToTriliun(m.target),
    pct: m.pct,
  }));

  return (
    <div className="px-4 py-4 space-y-5 lg:px-8 lg:py-6 lg:space-y-6">
      <div
        className="rounded-2xl p-5 text-white relative overflow-hidden"
        style={{
          background: darkMode
            ? "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 30%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.18) 100%), #1E3A6B"
            : "linear-gradient(160deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 30%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.10) 100%), #2563EB",
        }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10"><svg viewBox="0 0 120 120" fill="white"><circle cx="100" cy="20" r="80" /></svg></div>
        <div className="relative">
          <div className="flex items-start justify-between mb-1">
            <p className="text-[12px] font-bold uppercase tracking-wider opacity-80">Total Realisasi Berjalan</p>
            <div className="flex items-center gap-1 text-[12px] opacity-75 bg-white/10 px-2 py-0.5 rounded-full">
              <Clock className="w-3 h-3" /><span>19 Jun 2026, 00:00</span>
            </div>
          </div>
          <div className="flex items-end gap-3 mt-1 mb-0.5">
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-4xl font-extrabold">Rp 1.6 T</h2>
            <span className="text-xl font-bold opacity-90 mb-0.5">{heroPct.toFixed(1)}%</span>
          </div>
          <p className="text-sm opacity-75">Dari Pagu Rp 6.5 T</p>
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="opacity-80">Persentase Capaian</span>
              <span className="font-bold">{heroPct.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all duration-75" style={{ width: `${heroPct}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className={`text-base font-bold ${txt}`}>Progres Bulanan</h2>
          <div className="flex gap-1">
            {[{ v: "card" as const, lbl: "Card" }, { v: "chart" as const, lbl: "Chart" }].map(b => (
              <button key={b.v} onClick={() => setViewMode(b.v)}
                className="text-[13px] px-3 py-1 rounded-lg font-semibold flex items-center gap-1 transition-colors"
                style={viewMode === b.v ? { background: "#1F9EB0", color: "white" } : { background: darkMode ? "#374151" : "#f3f4f6", color: darkMode ? "#9CA3AF" : "#6B7280" }}>
                {b.lbl}
              </button>
            ))}
          </div>
        </div>

        {viewMode === "card" ? (
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 lg:grid lg:grid-cols-6 lg:overflow-visible lg:pb-0 lg:mx-0 lg:px-0">
            {MONTHS_DATA.map((m, i) => (
              <div key={i} className={`${card} rounded-xl p-3 flex-shrink-0 w-[130px] lg:w-auto shadow-sm`}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[12px] font-bold ${sub}`}>{m.m}</span>
                  <span className="text-[12px] font-bold text-[#1F9EB0]">{m.pct}%</span>
                </div>
                <p className={`text-[11px] ${sub} uppercase font-semibold`}>Realisasi</p>
                <p className={`text-[13px] font-bold ${txt}`}>{m.real}</p>
                <div className={`my-1.5 h-1 rounded-full overflow-hidden ${darkMode ? "bg-gray-700" : "bg-[#E0F7FA]"}`}>
                  <div className="h-full rounded-full" style={{ width: `${Math.min(m.pct * 4, 100)}%`, background: "#2BB2C2" }} />
                </div>
                <p className={`text-[11px] ${sub}`}>Target: {m.target}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Chart 1: Target vs Realisasi (line/area, dalam nilai Rupiah T) */}
            <div className={`${card} rounded-2xl p-4 shadow-sm`}>
              <div className="flex items-center justify-center gap-6 mb-2">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-3 h-3 rounded-full border-2"
                    style={{ borderColor: "#2563EB", background: darkMode ? "#1F2937" : "#fff" }}
                  />
                  <span className={`text-[12px] font-medium ${txt}`}>Target</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-3 h-3 rounded-full border-2"
                    style={{ borderColor: "#16A34A", background: darkMode ? "#1F2937" : "#fff" }}
                  />
                  <span className={`text-[12px] font-medium ${txt}`}>Realisasi</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <ComposedChart data={chartData} margin={{ top: 5, right: 15, bottom: 5, left: -12 }}>
                  <defs>
                    <linearGradient id="realisasiFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#16A34A" stopOpacity={0.18} />
                      <stop offset="100%" stopColor="#16A34A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#374151" : "#f0f0f0"} />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: darkMode ? "#9CA3AF" : "#6B7280" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: darkMode ? "#9CA3AF" : "#6B7280" }}
                    tickFormatter={(v: number) => `${v} T`}
                  />
                  <Tooltip
                    contentStyle={{ background: darkMode ? "#1F2937" : "#fff", border: darkMode ? "1px solid #374151" : "none", borderRadius: 10, fontSize: 12 }}
                    labelStyle={{ color: darkMode ? "#F9FAFB" : "#111827", fontWeight: 600 }}
                    itemStyle={{ color: darkMode ? "#E5E7EB" : "#374151" }}
                    formatter={(v: number, name: string) => [`Rp ${v.toFixed(2)} T`, name === "target" ? "Target" : "Realisasi"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#2563EB"
                    strokeWidth={2}
                    strokeDasharray="6 4"
                    dot={{ r: 4, fill: darkMode ? "#1F2937" : "#fff", stroke: "#2563EB", strokeWidth: 2 }}
                    activeDot={{ r: 5 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="realisasi"
                    stroke="#16A34A"
                    strokeWidth={2.5}
                    fill="url(#realisasiFill)"
                    dot={{ r: 4, fill: darkMode ? "#1F2937" : "#fff", stroke: "#16A34A", strokeWidth: 2 }}
                    activeDot={{ r: 5 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Chart 2: Persentase realisasi per bulan (bar chart lama) */}
            <div className={`${card} rounded-2xl p-4 shadow-sm`}>
              <p className={`text-[13px] font-semibold ${txt} mb-2`}>Persentase Realisasi per Bulan</p>
              <ResponsiveContainer width="100%" height={170}>
                <BarChart data={chartData} margin={{ top: 5, right: 8, bottom: 5, left: -22 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#f0f0f0"} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: darkMode ? "#E5E7EB" : "#6B7280" }} />
                  <YAxis tick={{ fontSize: 11, fill: darkMode ? "#E5E7EB" : "#6B7280" }} unit="%" />
                  <Tooltip
                    contentStyle={{ background: darkMode ? "#1F2937" : "#fff", border: darkMode ? "1px solid #374151" : "none", borderRadius: 10, fontSize: 12 }}
                    labelStyle={{ color: darkMode ? "#F9FAFB" : "#111827", fontWeight: 600 }}
                    itemStyle={{ color: darkMode ? "#E5E7EB" : "#374151" }}
                    formatter={(v: number) => [`${v}%`, "Realisasi"]}
                  />
                  <Bar dataKey="pct" fill="#2BB2C2" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:gap-6">
        <div className={`${card} rounded-2xl p-4 shadow-sm`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-base font-bold ${txt}`}>Top 5 OPD Tertinggi</h2>
            <button onClick={() => setPage("opd-full")} className="text-[13px] text-[#1F9EB0] flex items-center gap-0.5 font-medium">
              Lihat Semua <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-4">
            {OPD_DATA.slice(0, 5).map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[13px] ${txt} font-medium`}>{i + 1}. {item.name}</span>
                  <span className="text-[13px] font-bold text-[#1F9EB0]">{item.pct}%</span>
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

        <div className={`${card} rounded-2xl p-4 shadow-sm`}>
          <h2 className={`text-base font-bold ${txt} mb-4`}>Komposisi Belanja</h2>
          <div className="flex h-4 rounded-full overflow-hidden mb-4">
            <div style={{ width: "45%", background: "#1F9EB0" }} />
            <div style={{ width: "28%", background: "#2ECC71" }} />
            <div style={{ width: "17%", background: "#F39C12" }} />
            <div style={{ width: "10%", background: "#E67E22" }} />
          </div>
          <div className="space-y-2.5">
            {[
              { label: "Belanja Pegawai", pct: "45%", amount: "Rp 2.9 T", color: "#1F9EB0" },
              { label: "Belanja Barang/Jasa", pct: "28%", amount: "Rp 1.8 T", color: "#2ECC71" },
              { label: "Belanja Modal", pct: "17%", amount: "Rp 1.1 T", color: "#F39C12" },
              { label: "Belanja Lainnya", pct: "10%", amount: "Rp 650 M", color: "#E67E22" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                <span className={`text-[13px] ${sub} flex-1`}>{item.label}</span>
                <span className={`text-[13px] font-bold ${txt} w-8 text-right`}>{item.pct}</span>
                <span className={`text-[12px] ${sub} w-20 text-right`}>{item.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}