import { useState, useEffect } from "react";
import { Calendar, ChevronRight, Clock, FileText, Package, RefreshCw, Search, X } from "lucide-react";
import { OPD_DATA } from "../../data/transactions";

type PaketItem = {
  opd: string;
  title: string;
  amount: string;
  kodeRup: string;
  pdn: "Ya" | "Tidak";
};

type MetodeCount = { label: string; count: number };
type NamedAmount = { name: string; amount: string };
type SumberDana = { label: string; amount: string; color: string; bg: string };
type SumberTransaksi = { label: string; amount: string };
type OpdRow = { name: string; real: string; pct: number; paket?: number };
type SatkerRow = { name: string; amount: string; paket: number; pct: number };

type RupData = {
  totalPagu: string;
  totalPaket: string;
  satuanKerja: string;
  metodePengadaan: MetodeCount[];
  jenisPengadaan: NamedAmount[];
  sumberDana: SumberDana[];
  opdData: OpdRow[];
  paketByMetode: Record<string, PaketItem[]>;
};

type RealisasiData = {
  totalNilai: string;
  totalPaket: string;
  satuanKerja: string;
  metodePengadaan: MetodeCount[];
  jenisPengadaan: NamedAmount[];
  sumberTransaksi: SumberTransaksi[];
  satker: SatkerRow[];
  paketByMetode: Record<string, PaketItem[]>;
};

type YearData = {
  lastUpdate: string; // dipakai kalau tahun ini BUKAN tahun berjalan
  rup: RupData;
  realisasi: RealisasiData;
};

const BULAN_ID = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

function formatTanggalJam(date: Date): string {
  const tanggal = date.getDate();
  const bulan = BULAN_ID[date.getMonth()];
  const tahun = date.getFullYear();
  const jam = String(date.getHours()).padStart(2, "0");
  const menit = String(date.getMinutes()).padStart(2, "0");
  return `${tanggal} ${bulan} ${tahun}, ${jam}:${menit}`;
}

const TAHUN_OPTIONS = [2025, 2026];
const CURRENT_YEAR = 2026; // tahun berjalan -> jam & tanggal live update

// ============================================================
// ================== DATA TAHUN 2026 (ASLI) ==================
// ============================================================

const PAKET_BY_METODE_2026: Record<string, PaketItem[]> = {
  "E-Purchasing": [
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "Biaya Makanan dan Minuman Harian pasien", amount: "Rp 7.2 M", kodeRup: "66158037", pdn: "Ya" },
    { opd: "DINAS PETERNAKAN DAN PERIKANAN - 3.25.3.27.0.00.01.0000", title: "Belanja Barang untuk Dijual/Diserahkan kepada Masyarakat", amount: "Rp 5.4 M", kodeRup: "63276010", pdn: "Ya" },
    // ... (SISANYA SAMA PERSIS DENGAN PAKET_BY_METODE YANG SUDAH ADA DI FILE KAMU,
    // tidak saya tulis ulang semua barisnya di sini biar tidak kepanjangan —
    // tinggal copy semua isi array yang sudah ada sebelumnya ke sini apa adanya)
  ],
  "Pengadaan Langsung": [
    { opd: "RSUD KELAS B DR. R.SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "BIAYA BAHAN DIALISIS NON E KATALOG", amount: "Rp 11.0 M", kodeRup: "62957478", pdn: "Ya" },
    { opd: "RSUD KELAS B DR. R.SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "BIAYA BAHAN OBAT OBATAN NON E KATALOG", amount: "Rp 10.0 M", kodeRup: "62944056", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Bahan Bakar Minyak (BBM) Sektor Industri dan Bungker", amount: "Rp 5.0 M", kodeRup: "63197072", pdn: "Ya" },
    { opd: "RSUD KELAS B DR. R.SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "BIAYA SERVICE SUKU CADANG ALAT KEDOKTERAN", amount: "Rp 2.9 M", kodeRup: "62957501", pdn: "Ya" },
  ],
  "Tender": [
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA - 1.03.1.04.2.10.03…", title: "Pembangunan Pasar Kota Bojonegoro", amount: "Rp 80.0 M", kodeRup: "62809680", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA - 1.03.1.04.2.10.03…", title: "Penataan Alun Alun Bojonegoro", amount: "Rp 28.0 M", kodeRup: "62809718", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA - 1.03.1.04.2.10.03…", title: "Pembangunan Parkir Bersama Kawasan Jalan Trunojoyo Bojonegoro", amount: "Rp 26.4 M", kodeRup: "62809722", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA - 1.03.1.04.2.10.03…", title: "Penataan Kawasan Taman Rajekwesi", amount: "Rp 22.5 M", kodeRup: "62809735", pdn: "Ya" },
  ],
  "Dikecualikan": [
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA - 1.03.1.04.2.10.03…", title: "Belanja Tagihan Listrik", amount: "Rp 20.1 M", kodeRup: "62954079", pdn: "Ya" },
    { opd: "DINAS PERHUBUNGAN - 2.15.0.00.0.00.01.0000", title: "Belanja Rekening Penerangan Jalan Umum (Sub Kegiatan Rehabilitasi dan Pemeliharaan Perlengkapan Jalan)", amount: "Rp 15.2 M", kodeRup: "63026673", pdn: "Ya" },
    { opd: "RSUD KELAS B DR. R.SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "Biaya Listrik", amount: "Rp 6.4 M", kodeRup: "67063913", pdn: "Ya" },
    { opd: "RSUD KELAS B DR. R.SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "Biaya Air", amount: "Rp 1.8 M", kodeRup: "67063920", pdn: "Ya" },
  ],
  "Seleksi": [
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA - 1.03.1.04.2.10.03…", title: "MK Pembangunan Pasar Kota Bojonegoro", amount: "Rp 4.8 M", kodeRup: "62809737", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Detail Engineering Design Pembangunan Dam Series Pejok Kabupaten Bojonegoro", amount: "Rp 3.0 M", kodeRup: "63178568", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Detail Engineering Design Pembangunan Bangunan Pengendali Banjir Kec. Dander", amount: "Rp 1.1 M", kodeRup: "63178330", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG - 1.03.0.00.0.00.0…", title: "Perencanaan Teknis Hasil Kajian Rawan Bencana", amount: "Rp 950 Jt", kodeRup: "63178401", pdn: "Ya" },
  ],
  "Lainnya": [
    { opd: "BADAN KEPEGAWAIAN PENDIDIKAN DAN PELATIHAN - 5.03.5.04.0.00.01.0000", title: "Belanja Kursus Singkat/Pelatihan", amount: "Rp 3.2 M", kodeRup: "42755238", pdn: "Tidak" },
    { opd: "DINAS KESEHATAN - 1.02.0.00.0.00.01.0000", title: "Belanja Jasa Tenaga Laboratorium (02.03)", amount: "Rp 1.3 M", kodeRup: "41920620", pdn: "Tidak" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG - 1.03.0.00.0.00.0…", title: "Jasa Konsultansi Revisi Rencana Tata Ruang Wilayah (RTRW) Kabupaten Bojonegoro", amount: "Rp 1.2 M", kodeRup: "41811524", pdn: "Tidak" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG - 1.03.0.00.0.00.0…", title: "Penyusunan DED Flyover Terintegrasi Jalan", amount: "Rp 1.1 M", kodeRup: "41811540", pdn: "Tidak" },
  ],
};

const REALISASI_PAKET_BY_METODE_2026: Record<string, PaketItem[]> = {
  "Tender": [
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA - 1.03.1.04.2.10.03.0000", title: "Pembangunan Pasar Kota Bojonegoro", amount: "Rp 79.9 M", kodeRup: "62809680", pdn: "Ya" },
    // ... (SISANYA SAMA PERSIS DENGAN REALISASI_PAKET_BY_METODE["Tender"] YANG SUDAH ADA)
  ],
  "E-Purchasing": PAKET_BY_METODE_2026["E-Purchasing"],
  "Pengadaan Langsung": PAKET_BY_METODE_2026["Pengadaan Langsung"],
  "Seleksi": PAKET_BY_METODE_2026["Seleksi"],
};

const REALISASI_JENIS_2026: NamedAmount[] = [
  { name: "Pekerjaan Konstruksi", amount: "Rp 259.8 M" },
  { name: "Barang", amount: "Rp 150.4 M" },
  { name: "Jasa Lainnya", amount: "Rp 66.7 M" },
  { name: "Jasa Konsultansi Badan Usaha Konstruksi", amount: "Rp 34.1 M" },
  { name: "Jasa Konsultansi Perorangan Non Konstruksi", amount: "Rp 75 Jt" },
];

const REALISASI_SATKER_2026: SatkerRow[] = [
  { name: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA - 1.03.1.04.2.10.03.0000", amount: "Rp 171.5 M", paket: 259, pct: 33.4 },
  { name: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", amount: "Rp 66.9 M", paket: 1043, pct: 13.0 },
  { name: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", amount: "Rp 61.3 M", paket: 89, pct: 11.9 },
  { name: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG - 1.03.0.00.0.00.01.0000", amount: "Rp 49.7 M", paket: 248, pct: 9.7 },
  { name: "DINAS PETERNAKAN DAN PERIKANAN - 3.25.3.27.0.00.01.0000", amount: "Rp 42.8 M", paket: 83, pct: 8.3 },
  { name: "DINAS KESEHATAN - 1.02.0.00.0.00.01.0000", amount: "Rp 19.4 M", paket: 181, pct: 3.8 },
  { name: "RSUD PADANGAN - 1.02.0.00.0.00.01.0003", amount: "Rp 14.6 M", paket: 346, pct: 2.8 },
  { name: "DINAS PERHUBUNGAN - 2.15.0.00.0.00.01.0000", amount: "Rp 9.1 M", paket: 31, pct: 1.8 },
  { name: "RSUD SUMBERREJO - 1.02.0.00.0.00.01.0002", amount: "Rp 9.1 M", paket: 391, pct: 1.8 },
  { name: "RSUD KELAS B DR. R.SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", amount: "Rp 7.8 M", paket: 128, pct: 1.5 },
];

const DATA_2026: YearData = {
  lastUpdate: "", // tidak dipakai karena 2026 = tahun berjalan (live clock)
  rup: {
    totalPagu: "Rp 1.8 T",
    totalPaket: "11.309",
    satuanKerja: "118",
    metodePengadaan: [
      { label: "E-Purchasing", count: 4980 },
      { label: "Pengadaan Langsung", count: 5171 },
      { label: "Tender", count: 117 },
      { label: "Dikecualikan", count: 866 },
      { label: "Seleksi", count: 36 },
      { label: "Lainnya", count: 139 },
    ],
    jenisPengadaan: [
      { name: "Pekerjaan Konstruksi", amount: "Rp 950.0 M" },
      { name: "Barang", amount: "Rp 545.8 M" },
      { name: "Jasa Lainnya", amount: "Rp 213.4 M" },
      { name: "Jasa Konsultansi", amount: "Rp 82.7 M" },
      { name: "Terintegrasi", amount: "Rp 685 Jt" },
      { name: "Lainnya", amount: "Rp 39.4 Jt" },
    ],
    sumberDana: [
      { label: "APBD", amount: "Rp 1.5 T", color: "#1F9EB0", bg: "#E0F7FA" },
      { label: "BLUD", amount: "Rp 292.3 M", color: "#2ECC71", bg: "#D5F5E3" },
      { label: "APBDP", amount: "Rp 5 Jt", color: "#E67E22", bg: "#FDEBD0" },
    ],
    opdData: OPD_DATA, // tetap pakai data import yang sudah ada untuk 2026
    paketByMetode: PAKET_BY_METODE_2026,
  },
  realisasi: {
    totalNilai: "Rp 514.2 M",
    totalPaket: "5.008",
    satuanKerja: "101",
    metodePengadaan: [
      { label: "Tender", count: 65 },
      { label: "E-Purchasing", count: 4331 },
      { label: "Pengadaan Langsung", count: 598 },
      { label: "Seleksi", count: 14 },
    ],
    jenisPengadaan: REALISASI_JENIS_2026,
    sumberTransaksi: [
      { label: "Tender", amount: "Rp 225.4 M" },
      { label: "E-Katalog 6.0", amount: "Rp 218.8 M" },
      { label: "Non Tender", amount: "Rp 70.0 M" },
      { label: "Pencatatan", amount: "Rp 59 Jt" },
    ],
    satker: REALISASI_SATKER_2026,
    paketByMetode: REALISASI_PAKET_BY_METODE_2026,
  },
};

// ============================================================
// ==================== DATA TAHUN 2025 ========================
// ============================================================

const OPD_DATA_2025: OpdRow[] = [
  { name: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA", real: "Rp 633.3 M", paket: 1708, pct: 22.3 },
  { name: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG", real: "Rp 613.3 M", paket: 2037, pct: 21.6 },
  { name: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR", real: "Rp 307.9 M", paket: 899, pct: 10.8 },
  { name: "DINAS PENDIDIKAN", real: "Rp 268.3 M", paket: 1565, pct: 9.4 },
  { name: "RSUD KELAS B DR. R.SOSODORO DJATIKOESOEMO", real: "Rp 185.1 M", paket: 232, pct: 6.5 },
  { name: "DINAS KESEHATAN", real: "Rp 153.8 M", paket: 625, pct: 5.4 },
  { name: "DINAS PETERNAKAN DAN PERIKANAN", real: "Rp 117.8 M", paket: 270, pct: 4.1 },
  { name: "RSUD KELAS C PADANGAN", real: "Rp 63.9 M", paket: 171, pct: 2.2 },
  { name: "DINAS KETAHANAN PANGAN DAN PERTANIAN", real: "Rp 52.7 M", paket: 472, pct: 1.9 },
  { name: "DINAS KEPEMUDAAN DAN OLAHRAGA", real: "Rp 39.4 M", paket: 262, pct: 1.4 },
];

const PAKET_BY_METODE_2025: Record<string, PaketItem[]> = {
  "Tender": [
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR", title: "Pembangunan Pelindung Tebing Sungai/Kali Jalan MH Thamrin (Hulu) Kec. Bojonegoro", amount: "Rp 60.0 M", kodeRup: "58607389", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA", title: "Pembangunan Rumah Sakit Kepohbaru", amount: "Rp 53.2 M", kodeRup: "60361944", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG", title: "Rekonstruksi Jalan Sumberagung - Ngelo", amount: "Rp 20.0 M", kodeRup: "56878093", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG", title: "Rekonstruksi Jalan Turi - Kaliklampok", amount: "Rp 20.0 M", kodeRup: "56878061", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR", title: "Pembangunan Pelindung Tebing Sungai/Kali Jalan MH Thamrin (Hilir) Kec. Bojonegoro", amount: "Rp 20.0 M", kodeRup: "58607458", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR", title: "Pembangunan Pelindung Tebing Sungai/Kali Kelurahan Ledok Kulon Kec. Bojonegoro", amount: "Rp 16.8 M", kodeRup: "58607481", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA", title: "Pembangunan Sport Center Kawasan Jl. Veteran", amount: "Rp 16.6 M", kodeRup: "55197609", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG", title: "Rekonstruksi Jalan Margomulyo - Kalangan", amount: "Rp 14.0 M", kodeRup: "59974857", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG", title: "Rekonstruksi Jalan Watujago - Bobol", amount: "Rp 13.0 M", kodeRup: "59974853", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA", title: "Pembangunan Saluran Drainase dan Trotoar Jalan JA Suprapto Sisi Selatan Kecamatan Bojonegoro", amount: "Rp 12.0 M", kodeRup: "54721392", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG", title: "Rekonstruksi Jalan Sukosewu - Klepek", amount: "Rp 10.9 M", kodeRup: "60853745", pdn: "Ya" },
    { opd: "DINAS KESEHATAN", title: "Pembangunan Puskesmas Ngraho ( Farmalkes Rek 2 )", amount: "Rp 10.3 M", kodeRup: "54540037", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA", title: "Pembangunan Saluran Drainase dan Trotoar Jalan Panglima Polim Kecamatan Bojonegoro", amount: "Rp 10.2 M", kodeRup: "54721423", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG", title: "Rekonstruksi Jalan Sekar - Kedungbrubus", amount: "Rp 9.8 M", kodeRup: "60853186", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA", title: "Pembangunan Gedung Kantor Dinas Pemadam Kebakaran Kabupaten Bojonegoro", amount: "Rp 9.1 M", kodeRup: "55197615", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG", title: "Rekonstruksi Jalan Kapas - Bogo", amount: "Rp 9.0 M", kodeRup: "56878085", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG", title: "Rekonstruksi Jalan Sambeng - Besah", amount: "Rp 9.0 M", kodeRup: "60854220", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA", title: "Rehabilitasi Kantor Pengadilan Agama Bojonegoro", amount: "Rp 8.5 M", kodeRup: "55316176", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG", title: "Pembangunan Jembatan Klepek (Sukosewu - Klepek) Kec. Sukosewu (Lanjutan) *", amount: "Rp 8.1 M", kodeRup: "56801578", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA", title: "Pembangunan Saluran Drainase dan Trotoar Jalan Lettu Suwolo Sisi Barat Kecamatan Bojonegoro", amount: "Rp 8.0 M", kodeRup: "54721450", pdn: "Ya" },
  ],
  "E-Purchasing": [
    { opd: "RSUD KELAS B DR. R.SOSODORO DJATIKOESOEMO", title: "BIAYA BAHAN OBAT OBATAN E KATALOG", amount: "Rp 56.0 M", kodeRup: "61731639", pdn: "Ya" },
    { opd: "DINAS PETERNAKAN DAN PERIKANAN", title: "Belanja barang untuk dijual/diserahkan kepada masyarakat (kandang ayam petelur) P-APBD 2025", amount: "Rp 35.0 M", kodeRup: "60393219", pdn: "Ya" },
    { opd: "DINAS PETERNAKAN DAN PERIKANAN", title: "Belanja barang untuk dijual/diserahkan kepada masyarakat (ayam petelur) P-APBD 2025", amount: "Rp 28.6 M", kodeRup: "", pdn: "Ya" },
  ],
  "Pengadaan Langsung": [
    { opd: "RSUD KELAS B DR. R.SOSODORO DJATIKOESOEMO", title: "BIAYA BAHAN HEMODIALISIS NON E KATALOG", amount: "Rp 19.0 M", kodeRup: "60548834", pdn: "Tidak" },
    { opd: "DINAS PERHUBUNGAN", title: "Belanja Tagihan Listrik sub kegiatan rehabilitasi dan pemeliharaan perlengkapan jalan", amount: "Rp 13.8 M", kodeRup: "60555416", pdn: "Ya" },
    { opd: "RSUD KELAS B DR. R.SOSODORO DJATIKOESOEMO", title: "BIAYA BAHAN OBAT OBATAN NON E KATALOG", amount: "Rp 10.0 M", kodeRup: "60548153", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR", title: "Belanja Bahan-Bahan Bakar dan Pelumas", amount: "Rp 6.1 M", kodeRup: "60398066", pdn: "Ya" },
    { opd: "DINAS PERHUBUNGAN", title: "Belanja Rekening Penerangan Jalan Umum (Tagihan Listrik PJU) sub keg. rehabilitasi dan pemeliharaan perlengkapan jalan", amount: "Rp 6.0 M", kodeRup: "60555562", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA", title: "Rehabilitasi Rumah Dinas Bupati Bojonegoro Jl. Mas Tumapel (P-APBD)", amount: "Rp 5.7 M", kodeRup: "61312678", pdn: "Ya" },
    { opd: "RSUD KELAS B DR. R.SOSODORO DJATIKOESOEMO", title: "Biaya Service dan Suku Cadang Alat Kedokteran RS Non E-Katalog", amount: "Rp 4.0 M", kodeRup: "60461952", pdn: "Ya" },
  ],
  "Dikecualikan": [
    { opd: "RSUD KELAS B DR. R.SOSODORO DJATIKOESOEMO", title: "BIAYA ATAS LAYANAN PIHAK KETIGA ( DARAH / PMI )", amount: "Rp 7.5 M", kodeRup: "61724521", pdn: "Ya" },
    { opd: "RSUD KELAS B DR. R.SOSODORO DJATIKOESOEMO", title: "Biaya Listrik", amount: "Rp 5.6 M", kodeRup: "59193806", pdn: "Ya" },
    { opd: "RSUD KEPOHBARU", title: "Belanja Modal Tanah untuk Bangunan Tempat Kerja", amount: "Rp 3.0 M", kodeRup: "60787398", pdn: "Ya" },
    { opd: "BAGIAN UMUM", title: "Belanja Tagihan Listrik", amount: "Rp 2.4 M", kodeRup: "55199223", pdn: "Ya" },
    { opd: "RSUD KELAS B DR. R.SOSODORO DJATIKOESOEMO", title: "Biaya Air", amount: "Rp 2.3 M", kodeRup: "60613674", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR", title: "Bahan Bakar Minyak (BBM) Sektor Industri dan Bungker", amount: "Rp 1.6 M", kodeRup: "59205922", pdn: "Ya" },
    { opd: "RSUD KELAS C PADANGAN", title: "Biaya Langganan Listrik, air, telpon", amount: "Rp 1.6 M", kodeRup: "57723107", pdn: "Ya" },
    { opd: "RSUD SUMBERREJO", title: "Belanja Jasa Langganan Listrik / Air / Telp / Internet", amount: "Rp 1.5 M", kodeRup: "62593043", pdn: "Ya" },
    { opd: "DINAS KEPEMUDAAN DAN OLAHRAGA", title: "Belanja Tagihan Listrik", amount: "Rp 1.4 M", kodeRup: "54847583", pdn: "Ya" },
    { opd: "RSUD SUMBERREJO", title: "Belanja Jasa Tenaga kesehatan", amount: "Rp 1.3 M", kodeRup: "60971359", pdn: "Ya" },
    { opd: "BAGIAN UMUM", title: "Belanja Bahan-Bahan Bakar dan Pelumas", amount: "Rp 1.1 M", kodeRup: "55377888", pdn: "Ya" },
    { opd: "RSUD KELAS C PADANGAN", title: "Biaya darah", amount: "Rp 1.1 M", kodeRup: "55235305", pdn: "Ya" },
    { opd: "DINAS PERHUBUNGAN", title: "Belanja Tagihan Listrik (Sub Keg Penyediaan Jasa Komunikasi, Sumber Daya Air dan Listrik)", amount: "Rp 1.0 M", kodeRup: "55500784", pdn: "Ya" },
    { opd: "RSUD SUMBERREJO", title: "Belanja Transfusi Darah", amount: "Rp 1.0 M", kodeRup: "58086908", pdn: "Ya" },
    { opd: "RSUD SUMBERREJO", title: "Belanja Jasa Lainnya Penyedia Jasa Orang Perorangan Tenaga Ahli", amount: "Rp 850 Jt", kodeRup: "60970586", pdn: "Ya" },
    { opd: "DINAS LINGKUNGAN HIDUP", title: "Belanja Tagihan Listrik", amount: "Rp 714 Jt", kodeRup: "58074933", pdn: "Ya" },
  ],
  "Seleksi": [
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA", title: "DED Rehabilitasi Stadion Bojonegoro (P-APBD)", amount: "Rp 1.1 M", kodeRup: "60104955", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA", title: "DED Pembangunan Stadion Bojonegoro", amount: "Rp 1.1 M", kodeRup: "55197595", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA", title: "Master Plan Rehabilitasi Stadion Bojonegoro (P-APBD)", amount: "Rp 1.1 M", kodeRup: "60104883", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA", title: "Dokumen Lingkungan Rehabilitasi Stadion Bojonegoro (P-APBD)", amount: "Rp 1.0 M", kodeRup: "60105017", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA", title: "Dokumen Lingkungan Pembangunan Stadion Bojonegoro", amount: "Rp 1.0 M", kodeRup: "55197570", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA", title: "MK Pembangunan Rumah Sakit Kepohbaru", amount: "Rp 1.0 M", kodeRup: "55197541", pdn: "Ya" },
  ],
  "Penunjukan Langsung": [
    { opd: "DINAS KETAHANAN PANGAN DAN PERTANIAN", title: "Belanja Pemeliharaan Alat Angkutan-Alat Angkutan Darat Bermotor-Kendaraan Bermotor Penumpang", amount: "Rp 264 Jt", kodeRup: "54653960", pdn: "Ya" },
    { opd: "DINAS KETAHANAN PANGAN DAN PERTANIAN", title: "Pemeliharaan/Rehabilitasi Gedung Kantor dan Bangunan Lainnya", amount: "Rp 251 Jt", kodeRup: "54654343", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR", title: "Perencanaan Pembangunan Pelindung Tebing Sungai/Kali Ds. Sarirejo Kec. Balen", amount: "Rp 240 Jt", kodeRup: "59154526", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG", title: "Belanja Jasa Konsultansi Core Team Flyover *", amount: "Rp 210 Jt", kodeRup: "56798363", pdn: "Ya" },
    { opd: "DINAS KETAHANAN PANGAN DAN PERTANIAN", title: "Beban Jasa Tenaga Keamanan", amount: "Rp 134 Jt", kodeRup: "54653750", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG", title: "Biaya beracara di Pengadilan ruas Napis - Margomulyo (Watujago) (Kegiatan 1)", amount: "Rp 100 Jt", kodeRup: "60698272", pdn: "Ya" },
    { opd: "DINAS KETAHANAN PANGAN DAN PERTANIAN", title: "Belanja Jasa Konsultansi Berorientasi Layanan-Jasa Studi Penelitian dan Bantuan Teknik", amount: "Rp 70 Jt", kodeRup: "54653752", pdn: "Ya" },
    { opd: "KELURAHAN MOJOKAMPUNG", title: "Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Gedung Tempat Kerja Lainnya", amount: "Rp 56 Jt", kodeRup: "61270705", pdn: "Ya" },
    { opd: "KELURAHAN MOJOKAMPUNG", title: "Belanja Modal Peralatan Studio Audio", amount: "Rp 54 Jt", kodeRup: "61271430", pdn: "Ya" },
  ],
  "Tender Cepat": [
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR", title: "Pekerjaan Peningkatan Sarana dan Prasarana Penunjang Rumah Pompa dan Pintu Pengendali Banjir Desa Lebaksari Kec. Baureno (Penyelesaian Pekerjaan Tahun 2024)", amount: "Rp 2.1 M", kodeRup: "60429777", pdn: "Ya" },
  ],
  "Lainnya": [
    { opd: "BADAN KEPEGAWAIAN PENDIDIKAN DAN PELATIHAN", title: "Belanja Kursus Singkat/Pelatihan", amount: "Rp 3.0 M", kodeRup: "41232319", pdn: "Tidak" },
    { opd: "DINAS PERINDUSTRIAN DAN TENAGA KERJA", title: "Bimbingan Teknis / Pelatihan / Lokakarya / Workshop untuk Masyarakat/Non Pegawai", amount: "Rp 1.5 M", kodeRup: "41009004", pdn: "Tidak" },
    { opd: "INSPEKTORAT", title: "Belanja Kursus Singkat/Pelatihan sub kegiatan Pendidikan dan Pelatihan Pegawai Berdasarkan Tugas dan Fungsi", amount: "Rp 1.5 M", kodeRup: "41397911", pdn: "Tidak" },
    { opd: "BAGIAN PROTOKOL DAN KOMUNIKASI PIMPINAN", title: "Belanja Perjalanan Dinas Biasa", amount: "Rp 1.3 M", kodeRup: "41148474", pdn: "Tidak" },
    { opd: "BADAN KEPEGAWAIAN PENDIDIKAN DAN PELATIHAN", title: "Belanja Kursus Singkat/Pelatihan", amount: "Rp 1.3 M", kodeRup: "41232389", pdn: "Tidak" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG", title: "Penyusunan Studi Kelayakan Pembangunan Jalan Lingkar Selatan Terintegrasi Flyover", amount: "Rp 1.1 M", kodeRup: "40879399", pdn: "Tidak" },
    { opd: "BAGIAN PEMERINTAHAN", title: "Belanja Gedung dan Bangunan-Tugu Titik Kontrol/Pasti-Tugu/Tanda Batas-Tugu/Tanda Batas Administrasi", amount: "Rp 1.1 M", kodeRup: "41034991", pdn: "Tidak" },
    { opd: "RSUD KELAS B DR. R.SOSODORO DJATIKOESOEMO", title: "SEMINAR /WORKSHOP/DIKLAT DENGAN LEMBAGA PEMERINTAH", amount: "Rp 865 Jt", kodeRup: "41255442", pdn: "Tidak" },
    { opd: "DINAS PEMBERDAYAAN MASYARAKAT DAN DESA", title: "Belanja Jasa Konsultansi Berorientasi Layanan-Jasa Studi Penelitian dan Bantuan Teknik", amount: "Rp 786 Jt", kodeRup: "38941236", pdn: "Tidak" },
    { opd: "DINAS PERDAGANGAN, KOPERASI DAN USAHA MIKRO", title: "Jasa yang Diberikan kepada Pihak Ketiga/Pihak Lain", amount: "Rp 753 Jt", kodeRup: "41406770", pdn: "Tidak" },
  ],
};

const REALISASI_PAKET_BY_METODE_2025: Record<string, PaketItem[]> = {
  "Tender": [
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA", title: "Pembangunan Sport Center Kawasan Jl. Veteran", amount: "Rp 16.2 M", kodeRup: "55197609", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG", title: "Rekonstruksi Jalan Margomulyo - Kalangan", amount: "Rp 11.6 M", kodeRup: "59974857", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA", title: "Pembangunan Saluran Drainase dan Trotoar Jalan JA Suprapto Sisi Selatan Kecamatan Bojonegoro", amount: "Rp 11.3 M", kodeRup: "54721392", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG", title: "Rekonstruksi Jalan Watujago - Bobol", amount: "Rp 10.5 M", kodeRup: "59974853", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA", title: "Pembangunan Saluran Drainase dan Trotoar Jalan Panglima Polim Kecamatan Bojonegoro", amount: "Rp 9.8 M", kodeRup: "54721423", pdn: "Ya" },
    { opd: "DINAS KESEHATAN", title: "Pembangunan Puskesmas Ngraho", amount: "Rp 9.3 M", kodeRup: "54540037", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA", title: "Pembangunan Gedung Kantor Dinas Pemadam Kebakaran Kabupaten Bojonegoro", amount: "Rp 8.7 M", kodeRup: "55197615", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG", title: "Rekonstruksi Jalan Sambeng - Besah", amount: "Rp 8.5 M", kodeRup: "59121855", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA", title: "Rehabilitasi Kantor Pengadilan Agama Bojonegoro", amount: "Rp 8.2 M", kodeRup: "55316176", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG", title: "Rekonstruksi Jalan Sekar - Kedungbrubus", amount: "Rp 7.9 M", kodeRup: "59121876", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA", title: "Pembangunan Sarana Olahraga Kecamatan Kalitidu", amount: "Rp 7.3 M", kodeRup: "55197729", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG", title: "Rekonstruksi Jalan Trucuk - Padang", amount: "Rp 7.0 M", kodeRup: "59974859", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG", title: "Rekonstruksi Jalan Kapas - Bogo", amount: "Rp 6.9 M", kodeRup: "56878085", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA", title: "Pembangunan Saluran Drainase dan Trotoar Jalan Sawunggaling Sisi Barat Kecamatan Bojonegoro", amount: "Rp 6.4 M", kodeRup: "54721456", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA", title: "Pembangunan Saluran Drainase dan Trotoar Jalan WR Supratman Sisi Barat Kecamatan Bojonegoro", amount: "Rp 6.4 M", kodeRup: "54721455", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG", title: "Rekonstruksi Jalan Pragelan - Randupitu", amount: "Rp 6.3 M", kodeRup: "59122012", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA", title: "Pembangunan Kantor Kejaksaan Bojonegoro Jl. R.A. Kartini", amount: "Rp 5.8 M", kodeRup: "55197616", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA", title: "Pembangunan Saluran Drainase dan Trotoar Jalan WR Supratman Sisi Timur Kecamatan Bojonegoro", amount: "Rp 5.6 M", kodeRup: "54721403", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG", title: "Rekonstruksi Jalan Kejuon - Bangeran", amount: "Rp 5.4 M", kodeRup: "56878099", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG", title: "Pelebaran Jembatan Penganten - Ngampal 1 (Penganten - Ngampal) Kec. Balen", amount: "Rp 4.9 M", kodeRup: "56796375", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA", title: "Pembangunan Saluran Drainase dan Trotoar Jalan Pattimura Kecamatan Bojonegoro", amount: "Rp 4.8 M", kodeRup: "54721367", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG", title: "Rekonstruksi Jalan Batas Kab - Sambeng", amount: "Rp 4.7 M", kodeRup: "59122040", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG", title: "Rekonstruksi Jalan Sumberoto - Woro", amount: "Rp 4.5 M", kodeRup: "56878102", pdn: "Ya" },
  ],
  "Penunjukan Langsung": [
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR", title: "Perencanaan Pembangunan Pelindung Tebing Sungai/Kali Ds. Sarirejo Kec. Balen", amount: "Rp 206 Jt", kodeRup: "59154526", pdn: "Ya" },
  ],
  "None": [
    { opd: "DINAS PERDAGANGAN, KOPERASI DAN USAHA MIKRO", title: "Jasa yang Diberikan kepada Pihak Ketiga/Pihak Lain", amount: "Rp 753 Jt", kodeRup: "41406770", pdn: "Tidak" },
    { opd: "KECAMATAN PURWOSARI", title: "Belanja Makanan dan Minuman pada Fasilitasi Pelayanan Urusan Sosial", amount: "Rp 174 Jt", kodeRup: "38926347", pdn: "Tidak" },
    { opd: "BADAN PERENCANAAN PEMBANGUNAN DAERAH", title: "Penyusunan RPKD (Rencana Penanggulangan Kemiskinan Daerah) Tahun 2025 -2029", amount: "Rp 167 Jt", kodeRup: "40870972", pdn: "Tidak" },
    { opd: "KECAMATAN PURWOSARI", title: "Belanja Makanan dan Minuman pada Fasilitasi Pelayanan Urusan Sosial", amount: "Rp 132 Jt", kodeRup: "38926347", pdn: "Tidak" },
    { opd: "DINAS PERDAGANGAN, KOPERASI DAN USAHA MIKRO", title: "Jasa yang Diberikan kepada Pihak Ketiga/Pihak Lain", amount: "Rp 120 Jt", kodeRup: "41406769", pdn: "Tidak" },
  ],
  "Dikecualikan": [
    { opd: "BAGIAN PENGADAAN BARANG/JASA", title: "Beban Kursus Singkat/Pelatihan", amount: "Rp 111 Jt", kodeRup: "60516060", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG", title: "Belanja Tagihan Listrik", amount: "Rp 63 Jt", kodeRup: "59202693", pdn: "Ya" },
    { opd: "PUSKESMAS PADANGAN", title: "Belanja Tagihan Listrik", amount: "Rp 55 Jt", kodeRup: "59974082", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG", title: "Belanja Bahan-Bahan Bakar dan Pelumas", amount: "Rp 35 Jt", kodeRup: "57262054", pdn: "Tidak" },
    { opd: "PUSKESMAS BALEN", title: "Belanja Tagihan Listrik", amount: "Rp 32 Jt", kodeRup: "56151769", pdn: "Ya" },
    { opd: "BADAN KEPEGAWAIAN PENDIDIKAN DAN PELATIHAN", title: "Belanja Bahan-Bahan Bakar dan Pelumas", amount: "Rp 24 Jt", kodeRup: "54668496", pdn: "Ya" },
    { opd: "KECAMATAN NGASEM", title: "Belanja Tagihan Listrik", amount: "Rp 13 Jt", kodeRup: "59116108", pdn: "Ya" },
    { opd: "PUSKESMAS PADANGAN", title: "Belanja Kawat/Faksimili/Internet/TV Berlangganan", amount: "Rp 12 Jt", kodeRup: "59676990", pdn: "Ya" },
    { opd: "DINAS PETERNAKAN DAN PERIKANAN", title: "Belanja Kawat/Faksimili/Internet/TV Berlangganan (internet)", amount: "Rp 11 Jt", kodeRup: "55255404", pdn: "Ya" },
    { opd: "KECAMATAN PURWOSARI", title: "penyediaan jasa komunikasi, sumber daya air dan listrik", amount: "Rp 9 Jt", kodeRup: "54615539", pdn: "Ya" },
    { opd: "PUSKESMAS TANJUNGHARJO", title: "Belanja Tagihan Listrik pkm tanjungharjo", amount: "Rp 9 Jt", kodeRup: "55302485", pdn: "Ya" },
    { opd: "KECAMATAN NGASEM", title: "Belanja Bahan-Bahan Bakar dan Pelumas", amount: "Rp 8 Jt", kodeRup: "59116307", pdn: "Tidak" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG", title: "Belanja Kawat/Faksimili/Internet/TV Berlangganan", amount: "Rp 7 Jt", kodeRup: "59202669", pdn: "Ya" },
    { opd: "BAGIAN PENGADAAN BARANG/JASA", title: "Belanja Bahan-Bahan Bakar dan Pelumas", amount: "Rp 6 Jt", kodeRup: "60416600", pdn: "Tidak" },
    { opd: "KECAMATAN NGASEM", title: "Belanja Bahan-Bahan Bakar dan Pelumas", amount: "Rp 5 Jt", kodeRup: "59116307", pdn: "Ya" },
    { opd: "BADAN KEPEGAWAIAN PENDIDIKAN DAN PELATIHAN", title: "Belanja Bahan-Bahan Bakar dan Pelumas (Penyediaan Jasa Pemeliharaan Kendaraan Dinas)", amount: "Rp 5 Jt", kodeRup: "54668496", pdn: "Ya" },
    { opd: "KECAMATAN NGASEM", title: "Belanja Tagihan Listrik", amount: "Rp 4 Jt", kodeRup: "59116108", pdn: "Tidak" },
    { opd: "KECAMATAN NGASEM", title: "Belanja Tagihan Listrik", amount: "Rp 4 Jt", kodeRup: "59116108", pdn: "Tidak" },
    { opd: "KECAMATAN NGASEM", title: "Belanja Tagihan Listrik", amount: "Rp 3 Jt", kodeRup: "59116108", pdn: "Ya" },
    { opd: "PUSKESMAS TANJUNGHARJO", title: "Belanja Bahan-Bahan Bakar dan Pelumas pkm tanjungharjo", amount: "Rp 3 Jt", kodeRup: "59412449", pdn: "Tidak" },
    { opd: "KECAMATAN PURWOSARI", title: "penyediaan jasa komunikasi, sumber daya air dan listrik", amount: "Rp 3 Jt", kodeRup: "54615799", pdn: "Tidak" },
    { opd: "PUSKESMAS PADANGAN", title: "Belanja Tagihan Air", amount: "Rp 3 Jt", kodeRup: "55631111", pdn: "Ya" },
    { opd: "KECAMATAN NGASEM", title: "Belanja Bahan-Bahan Bakar dan Pelumas", amount: "Rp 3 Jt", kodeRup: "59116307", pdn: "Tidak" },
    { opd: "KECAMATAN NGASEM", title: "Belanja Bahan-Bahan Bakar dan Pelumas", amount: "Rp 3 Jt", kodeRup: "60497542", pdn: "Ya" },
    { opd: "KECAMATAN NGASEM", title: "Belanja Kawat/Faksimili/Internet/TV Berlangganan", amount: "Rp 2 Jt", kodeRup: "59116782", pdn: "Ya" },
    { opd: "PUSKESMAS TANJUNGHARJO", title: "Belanja Kawat/Faksimili/Internet/TV Berlangganan pkm tanjungharjo", amount: "Rp 2 Jt", kodeRup: "55302558", pdn: "Ya" },
  ],
  "E-Purchasing": PAKET_BY_METODE_2025["E-Purchasing"],
  "Pengadaan Langsung": PAKET_BY_METODE_2025["Pengadaan Langsung"],
  "Seleksi": PAKET_BY_METODE_2025["Seleksi"],
};

const REALISASI_JENIS_2025: NamedAmount[] = [
  { name: "Pekerjaan Konstruksi", amount: "Rp 1.2 T" },
  { name: "Pengadaan Barang", amount: "Rp 699.2 M" },
  { name: "Jasa Konsultansi Badan Usaha Konstruksi", amount: "Rp 106.9 M" },
  { name: "Jasa Konsultansi Badan Usaha Non Konstruksi", amount: "Rp 14.9 M" },
  { name: "Jasa Lainnya", amount: "Rp 3.9 M" },
  { name: "None", amount: "Rp 1.3 M" },
];

const DATA_2025: YearData = {
  lastUpdate: "19 Januari 2026, 08:43", // sesuai tampilan terakhir kali data 2025 diambil
  rup: {
    totalPagu: "Rp 2.8 T",
    totalPaket: "16.888",
    satuanKerja: "117",
    metodePengadaan: [
      { label: "Pengadaan Langsung", count: 8968 },
      { label: "E-Purchasing", count: 6065 },
      { label: "Dikecualikan", count: 798 },
      { label: "Tender", count: 480 },
      { label: "Lainnya", count: 513 },
      { label: "Penunjukan Langsung", count: 34 },
      { label: "Seleksi", count: 29 },
      { label: "Tender Cepat", count: 1 },
    ],
    jenisPengadaan: [
      { name: "Pekerjaan Konstruksi", amount: "Rp 1.6 T" },
      { name: "Barang", amount: "Rp 749.7 M" },
      { name: "Jasa Lainnya", amount: "Rp 254.6 M" },
      { name: "Jasa Konsultansi", amount: "Rp 174.2 M" },
      { name: "Terintegrasi", amount: "Rp 356 Jt" },
      { name: "Lainnya", amount: "Rp 47.9 M" },
    ],
    sumberDana: [
      { label: "APBD", amount: "Rp 1.8 T", color: "#1F9EB0", bg: "#E0F7FA" },
      { label: "APBDP", amount: "Rp 723.4 M", color: "#E67E22", bg: "#FDEBD0" },
      { label: "BLUD", amount: "Rp 295.1 M", color: "#2ECC71", bg: "#D5F5E3" },
    ],
    opdData: OPD_DATA_2025,
    paketByMetode: PAKET_BY_METODE_2025,
  },
  realisasi: {
    totalNilai: "Rp 2.0 T",
    totalPaket: "25.961",
    satuanKerja: "112",
    metodePengadaan: [
      { label: "Pengadaan Langsung", count: 5076 },
      { label: "E-Purchasing", count: 20488 },
      { label: "Tender", count: 340 },
      { label: "Penunjukan Langsung", count: 1 },
      { label: "None", count: 5 },
      { label: "Seleksi", count: 5 },
      { label: "Dikecualikan", count: 46 },
    ],
    jenisPengadaan: REALISASI_JENIS_2025,
    sumberTransaksi: [
      { label: "Non Tender", amount: "Rp 764.6 M" },
      { label: "Tender", amount: "Rp 518.5 M" },
      { label: "E-Katalog 6.0", amount: "Rp 441.0 M" },
      { label: "E-Katalog 5.0", amount: "Rp 251.2 M" },
      { label: "Pencatatan", amount: "Rp 3.8 M" },
      { label: "Swakelola", amount: "Rp 1.3 M" },
    ],
    satker: [
      { name: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG", amount: "Rp 409.3 M", paket: 1440, pct: 20.7 },
      { name: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA", amount: "Rp 399.4 M", paket: 1284, pct: 20.2 },
      { name: "DINAS PENDIDIKAN", amount: "Rp 313.9 M", paket: 1867, pct: 15.9 },
      { name: "DINAS KESEHATAN", amount: "Rp 228.6 M", paket: 2703, pct: 11.5 },
      { name: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR", amount: "Rp 110.6 M", paket: 514, pct: 5.6 },
      { name: "DINAS PETERNAKAN DAN PERIKANAN", amount: "Rp 100.8 M", paket: 350, pct: 5.1 },
      { name: "RSUD KELAS B DR. R.SOSODORO DJATIKOESOEMO", amount: "Rp 78.8 M", paket: 4833, pct: 4.0 },
      { name: "RSUD DR. R. SOSODORO DJATIKOESOEMO", amount: "Rp 52.4 M", paket: 655, pct: 2.6 },
      { name: "DINAS KETAHANAN PANGAN DAN PERTANIAN", amount: "Rp 41.2 M", paket: 232, pct: 2.1 },
      { name: "RSUD KELAS C PADANGAN", amount: "Rp 33.8 M", paket: 1669, pct: 1.7 },
    ],
    paketByMetode: REALISASI_PAKET_BY_METODE_2025,
  },
};

const DATA_BY_YEAR: Record<number, YearData> = {
  2026: DATA_2026,
  2025: DATA_2025,
};

// ============================================================
// ================== MODAL DETAIL PAKET ======================
// ============================================================
function PaketDetailModal({
  title, items, darkMode, onClose, accent = "blue",
}: {
  title: string;
  items: PaketItem[];
  darkMode: boolean;
  onClose: () => void;
  accent?: "blue" | "green";
}) {
  const [query, setQuery] = useState("");
  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.opd.toLowerCase().includes(query.toLowerCase())
  );

  const amountColor = accent === "green" ? "#16A34A" : "#2563EB";
  const rupBadge = accent === "green"
    ? (darkMode ? "bg-[#14532D] text-[#4ADE80]" : "bg-[#D5F5E3] text-[#16A34A]")
    : (darkMode ? "bg-[#1E3A6B] text-[#93C5FD]" : "bg-[#DBEAFE] text-[#1D4ED8]");

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className={`w-full max-w-md ${darkMode ? "bg-gray-800" : "bg-white"} rounded-3xl flex flex-col overflow-hidden`}
        style={{ height: "70vh", maxHeight: "600px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`p-4 border-b flex-shrink-0 ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
          <div className="flex justify-between items-center mb-3">
            <h2 className={`text-lg font-extrabold ${darkMode ? "text-gray-100" : "text-gray-800"}`}>{title}</h2>
            <button onClick={onClose} aria-label="Tutup">
              <X className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-400"}`} />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={`w-full ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-gray-50 border-gray-100"} rounded-xl pl-9 pr-4 py-2.5 text-[13px] outline-none border placeholder:text-gray-400`}
              placeholder="Cari paket..."
            />
          </div>
        </div>

        <div className="overflow-y-auto flex-1 min-h-0 p-4 space-y-3">
          {filtered.length === 0 && (
            <p className={`text-center text-[13px] py-8 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Tidak ada paket ditemukan.</p>
          )}
          {filtered.map((item, i) => (
            <div key={i} className={`rounded-xl p-3 ${darkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
              {item.opd && (
                <p className={`text-[10px] uppercase font-semibold mb-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  {item.opd}
                </p>
              )}
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className={`text-[14px] font-bold flex-1 leading-snug ${darkMode ? "text-gray-100" : "text-gray-800"}`}>{item.title}</p>
                <span className="text-[14px] font-bold flex-shrink-0" style={{ color: amountColor }}>{item.amount}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${rupBadge}`}>
                  Kode RUP: {item.kodeRup}
                </span>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${item.pdn === "Ya" ? (darkMode ? "bg-[#3B2266] text-[#D8B4FE]" : "bg-[#EDE9FE] text-[#7C3AED]") : (darkMode ? "bg-[#5C1F2A] text-[#FCA5A5]" : "bg-[#FEE2E2] text-[#DC2626]")}`}>
                  PDN: {item.pdn}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PengadaanPage({ darkMode }: { darkMode: boolean }) {
  const [activeTab, setActiveTab] = useState("Rencana (RUP)");

  // Modal untuk tab Rencana (RUP)
  const [activeMetode, setActiveMetode] = useState<string | null>(null);

  // Highlight tombol + modal untuk tab Realisasi Paket
  const [activeRealisasiMetode, setActiveRealisasiMetode] = useState("Tender");
  const [realisasiModalMetode, setRealisasiModalMetode] = useState<string | null>(null);

  const [showAllSatker, setShowAllSatker] = useState(false);

  // Tanggal & jam: live update HANYA untuk tahun berjalan (2026).
  // Untuk tahun lain, pakai tanggal "terakhir update" dari data tahun tsb.
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Dropdown pemilih tahun (2025 / 2026)
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);

  // Reset state yang tergantung tahun setiap kali tahun berganti,
  // supaya tidak salah nampilin highlight/modal dari tahun sebelumnya.
  useEffect(() => {
    setActiveMetode(null);
    setRealisasiModalMetode(null);
    setActiveRealisasiMetode("Tender");
    setShowAllSatker(false);
  }, [selectedYear]);

  const yearData = DATA_BY_YEAR[selectedYear] ?? DATA_BY_YEAR[CURRENT_YEAR];
  const tanggalTampil = selectedYear === CURRENT_YEAR ? formatTanggalJam(now) : yearData.lastUpdate;

  const card = darkMode ? "bg-gray-800" : "bg-white";
  const txt = darkMode ? "text-gray-100" : "text-gray-800";
  const sub = darkMode ? "text-gray-400" : "text-gray-500";
  const track = darkMode ? "bg-gray-700" : "bg-gray-100";

  const satkerToShow = showAllSatker ? yearData.realisasi.satker : yearData.realisasi.satker.slice(0, 5);

  const handleClickRealisasiMetode = (label: string) => {
    setActiveRealisasiMetode(label);
    setRealisasiModalMetode(label);
  };

  return (
    <div className="px-4 py-4 space-y-5 lg:px-8 lg:py-6 lg:space-y-6">
      {/* Modal Rencana (RUP) */}
      {activeMetode && (
        <PaketDetailModal
          title={activeMetode}
          items={yearData.rup.paketByMetode[activeMetode] ?? []}
          darkMode={darkMode}
          onClose={() => setActiveMetode(null)}
          accent="blue"
        />
      )}

      {/* Modal Realisasi Paket */}
      {realisasiModalMetode && (
        <PaketDetailModal
          title={realisasiModalMetode}
          items={yearData.realisasi.paketByMetode[realisasiModalMetode] ?? []}
          darkMode={darkMode}
          onClose={() => setRealisasiModalMetode(null)}
          accent="green"
        />
      )}

      <div className="flex items-center gap-2">
        {/* Dropdown pemilih tahun */}
        <div className="relative">
          <button
            onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
            className={`flex items-center gap-1.5 ${card} rounded-xl px-3 py-2 shadow-sm border ${darkMode ? "border-gray-700" : "border-gray-100"} text-[14px] font-semibold ${txt}`}
          >
            <Calendar className="w-3.5 h-3.5 text-[#1F9EB0]" /><span>Tahun {selectedYear}</span>
            <ChevronRight className={`w-3 h-3 transition-transform ${yearDropdownOpen ? "-rotate-90" : "rotate-90"} ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
          </button>
          {yearDropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setYearDropdownOpen(false)} />
              <div className={`absolute top-full left-0 mt-1 ${card} rounded-xl shadow-lg border ${darkMode ? "border-gray-700" : "border-gray-100"} py-1 z-20 min-w-[110px]`}>
                {TAHUN_OPTIONS.map((year) => (
                  <button
                    key={year}
                    onClick={() => { setSelectedYear(year); setYearDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-[14px] font-semibold ${year === selectedYear ? "text-[#1F9EB0]" : txt} ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
                  >
                    Tahun {year}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className={`flex items-center gap-1 text-[12px] ${sub} ${card} rounded-xl px-3 py-2 shadow-sm border ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
          <Clock className="w-3 h-3 text-[#2ECC71]" /><span>{tanggalTampil}</span>
        </div>
        <button
          aria-label="Muat ulang data"
          className={`ml-auto w-8 h-8 ${card} rounded-xl flex items-center justify-center shadow-sm border ${darkMode ? "border-gray-700" : "border-gray-100"}`}
        >
          <RefreshCw className="w-4 h-4 text-[#1F9EB0]" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {["Rencana (RUP)", "Realisasi Paket"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className="py-3 rounded-xl text-[14px] font-bold flex items-center justify-center gap-1.5 transition-colors"
            style={activeTab === tab
              ? (tab === "Realisasi Paket"
                  ? { background: "#2ECC71", color: "white" }
                  : { background: "#1F9EB0", color: "white" })
              : { background: darkMode ? "#374151" : "white", color: darkMode ? "#9CA3AF" : "#6B7280", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            {tab === "Rencana (RUP)" ? <FileText className="w-3.5 h-3.5" /> : <Package className="w-3.5 h-3.5" />}
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Rencana (RUP)" ? (
        <>
          <div className="rounded-2xl p-5 text-white relative overflow-hidden" style={{ background: darkMode ? "linear-gradient(135deg, #1E3A6B 0%, #17285A 100%)" : "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)" }}>
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10"><svg viewBox="0 0 120 120" fill="white"><circle cx="100" cy="20" r="80" /></svg></div>
            <div className="relative">
              <p className="text-[12px] font-bold uppercase tracking-wider opacity-80 mb-2">Total Pagu Pengadaan</p>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-4xl font-extrabold mb-5">{yearData.rup.totalPagu}</h2>
              <div className="flex justify-between">
                <div><p className="text-[12px] opacity-75 uppercase font-semibold">Total Paket</p><p className="text-xl font-extrabold mt-0.5">{yearData.rup.totalPaket}</p></div>
                <div className="text-right"><p className="text-[12px] opacity-75 uppercase font-semibold">Satuan Kerja</p><p className="text-xl font-extrabold mt-0.5">{yearData.rup.satuanKerja}</p></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
            <div className={`${card} rounded-2xl p-4 shadow-sm`}>
              <h2 className={`text-sm font-bold ${txt} mb-4`}><ChevronRight className="w-4 h-4 text-[#1F9EB0] inline -mt-0.5" /> Rincian Kategori</h2>
              <p className={`text-[11px] ${sub} uppercase font-bold mb-2 tracking-wide`}>Metode Pengadaan</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {yearData.rup.metodePengadaan.map((item, i) => {
                  const active = activeMetode === item.label;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveMetode(item.label)}
                      className="text-[13px] font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-transform hover:scale-105"
                      style={active ? { background: darkMode ? "#164752" : "#CCEEF2", color: darkMode ? "#5EEAD4" : "#1F9EB0" } : { background: darkMode ? "#374151" : "#f3f4f6", color: darkMode ? "#D1D5DB" : "#6B7280" }}
                    >
                      {item.label}
                      <span className="text-[11px] font-extrabold px-1.5 py-0.5 rounded-md"
                        style={active ? { background: darkMode ? "#1F5C69" : "#B2E8EF", color: darkMode ? "#9CF0E5" : "#156F7D" } : { background: darkMode ? "#4B5563" : "#e5e7eb", color: darkMode ? "#D1D5DB" : "#6B7280" }}>
                        {item.count}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className={`text-[11px] ${sub} uppercase font-bold mb-2 tracking-wide`}>Jenis Pengadaan</p>
              <div className="space-y-2">
                {yearData.rup.jenisPengadaan.map((item, i) => (
                  <div key={i} className={`flex items-center justify-between py-2 border-b ${darkMode ? "border-gray-700" : "border-gray-50"} last:border-0`}>
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center ${darkMode ? "bg-[#164752]" : "bg-[#E0F7FA]"}`}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#2BB2C2" }} />
                      </div>
                      <span className={`text-[14px] ${txt}`}>{item.name}</span>
                    </div>
                    <span className={`text-[14px] font-bold ${txt}`}>{item.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className={`${card} rounded-2xl p-4 shadow-sm`}>
                <p className={`text-[11px] ${sub} uppercase font-bold mb-3 tracking-wide`}>Sumber Dana</p>
                <div className="grid grid-cols-3 gap-2">
                  {yearData.rup.sumberDana.map((item, i) => (
                    <div key={i} className="rounded-xl p-3 text-center"
                      style={{ background: darkMode ? "rgba(255,255,255,0.05)" : item.bg }}>
                      <p className={`text-[11px] font-bold uppercase ${sub}`}>{item.label}</p>
                      <p className="text-[13px] font-extrabold mt-0.5" style={{ color: item.color }}>{item.amount}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`${card} rounded-2xl p-4 shadow-sm`}>
                <h2 className={`text-sm font-bold ${txt} mb-4`}>Daftar OPD</h2>
                <div className="space-y-4">
                  {yearData.rup.opdData.slice(0, 5).map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-start mb-1 gap-2">
                        <p className={`text-[13px] ${txt} flex-1 leading-tight`}>{item.name}</p>
                        <div className="text-right flex-shrink-0">
                          <p className={`text-[14px] font-bold ${txt}`}>{item.real}</p>
                          <p className="text-[12px] font-bold text-[#1F9EB0]">{item.pct}%</p>
                        </div>
                      </div>
                      <div className={`h-1 ${track} rounded-full overflow-hidden mb-1`}>
                        <div className="h-full rounded-full" style={{ width: `${Math.min(item.pct, 100)}%`, background: "#2BB2C2" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="rounded-2xl p-5 text-white relative overflow-hidden" style={{ background: darkMode ? "linear-gradient(135deg, #14532D 0%, #0F3D22 100%)" : "linear-gradient(135deg, #16A34A 0%, #15803D 100%)" }}>
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10"><svg viewBox="0 0 120 120" fill="white"><circle cx="100" cy="20" r="80" /></svg></div>
            <div className="relative">
              <p className="text-[12px] font-bold uppercase tracking-wider opacity-80 mb-2">Total Nilai Realisasi</p>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-4xl font-extrabold mb-5">{yearData.realisasi.totalNilai}</h2>
              <div className="flex justify-between">
                <div><p className="text-[12px] opacity-75 uppercase font-semibold">Total Paket</p><p className="text-xl font-extrabold mt-0.5">{yearData.realisasi.totalPaket}</p></div>
                <div className="text-right"><p className="text-[12px] opacity-75 uppercase font-semibold">Satuan Kerja</p><p className="text-xl font-extrabold mt-0.5">{yearData.realisasi.satuanKerja}</p></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
            <div className="space-y-5">
              <div className={`${card} rounded-2xl p-4 shadow-sm`}>
                <h2 className={`text-sm font-bold ${txt} mb-4`}><ChevronRight className="w-4 h-4 text-[#2ECC71] inline -mt-0.5" /> Rincian Kategori</h2>
                <p className={`text-[11px] ${sub} uppercase font-bold mb-2 tracking-wide`}>Metode Pengadaan</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {yearData.realisasi.metodePengadaan.map((item, i) => {
                    const active = activeRealisasiMetode === item.label;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleClickRealisasiMetode(item.label)}
                        className="text-[13px] font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-transform hover:scale-105"
                        style={active ? { background: darkMode ? "#14532D" : "#D5F5E3", color: darkMode ? "#4ADE80" : "#16A34A" } : { background: darkMode ? "#374151" : "#f3f4f6", color: darkMode ? "#D1D5DB" : "#6B7280" }}
                      >
                        {item.label}
                        <span className="text-[11px] font-extrabold px-1.5 py-0.5 rounded-md"
                          style={active ? { background: darkMode ? "#166534" : "#BBF7D0", color: darkMode ? "#BBF7D0" : "#15803D" } : { background: darkMode ? "#4B5563" : "#e5e7eb", color: darkMode ? "#D1D5DB" : "#6B7280" }}>
                          {item.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className={`text-[11px] ${sub} uppercase font-bold mb-2 tracking-wide`}>Jenis Pengadaan</p>
                <div className="space-y-2 mb-5">
                  {yearData.realisasi.jenisPengadaan.map((item, i) => (
                    <div key={i} className={`flex items-center justify-between py-2 border-b ${darkMode ? "border-gray-700" : "border-gray-50"} last:border-0`}>
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center ${darkMode ? "bg-[#14532D]" : "bg-[#D5F5E3]"}`}>
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#16A34A" }} />
                        </div>
                        <span className={`text-[14px] ${txt}`}>{item.name}</span>
                      </div>
                      <span className={`text-[14px] font-bold ${txt}`}>{item.amount}</span>
                    </div>
                  ))}
                </div>
                <p className={`text-[11px] ${sub} uppercase font-bold mb-2 tracking-wide`}>Sumber Transaksi</p>
                <div className="grid grid-cols-2 gap-2">
                  {yearData.realisasi.sumberTransaksi.map((item, i) => (
                    <div key={i} className={`rounded-xl p-3 border ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                      <p className="text-[13px] font-semibold" style={{ color: darkMode ? "#4ADE80" : "#16A34A" }}>{item.label}</p>
                      <p className={`text-[14px] font-bold mt-0.5 ${txt}`}>{item.amount}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`${card} rounded-2xl p-4 shadow-sm h-fit`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-sm font-bold ${txt}`}>Realisasi per Satker (10 Teratas)</h2>
                {!showAllSatker && yearData.realisasi.satker.length > 5 && (
                  <button onClick={() => setShowAllSatker(true)} className="text-[12px] font-semibold px-3 py-1 rounded-lg border" style={{ borderColor: darkMode ? "#4B5563" : "#e5e7eb", color: darkMode ? "#D1D5DB" : "#6B7280" }}>
                    Lihat Semua
                  </button>
                )}
              </div>
              <div className="space-y-4">
                {satkerToShow.length === 0 && (
                  <p className={`text-center text-[13px] py-6 ${sub}`}>Belum ada data.</p>
                )}
                {satkerToShow.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <p className={`text-[12px] font-bold ${txt} flex-1 leading-tight uppercase`}>{item.name}</p>
                      <span className="text-[13px] font-bold flex-shrink-0" style={{ color: darkMode ? "#4ADE80" : "#16A34A" }}>{item.amount}</span>
                    </div>
                    <div className={`h-1.5 ${track} rounded-full overflow-hidden mb-1`}>
                      <div className="h-full rounded-full" style={{ width: `${Math.min(item.pct, 100)}%`, background: "#16A34A" }} />
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-[11px] ${sub}`}>{item.paket} Paket</span>
                      <span className={`text-[11px] font-semibold ${sub}`}>{item.pct}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}