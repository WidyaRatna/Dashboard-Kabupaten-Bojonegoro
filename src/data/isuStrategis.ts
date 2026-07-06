import { buildInfografisThumb } from "../utils/fileHelpers";

export type InfografisItem = {
  title: string;
  image: string;
  primaryImage: string;
  points: string[];
};

export type WeekOption = {
  label: string;
  infografisIndex: number;
};

export type MonthOption = {
  label: string;
  weeks: WeekOption[];
};

export const INFOGRAFIS_MINGGUAN: InfografisItem[] = [
  {
    title: "Isu Strategis Kebijakan",
    image: buildInfografisThumb("ISU STRATEGIS", "10 Turbulensi Kebijakan", "#2ECC71", "#EAF2FF"),
    primaryImage: "/infografis/laporan-isu-strategis-mei-2026.svg",
    points: [
      "Efisiensi anggaran mendorong layanan publik lebih cepat.",
      "Perbaikan infrastruktur fokus pada ruas prioritas desa.",
      "Monitoring sentimen publik dipakai untuk respons kebijakan.",
    ],
  },
  {
    title: "Analisa Sentimen Instagram",
    image: buildInfografisThumb("ISU BERITA", "Analisa Sentimen Instagram", "#E67E22", "#E9F5FF"),
    primaryImage: "/infografis/policy-brief-10-isu-strategis-1.svg",
    points: [
      "Topik ekonomi dan kebutuhan pokok paling banyak dibahas.",
      "Pendidikan naik sebagai isu layanan yang paling disorot.",
      "Pemetaan tren dipakai sebagai dasar prioritas komunikasi.",
    ],
  },
  {
    title: "Suara Warga Facebook",
    image: buildInfografisThumb("TREND SOSMED", "Suara Warga Facebook", "#7C3AED", "#FFF3DE"),
    primaryImage: "/infografis/policy-brief-10-isu-strategis-2.svg",
    points: [
      "Percakapan warga didominasi sentimen netral dan positif.",
      "Aduan pelayanan naik di jam sibuk sore hingga malam.",
      "Konten informasi visual meningkatkan engagement mingguan.",
    ],
  },
  {
    title: "Analisa Sentimen Tiktok",
    image: buildInfografisThumb("SPAN LAPOR", "Analisa Sentimen Tiktok", "#EF4444", "#EAF4FF"),
    primaryImage: "/infografis/policy-brief-10-isu-strategis-1.svg",
    points: [
      "Aduan infrastruktur dan layanan dasar tetap jadi prioritas.",
      "Rata-rata waktu respons menurun dibanding periode lalu.",
      "Validasi lintas OPD mempercepat tindak lanjut lapangan.",
    ],
  },
];

export const MONTH_OPTIONS: MonthOption[] = [
  {
    label: "Mei 2026",
    weeks: [
      { label: "Minggu 1 (1–7 Mei 2026)", infografisIndex: 2 },
      { label: "Minggu 2 (8–15 Mei 2026)", infografisIndex: 1 },
      { label: "Minggu 3 (16–22 Mei 2026)", infografisIndex: 0 },
      { label: "Minggu 4 (23–29 Mei 2026)", infografisIndex: 3 },
    ],
  },
  {
    label: "Juni 2026",
    weeks: [
      { label: "Minggu 1 (30 Mei–5 Jun 2026)", infografisIndex: 0 },
      { label: "Minggu 2 (6–12 Jun 2026)", infografisIndex: 1 },
      { label: "Minggu 3 (13–19 Jun 2026)", infografisIndex: 2 },
      { label: "Minggu 4 (20–26 Jun 2026)", infografisIndex: 3 },
    ],
  },
];
