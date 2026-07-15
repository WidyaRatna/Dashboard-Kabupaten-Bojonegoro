import { Home as HomeIcon, BarChart2, DollarSign, MessageCircle, Building2, AlertCircle, Users, X, Sun, Moon, LogOut } from "lucide-react";
import { useEffect } from "react";
import type { Page } from "../../types";
import type { ReactNode } from "react";
import { getGreeting, getGreetingColor, getGreetingIcon, getHeaderStyle, getTitleColor, getThemeAccentColor } from "../../utils/greeting";

const BOJONEGORO_LOGO_SRC = "https://upload.wikimedia.org/wikipedia/commons/1/18/Logo_Kabupaten_Bojonegoro.png";

const MENU_ITEMS: { page: Page; label: string; icon: ReactNode }[] = [
  { page: "home", label: "Home", icon: <HomeIcon className="w-5 h-5" /> },
  { page: "realisasi", label: "Realisasi", icon: <BarChart2 className="w-5 h-5" /> },
  { page: "pendapatan", label: "Pendapatan", icon: <DollarSign className="w-5 h-5" /> },
  { page: "pengadaan", label: "Pengadaan", icon: <Building2 className="w-5 h-5" /> },
  { page: "sentimen", label: "Sentimen", icon: <MessageCircle className="w-5 h-5" /> },
  { page: "isu-strategis", label: "Isu Strategis", icon: <AlertCircle className="w-5 h-5" /> },
  { page: "pegawai", label: "Pegawai", icon: <Users className="w-5 h-5" /> },
];

export function Sidebar({
  page,
  setPage,
  darkMode,
  collapsed,
  setCollapsed,
  onWidthChange,
  onLogout,
  isDesktop,
  userName = "Admin",
  userRole = "Administrator",
}: {
  page: Page;
  setPage: (p: Page) => void;
  darkMode: boolean;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  onWidthChange?: (width: number) => void;
  onLogout: () => void;
  isDesktop: boolean;
  userName?: string;
  userRole?: string;
}) {
  const greetingIcon = getGreetingIcon();
  const accentColor = getThemeAccentColor(darkMode);
  const userInitial = userName.trim().charAt(0).toUpperCase();

  // Lebar dipakai App.tsx untuk padding konten desktop (mobile pakai overlay, tidak butuh push)
  useEffect(() => {
    onWidthChange?.(collapsed ? 0 : 256);
  }, [collapsed, onWidthChange]);

  const active = (p: Page) =>
    ["realisasi", "realisasi-list", "opd-full"].includes(page) && p === "realisasi"
      ? true
      : page === p;

  const handleNav = (p: Page) => {
    setPage(p);
    // Di mobile, sidebar berperan sebagai drawer: tutup otomatis setelah memilih menu
    if (!isDesktop) setCollapsed(true);
  };

  // Sidebar tidak render apa-apa saat collapsed (tombol buka dipindah ke Header)
  if (collapsed) return null;

  return (
    <>
      {/* Backdrop gelap khusus mobile, tap untuk menutup drawer */}
      <div
        className="lg:hidden fixed inset-0 z-40 bg-black/50"
        onClick={() => setCollapsed(true)}
        aria-hidden="true"
      />

      <div
        className="fixed top-0 left-0 h-screen z-50 flex flex-col w-64 transition-all duration-200"
        style={{
          ...getHeaderStyle(darkMode),
          borderRight: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,23,42,0.06)",
        }}
      >
        {/* Logo, salam, dan judul dashboard */}
        <div
          className="px-4 py-4"
          style={{ borderBottom: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,23,42,0.06)" }}
        >
          <div className="flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5">
              <img
                src={BOJONEGORO_LOGO_SRC}
                alt="Logo Pemkab Bojonegoro"
                className="w-7 h-8 flex-shrink-0 object-contain"
              />
              <div
                className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 w-fit"
                style={{ background: darkMode ? "rgba(243,156,18,0.15)" : "rgba(255,255,255,0.6)" }}
              >
                {greetingIcon === "sun" ? (
                  <Sun className="w-2.5 h-2.5" style={{ color: getGreetingColor(darkMode) }} />
                ) : (
                  <Moon className="w-2.5 h-2.5" style={{ color: getGreetingColor(darkMode) }} />
                )}
                <p className="text-[10px] font-semibold" style={{ color: getGreetingColor(darkMode) }}>{getGreeting()}</p>
              </div>
            </div>

            {/* Tombol tutup sidebar */}
            <button
              onClick={() => setCollapsed(true)}
              aria-label="Tutup sidebar"
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
              style={{
                color: darkMode ? "#D1D5DB" : "#6B7280",
                background: darkMode ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.04)",
              }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h1
            className="font-['Plus_Jakarta_Sans',sans-serif] text-[13px] font-bold leading-tight mt-2"
            style={{ color: getTitleColor(darkMode) }}
          >
            Dashboard Kabupaten Bojonegoro
          </h1>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {MENU_ITEMS.map((item) => {
            const isActive = active(item.page);
            return (
              <button
                key={item.page}
                onClick={() => handleNav(item.page)}
                aria-label={item.label}
                className="flex items-center gap-3 w-full rounded-xl px-3 py-2.5 transition-colors"
                style={{
                  background: isActive
                    ? darkMode
                      ? "rgba(31,158,176,0.2)"
                      : "rgba(31,158,176,0.14)"
                    : "transparent",
                  color: isActive ? "#1F9EB0" : darkMode ? "#E5E7EB" : "#374151",
                }}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="text-sm font-semibold truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Info pengguna yang sedang login + tombol logout */}
        <div
          className="px-3 py-3 space-y-1"
          style={{ borderTop: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,23,42,0.06)" }}
        >
          <div className="flex items-center gap-2.5 rounded-xl px-2 py-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm text-white"
              style={{ background: accentColor }}
            >
              {userInitial}
            </div>
            <div className="min-w-0">
              <p
                className="text-sm font-semibold truncate"
                style={{ color: darkMode ? "#F3F4F6" : "#1F2937" }}
              >
                {userName}
              </p>
              <p
                className="text-[11px] truncate"
                style={{ color: darkMode ? "#9CA3AF" : "#6B7280" }}
              >
                {userRole}
              </p>
            </div>
          </div>

          <button
            onClick={onLogout}
            aria-label="Logout"
            className="flex items-center justify-center gap-2 w-full rounded-xl px-3 py-2 text-sm font-semibold transition-colors"
            style={{
              color: "#EF4444",
              background: darkMode ? "rgba(239,68,68,0.12)" : "rgba(239,68,68,0.08)",
            }}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}