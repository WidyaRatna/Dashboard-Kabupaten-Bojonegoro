import { useState } from "react";
import { Calendar, ChevronRight, RefreshCw, Search, Users, FileText, PieChart, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { PEGAWAI_BY_TAB } from "../../data/pegawai";
import type { EmployeeItem, Page } from "../../types";

// Data persentase kehadiran per tab (Hari Ini / Mingguan / Bulanan)
const KEHADIRAN_PCT: Record<string, { tepatWaktu: number; terlambat: number; tanpaKeterangan: number }> = {
  "Hari Ini": { tepatWaktu: 91.5, terlambat: 6.2, tanpaKeterangan: 2.3 },
  "Mingguan": { tepatWaktu: 0, terlambat: 1.1, tanpaKeterangan: 82.2 },
  "Bulanan": { tepatWaktu: 78.4, terlambat: 9.8, tanpaKeterangan: 11.8 },
};

// Data tren kehadiran (naik-turun) per tab, untuk grafik
const TREN_KEHADIRAN: Record<string, { label: string; hadir: number }[]> = {
  "Hari Ini": [
    { label: "07:00", hadir: 45 },
    { label: "08:00", hadir: 312 },
    { label: "09:00", hadir: 398 },
    { label: "10:00", hadir: 410 },
    { label: "11:00", hadir: 405 },
    { label: "12:00", hadir: 390 },
    { label: "13:00", hadir: 395 },
    { label: "14:00", hadir: 388 },
    { label: "15:00", hadir: 360 },
    { label: "16:00", hadir: 120 },
  ],
  "Mingguan": [
    { label: "Sen", hadir: 88 },
    { label: "Sel", hadir: 92 },
    { label: "Rab", hadir: 85 },
    { label: "Kam", hadir: 90 },
    { label: "Jum", hadir: 76 },
    { label: "Sab", hadir: 40 },
    { label: "Min", hadir: 12 },
  ],
  "Bulanan": [
    { label: "Mgg 1", hadir: 82 },
    { label: "Mgg 2", hadir: 79 },
    { label: "Mgg 3", hadir: 85 },
    { label: "Mgg 4", hadir: 88 },
  ],
};

export function PegawaiPage({
  darkMode, setSelectedEmployee, setPage,
}: {
  darkMode: boolean;
  setSelectedEmployee: (e: EmployeeItem) => void;
  setPage: (p: Page) => void;
}) {
  const [activeTab, setActiveTab] = useState("Hari Ini");
  const [query, setQuery] = useState("");

  const data = PEGAWAI_BY_TAB[activeTab];
  const filtered = data.employees.filter(e =>
    e.name.toLowerCase().includes(query.toLowerCase()) ||
    e.pos.toLowerCase().includes(query.toLowerCase())
  );

  const kehadiran = KEHADIRAN_PCT[activeTab];
  const kehadiranLabel = activeTab === "Hari Ini" ? "Harian" : activeTab === "Mingguan" ? "Mingguan" : "Bulanan";
  const trenData = TREN_KEHADIRAN[activeTab];

  const card = darkMode ? "bg-gray-800" : "bg-white";
  const txt = darkMode ? "text-gray-100" : "text-gray-800";
  const sub = darkMode ? "text-gray-400" : "text-gray-500";
  const track = darkMode ? "bg-gray-700" : "bg-gray-100";
  const gridColor = darkMode ? "#374151" : "#f0f0f0";
  const axisColor = "#9CA3AF";

  return (
    <div className="px-4 py-4 space-y-5 lg:px-8 lg:py-6 lg:space-y-6">
      <div>
        <h2 className={`text-base font-extrabold ${txt}`}>Statistik Kepegawaian</h2>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-1 text-[12px] bg-[#FEF9E7] text-[#F39C12] px-2 py-0.5 rounded-full">
            <Calendar className="w-3 h-3" /><span className="font-semibold">24 Juni 2026 - 14.55</span>
          </div>
          <div className={`flex items-center gap-1 text-[12px] ${sub}`}><RefreshCw className="w-3 h-3" /><span>Update Otomatis</span></div>
        </div>
      </div>

      {/* Tab Hari Ini / Mingguan / Bulanan */}
      <div className={`grid grid-cols-3 gap-1 ${darkMode ? "bg-gray-700" : "bg-gray-100"} rounded-2xl p-1`}>
        {["Hari Ini", "Mingguan", "Bulanan"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`py-2.5 rounded-xl text-[14px] font-bold transition-all ${activeTab === tab ? `${darkMode ? "bg-gray-600" : "bg-white"} shadow-sm text-[#1F9EB0]` : sub}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Statistik Cards */}
      <div className="grid grid-cols-2 gap-3">
        {[
          {
            label: "Total Pegawai", value: data.total, bg: "bg-[#FEF9E7]",
            icon: <Users className="w-5 h-5 text-[#F39C12]" />
          },
          {
            label: "Hadir", value: data.hadir, bg: "bg-[#D5F5E3]",
            icon: <span className="text-[#2ECC71] text-xl font-bold">✓</span>
          },
          {
            label: "Ijin/Dinas", value: data.ijin, bg: "bg-[#FDEBD0]",
            icon: <FileText className="w-5 h-5 text-[#E67E22]" />
          },
          {
            label: "Tanpa Keterangan", value: data.tanpa, bg: "bg-[#F9E4D4]",
            icon: <span className="text-[#D35400] text-xl font-bold">✗</span>
          },
        ].map((item, i) => (
          <div key={i} className={`${card} rounded-2xl p-4 shadow-sm`}>
            <div className={`w-11 h-11 ${item.bg} rounded-full flex items-center justify-center mb-3`}>{item.icon}</div>
            <p className={`text-[11px] ${sub} uppercase font-bold tracking-wide`}>{item.label}</p>
            <p className={`font-['Plus_Jakarta_Sans',sans-serif] text-3xl font-extrabold ${txt} mt-0.5`}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Card Persentase Kehadiran */}
      <div className={`${card} rounded-2xl p-4 shadow-sm`}>
        <h3 className={`text-sm font-bold ${txt} mb-4 flex items-center gap-1.5`}>
          <PieChart className="w-4 h-4 text-[#3B82F6]" /> Persentase Kehadiran {kehadiranLabel}
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className={`text-[13px] font-semibold ${sub}`}>Tepat Waktu</span>
              <span className={`text-[13px] font-bold ${txt}`}>{kehadiran.tepatWaktu}%</span>
            </div>
            <div className={`h-1.5 ${track} rounded-full overflow-hidden`}>
              <div className="h-full rounded-full" style={{ width: `${Math.min(kehadiran.tepatWaktu, 100)}%`, background: "#2ECC71" }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className={`text-[13px] font-semibold ${sub}`}>Terlambat</span>
              <span className={`text-[13px] font-bold ${txt}`}>{kehadiran.terlambat}%</span>
            </div>
            <div className={`h-1.5 ${track} rounded-full overflow-hidden`}>
              <div className="h-full rounded-full" style={{ width: `${Math.min(kehadiran.terlambat, 100)}%`, background: "#F39C12" }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className={`text-[13px] font-semibold ${sub}`}>Tanpa Keterangan</span>
              <span className={`text-[13px] font-bold ${txt}`}>{kehadiran.tanpaKeterangan}%</span>
            </div>
            <div className={`h-1.5 ${track} rounded-full overflow-hidden`}>
              <div className="h-full rounded-full" style={{ width: `${Math.min(kehadiran.tanpaKeterangan, 100)}%`, background: "#E74C3C" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Card Grafik Tren Kehadiran */}
      <div className={`${card} rounded-2xl p-4 shadow-sm`}>
        <h3 className={`text-sm font-bold ${txt} mb-4 flex items-center gap-1.5`}>
          <TrendingUp className="w-4 h-4 text-[#1F9EB0]" /> Tren Kehadiran {kehadiranLabel}
        </h3>
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer>
            <LineChart data={trenData} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: axisColor }}
                axisLine={{ stroke: gridColor }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: axisColor }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: darkMode ? "#1f2937" : "#ffffff",
                  border: "none",
                  borderRadius: 12,
                  fontSize: 12,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
                labelStyle={{ color: darkMode ? "#e5e7eb" : "#374151", fontWeight: 600 }}
                itemStyle={{ color: "#1F9EB0" }}
                formatter={(value: number) => [
                  activeTab === "Hari Ini" ? `${value} orang` : `${value}%`,
                  "Kehadiran",
                ]}
              />
              <Line
                type="monotone"
                dataKey="hadir"
                stroke="#1F9EB0"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#1F9EB0", strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input value={query} onChange={e => setQuery(e.target.value)}
          className={`w-full ${card} rounded-xl pl-9 pr-4 py-3 text-[13px] outline-none shadow-sm border ${darkMode ? "border-gray-700 text-gray-100" : "border-gray-100"} placeholder:text-gray-400`}
          placeholder="Cari nama pegawai..." />
      </div>

      {/* Daftar Pegawai */}
      <div>
        <h3 className={`text-sm font-bold ${txt} mb-3`}>Daftar Pegawai</h3>
        <div className="space-y-3">
          {filtered.map((item, i) => (
            <div key={i} className={`${card} rounded-xl p-3 shadow-sm flex items-center gap-3`}>
              <div className={`w-11 h-11 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <span className="text-white text-[14px] font-extrabold">{item.name.slice(0, 2)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-[14px] font-extrabold ${txt} truncate`}>{item.name}</p>
                <p className={`text-[12px] ${sub} truncate`}>{item.pos}</p>
                <div className="flex gap-3 mt-1">
                  <span className={`text-[11px] ${sub}`}>CEK IN: <span className={`font-bold ${txt}`}>{item.in}</span></span>
                  <span className={`text-[11px] ${sub}`}>CEK OUT: <span className={`font-bold ${txt}`}>{item.out}</span></span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-[11px] font-bold bg-[#D5F5E3] text-[#1E8449] px-2 py-1 rounded-full">{item.status}</span>
                <button
                  onClick={() => { setSelectedEmployee(item); setPage("employee-detail"); }}
                  aria-label={`Lihat detail ${item.name}`}
                >
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}