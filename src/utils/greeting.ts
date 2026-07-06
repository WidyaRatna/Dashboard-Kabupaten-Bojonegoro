export function getGreeting() {
  const h = new Date().getHours();
  if (h < 11) return "Selamat Pagi";
  if (h < 15) return "Selamat Siang";
  if (h < 19) return "Selamat Sore";
  return "Selamat Malam";
}

export function getGreetingIcon(): "sun" | "moon" {
  const h = new Date().getHours();
  if (h >= 5 && h < 19) return "sun";
  return "moon";
}

export function getHeaderStyle(darkMode: boolean) {
  if (darkMode) return { background: "linear-gradient(160deg, #0D1117 0%, #1E2749 55%, #2D2B55 100%)" };
  const h = new Date().getHours();
  if (h >= 5 && h < 11) return { background: "linear-gradient(160deg, #D6EAF8 0%, #FFFFFF 35%, #EAF4FC 65%, #FFFFFF 100%)" };
  if (h >= 11 && h < 15) return { background: "linear-gradient(160deg, #FFF3B0 0%, #FFFFFF 35%, #FFFDE7 65%, #FFFFFF 100%)" };
  if (h >= 15 && h < 19) return { background: "linear-gradient(160deg, #FFCBA4 0%, #FFFFFF 35%, #FFE8D6 65%, #FFFFFF 100%)" };
  return { background: "linear-gradient(160deg, #1A237E 0%, #283593 60%, #3949AB 100%)" };
}

export function getGreetingColor(darkMode: boolean) {
  if (darkMode) return "#F39C12";
  const h = new Date().getHours();
  if (h >= 5 && h < 11) return "#1565C0";
  if (h >= 11 && h < 15) return "#F57F17";
  if (h >= 15 && h < 19) return "#BF360C";
  return "#FFFFFF";
}

export function getTitleColor(darkMode: boolean) {
  if (darkMode) return "#FFFFFF";
  return "#92400E";
}