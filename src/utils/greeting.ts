function getMinutesSinceMidnight() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

const SORE_END = 18 * 60; // 18:00 → masih Sore, baru lewat dari ini jadi Malam

type PeriodKey = "pagi" | "siang" | "sore" | "malam" | "dark";

// --- helper konversi warna ---
function hexToHsl(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r: h = ((g - b) / d) % 6; break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: s * 100, l: l * 100 };
}

function hslToHex(h: number, s: number, l: number) {
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const toHex = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Ambil hue+saturation dari warna sumber (mis. warna gradient sidebar), lalu atur ulang
// lightness/saturation supaya kebaca sebagai teks — hasilnya tetap "keluarga warna" yang sama persis.
function deriveAccent(sourceHex: string, targetLightness: number, minSaturation = 55) {
  const { h, s } = hexToHsl(sourceHex);
  return hslToHex(h, Math.max(s, minSaturation), targetLightness);
}

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Satu sumber kebenaran: gradient sidebar & warna badge SAMA-SAMA dihitung dari
// warna dasar yang sama (baseColor), jadi dijamin senada 1:1.
const PERIOD_THEMES: Record<PeriodKey, {
  greeting: string;
  baseColor: string; // warna dominan gradient sidebar untuk periode ini
  gradient: string; // bisa berupa CSS gradient string ATAU hex warna solid
  greetingColor: string;
}> = {
  pagi: {
    greeting: "Selamat Pagi",
    baseColor: "#D6EAF8",
    gradient: "linear-gradient(160deg, #D6EAF8 0%, #FFFFFF 35%, #EAF4FC 65%, #FFFFFF 100%)",
    greetingColor: "#1565C0",
  },
  siang: {
    greeting: "Selamat Siang",
    baseColor: "#FFF3B0",
    gradient: "linear-gradient(160deg, #FFF3B0 0%, #FFFFFF 35%, #FFFDE7 65%, #FFFFFF 100%)",
    greetingColor: "#F57F17",
  },
  sore: {
    greeting: "Selamat Sore",
    baseColor: "#FFCBA4",
    gradient: "linear-gradient(160deg, #FFCBA4 0%, #FFFFFF 35%, #FFE8D6 65%, #FFFFFF 100%)",
    greetingColor: "#BF360C",
  },
  malam: {
    greeting: "Selamat Malam",
    baseColor: "#1F9EB0",
    gradient: "linear-gradient(160deg, #E0F7FA 0%, #FFFFFF 35%, #E0F7FA 65%, #FFFFFF 100%)",
    greetingColor: "#0F7A8A",
  },
  dark: {
    greeting: "",
    baseColor: "#2D2B55",
    gradient: "linear-gradient(160deg, #0D1117 0%, #1E2749 55%, #2D2B55 100%)",
    greetingColor: "#F39C12",
  },
};

function getPeriodKey(): Exclude<PeriodKey, "dark"> {
  const m = getMinutesSinceMidnight();
  if (m < 11 * 60) return "pagi";
  if (m < 15 * 60) return "siang";
  if (m <= SORE_END) return "sore";
  return "malam";
}

export function getGreeting() {
  // teks sapaan tetap ikut jam asli (Pagi/Siang/Sore/Malam)
  return PERIOD_THEMES[getPeriodKey()].greeting;
}

export function getGreetingIcon(): "sun" | "moon" {
  const m = getMinutesSinceMidnight();
  if (m >= 5 * 60 && m <= SORE_END) return "sun";
  return "moon";
}

export function getHeaderStyle(darkMode: boolean) {
  const base = {
    backgroundAttachment: "fixed" as const,
    backgroundSize: "100vw 100vh" as const,
    backgroundPosition: "top left" as const,
    backgroundRepeat: "no-repeat" as const,
  };

  // Background sidebar/header dikunci putih bersih (dark mode tetap gelap netral),
  // tidak lagi mengikuti periode waktu maupun gradasi warna tema.
  const solid = darkMode ? "#111827" : "#FFFFFF";
  return {
    ...base,
    backgroundImage: "none",
    backgroundColor: solid,
  };
}

export function getGreetingColor(darkMode: boolean) {
  // warna teks sapaan tetap ikut jam asli
  const theme = darkMode ? PERIOD_THEMES.dark : PERIOD_THEMES[getPeriodKey()];
  return theme.greetingColor;
}

export function getTitleColor(darkMode: boolean) {
  if (darkMode) return "#FFFFFF";
  return "#92400E";
}

// Warna badge dikunci teal, senada dengan warna menu aktif di sidebar (#1F9EB0),
// tidak lagi mengikuti periode waktu.
export function getThemeAccentColor(darkMode: boolean) {
  return darkMode ? "#5FD3E0" : "#1F9EB0";
}

export function getThemeAccentStyle(darkMode: boolean) {
  const color = getThemeAccentColor(darkMode);
  return {
    color,
    background: darkMode ? "rgba(31,41,55,0.55)" : "rgba(255,255,255,0.75)",
    borderColor: hexToRgba(color, darkMode ? 0.5 : 0.45),
    boxShadow: darkMode ? "none" : "0 1px 2px rgba(0,0,0,0.04)",
  };
}

// Dipakai komponen (mis. Sidebar) buat nentuin apakah background saat ini gelap,
// baik karena dark mode aktif ATAU karena periode "Malam" (gradientnya gelap).
export function isDarkBackground(darkMode: boolean) {
  return darkMode;
}