function getMinutesSinceMidnight() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

const SORE_END = 18 * 60; // 18:00 → masih Sore, baru lewat dari ini jadi Malam

export function getGreeting() {
  const m = getMinutesSinceMidnight();
  if (m < 11 * 60) return "Selamat Pagi";
  if (m < 15 * 60) return "Selamat Siang";
  if (m <= SORE_END) return "Selamat Sore";
  return "Selamat Malam";
}

export function getGreetingIcon(): "sun" | "moon" {
  const m = getMinutesSinceMidnight();
  if (m >= 5 * 60 && m <= SORE_END) return "sun";
  return "moon";
}

export function getHeaderStyle(darkMode: boolean) {
  if (darkMode) return { background: "linear-gradient(160deg, #0D1117 0%, #1E2749 55%, #2D2B55 100%)" };
  const m = getMinutesSinceMidnight();
  if (m >= 5 * 60 && m < 11 * 60) return { background: "linear-gradient(160deg, #D6EAF8 0%, #FFFFFF 35%, #EAF4FC 65%, #FFFFFF 100%)" };
  if (m >= 11 * 60 && m < 15 * 60) return { background: "linear-gradient(160deg, #FFF3B0 0%, #FFFFFF 35%, #FFFDE7 65%, #FFFFFF 100%)" };
  if (m >= 15 * 60 && m <= SORE_END) return { background: "linear-gradient(160deg, #FFCBA4 0%, #FFFFFF 35%, #FFE8D6 65%, #FFFFFF 100%)" };
  return { background: "linear-gradient(160deg, #1A237E 0%, #283593 60%, #3949AB 100%)" };
}

export function getGreetingColor(darkMode: boolean) {
  if (darkMode) return "#F39C12";
  const m = getMinutesSinceMidnight();
  if (m >= 5 * 60 && m < 11 * 60) return "#1565C0";
  if (m >= 11 * 60 && m < 15 * 60) return "#F57F17";
  if (m >= 15 * 60 && m <= SORE_END) return "#BF360C";
  return "#FFFFFF";
}

export function getTitleColor(darkMode: boolean) {
  if (darkMode) return "#FFFFFF";
  return "#92400E";
}