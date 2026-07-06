import type { EmployeeItem } from "../types";

export const EMPLOYEES_BASE: EmployeeItem[] = [
  { name: "EDI SUSANTO", pos: "Sekretaris Daerah", in: "06:46", out: "---", status: "Sedang Bekerja", color: "bg-[#E67E22]" },
  { name: "SITI RAHAYU", pos: "Kepala Dinas Kesehatan", in: "07:12", out: "---", status: "Sedang Bekerja", color: "bg-[#1F9EB0]" },
  { name: "AHMAD FAUZI", pos: "Kabid Perencanaan", in: "07:05", out: "---", status: "Sedang Bekerja", color: "bg-[#2ECC71]" },
  { name: "DEWI LESTARI", pos: "Staf Administrasi", in: "07:30", out: "---", status: "Sedang Bekerja", color: "bg-[#D35400]" },
  { name: "BAMBANG SUTRISNO", pos: "Kepala Bagian Keuangan", in: "08:00", out: "---", status: "Sedang Bekerja", color: "bg-[#2BB2C2]" },
  { name: "RINI WAHYUNI", pos: "Analis Kebijakan", in: "07:55", out: "---", status: "Sedang Bekerja", color: "bg-[#F39C12]" },
];

export const PEGAWAI_BY_TAB: Record<string, { total: number; hadir: number; ijin: number; tanpa: number; employees: EmployeeItem[] }> = {
  "Hari Ini": {
    total: 74, hadir: 52, ijin: 9, tanpa: 13,
    employees: EMPLOYEES_BASE,
  },
  "Mingguan": {
    total: 74, hadir: 68, ijin: 4, tanpa: 2,
    employees: EMPLOYEES_BASE.map(e => ({ ...e, in: "07:00", out: "16:00", status: "Selesai" })),
  },
  "Bulanan": {
    total: 74, hadir: 71, ijin: 2, tanpa: 1,
    employees: EMPLOYEES_BASE.slice(0, 4).map(e => ({ ...e, out: "16:15", status: "Selesai" })),
  },
};
