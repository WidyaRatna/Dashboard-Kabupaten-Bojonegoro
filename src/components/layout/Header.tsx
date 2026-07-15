import { Lock, Moon, User, Home, ChevronRight, LayoutGrid, Menu } from "lucide-react";
import { getThemeAccentColor } from "../../utils/greeting";
import type { Page } from "../../types";

export const DESKTOP_TOPBAR_HEIGHT = 64;

const PAGE_LABELS: Partial<Record<Page, string>> = {
  home: "Beranda",
  realisasi: "Realisasi",
  "realisasi-list": "Realisasi",
  "opd-full": "Realisasi",
  pendapatan: "Pendapatan",
  pengadaan: "Pengadaan",
  sentimen: "Sentimen",
  "isu-strategis": "Isu Strategis",
  pegawai: "Pegawai",
  "employee-detail": "Pegawai",
};

// Pill "Dashboard" - abu-abu netral, tidak berubah
function getDashboardPillStyle(darkMode: boolean) {
  return {
    color: darkMode ? "#D1D5DB" : "#6B7280",
    background: darkMode ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.04)",
    borderColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(15,23,42,0.08)",
  };
}

// Pill label halaman - warna ikut tema waktu, background putih supaya tetap jelas
function getPageBadgeStyle(darkMode: boolean) {
  const color = getThemeAccentColor(darkMode);
  return {
    color,
    background: darkMode ? "rgba(31,41,55,0.6)" : "#FFFFFF",
    borderColor: darkMode ? "rgba(255,255,255,0.15)" : `${color}59`, // ~35% opacity
  };
}

export function Header({
  page,
  darkMode, setDarkMode, onLock, onProfile,
  sidebarCollapsed, onOpenSidebar, isDesktop,
}: {
  page: Page;
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  onLock: () => void;
  onProfile: () => void;
  sidebarCollapsed: boolean;
  onOpenSidebar: () => void;
  isDesktop: boolean;
}) {
  const currentLabel = PAGE_LABELS[page] ?? "Beranda";
  const dashboardPillStyle = getDashboardPillStyle(darkMode);
  const pageBadgeStyle = getPageBadgeStyle(darkMode);

  // Hamburger tampil di mobile selalu (sidebar = drawer), di desktop hanya saat sidebar tertutup
  const showHamburger = !isDesktop || sidebarCollapsed;

  const actionButtons = [
    { icon: <Lock className="w-4 h-4" />, fn: onLock, label: "Kunci" },
    { icon: <Moon className="w-4 h-4" />, fn: () => setDarkMode(!darkMode), label: "Mode gelap" },
    { icon: <User className="w-4 h-4" />, fn: onProfile, label: "Profil" },
  ];

  return (
    <div
      className="fixed top-0 right-0 z-30 flex items-center justify-between px-4 lg:px-6"
      style={{
        left: isDesktop ? (sidebarCollapsed ? 0 : "var(--sidebar-w, 256px)") : 0,
        height: DESKTOP_TOPBAR_HEIGHT,
      }}
    >
      <div className="flex items-center gap-1.5 text-sm min-w-0">
        {showHamburger && (
          <button
            onClick={onOpenSidebar}
            aria-label="Buka sidebar"
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-sm border flex-shrink-0 mr-1.5 ${darkMode ? "bg-gray-700 border-gray-600 text-gray-300" : "bg-white/90 border-gray-200 text-gray-600"
              }`}
          >
            <Menu className="w-4 h-4" />
          </button>
        )}
        <span
          className="hidden sm:inline-flex items-center gap-1.5 font-medium rounded-full px-3 py-1 border flex-shrink-0"
          style={dashboardPillStyle}
        >
          <Home className="w-3.5 h-3.5" />
          Dashboard
        </span>
        <ChevronRight className="hidden sm:block w-3.5 h-3.5 flex-shrink-0" style={{ color: darkMode ? "#6B7280" : "#9CA3AF" }} />
        <span
          className="inline-flex items-center gap-1.5 font-semibold rounded-full px-3 py-1 border truncate"
          style={pageBadgeStyle}
        >
          <LayoutGrid className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{currentLabel}</span>
        </span>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {actionButtons.map((btn, i) => (
          <button
            key={i}
            onClick={btn.fn}
            aria-label={btn.label}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-sm border ${darkMode ? "bg-gray-700 border-gray-600 text-gray-300" : "bg-white/90 border-gray-200 text-gray-600"
              }`}
          >
            {btn.icon}
          </button>
        ))}
      </div>
    </div>
  );
}