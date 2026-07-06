import { Lock, Moon, Sun, User } from "lucide-react";
import { getGreeting, getGreetingColor, getGreetingIcon, getHeaderStyle, getTitleColor } from "../../utils/greeting";

const BOJONEGORO_LOGO_SRC = "https://upload.wikimedia.org/wikipedia/commons/1/18/Logo_Kabupaten_Bojonegoro.png";

export function Header({
  darkMode, setDarkMode, onLock, onProfile, onHamburger,
}: {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  onLock: () => void;
  onProfile: () => void;
  onHamburger: () => void;
}) {
  const greetingIcon = getGreetingIcon();

  return (
    <div className="sticky top-0 z-30 overflow-hidden" style={getHeaderStyle(darkMode)}>
      <div className="absolute -top-6 -right-6 w-28 h-28 opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none">
          <circle cx="80" cy="20" r="70" stroke="#8B5CF6" strokeWidth="1.5" />
          <circle cx="80" cy="20" r="50" stroke="#8B5CF6" strokeWidth="1.5" />
          <circle cx="80" cy="20" r="30" stroke="#8B5CF6" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="absolute -bottom-4 -left-4 w-20 h-20 opacity-10 pointer-events-none">
        <svg viewBox="0 0 80 80" fill="none">
          <path d="M0 80 Q20 40 40 20 Q60 0 80 0" stroke="#8B5CF6" strokeWidth="1.5" />
          <path d="M0 60 Q20 30 40 10" stroke="#8B5CF6" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="relative px-4 pt-3 pb-2 flex items-center justify-between lg:px-8 lg:pt-4 lg:pb-3">
        <div className="flex items-center gap-2.5">
          <img
            src={BOJONEGORO_LOGO_SRC}
            alt="Logo Pemkab Bojonegoro"
            className="w-7 h-8 lg:w-9 lg:h-10 object-contain"
          />
          <div>
            <div
              className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5"
              style={{ background: darkMode ? "rgba(243,156,18,0.15)" : "rgba(255,255,255,0.6)" }}
            >
              {greetingIcon === "sun" ? (
                <Sun className="w-2.5 h-2.5" style={{ color: getGreetingColor(darkMode) }} />
              ) : (
                <Moon className="w-2.5 h-2.5" style={{ color: getGreetingColor(darkMode) }} />
              )}
              <p className="text-[10px] font-semibold lg:text-[11px]" style={{ color: getGreetingColor(darkMode) }}>{getGreeting()}</p>
            </div>
            <h1
              className="font-['Plus_Jakarta_Sans',sans-serif] text-[13px] font-bold leading-tight lg:text-lg mt-0.5"
              style={{ color: getTitleColor(darkMode) }}
            >
              Dashboard Kabupaten Bojonegoro
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {[
            { icon: <Lock className="w-4 h-4" />, fn: onLock, label: "Kunci" },
            { icon: <Moon className="w-4 h-4" />, fn: () => setDarkMode(!darkMode), label: "Mode gelap" },
            { icon: <User className="w-4 h-4" />, fn: onProfile, label: "Profil" },
          ].map((btn, i) => (
            <button
              key={i}
              onClick={btn.fn}
              aria-label={btn.label}
              className={`w-8 h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center shadow-sm border ${darkMode ? "bg-gray-700 border-gray-600 text-gray-300" : "bg-white/90 border-white/60 text-gray-600"
                }`}
            >
              {btn.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}