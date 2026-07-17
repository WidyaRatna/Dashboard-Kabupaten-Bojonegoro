import { Building2, ChevronRight, Wallet, Target, TrendingUp, Landmark } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
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

function StatCard({
  icon,
  label,
  value,
  sub,
  badge,
  darkMode,
  bg,
  bgDark,
  text,
  textDark,
  subText,
  subTextDark,
  badgeBg,
  badgeBgDark,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  badge?: string;
  darkMode: boolean;
  bg: string;
  bgDark: string;
  text: string;
  textDark: string;
  subText: string;
  subTextDark: string;
  badgeBg: string;
  badgeBgDark: string;
}) {
  return (
    <div
      className="rounded-3xl p-4 col-span-2 sm:col-span-1 relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: darkMode ? bgDark : bg,
        boxShadow: darkMode
          ? "0 2px 10px rgba(0,0,0,.25)"
          : "0 2px 10px rgba(15,23,42,.04)",
      }}
    >
      <div className="flex items-start justify-between gap-1 mb-2">
        <div className="flex items-center gap-1.5">
          <span style={{ color: darkMode ? textDark : text }}>{icon}</span>
          <p
            className="text-[12px] font-bold leading-tight"
            style={{ color: darkMode ? textDark : text }}
          >
            {label}
          </p>
        </div>
        {badge && (
          <span
            className="text-[10px] px-1.5 py-0.5 rounded-full font-extrabold flex-shrink-0"
            style={{
              background: darkMode ? badgeBgDark : badgeBg,
              color: darkMode ? textDark : text,
            }}
          >
            {badge}
          </span>
        )}
      </div>
      <p
        className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-black tracking-tight mt-1"
        style={{ color: darkMode ? textDark : text }}
      >
        {value}
      </p>
      <p
        className="text-[11px] mt-2 font-semibold"
        style={{ color: darkMode ? subTextDark : subText }}
      >
        {sub}
      </p>
    </div>
  );
}

function HeroCard({ darkMode }: { darkMode: boolean }) {
  const pct = useCountUp(29.1);

  return (
    <div
      className="rounded-3xl p-5 relative overflow-hidden transition-all duration-300"
      style={{
        background: darkMode ? "#18353E" : "#EBF7F9",
        boxShadow: darkMode
          ? "0 4px 24px rgba(0,0,0,.3)"
          : "0 4px 24px rgba(15,23,42,.05)",
      }}
    >
      <div className="relative">
        <p
          className="text-[12px] font-bold uppercase tracking-wider mb-1"
          style={{ color: darkMode ? "rgba(165,243,252,.7)" : "rgba(21,94,117,.7)" }}
        >
          Tahun Anggaran Berjalan 2026
        </p>

        <div className="flex items-end gap-3 mb-3">
          <h2
            className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl font-extrabold"
            style={{ color: darkMode ? "#FFFFFF" : "#0F172A" }}
          >
            Rp 8.07 T
          </h2>
          <span
            className="text-lg font-bold mb-0.5"
            style={{ color: darkMode ? "#38BDF8" : "#0891B2" }}
          >
            {pct.toFixed(1)}%
          </span>
        </div>

        <div
          className="h-2 rounded-full overflow-hidden mb-4"
          style={{ background: darkMode ? "rgba(255,255,255,.1)" : "rgba(15,23,42,.08)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${pct}%`, background: darkMode ? "#38BDF8" : "#0891B2" }}
          />
        </div>

        <div className="grid grid-cols-4 gap-3 lg:gap-4 mt-2">
          <StatCard
            icon={<Wallet className="w-3.5 h-3.5" />}
            label="Realisasi Belanja"
            value="Rp 1.57 T"
            sub="Pagu Belanja"
            badge="34.9%"
            darkMode={darkMode}
            bg="#EFF6FF"
            bgDark="rgba(59,130,246,0.14)"
            text="#2563EB"
            textDark="#93C5FD"
            subText="#64748B"
            subTextDark="#93C5FD"
            badgeBg="#DBEAFE"
            badgeBgDark="rgba(37,99,235,0.25)"
          />
          <StatCard
            icon={<Target className="w-3.5 h-3.5" />}
            label="Target Belanja"
            value="Rp 6.50 T"
            sub="Total Belanja"
            darkMode={darkMode}
            bg="#FFF7ED"
            bgDark="rgba(234,88,12,0.14)"
            text="#EA580C"
            textDark="#FDBA74"
            subText="#64748B"
            subTextDark="#FDBA74"
            badgeBg="#FFEDD5"
            badgeBgDark="rgba(234,88,12,0.25)"
          />
          <StatCard
            icon={<TrendingUp className="w-3.5 h-3.5" />}
            label="Realisasi Pendapatan"
            value="Rp 1.70 T"
            sub="Pagu Pendapatan"
            badge="31.9%"
            darkMode={darkMode}
            bg="#ECFDF5"
            bgDark="rgba(5,150,105,0.14)"
            text="#059669"
            textDark="#6EE7B7"
            subText="#64748B"
            subTextDark="#6EE7B7"
            badgeBg="#DCFCE7"
            badgeBgDark="rgba(21,128,61,0.25)"
          />
          <StatCard
            icon={<Landmark className="w-3.5 h-3.5" />}
            label="Target Pendapatan"
            value="Rp 4.57 T"
            sub="Total Pendapatan"
            darkMode={darkMode}
            bg="#F0FDFA"
            bgDark="rgba(15,118,110,0.14)"
            text="#0F766E"
            textDark="#5EEAD4"
            subText="#64748B"
            subTextDark="#5EEAD4"
            badgeBg="#CCFBF1"
            badgeBgDark="rgba(15,118,110,0.25)"
          />
        </div>
      </div>
    </div>
  );
}

function ComparisonChartCard({ darkMode }: { darkMode: boolean }) {
  const txt = darkMode ? "text-gray-100" : "text-[#0F172A]";

  return (
    <div
      className="rounded-3xl p-4"
      style={{
        background: darkMode ? "#1F2937" : "#FFFFFF",
        boxShadow: darkMode
          ? "0 4px 20px rgba(0,0,0,.25)"
          : "0 4px 20px rgba(15,23,42,.05)",
      }}
    >
      <h2 className={`text-base font-bold ${txt} mb-4`}>
        Perbandingan Realisasi vs Target (Rp Triliun)
      </h2>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={COMPARISON_DATA} margin={{ top: 5, right: 10, bottom: 5, left: -15 }} barCategoryGap="35%">
          <defs>
            <linearGradient id="gradRealisasi" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient id="gradTarget" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#F1F5F9"} vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 13, fill: darkMode ? "#E5E7EB" : "#64748B" }}
            axisLine={{ stroke: darkMode ? "#4B5563" : "#E2E8F0" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: darkMode ? "#E5E7EB" : "#64748B" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: darkMode ? "rgba(255,255,255,.04)" : "rgba(15,23,42,.03)" }}
            contentStyle={{
              background: darkMode ? "#111827" : "#fff",
              border: darkMode ? "1px solid #374151" : "1px solid #E2E8F0",
              borderRadius: 12,
              fontSize: 13,
              boxShadow: "0 8px 24px rgba(15,23,42,.08)",
            }}
            labelStyle={{ color: darkMode ? "#F9FAFB" : "#0F172A", fontWeight: 600 }}
            itemStyle={{ color: darkMode ? "#E5E7EB" : "#374151" }}
            formatter={(v: number) => [`Rp ${v} T`, ""]}
          />
          <Legend
            wrapperStyle={{ fontSize: 13, color: darkMode ? "#E5E7EB" : "#374151" }}
            iconType="circle"
          />
          <Bar dataKey="Realisasi" fill="url(#gradRealisasi)" radius={[10, 10, 0, 0]} maxBarSize={64} />
          <Bar dataKey="Target" fill="url(#gradTarget)" radius={[10, 10, 0, 0]} maxBarSize={64} />
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
  const cardStyle = {
    background: darkMode ? "#1F2937" : "#FFFFFF",
    boxShadow: darkMode
      ? "0 4px 20px rgba(0,0,0,.25)"
      : "0 4px 20px rgba(15,23,42,.05)",
  };
  const txt = darkMode ? "text-gray-100" : "text-[#0F172A]";
  const sub = darkMode ? "text-gray-400" : "text-[#64748B]";
  const sep = darkMode ? "border-gray-700" : "border-gray-50";

  return (
    <div className="px-4 pt-2 pb-4 lg:px-8 lg:pt-3 lg:pb-6 space-y-4 lg:space-y-6">
      <HeroCard darkMode={darkMode} />

      <ComparisonChartCard darkMode={darkMode} />

      <div className="space-y-4 lg:space-y-6 animate-fade-in">
        <div className="rounded-3xl p-4" style={cardStyle}>
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
                <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.fg} flex items-center justify-center`}>
                  {item.icon}
                </div>
                <span className={`text-[11px] ${sub} text-center leading-tight font-medium`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl p-4" style={cardStyle}>
          <div className="flex items-center justify-between mb-3">
            <h2 className={`text-base font-bold ${txt}`}>Realisasi Terkini</h2>
            <button
              onClick={() => setPage("realisasi-list")}
              className="text-[13px] flex items-center gap-0.5 font-medium"
              style={{ color: darkMode ? "#60A5FA" : "#2563EB" }}
            >
              Selengkapnya <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {TRANSACTIONS.slice(0, 4).map((item, i) => (
              <div key={i} className={`flex items-start gap-3 pb-3 border-b ${sep} last:border-0 last:pb-0`}>
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "#DBEAFE" }}
                >
                  <Building2 className="w-4 h-4" style={{ color: "#2563EB" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[13px] font-bold ${txt}`}>{item.kec}</p>
                  <p className={`text-[12px] ${sub} leading-tight mt-0.5 line-clamp-2`}>{item.cat}</p>
                  <p className={`text-[11px] ${darkMode ? "text-gray-500" : "text-gray-400"} mt-0.5`}>
                    {item.date}
                  </p>
                </div>
                <span
                  className="text-[13px] font-bold flex-shrink-0 pt-0.5"
                  style={{ color: darkMode ? "#60A5FA" : "#2563EB" }}
                >
                  {item.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl p-4" style={cardStyle}>
          <div className="flex items-center justify-between mb-3">
            <h2 className={`text-base font-bold ${txt}`}>Komentar Instagram Terbaru</h2>
            <button
              onClick={() => setPage("sentimen")}
              className="text-[13px] flex items-center gap-0.5 font-medium"
              style={{ color: darkMode ? "#60A5FA" : "#2563EB" }}
            >
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
                <div className="flex-shrink-0 pt-0.5">
                  <SentimentBadge sentiment={item.sentiment} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}