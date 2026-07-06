export function BatikBorderSVG({ uid, flip = false }: { uid: string; flip?: boolean }) {
  const pid = `bp-${uid}`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="10000"
      style={{ display: "block", transform: flip ? "scaleX(-1)" : undefined }}
    >
      <defs>
        <pattern id={pid} x="0" y="0" width="20" height="180" patternUnits="userSpaceOnUse">
          <rect width="20" height="180" fill="#3E4B1C" />
          <path d="M2 14 C7 9 11 8 16 11 C12 15 10 19 8 25 C5 22 3 18 2 14Z" fill="none" stroke="#F7F4EE" strokeWidth="0.85" />
          <path d="M18 26 C14 21 10 20 5 22 C8 27 10 32 11 38 C14 35 16 31 18 26Z" fill="#D97E1F" opacity="0.95" />
          <path d="M2 48 C8 44 12 44 18 48 C12 52 8 54 4 58 C3 54 2 51 2 48Z" fill="none" stroke="#F7F4EE" strokeWidth="0.85" />
          <path d="M10 60 C6 55 5 49 7 42 C11 48 13 53 14 60 C13 60 11 60 10 60Z" fill="#D97E1F" opacity="0.95" />
          <path d="M2 80 C7 75 11 74 16 77 C12 81 10 85 8 91 C5 88 3 84 2 80Z" fill="none" stroke="#F7F4EE" strokeWidth="0.85" />
          <path d="M18 94 C14 89 10 88 5 90 C8 95 10 100 11 106 C14 103 16 99 18 94Z" fill="#D97E1F" opacity="0.95" />
          <path d="M2 118 C8 114 12 114 18 118 C12 122 8 124 4 128 C3 124 2 121 2 118Z" fill="none" stroke="#F7F4EE" strokeWidth="0.85" />
          <path d="M10 130 C6 125 5 119 7 112 C11 118 13 123 14 130 C13 130 11 130 10 130Z" fill="#D97E1F" opacity="0.95" />
          <path d="M2 150 C7 145 11 144 16 147 C12 151 10 155 8 161 C5 158 3 154 2 150Z" fill="none" stroke="#F7F4EE" strokeWidth="0.85" />
          <path d="M18 164 C14 159 10 158 5 160 C8 165 10 170 11 176 C14 173 16 169 18 164Z" fill="#D97E1F" opacity="0.95" />
        </pattern>
      </defs>
      <rect width="20" height="10000" fill={`url(#${pid})`} />
    </svg>
  );
}
