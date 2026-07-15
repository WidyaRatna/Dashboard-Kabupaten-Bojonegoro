import { Home as HomeIcon, BarChart2, DollarSign, MessageCircle, Building2, AlertCircle, Users } from "lucide-react";
import type { Page } from "../../types";
import type { ReactNode } from "react";

const LEFT_ITEMS: { page: Page; label: string; icon: ReactNode }[] = [
  { page: "realisasi", label: "Realisasi", icon: <BarChart2 className="w-[18px] h-[18px]" /> },
  { page: "pendapatan", label: "Pendapatan", icon: <DollarSign className="w-[18px] h-[18px]" /> },
  { page: "pengadaan", label: "Pengadaan", icon: <Building2 className="w-[18px] h-[18px]" /> },
];

const RIGHT_ITEMS: { page: Page; label: string; icon: ReactNode }[] = [
  { page: "sentimen", label: "Sentimen", icon: <MessageCircle className="w-[18px] h-[18px]" /> },
  { page: "isu-strategis", label: "Isu", icon: <AlertCircle className="w-[18px] h-[18px]" /> },
  { page: "pegawai", label: "Pegawai", icon: <Users className="w-[18px] h-[18px]" /> },
];

function FlatButton({
  active,
  darkMode,
  label,
  icon,
  onClick,
}: {
  active: boolean;
  darkMode: boolean;
  label: string;
  icon: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex w-full min-w-0 flex-col items-center justify-end gap-0.5 py-0.5"
    >
      <div className="flex items-center justify-center w-6 h-6" style={{ color: active ? "#1F9EB0" : "#9CA3AF" }}>
        {icon}
      </div>
      <span className={`text-[9.5px] font-semibold leading-tight text-center truncate w-full px-0.5 ${active ? (darkMode ? "text-white" : "text-[#1F9EB0]") : darkMode ? "text-gray-300" : "text-gray-500"}`}>
        {label}
      </span>
    </button>
  );
}

function RaisedButton({
  active,
  darkMode,
  label,
  icon,
  onClick,
}: {
  active: boolean;
  darkMode: boolean;
  label: string;
  icon: ReactNode;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} aria-label={label} className="flex flex-col items-center gap-0.5">
      <div
        className="flex items-center justify-center rounded-full -mt-5 hover:scale-105 transition-transform"
        style={{
          width: 44,
          height: 44,
          background: darkMode
            ? "linear-gradient(160deg, #2D8FA0 0%, #1F9EB0 50%, #14495B 100%)"
            : "linear-gradient(160deg, #4FD3E5 0%, #1F9EB0 50%, #106674 100%)",
          boxShadow: "0 4px 10px rgba(31,158,176,0.4), inset 0 1px 1px rgba(255,255,255,0.4)",
          border: darkMode ? "2px solid #1F2937" : "2px solid white",
          color: "white",
        }}
      >
        {icon}
      </div>
      <span className={`text-[9.5px] font-semibold leading-tight text-center ${active ? (darkMode ? "text-white" : "text-[#1F9EB0]") : darkMode ? "text-gray-300" : "text-gray-500"}`}>
        {label}
      </span>
    </button>
  );
}

export function BottomNav({
  page,
  setPage,
  darkMode,
}: {
  page: Page;
  setPage: (p: Page) => void;
  darkMode: boolean;
  onOpenAllMenus: () => void;
}) {
  const active = (p: Page) => ["realisasi", "realisasi-list", "opd-full"].includes(page) && p === "realisasi"
    ? true : page === p;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-3 pb-2.5 sm:px-6 sm:pb-3 pointer-events-none lg:hidden">
      <div
        className="mx-auto max-w-xl rounded-[24px] pointer-events-auto"
        style={{
          background: darkMode ? "rgba(31,41,55,0.97)" : "rgba(255,255,255,0.97)",
          backdropFilter: "blur(12px)",
          boxShadow: darkMode
            ? "0 8px 24px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.3)"
            : "0 8px 24px rgba(15,23,42,0.12), 0 2px 6px rgba(15,23,42,0.06)",
          border: darkMode ? "1px solid rgba(75,85,99,0.4)" : "1px solid rgba(229,231,235,0.6)",
        }}
      >
        {/* Ruang ekstra di atas supaya tombol menjorok tidak menabrak konten */}
        <div className="h-4" />

        <div className="px-1.5 pb-1.5">
          <div className="flex items-end justify-between gap-0.5">
            {LEFT_ITEMS.map((item) => (
              <FlatButton
                key={item.page}
                active={active(item.page)}
                darkMode={darkMode}
                label={item.label}
                icon={item.icon}
                onClick={() => setPage(item.page)}
              />
            ))}

            <div className="flex-shrink-0 px-1">
              <RaisedButton
                active={page === "home"}
                darkMode={darkMode}
                label="Home"
                icon={<HomeIcon className="w-5 h-5" />}
                onClick={() => setPage("home")}
              />
            </div>

            {RIGHT_ITEMS.map((item) => (
              <FlatButton
                key={item.page}
                active={active(item.page)}
                darkMode={darkMode}
                label={item.label}
                icon={item.icon}
                onClick={() => setPage(item.page)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}