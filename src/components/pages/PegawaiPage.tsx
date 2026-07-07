import { useState, useEffect } from "react";
import { Calendar, ChevronRight, RefreshCw, Search, Users, FileText, PieChart, TrendingUp, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { PEGAWAI_BY_TAB } from "../../data/pegawai";
import type { EmployeeItem, Page } from "../../types";

const BULAN_ID = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

function formatTanggalJam(date: Date): string {
  const tanggal = date.getDate();
  const bulan = BULAN_ID[date.getMonth()];
  const tahun = date.getFullYear();
  const jam = String(date.getHours()).padStart(2, "0");
  const menit = String(date.getMinutes()).padStart(2, "0");
  return `${tanggal} ${bulan} ${tahun} - ${jam}.${menit}`;
}

// Hitung minggu ke berapa (dalam bulan ini) untuk sebuah tanggal, minggu dimulai dari tanggal 1
function getWeekOfMonth(date: Date): number {
  return Math.ceil(date.getDate() / 7);
}

// Hitung total minggu dalam bulan dari sebuah tanggal
function getTotalWeeksInMonth(date: Date): number {
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  return Math.ceil(lastDay / 7);
}

// Generator angka semu-acak tapi konsisten (seeded), supaya tiap minggu/bulan
// selalu menghasilkan angka yang sama setiap kali dibuka, namun berbeda satu sama lain
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function getKehadiranForSeed(seed: number): { tepatWaktu: number; terlambat: number; tanpaKeterangan: number } {
  const r1 = seededRandom(seed);
  const r2 = seededRandom(seed + 100);
  const tepatWaktu = Math.round((70 + r1 * 25) * 10) / 10;
  const terlambat = Math.round((3 + r2 * 10) * 10) / 10;
  const tanpaKeterangan = Math.round((100 - tepatWaktu - terlambat) * 10) / 10;
  return { tepatWaktu, terlambat, tanpaKeterangan: Math.max(tanpaKeterangan, 0) };
}

// Statistik jumlah orang (hadir/ijin/tanpa keterangan) berdasarkan total pegawai tetap,
// tapi distribusinya berbeda tiap minggu/bulan mengikuti seed yang sama dengan persentase
function getStatsForSeed(seed: number, totalPegawai: number) {
  const r1 = seededRandom(seed + 200);
  const r2 = seededRandom(seed + 300);
  const ijin = Math.max(1, Math.round(r1 * 5));
  const tanpa = Math.max(0, Math.round(r2 * 4));
  const hadir = Math.max(0, totalPegawai - ijin - tanpa);
  return { total: totalPegawai, hadir, ijin, tanpa };
}

function getTrenForWeek(week: number): { label: string; hadir: number }[] {
  const hariLabel = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  return hariLabel.map((label, idx) => {
    const seed = week * 10 + idx;
    const r = seededRandom(seed);
    const base = idx < 5 ? 75 : 30; // weekday lebih tinggi dari weekend
    const hadir = Math.round(base + r * 20);
    return { label, hadir };
  });
}

function getTrenForMonth(month: number): { label: string; hadir: number }[] {
  const mingguLabel = ["Mgg 1", "Mgg 2", "Mgg 3", "Mgg 4"];
  return mingguLabel.map((label, idx) => {
    const seed = month * 20 + idx;
    const r = seededRandom(seed);
    const hadir = Math.round(70 + r * 25);
    return { label, hadir };
  });
}

const TREN_HARI_INI: { label: string; hadir: number }[] = [
  { label: "07:00", hadir: 8 },
  { label: "08:00", hadir: 52 },
  { label: "09:00", hadir: 68 },
  { label: "10:00", hadir: 71 },
  { label: "11:00", hadir: 70 },
  { label: "12:00", hadir: 65 },
  { label: "13:00", hadir: 67 },
  { label: "14:00", hadir: 66 },
  { label: "15:00", hadir: 58 },
  { label: "16:00", hadir: 15 },
];

const KEHADIRAN_HARI_INI = { tepatWaktu: 91.5, terlambat: 6.2, tanpaKeterangan: 2.3 };

export function PegawaiPage({
  darkMode, setSelectedEmployee, setPage,
}: {
  darkMode: boolean;
  setSelectedEmployee: (e: EmployeeItem) => void;
  setPage: (p: Page) => void;
}) {
  const [activeTab, setActiveTab] = useState("Hari Ini");
  const [query, setQuery] = useState("");
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const currentWeek = getWeekOfMonth(now);
  const totalWeeks = getTotalWeeksInMonth(now);
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);

  const currentMonth = now.getMonth(); // 0 = Januari ... 11 = Desember
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // Kalau tab pindah, pastikan minggu/bulan terpilih kembali ke posisi berjalan secara default
  useEffect(() => {
    if (activeTab === "Mingguan") {
      setSelectedWeek(currentWeek);
    } else if (activeTab === "Bulanan") {
      setSelectedMonth(currentMonth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const isFutureWeek = activeTab === "Mingguan" && selectedWeek > currentWeek;
  const isFutureMonth = activeTab === "Bulanan" && selectedMonth > currentMonth;
  const isFuture = isFutureWeek || isFutureMonth;

  const dataAsli = PEGAWAI_BY_TAB[activeTab];
  const filtered = dataAsli.employees.filter(e =>
    e.name.toLowerCase().includes(query.toLowerCase()) ||
    e.pos.toLowerCase().includes(query.toLowerCase())
  );

  // Statistik card (Total/Hadir/Ijin/Tanpa) dihitung dinamis sesuai minggu/bulan yang dipilih
  const data =
    activeTab === "Hari Ini" ? dataAsli :
    activeTab === "Mingguan" ? getStatsForSeed(selectedWeek, dataAsli.total) :
    getStatsForSeed(selectedMonth + 50, dataAsli.total);

  // Kehadiran & tren juga dihitung dinamis sesuai minggu/bulan yang dipilih
  const kehadiran =
    activeTab === "Hari Ini" ? KEHADIRAN_HARI_INI :
    activeTab === "Mingguan" ? getKehadiranForSeed(selectedWeek) :
    getKehadiranForSeed(selectedMonth + 50);

  const trenData =
    activeTab === "Hari Ini" ? TREN_HARI_INI :
    activeTab === "Mingguan" ? getTrenForWeek(selectedWeek) :
    getTrenForMonth(selectedMonth);

  const kehadiranLabel =
    activeTab === "Hari Ini" ? "Harian" :
    activeTab === "Mingguan" ? `Minggu ke-${selectedWeek}` :
    BULAN_ID[selectedMonth];

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
            <Calendar className="w-3 h-3" /><span className="font-semibold">{formatTanggalJam(now)}</span>
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

      {/* Pemilih Minggu ke- (hanya muncul di tab Mingguan) */}
      {activeTab === "Mingguan" && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {Array.from({ length: totalWeeks }, (_, idx) => idx + 1).map(week => {
            const isActive = week === selectedWeek;
            const isFutureItem = week > currentWeek;
            return (
              <button
                key={week}
                onClick={() => setSelectedWeek(week)}
                className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-[13px] font-bold transition-colors border ${
                  isActive
                    ? "bg-[#1F9EB0] text-white border-[#1F9EB0]"
                    : darkMode
                      ? `bg-gray-800 border-gray-700 ${isFutureItem ? "text-gray-500" : "text-gray-300"}`
                      : `bg-white border-gray-100 ${isFutureItem ? "text-gray-300" : "text-gray-600"}`
                }`}
              >
                Minggu {week}
              </button>
            );
          })}
        </div>
      )}

      {/* Pemilih Bulan (hanya muncul di tab Bulanan) */}
      {activeTab === "Bulanan" && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {BULAN_ID.map((namaBulan, idx) => {
            const isActive = idx === selectedMonth;
            const isFutureItem = idx > currentMonth;
            return (
              <button
                key={namaBulan}
                onClick={() => setSelectedMonth(idx)}
                className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-[13px] font-bold transition-colors border ${
                  isActive
                    ? "bg-[#1F9EB0] text-white border-[#1F9EB0]"
                    : darkMode
                      ? `bg-gray-800 border-gray-700 ${isFutureItem ? "text-gray-500" : "text-gray-300"}`
                      : `bg-white border-gray-100 ${isFutureItem ? "text-gray-300" : "text-gray-600"}`
                }`}
              >
                {namaBulan}
              </button>
            );
          })}
        </div>
      )}

      {isFuture ? (
        // Tampilan placeholder ketika minggu/bulan yang dipilih belum terjadi
        <div className={`${card} rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center text-center gap-3`}>
          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
            <Clock className={`w-7 h-7 ${sub}`} />
          </div>
          <div>
            <p className={`text-[15px] font-extrabold ${txt}`}>Belum Terlaksana</p>
            <p className={`text-[13px] ${sub} mt-1`}>
              {isFutureWeek
                ? `Minggu ke-${selectedWeek} bulan ini belum berlangsung. Data akan tersedia setelah minggu tersebut terlewati.`
                : `Bulan ${BULAN_ID[selectedMonth]} belum berlangsung. Data akan tersedia setelah bulan tersebut terlewati.`}
            </p>
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}