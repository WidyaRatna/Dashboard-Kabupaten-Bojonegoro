import type { CommentItem } from "../types";

export const TRENDING_BY_TAB: Record<string, { tag: string; title: string; desc: string; mentions: number }[]> = {
  "Hari Ini": [
    { tag: "Negatif", title: "Penambangan Ilegal", desc: "Permasalahan penambangan tanpa izin di wilayah Bojonegoro...", mentions: 8 },
    { tag: "Positif", title: "BLT Dana Desa", desc: "Warga apresiasi program bantuan langsung tunai...", mentions: 6 },
    { tag: "Netral", title: "Infrastruktur Jalan", desc: "Warga mempertanyakan jadwal perbaikan jalan rusak...", mentions: 5 },
  ],
  "Mingguan": [
    { tag: "Negatif", title: "Pertambangan di Jatim", desc: "Usulan mengenai tambang tentang lainnya permasalahan utama...", mentions: 14 },
    { tag: "Positif", title: "Pendidikan dan Hari Anak", desc: "Usulan mengenai tambang tentang lainnya permasalahan utama...", mentions: 12 },
    { tag: "Negatif", title: "Pemerintah Kabupaten", desc: "Usulan mengenai tambang tentang lainnya permasalahan utama...", mentions: 11 },
    { tag: "Netral", title: "Dana APBD", desc: "Masyarakat bertanya-tanya tentang transparansi anggaran daerah...", mentions: 9 },
  ],
  "Bulanan": [
    { tag: "Negatif", title: "Korupsi Proyek Jalan", desc: "Dugaan penyimpangan dana pembangunan jalan lingkar...", mentions: 38 },
    { tag: "Positif", title: "Wisata Kayangan Api", desc: "Pengunjung meningkat pesat setelah renovasi fasilitas...", mentions: 31 },
    { tag: "Positif", title: "UMKM Batik Lokal", desc: "Program bantuan alat produksi batik diterima baik warga...", mentions: 27 },
    { tag: "Netral", title: "Rekrutmen CPNS", desc: "Warga antusias mengikuti seleksi CPNS Bojonegoro...", mentions: 22 },
    { tag: "Negatif", title: "Banjir Bengawan Solo", desc: "Warga terdampak meminta percepatan pembangunan tanggul...", mentions: 19 },
  ],
};

export const SENTIMENT_PIE = [
  { name: "Positif", value: 45, color: "#2ECC71" },
  { name: "Netral", value: 35, color: "#F39C12" },
  { name: "Negatif", value: 20, color: "#D35400" },
];

export const COMMENTS_ALL: CommentItem[] = [
  { user: "rizmadf_", comment: "Terserah anda saja pak, bukan ngeh solusi bar rakuk cukai murah...", sentiment: "Netral", color: "bg-[#E67E22]", time: "4 hr lalu" },
  { user: "rofiuddin205", comment: "Seng penting mulia", sentiment: "Positif", color: "bg-[#D35400]", time: "4 hr lalu" },
  { user: "kalamiya_69", comment: "Terserah anda saja pak, bukan ngaah solusi bar rakuk cukai murah, malah merampas...", sentiment: "Negatif", color: "bg-[#1F9EB0]", time: "4 hr lalu" },
  { user: "mohammadfatih02", comment: "Tuku yo gawe duite dewe, yo ara t...", sentiment: "Negatif", color: "bg-[#2BB2C2]", time: "4 hr lalu" },
];

export const SENTIMEN_BY_TAB: Record<string, { total: number; pos: number; neu: number; neg: number; comments: CommentItem[] }> = {
  "Hari Ini": {
    total: 47, pos: 52, neu: 30, neg: 18,
    comments: [
      { user: "agung_bwi", comment: "Keren programnya pak bupati!", sentiment: "Positif", color: "bg-[#2ECC71]", time: "1 hr lalu" },
      { user: "wati_123", comment: "Kapan jalan di desa kami diperbaiki?", sentiment: "Netral", color: "bg-[#F39C12]", time: "2 hr lalu" },
      { user: "budi_s", comment: "Korupsi dimana-mana ini!", sentiment: "Negatif", color: "bg-[#D35400]", time: "3 hr lalu" },
    ],
  },
  "Mingguan": {
    total: 898, pos: 45, neu: 35, neg: 20,
    comments: [
      { user: "haqisilva16", comment: "54 menit yang lalu membalas komentar", sentiment: "Netral", color: "bg-[#7C3AED]", time: "4 hr lalu" },
      { user: "rizmadf_", comment: "@ttnnmjhh terserah anda saja pak", sentiment: "Netral", color: "bg-[#D35400]", time: "4 hr lalu" },
      { user: "rofiuddin205", comment: "Seng penting mulia", sentiment: "Positif", color: "bg-[#E67E22]", time: "4 hr lalu" },
      { user: "kalamiya_69", comment: "Terserah anda saja pak, bukan ngash solusi bar rakuk cukai murah, malah merampas milik pedagang...", sentiment: "Negatif", color: "bg-[#1F9EB0]", time: "4 hr lalu" },
      { user: "mohammadfatih02", comment: "Tuku yo gawe duite dewe, yo ara t...", sentiment: "Negatif", color: "bg-[#2BB2C2]", time: "4 hr lalu" },
      { user: "sari_dewi", comment: "Alhamdulillah program bantuan sudah diterima", sentiment: "Positif", color: "bg-[#2ECC71]", time: "5 hr lalu" },
      { user: "pak_muji", comment: "Semoga pemerintah lebih transparan lagi", sentiment: "Netral", color: "bg-[#F39C12]", time: "6 hr lalu" },
    ],
  },
  "Bulanan": {
    total: 3241, pos: 41, neu: 33, neg: 26,
    comments: [
      { user: "komunitas_bjn", comment: "Program UMKM bulan ini sangat membantu warga kecil", sentiment: "Positif", color: "bg-[#2ECC71]", time: "2 hr lalu" },
      { user: "warga_btl", comment: "Banjir bulan lalu tidak ditangani dengan cepat", sentiment: "Negatif", color: "bg-[#D35400]", time: "5 hr lalu" },
      { user: "pemuda_bjn", comment: "Kapan rekrutmen pegawai honorer dibuka lagi?", sentiment: "Netral", color: "bg-[#F39C12]", time: "1 hr lalu" },
      { user: "ibu_siti", comment: "BLT sudah cair, terima kasih pak bupati", sentiment: "Positif", color: "bg-[#1F9EB0]", time: "3 hr lalu" },
      { user: "eko_w", comment: "Proyek jalan mangkrak sudah 6 bulan, mohon perhatian", sentiment: "Negatif", color: "bg-[#E67E22]", time: "4 hr lalu" },
    ],
  },
  "Rentang": {
    total: 12840, pos: 38, neu: 40, neg: 22,
    comments: [
      { user: "analitik_bjn", comment: "Dalam 3 bulan terakhir sentimen positif meningkat 12%", sentiment: "Positif", color: "bg-[#2BB2C2]", time: "1 hr lalu" },
      { user: "media_watch", comment: "Ada lonjakan komentar negatif saat banjir Januari", sentiment: "Netral", color: "bg-[#F39C12]", time: "2 hr lalu" },
    ],
  },
};
