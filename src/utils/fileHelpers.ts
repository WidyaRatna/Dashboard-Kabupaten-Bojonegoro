export function buildInfografisThumb(title: string, subtitle: string, accent: string, panelColor: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="960" height="1280" viewBox="0 0 960 1280">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0F4CD9"/>
          <stop offset="100%" stop-color="#1F9EB0"/>
        </linearGradient>
      </defs>
      <rect width="960" height="1280" fill="#F2F4F8"/>
      <rect x="40" y="40" width="880" height="1200" rx="24" fill="white"/>
      <rect x="40" y="40" width="880" height="140" rx="24" fill="url(#g)"/>
      <text x="84" y="112" font-size="42" font-family="Arial" font-weight="700" fill="white">${title}</text>
      <text x="84" y="160" font-size="26" font-family="Arial" fill="#DDEAFE">${subtitle}</text>

      <rect x="84" y="228" width="792" height="322" rx="16" fill="${panelColor}"/>
      <circle cx="230" cy="390" r="92" fill="#FFFFFF" fill-opacity="0.55"/>
      <rect x="352" y="308" width="452" height="30" rx="10" fill="#A8C5EF"/>
      <rect x="352" y="356" width="372" height="24" rx="10" fill="#BCD2F2"/>
      <rect x="352" y="398" width="332" height="24" rx="10" fill="#BCD2F2"/>
      <rect x="352" y="440" width="412" height="24" rx="10" fill="#BCD2F2"/>

      <rect x="84" y="586" width="792" height="226" rx="16" fill="#EEF8F2"/>
      <rect x="112" y="622" width="248" height="152" rx="14" fill="#D0EBD9"/>
      <rect x="388" y="622" width="220" height="152" rx="14" fill="#DCEFF7"/>
      <rect x="632" y="622" width="216" height="152" rx="14" fill="#FDEACC"/>

      <rect x="84" y="842" width="792" height="300" rx="16" fill="#F8F9FC"/>
      <rect x="116" y="886" width="728" height="28" rx="10" fill="#DCE3EF"/>
      <rect x="116" y="934" width="680" height="22" rx="10" fill="#E6EBF4"/>
      <rect x="116" y="974" width="640" height="22" rx="10" fill="#E6EBF4"/>
      <rect x="116" y="1014" width="692" height="22" rx="10" fill="#E6EBF4"/>
      <rect x="116" y="1054" width="610" height="22" rx="10" fill="#E6EBF4"/>

      <circle cx="850" cy="84" r="16" fill="${accent}"/>
      <circle cx="810" cy="84" r="16" fill="#F39C12"/>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function sanitizeFileName(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
