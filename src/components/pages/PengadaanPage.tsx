import { useState } from "react";
import { Calendar, ChevronRight, Clock, FileText, Package, RefreshCw, Search, X } from "lucide-react";
import { OPD_DATA } from "../../data/transactions";

type PaketItem = {
  opd: string;
  title: string;
  amount: string;
  kodeRup: string;
  pdn: "Ya" | "Tidak";
};

// ================== DATA RENCANA (RUP) ==================
const PAKET_BY_METODE: Record<string, PaketItem[]> = {
  "E-Purchasing": [
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "Biaya Makanan dan Minuman Harian pasien", amount: "Rp 7.2 M", kodeRup: "66158037", pdn: "Ya" },
    { opd: "DINAS PETERNAKAN DAN PERIKANAN - 3.25.3.27.0.00.01.0000", title: "Belanja Barang untuk Dijual/Diserahkan kepada Masyarakat", amount: "Rp 5.4 M", kodeRup: "63276010", pdn: "Ya" },
    { opd: "DINAS PETERNAKAN DAN PERIKANAN - 3.25.3.27.0.00.01.0000", title: "Belanja Barang untuk Dijual/Diserahkan kepada Masyarakat", amount: "Rp 5.4 M", kodeRup: "63276010", pdn: "Ya" },
    { opd: "DINAS PETERNAKAN DAN PERIKANAN - 3.25.3.27.0.00.01.0000", title: "Belanja Barang untuk Dijual/Diserahkan kepada Masyarakat", amount: "Rp 5.4 M", kodeRup: "63276010", pdn: "Ya" },
    { opd: "DINAS PETERNAKAN DAN PERIKANAN - 3.25.3.27.0.00.01.0000", title: "Belanja Barang untuk Dijual/Diserahkan kepada Masyarakat", amount: "Rp 5.4 M", kodeRup: "63276010", pdn: "Ya" },
    { opd: "DINAS PERHUBUNGAN - 2.15.0.00.0.00.01.0000", title: "Belanja Jasa yang Diberikan kepada Masyarakat ( Penyediaan Angkutan Umum untuk Jasa Angkutan Orang dan/atau Barang Antar Kota dalam 1 (satu) Daerah Kabupaten/Kota )", amount: "Rp 5.3 M", kodeRup: "63134143", pdn: "Ya" },
    { opd: "DINAS PETERNAKAN DAN PERIKANAN - 3.25.3.27.0.00.01.0000", title: "Belanja Barang untuk Dijual/Diserahkan kepada Masyarakat", amount: "Rp 5.1 M", kodeRup: "63276010", pdn: "Ya" },
    { opd: "DINAS PETERNAKAN DAN PERIKANAN - 3.25.3.27.0.00.01.0000", title: "Belanja Barang untuk Dijual/Diserahkan kepada Masyarakat", amount: "Rp 5.1 M", kodeRup: "63276010", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "Biaya Jasa Pengamanan Rumah Sakit", amount: "Rp 4.7 M", kodeRup: "62520992", pdn: "Ya" },
    { opd: "DINAS PETERNAKAN DAN PERIKANAN - 3.25.3.27.0.00.01.0000", title: "Belanja Obat-Obatan", amount: "Rp 4.6 M", kodeRup: "65697542", pdn: "Ya" },
    { opd: "DINAS KESEHATAN - 1.02.0.00.0.00.01.0000", title: "Belanja Bahan-Bahan Lainnya", amount: "Rp 3.2 M", kodeRup: "63093799", pdn: "Tidak" },
    { opd: "RSUD PADANGAN - 1.02.0.00.0.00.01.0003", title: "Biaya Jasa Cleaning Service", amount: "Rp 2.8 M", kodeRup: "62608636", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "Biaya Makanan dan Minuman Harian Pasien", amount: "Rp 2.5 M", kodeRup: "62508637", pdn: "Ya" },
    { opd: "DINAS KESEHATAN - 1.02.0.00.0.00.01.0000", title: "Belanja Bahan-Bahan Lainnya (Kesling 02.17)", amount: "Rp 2.2 M", kodeRup: "63107324", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "Biaya Jasa Cleaning Service Rumah Sakit", amount: "Rp 1.9 M", kodeRup: "62520619", pdn: "Ya" },
    { opd: "DINAS KESEHATAN - 1.02.0.00.0.00.01.0000", title: "Belanja Bahan-Bahan Lainnya - BMHP Skrining PKG", amount: "Rp 1.6 M", kodeRup: "62842732", pdn: "Ya" },
    { opd: "DINAS PETERNAKAN DAN PERIKANAN - 3.25.3.27.0.00.01.0000", title: "Belanja Alat/Bahan untuk Kegiatan Kantor- Suvenir/Cendera Mata", amount: "Rp 1.6 M", kodeRup: "63074823", pdn: "Ya" },
    { opd: "RSUD PADANGAN - 1.02.0.00.0.00.01.0003", title: "Biaya Outsourcing Satpam", amount: "Rp 1.5 M", kodeRup: "62608509", pdn: "Ya" },
    { opd: "BAGIAN UMUM - 4.01.5.06.3.29.01.0008", title: "Belanja Jasa Tenaga Kebersihan", amount: "Rp 1.5 M", kodeRup: "62764779", pdn: "Ya" },
    { opd: "DINAS PETERNAKAN DAN PERIKANAN - 3.25.3.27.0.00.01.0000", title: "Belanja Obat-Obatan PHMS", amount: "Rp 1.5 M", kodeRup: "65704048", pdn: "Ya" },
    { opd: "DINAS KEPEMUDAAN DAN OLAHRAGA - 2.19.0.00.0.00.01.0000", title: "Belanja Jasa Tenaga Kebersihan", amount: "Rp 1.5 M", kodeRup: "62842626", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "Biaya Pengadaan Mesin Cuci dan Pengering", amount: "Rp 1.3 M", kodeRup: "64846781", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "PENGADAAN ALAT - ALAT KEDOKTERAN UMUM", amount: "Rp 1.3 M", kodeRup: "62947790", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "Biaya Jasa Cleaning Service Rumah Sakit", amount: "Rp 1.1 M", kodeRup: "62520619", pdn: "Ya" },
    { opd: "SEKRETARIAT DPRD - 4.02.0.00.0.00.01.0000", title: "Belanja Modal Personal Computer  -Penyediaan Peralatan dan Perlengkapan Kantor", amount: "Rp 1.1 M", kodeRup: "63058350", pdn: "Ya" },
    { opd: "DINAS PERHUBUNGAN - 2.15.0.00.0.00.01.0000", title: "Belanja Jasa Tenaga Pelayanan Umum (Sub Pengendalian Pelaksanaan Rencana Induk Perkeretaapian)", amount: "Rp 1.1 M", kodeRup: "63025986", pdn: "Ya" },
    { opd: "DINAS KOMUNIKASI DAN INFORMATIKA - 2.16.2.21.2.20.01.0000", title: "Belanja Bandwidth IP Transit dan Metro Kecamatan", amount: "Rp 1.1 M", kodeRup: "62509076", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "Biaya Makanan dan Minuman Harian Petugas RS", amount: "Rp 1.1 M", kodeRup: "66212346", pdn: "Ya" },
    { opd: "RSUD SUMBERREJO - 1.02.0.00.0.00.01.0002", title: "Belanja Makanan/Minuman Pasien", amount: "Rp 1.0 M", kodeRup: "63149832", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "PENGADAAN ALAT - ALAT KEDOKTERAN UMUM", amount: "Rp 1.0 M", kodeRup: "62947790", pdn: "Ya" },
    { opd: "DINAS KEPEMUDAAN DAN OLAHRAGA - 2.19.0.00.0.00.01.0000", title: "Belanja Jasa Tenaga Keamanan", amount: "Rp 902 Jt", kodeRup: "62842628", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "PENGADAAN ALAT - ALAT KEDOKTERAN UMUM", amount: "Rp 899 Jt", kodeRup: "62947790", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "PENGADAAN ALAT - ALAT KEDOKTERAN BEDAH", amount: "Rp 878 Jt", kodeRup: "67064284", pdn: "Ya" },
    { opd: "DINAS KESEHATAN - 1.02.0.00.0.00.01.0000", title: "Belanja Modal Peralatan Jaringan", amount: "Rp 860 Jt", kodeRup: "62771422", pdn: "Tidak" },
    { opd: "DINAS KESEHATAN - 1.02.0.00.0.00.01.0000", title: "Belanja Bahan-Bahan Lainnya - BMHP Skrining PKG", amount: "Rp 840 Jt", kodeRup: "62842732", pdn: "Ya" },
    { opd: "DINAS LINGKUNGAN HIDUP - 2.11.3.28.0.00.01.0000", title: "Belanja Jasa Tenaga Keamanan", amount: "Rp 802 Jt", kodeRup: "62528547", pdn: "Ya" },
    { opd: "DINAS PERHUBUNGAN - 2.15.0.00.0.00.01.0000", title: "Warning Light (sub kegiatan Penyediaan Perlengkapan Jalan di Jalan Kabupaten/Kota)", amount: "Rp 793 Jt", kodeRup: "62936862", pdn: "Ya" },
    { opd: "DINAS PERHUBUNGAN - 2.15.0.00.0.00.01.0000", title: "Paket Konsolidasi Cetak Stiker Parkir Berlangganan (Sub Kegiatan Fasilitasi Pemenuhan Persyaratan Perolehan Izin Penyelenggaraan dan Pembangunan Fasilitas Parkir)", amount: "Rp 776 Jt", kodeRup: "65067496", pdn: "Ya" },
    { opd: "DINAS KOMUNIKASI DAN INFORMATIKA - 2.16.2.21.2.20.01.0000", title: "Belanja Bandwidth IP Transit II", amount: "Rp 768 Jt", kodeRup: "62511583", pdn: "Ya" },
    { opd: "DINAS KEPENDUDUKAN DAN PENCATATAN SIPIL - 2.12.0.00.0.00.01.0000", title: "Belanja Alat/Bahan untuk Kegiatan Kantor-Bahan Komputer", amount: "Rp 733 Jt", kodeRup: "62757029", pdn: "Tidak" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG - 1.03.0.00.0.00.01.0000", title: "Konsolidasi Belanja Bahan - Bahan Bangunan dan Konstruksi (Pemeliharaan Rutin Jalan Wilayah I,II,III,IV) Paket I", amount: "Rp 729 Jt", kodeRup: "66081803", pdn: "Ya" },
    { opd: "RSUD SUMBERREJO - 1.02.0.00.0.00.01.0002", title: "Belanja Jasa Cleaning Service", amount: "Rp 706 Jt", kodeRup: "63499079", pdn: "Ya" },
    { opd: "RSUD PADANGAN - 1.02.0.00.0.00.01.0003", title: "Biaya Jasa Tenaga Lainnya", amount: "Rp 701 Jt", kodeRup: "62665821", pdn: "Ya" },
    { opd: "DINAS PERDAGANGAN, KOPERASI DAN USAHA MIKRO - 3.30.2.17.0.00.01.0000", title: "Belanja Jasa Tenaga Kebersihan", amount: "Rp 694 Jt", kodeRup: "62988197", pdn: "Ya" },
    { opd: "RSUD SUMBERREJO - 1.02.0.00.0.00.01.0002", title: "Belanja Jasa Pengamanan RS", amount: "Rp 671 Jt", kodeRup: "63501245", pdn: "Ya" },
    { opd: "RSUD KEPOHBARU - 1.02.0.00.0.00.01.0004", title: "Belanja Jasa Tenaga Kebersihan", amount: "Rp 657 Jt", kodeRup: "62701161", pdn: "Ya" },
    { opd: "RSUD SUMBERREJO - 1.02.0.00.0.00.01.0002", title: "Belanja Oksigen", amount: "Rp 619 Jt", kodeRup: "63148107", pdn: "Ya" },
    { opd: "RSUD KEPOHBARU - 1.02.0.00.0.00.01.0004", title: "Belanja Modal Peralatan dan Mesin Alat Kedokteran dan Kesehatan", amount: "Rp 616 Jt", kodeRup: "66428007", pdn: "Tidak" },
    { opd: "DINAS PERDAGANGAN, KOPERASI DAN USAHA MIKRO - 3.30.2.17.0.00.01.0000", title: "Belanja Jasa Tenaga Keamanan", amount: "Rp 613 Jt", kodeRup: "62988198", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "Biaya Makanan dan Minuman Harian Petugas RS", amount: "Rp 603 Jt", kodeRup: "62509516", pdn: "Ya" },
    { opd: "DINAS KETAHANAN PANGAN DAN PERTANIAN - 2.09.3.27.0.00.01.0000", title: "Belanja Barang untuk Dijual/Diserahkan kepada Masyarakat", amount: "Rp 589 Jt", kodeRup: "66814374", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA - 1.03.1.04.2.10.03.0000", title: "Belanja Bahan-Bahan Bangunan dan Konstruksi", amount: "Rp 582 Jt", kodeRup: "62883574", pdn: "Ya" },
    { opd: "RSUD PADANGAN - 1.02.0.00.0.00.01.0003", title: "Biaya Darah dan Gas Medis", amount: "Rp 559 Jt", kodeRup: "62859130", pdn: "Ya" },
    { opd: "DINAS SOSIAL - 1.06.0.00.0.00.01.0000", title: "Belanja Alat/Bahan untuk Kegiatan Kantor- Bahan Cetak", amount: "Rp 556 Jt", kodeRup: "62919849", pdn: "Ya" },
    { opd: "RSUD KEPOHBARU - 1.02.0.00.0.00.01.0004", title: "Belanja Makanan dan Minuman pada Fasilitas Pelayanan Urusan Kesehatan", amount: "Rp 549 Jt", kodeRup: "62701400", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "Biaya Jasa Pembuangan Sampah ( pembuangan limbah B3) EP", amount: "Rp 533 Jt", kodeRup: "64223634", pdn: "Ya" },
    { opd: "DINAS PERHUBUNGAN - 2.15.0.00.0.00.01.0000", title: "Belanja Modal Alat Penguji Kendaraan Bermotor ( Sub Kegiatan Penyediaan Sarana dan Prasarana Pengujian Berkala Kendaraan Bermotor )", amount: "Rp 508 Jt", kodeRup: "63136715", pdn: "Tidak" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "Belanja Modal Pengadaan Jaringan Nurse Call", amount: "Rp 499 Jt", kodeRup: "66602770", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG - 1.03.0.00.0.00.01.0000", title: "Konsolidasi Pengadaan perabot kantor", amount: "Rp 498 Jt", kodeRup: "65393176", pdn: "Ya" },
    { opd: "DINAS PETERNAKAN DAN PERIKANAN - 3.25.3.27.0.00.01.0000", title: "Belanja Makanan dan Minuman Rapat", amount: "Rp 497 Jt", kodeRup: "65051001", pdn: "Ya" },
    { opd: "DINAS LINGKUNGAN HIDUP - 2.11.3.28.0.00.01.0000", title: "Belanja Jasa Tenaga Kebersihan", amount: "Rp 486 Jt", kodeRup: "62542067", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "Biaya Bahan Pembersih Rumah Tangga", amount: "Rp 456 Jt", kodeRup: "63130671", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "BIAYA BAHAN OBAT OBATAN E KATALOG", amount: "Rp 452 Jt", kodeRup: "62942697", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "BIAYA BAHAN OBAT OBATAN E KATALOG", amount: "Rp 451 Jt", kodeRup: "62942697", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "Biaya Plastik dan Karung Kegiatan Pencegahan Penyakit Menular", amount: "Rp 451 Jt", kodeRup: "67064038", pdn: "Ya" },
    { opd: "RSUD PADANGAN - 1.02.0.00.0.00.01.0003", title: "Biaya Makan Pasien", amount: "Rp 445 Jt", kodeRup: "62606703", pdn: "Ya" },
    { opd: "DINAS SOSIAL - 1.06.0.00.0.00.01.0000", title: "Belanja Jasa Tenaga Kebersihan", amount: "Rp 429 Jt", kodeRup: "62749397", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "BIAYA BAHAN OBAT OBATAN E KATALOG", amount: "Rp 408 Jt", kodeRup: "62942697", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG - 1.03.0.00.0.00.01.0000", title: "Belanja Jasa Tenaga Kebersihan 2026", amount: "Rp 401 Jt", kodeRup: "62145879", pdn: "Ya" },
    { opd: "DINAS KESEHATAN - 1.02.0.00.0.00.01.0000", title: "Belanja Jasa Tenaga Keamanan", amount: "Rp 400 Jt", kodeRup: "62328280", pdn: "Ya" },
    { opd: "RSUD KEPOHBARU - 1.02.0.00.0.00.01.0004", title: "Belanja Pemeliharaan Jaringan Listrik - Jaringan Listrik Lainnya", amount: "Rp 395 Jt", kodeRup: "64902962", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "BIAYA BAHAN OBAT OBATAN E KATALOG", amount: "Rp 386 Jt", kodeRup: "67064208", pdn: "Ya" },
    { opd: "DINAS KEBUDAYAAN DAN PARIWISATA - 2.22.3.26.0.00.01.0000", title: "Belanja Jasa Tenaga Keamanan", amount: "Rp 368 Jt", kodeRup: "63172005", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "BIAYA BAHAN OBAT OBATAN E KATALOG", amount: "Rp 366 Jt", kodeRup: "62942697", pdn: "Ya" },
    { opd: "DINAS LINGKUNGAN HIDUP - 2.11.3.28.0.00.01.0000", title: "KONSOLIDASI Belanja Jasa Konsultansi Berorientasi Layanan-Jasa Khusus (PENGUJIAN DAN ANALISA LABORATORIUM)", amount: "Rp 361 Jt", kodeRup: "66827902", pdn: "Ya" },
    { opd: "BAGIAN UMUM - 4.01.5.06.3.29.01.0008", title: "Belanja Sewa Kendaraan Bermotor Penumpang", amount: "Rp 352 Jt", kodeRup: "62764211", pdn: "Ya" },
    { opd: "DINAS PETERNAKAN DAN PERIKANAN - 3.25.3.27.0.00.01.0000", title: "Belanja Sewa Kendaraan Bermotor Penumpang", amount: "Rp 347 Jt", kodeRup: "63276014", pdn: "Ya" },
    { opd: "BADAN PENANGGULANGAN BENCANA DAERAH - 1.05.0.00.0.00.03.0000", title: "Belanja Bahan-Bahan Lainnya dan Bahan Konstruksi (Kerjasama Antar Lembaga) KONSOLIDASI", amount: "Rp 338 Jt", kodeRup: "65000194", pdn: "Ya" },
    { opd: "DINAS KEBUDAYAAN DAN PARIWISATA - 2.22.3.26.0.00.01.0000", title: "Belanja Jasa Tenaga Kebersihan", amount: "Rp 334 Jt", kodeRup: "63172004", pdn: "Ya" },
    { opd: "RSUD KEPOHBARU - 1.02.0.00.0.00.01.0004", title: "Belanja Modal Peralatan dan Mesin Alat Kantor dan Rumah Tangga Lainnya", amount: "Rp 327 Jt", kodeRup: "66427895", pdn: "Ya" },
    { opd: "BADAN PENANGGULANGAN BENCANA DAERAH - 1.05.0.00.0.00.03.0000", title: "Belanja Natura dan Pakan-Natura-Tas ( Logistik ) KONSOLIDASI", amount: "Rp 318 Jt", kodeRup: "64980028", pdn: "Ya" },
    { opd: "RSUD SUMBERREJO - 1.02.0.00.0.00.01.0002", title: "Belanja Oksigen", amount: "Rp 309 Jt", kodeRup: "63148107", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "BIAYA SERVICE SUKU CADANG ALAT KEDOKTERAN RS E KATALOG", amount: "Rp 306 Jt", kodeRup: "65372705", pdn: "Tidak" },
    { opd: "DINAS LINGKUNGAN HIDUP - 2.11.3.28.0.00.01.0000", title: "Belanja Bahan-Bahan Bangunan dan Konstruksi", amount: "Rp 305 Jt", kodeRup: "62758188", pdn: "Ya" },
    { opd: "RSUD KEPOHBARU - 1.02.0.00.0.00.01.0004", title: "Belanja Jasa Tenaga Keamanan", amount: "Rp 301 Jt", kodeRup: "62701270", pdn: "Ya" },
    { opd: "RSUD PADANGAN - 1.02.0.00.0.00.01.0003", title: "Biaya Bahan Obat - obatan", amount: "Rp 289 Jt", kodeRup: "65007169", pdn: "Ya" },
    { opd: "DINAS PEMBERDAYAAN PEREMPUAN, PERLINDUNGAN ANAK DAN KELUARGA BERENCANA - 2.08.2.14.0.00.01.0000", title: "Belanja Jasa Tenaga Keamanan", amount: "Rp 289 Jt", kodeRup: "62589009", pdn: "Ya" },
    { opd: "DINAS KESEHATAN - 1.02.0.00.0.00.01.0000", title: "Belanja Jasa Tenaga Kebersihan", amount: "Rp 281 Jt", kodeRup: "62323610", pdn: "Ya" },
    { opd: "SATUAN POLISI PAMONG PRAJA - 1.05.0.00.0.00.02.0000", title: "Belanja Jasa Tenaga Keamanan", amount: "Rp 279 Jt", kodeRup: "62990653", pdn: "Ya" },
    { opd: "BAGIAN KESEJAHTERAAN RAKYAT - 4.01.5.06.3.29.01.0010", title: "Konsolidasi Belanja Sewa Kendaraan Bermotor Penumpang dan Barang", amount: "Rp 276 Jt", kodeRup: "65134700", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA - 1.03.1.04.2.10.03.0000", title: "Konsolidasi Belanja Alat/Bahan untuk Kegiatan Alat Tulis Kantor-Alat Listrik", amount: "Rp 267 Jt", kodeRup: "67067817", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "BIAYA SERVICE SUKU CADANG ALAT KEDOKTERAN RS E KATALOG", amount: "Rp 265 Jt", kodeRup: "65433891", pdn: "Ya" },
    { opd: "DINAS KEPEMUDAAN DAN OLAHRAGA - 2.19.0.00.0.00.01.0000", title: "Belanja Makanan dan Minuman Rapat", amount: "Rp 265 Jt", kodeRup: "62836399", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "BIAYA SERVICE SUKU CADANG ALAT KEDOKTERAN RS E KATALOG", amount: "Rp 263 Jt", kodeRup: "65433891", pdn: "Tidak" },
    { opd: "DINAS PENDIDIKAN - 1.01.0.00.0.00.01.0000", title: "Jasa Tenaga Kebersihan Kantor", amount: "Rp 255 Jt", kodeRup: "62867555", pdn: "Ya" },
    { opd: "RSUD KEPOHBARU - 1.02.0.00.0.00.01.0004", title: "Belanja Pemeliharaan Alat Kedokteran dan Kesehatan-Alat kedokteran Laboratorium", amount: "Rp 250 Jt", kodeRup: "64902344", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "Biaya Pengadaan Video Wall", amount: "Rp 249 Jt", kodeRup: "64783308", pdn: "Ya" },
    { opd: "RSUD SUMBERREJO - 1.02.0.00.0.00.01.0002", title: "Belanja Jasa Pengelolaan Limbah B3", amount: "Rp 240 Jt", kodeRup: "63154130", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG - 1.03.0.00.0.00.01.0000", title: "Belanja Jasa Tenaga Keamanan 2026", amount: "Rp 234 Jt", kodeRup: "62146159", pdn: "Ya" },
    { opd: "RSUD KEPOHBARU - 1.02.0.00.0.00.01.0004", title: "Belanja Modal Peralatan dan Mesin Alat Kantor - Alat Bengkel dan Alat Ukur", amount: "Rp 233 Jt", kodeRup: "64906808", pdn: "Tidak" },
    { opd: "DINAS PENDIDIKAN - 1.01.0.00.0.00.01.0000", title: "Jasa Tenaga Keamanan Kantor", amount: "Rp 233 Jt", kodeRup: "62867558", pdn: "Ya" },
    { opd: "DINAS PENDIDIKAN - 1.01.0.00.0.00.01.0000", title: "Jasa Tenaga Keamanan SMT", amount: "Rp 233 Jt", kodeRup: "62867557", pdn: "Ya" },
    { opd: "SEKRETARIAT DPRD - 4.02.0.00.0.00.01.0000", title: "Belanja Jasa Tenaga Kebersihan  - Penyediaan Jasa Pelayanan Umum Kantor", amount: "Rp 233 Jt", kodeRup: "63131484", pdn: "Ya" },
    { opd: "DINAS PENDIDIKAN - 1.01.0.00.0.00.01.0000", title: "Jasa Tenaga Kebersihan SMT", amount: "Rp 227 Jt", kodeRup: "62867556", pdn: "Ya" },
    { opd: "RSUD KEPOHBARU - 1.02.0.00.0.00.01.0004", title: "Belanja Pemeliharaan Jaringan-Jaringan Listrik-Jaringan Listrik Lainnya", amount: "Rp 226 Jt", kodeRup: "62706761", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "Biaya Plastik dan Karung Kegiatan Pengadaan Obat dan Perbekalan RS", amount: "Rp 225 Jt", kodeRup: "62960673", pdn: "Ya" },
    { opd: "DINAS KETAHANAN PANGAN DAN PERTANIAN - 2.09.3.27.0.00.01.0000", title: "Belanja Bahan-Bahan Lainnya", amount: "Rp 223 Jt", kodeRup: "63144410", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "PENGADAAN ALAT - ALAT KEDOKTERAN ANAK", amount: "Rp 222 Jt", kodeRup: "67064248", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "BIAYA SERVICE SUKU CADANG ALAT KEDOKTERAN RS E KATALOG", amount: "Rp 222 Jt", kodeRup: "65372705", pdn: "Ya" },
    { opd: "BADAN PENANGGULANGAN BENCANA DAERAH - 1.05.0.00.0.00.03.0000", title: "Belanja Alat/Bahan untuk Kegiatan Kantor- Suvenir/Cendera Mata (Destana)", amount: "Rp 219 Jt", kodeRup: "63066616", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "BIAYA BAHAN OBAT OBATAN E KATALOG", amount: "Rp 219 Jt", kodeRup: "62942697", pdn: "Tidak" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "Biaya Alat Tulis Kantor", amount: "Rp 216 Jt", kodeRup: "62969038", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "BIAYA SERVICE SUKU CADANG ALAT KEDOKTERAN RS E KATALOG", amount: "Rp 216 Jt", kodeRup: "65433891", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "Biaya bahan pembersih dalin", amount: "Rp 213 Jt", kodeRup: "62956086", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA - 1.03.1.04.2.10.03.0000", title: "Belanja Modal Personal Computer (Laptop/Notebook)", amount: "Rp 205 Jt", kodeRup: "62968129", pdn: "Ya" },
    { opd: "SEKRETARIAT DPRD - 4.02.0.00.0.00.01.0000", title: "Belanja Jasa Tenaga Keamanan  - Penyediaan Jasa Pelayanan Umum Kantor", amount: "Rp 200 Jt", kodeRup: "63131066", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "BIAYA BAHAN OBAT OBATAN E KATALOG", amount: "Rp 199 Jt", kodeRup: "67064208", pdn: "Ya" },
    { opd: "RSUD PADANGAN - 1.02.0.00.0.00.01.0003", title: "Biaya Bahan / Alat Medis Habis Pakai", amount: "Rp 199 Jt", kodeRup: "63194152", pdn: "Tidak" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "Biaya Bahan dan Peralatan Cleaning Service", amount: "Rp 199 Jt", kodeRup: "63000953", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "BIAYA BAHAN OBAT OBATAN E KATALOG", amount: "Rp 198 Jt", kodeRup: "62942697", pdn: "Ya" },
    { opd: "RSUD KELAS B DR. R.SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "Biaya Pengadaan Pompa", amount: "Rp 198 Jt", kodeRup: "66602470", pdn: "Ya" },
    { opd: "RSUD DR. R. SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "BIAYA BAHAN OBAT OBATAN E KATALOG", amount: "Rp 197 Jt", kodeRup: "62942697", pdn: "Ya" },
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

// ================== DATA REALISASI PAKET ==================
// NOTE: hanya "Tender" yang datanya nyata sesuai yang kamu berikan.
// Untuk metode lain di Realisasi Paket, sementara masih pakai data placeholder
// dari PAKET_BY_METODE (ganti nanti kalau sudah ada data realisasi aslinya).
const REALISASI_PAKET_BY_METODE: Record<string, PaketItem[]> = {
  "Tender": [
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA - 1.03.1.04.2.10.03.0000", title: "Pembangunan Pasar Kota Bojonegoro", amount: "Rp 79.9 M", kodeRup: "62809680", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG - 1.03.0.00.0.00.01.0000", title: "Penggantian Jembatan Mojorejo - Tapelan ( Ruas No. 141 ) Kec. Ngraho Fisik 2026", amount: "Rp 15.1 M", kodeRup: "62878539", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA - 1.03.1.04.2.10.03.0000", title: "Rehabilitasi Masjid Jami Darussalam Bojonegoro", amount: "Rp 7.8 M", kodeRup: "63101013", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA - 1.03.1.04.2.10.03.0000", title: "Pembangunan Pusat Rehabilitasi Sosial Kab. Bojonegoro", amount: "Rp 7.5 M", kodeRup: "63096453", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA - 1.03.1.04.2.10.03.0000", title: "Pembangunan Gedung Barbuk Tahti, Arsip, Senjata, Tempat Parkir R2 dan Ruang Pertemuan Utama Polres Bojonegoro", amount: "Rp 5.6 M", kodeRup: "62809710", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA - 1.03.1.04.2.10.03.0000", title: "Pembangunan Kantor Pimpinan Daerah Muhammadiyah Kabupaten Bojonegoro", amount: "Rp 5.5 M", kodeRup: "62809677", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Peningkatan Sarana dan Prasarana Penunjang Rumah Pompa dan Pintu Pengendali Banjir Desa Lebaksari Kec. Baureno Tahap II", amount: "Rp 5.5 M", kodeRup: "63485611", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA - 1.03.1.04.2.10.03.0000", title: "Rehabilitasi Kantor Pengadilan Agama Bojonegoro", amount: "Rp 5.4 M", kodeRup: "63101002", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA - 1.03.1.04.2.10.03.0000", title: "Rehabilitasi Rumah Dinas Bupati Bojonegoro", amount: "Rp 5.4 M", kodeRup: "63101016", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA - 1.03.1.04.2.10.03.0000", title: "Pembangunan Kantor Kejaksaan Bojonegoro Jl. Rajekwesi", amount: "Rp 4.9 M", kodeRup: "62809724", pdn: "Ya" },
    { opd: "DINAS KESEHATAN - 1.02.0.00.0.00.01.0000", title: "Pengembangan Ruang Gizi/Dapur, Ruang Laundry, Ruang Sterilisasi dan Laboratorium RS Temayang", amount: "Rp 4.3 M", kodeRup: "62762264", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Pembangunan Pelindung Tebing Sungai/Kali Ds. Hargomulyo Kec. Kedewan", amount: "Rp 4.0 M", kodeRup: "63063370", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Rehabilitasi Jaringan Irigasi Daerah Irigasi Balong", amount: "Rp 4.0 M", kodeRup: "63046924", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Rehabilitasi Jaringan Irigasi Daerah Irigasi Dander", amount: "Rp 4.0 M", kodeRup: "63046884", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Pembangunan Jaringan Irigasi Daerah Irigasi Dander", amount: "Rp 4.0 M", kodeRup: "63041136", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Pembangunan Jaringan Irigasi Daerah Irigasi Balong", amount: "Rp 4.0 M", kodeRup: "63041127", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Pembangunan Pelindung Tebing Sungai/Kali Ds. Ngaglik Kec. Kasiman", amount: "Rp 3.1 M", kodeRup: "63063316", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Pembangunan Pelindung Tebing Sungai/Kali Ds. Kalitidu Kec. Kalitidu", amount: "Rp 3.0 M", kodeRup: "63063315", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Rehabilitasi Jaringan Irigasi Daerah Irigasi Ngunut", amount: "Rp 2.6 M", kodeRup: "63046908", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA - 1.03.1.04.2.10.03.0000", title: "Rehabilitasi Polsek Kedungadem", amount: "Rp 2.3 M", kodeRup: "63101007", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Pembangunan Tanggul Sungai Desa Semanding Kec. Bojonegoro", amount: "Rp 2.3 M", kodeRup: "63173818", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Pembangunan Jaringan Irigasi DI Nolo Ngasinan", amount: "Rp 1.9 M", kodeRup: "63041153", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Pembangunan Pelindung Tebing Sungai/Kali Ds. Sugihwaras Kec. Sugihwaras", amount: "Rp 1.9 M", kodeRup: "63063314", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA - 1.03.1.04.2.10.03.0000", title: "Pembangunan Gedung Pusat Konsultasi Psikologi Pendidikan Anak dan Keluarga Yayasan Para Tazkia Bojonegoro", amount: "Rp 1.7 M", kodeRup: "62809678", pdn: "Ya" },
    { opd: "RSUD KELAS B DR. R.SOSODORO DJATIKOESOEMO - 1.02.0.00.0.00.01.0001", title: "Rehabilitasi Gedung Pelayanan", amount: "Rp 1.7 M", kodeRup: "65399967", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Pembangunan Waduk Pasinan", amount: "Rp 1.6 M", kodeRup: "63196955", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Pembangunan Jaringan Irigasi DI Pilanggede", amount: "Rp 1.6 M", kodeRup: "63041133", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA - 1.03.1.04.2.10.03.0000", title: "Rehabilitasi Kantor Koramil 20/Malo", amount: "Rp 1.6 M", kodeRup: "63101008", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA - 1.03.1.04.2.10.03.0000", title: "Rehabilitasi Polsek Sukosewu", amount: "Rp 1.6 M", kodeRup: "63101003", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Pembangunan Waduk Watang", amount: "Rp 1.5 M", kodeRup: "63196939", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Pembangunan Jaringan Irigasi Daerah Irigasi Tulungrejo", amount: "Rp 1.2 M", kodeRup: "63041105", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG - 1.03.0.00.0.00.01.0000", title: "Penggantian Jembatan Bulu - Drenges 6 ( Ruas No. 129 ) Kec. Sugihwaras Fisik 2026", amount: "Rp 1.2 M", kodeRup: "62878531", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Rehabilitasi Waduk Rowoglandang", amount: "Rp 1.1 M", kodeRup: "63197080", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Rehabilitasi Jaringan Irigasi Daerah Irigasi Sumberarum", amount: "Rp 1.1 M", kodeRup: "67135328", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA - 1.03.1.04.2.10.03.0000", title: "Pembangunan Pos Bantu Damkar Kecamatan Malo", amount: "Rp 1.1 M", kodeRup: "62809730", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM BINA MARGA DAN PENATAAN RUANG - 1.03.0.00.0.00.01.0000", title: "Pelebaran Jembatan Banjarsari - Menilo (Batas Kab. Tuban) 1 (Banjarsari - Menilo (Batas Kab. Tuban)) Kec. Trucuk", amount: "Rp 1.0 M", kodeRup: "63141233", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Rehabilitasi Jaringan Irigasi DI Sonorejo", amount: "Rp 999 Jt", kodeRup: "63046889", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Pembangunan Tanggul Saluran Sekunder BD.5-BD.8", amount: "Rp 848 Jt", kodeRup: "63172763", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Pembangunan Tanggul Afvoer Desa Karangdayu Kec. Baureno", amount: "Rp 812 Jt", kodeRup: "63172102", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Rehabilitasi Jaringan Irigasi DI Tebon", amount: "Rp 800 Jt", kodeRup: "63046897", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Rehabilitasi Afvoer Bangilan Desa Bangilan Kec. Kapas", amount: "Rp 799 Jt", kodeRup: "63174360", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Pembangunan Tanggul Saluran Sekunder BB.3-BB.7", amount: "Rp 793 Jt", kodeRup: "63172527", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Pembangunan Jaringan Irigasi DI Tanggungan", amount: "Rp 736 Jt", kodeRup: "63485325", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Pembangunan Pelindung Tebing Sungai/Kali Ds. Kasiman Kec. Kasiman", amount: "Rp 731 Jt", kodeRup: "63063365", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Rehabilitasi Jaringan Irigasi Daerah Irigasi Rowoglandang", amount: "Rp 713 Jt", kodeRup: "63046923", pdn: "Ya" },
    { opd: "DINAS PEKERJAAN UMUM SUMBER DAYA AIR - 1.03.0.00.0.00.02.0000", title: "Pembangunan Tanggul Saluran Sekunder BNG.2f", amount: "Rp 699 Jt", kodeRup: "63173059", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA - 1.03.1.04.2.10.03.0000", title: "Konsolidasi Peningkatan Jalan Lingkungan Gg. Andongsari blok III dan IV dan Gg. Sariyadi Kelurahan Ledok Kulon", amount: "Rp 639 Jt", kodeRup: "64112331", pdn: "Ya" },
    { opd: "DINAS PERUMAHAN KAWASAN PERMUKIMAN DAN CIPTA KARYA - 1.03.1.04.2.10.03.0000", title: "Konsolidasi Peningkatan Jalan Lingkungan RT 23 RW 7, Gg. Perkutut, Gg. Manyar, Gg. Podang RT 19 RW 6 Kelurahan Sumbang", amount: "Rp 634 Jt", kodeRup: "64110145", pdn: "Ya" },
  ],
  // Placeholder — pakai data yang sama dulu, ganti kalau ada data realisasi aslinya
  "E-Purchasing": PAKET_BY_METODE["E-Purchasing"],
  "Pengadaan Langsung": PAKET_BY_METODE["Pengadaan Langsung"],
  "Seleksi": PAKET_BY_METODE["Seleksi"],
};

const REALISASI_JENIS = [
  { name: "Pekerjaan Konstruksi", amount: "Rp 259.8 M" },
  { name: "Barang", amount: "Rp 150.4 M" },
  { name: "Jasa Lainnya", amount: "Rp 66.7 M" },
  { name: "Jasa Konsultansi Badan Usaha Konstruksi", amount: "Rp 34.1 M" },
  { name: "Jasa Konsultansi Perorangan Non Konstruksi", amount: "Rp 75 Jt" },
];

const REALISASI_SATKER = [
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

// ================== MODAL DETAIL PAKET ==================
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
  const card = darkMode ? "bg-gray-800" : "bg-white";
  const txt = darkMode ? "text-gray-100" : "text-gray-800";
  const sub = darkMode ? "text-gray-400" : "text-gray-500";
  const track = darkMode ? "bg-gray-700" : "bg-gray-100";

  const satkerToShow = showAllSatker ? REALISASI_SATKER : REALISASI_SATKER.slice(0, 5);

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
          items={PAKET_BY_METODE[activeMetode] ?? []}
          darkMode={darkMode}
          onClose={() => setActiveMetode(null)}
          accent="blue"
        />
      )}

      {/* Modal Realisasi Paket */}
      {realisasiModalMetode && (
        <PaketDetailModal
          title={realisasiModalMetode}
          items={REALISASI_PAKET_BY_METODE[realisasiModalMetode] ?? []}
          darkMode={darkMode}
          onClose={() => setRealisasiModalMetode(null)}
          accent="green"
        />
      )}

      <div className="flex items-center gap-2">
        <div className={`flex items-center gap-1.5 ${card} rounded-xl px-3 py-2 shadow-sm border ${darkMode ? "border-gray-700" : "border-gray-100"} text-[14px] font-semibold ${txt}`}>
          <Calendar className="w-3.5 h-3.5 text-[#1F9EB0]" /><span>Tahun 2026</span>
          <ChevronRight className={`w-3 h-3 rotate-90 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
        </div>
        <div className={`flex items-center gap-1 text-[12px] ${sub} ${card} rounded-xl px-3 py-2 shadow-sm border ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
          <Clock className="w-3 h-3 text-[#2ECC71]" /><span>5 Juni 2026, 11:33</span>
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
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-4xl font-extrabold mb-5">Rp 1.8 T</h2>
              <div className="flex justify-between">
                <div><p className="text-[12px] opacity-75 uppercase font-semibold">Total Paket</p><p className="text-xl font-extrabold mt-0.5">11.309</p></div>
                <div className="text-right"><p className="text-[12px] opacity-75 uppercase font-semibold">Satuan Kerja</p><p className="text-xl font-extrabold mt-0.5">118</p></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
            <div className={`${card} rounded-2xl p-4 shadow-sm`}>
              <h2 className={`text-sm font-bold ${txt} mb-4`}><ChevronRight className="w-4 h-4 text-[#1F9EB0] inline -mt-0.5" /> Rincian Kategori</h2>
              <p className={`text-[11px] ${sub} uppercase font-bold mb-2 tracking-wide`}>Metode Pengadaan</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {[
                  { label: "E-Purchasing", count: 4980 },
                  { label: "Pengadaan Langsung", count: 5171 },
                  { label: "Tender", count: 117 },
                  { label: "Dikecualikan", count: 866 },
                  { label: "Seleksi", count: 36 },
                  { label: "Lainnya", count: 139 },
                ].map((item, i) => {
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
                {[
                  { name: "Pekerjaan Konstruksi", amount: "Rp 950.0 M" },
                  { name: "Barang", amount: "Rp 545.8 M" },
                  { name: "Jasa Lainnya", amount: "Rp 213.4 M" },
                  { name: "Jasa Konsultansi", amount: "Rp 82.7 M" },
                  { name: "Terintegrasi", amount: "Rp 685 Jt" },
                  { name: "Lainnya", amount: "Rp 39.4 Jt" },
                ].map((item, i) => (
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
                  {[
                    { label: "APBD", amount: "Rp 1.5 T", color: darkMode ? "#5EEAD4" : "#1F9EB0", bg: "#E0F7FA" },
                    { label: "BLUD", amount: "Rp 292.3 M", color: darkMode ? "#4ADE80" : "#2ECC71", bg: "#D5F5E3" },
                    { label: "APBDP", amount: "Rp 5 Jt", color: darkMode ? "#FBBF24" : "#E67E22", bg: "#FDEBD0" },
                  ].map((item, i) => (
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
                  {OPD_DATA.slice(0, 5).map((item, i) => (
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
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-4xl font-extrabold mb-5">Rp 514.2 M</h2>
              <div className="flex justify-between">
                <div><p className="text-[12px] opacity-75 uppercase font-semibold">Total Paket</p><p className="text-xl font-extrabold mt-0.5">5.008</p></div>
                <div className="text-right"><p className="text-[12px] opacity-75 uppercase font-semibold">Satuan Kerja</p><p className="text-xl font-extrabold mt-0.5">101</p></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
            <div className="space-y-5">
              <div className={`${card} rounded-2xl p-4 shadow-sm`}>
                <h2 className={`text-sm font-bold ${txt} mb-4`}><ChevronRight className="w-4 h-4 text-[#2ECC71] inline -mt-0.5" /> Rincian Kategori</h2>
                <p className={`text-[11px] ${sub} uppercase font-bold mb-2 tracking-wide`}>Metode Pengadaan</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {[
                    { label: "Tender", count: 65 },
                    { label: "E-Purchasing", count: 4331 },
                    { label: "Pengadaan Langsung", count: 598 },
                    { label: "Seleksi", count: 14 },
                  ].map((item, i) => {
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
                  {REALISASI_JENIS.map((item, i) => (
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
                  {[
                    { label: "Tender", amount: "Rp 225.4 M" },
                    { label: "E-Katalog 6.0", amount: "Rp 218.8 M" },
                    { label: "Non Tender", amount: "Rp 70.0 M" },
                    { label: "Pencatatan", amount: "Rp 59 Jt" },
                  ].map((item, i) => (
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
                {!showAllSatker && REALISASI_SATKER.length > 5 && (
                  <button onClick={() => setShowAllSatker(true)} className="text-[12px] font-semibold px-3 py-1 rounded-lg border" style={{ borderColor: darkMode ? "#4B5563" : "#e5e7eb", color: darkMode ? "#D1D5DB" : "#6B7280" }}>
                    Lihat Semua
                  </button>
                )}
              </div>
              <div className="space-y-4">
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