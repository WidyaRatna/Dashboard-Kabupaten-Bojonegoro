import { useState } from "react";
import { ArrowLeft, ChevronRight, Clock, Layers, Search } from "lucide-react";
import { useCountUp } from "../../hooks/useCountUp";

type DetailItem = {
  key?: string;
  name: string;
  sub2?: string;
  real: string;
  target: string;
  pct: number;
  detail?: DetailItem[];
};

const PAJAK_DAERAH_DETAIL: DetailItem[] = [
  { name: "Pajak Reklame", real: "Rp 1.6 M", target: "Rp 3.1 M", pct: 51.4 },
  { name: "Pajak Air Tanah", real: "Rp 1.2 M", target: "Rp 2.9 M", pct: 41.4 },
  { name: "Pajak Sarang Burung Walet", real: "Rp 8 Jt", target: "Rp 15 Jt", pct: 55.9 },
  { name: "Pajak Mineral Bukan Logam dan Batuan", real: "Rp 1.8 M", target: "Rp 24.5 M", pct: 7.5 },
  { name: "Pajak Bumi dan Bangunan Perdesaan dan Perkotaan (PBB P2)", real: "Rp 24.0 M", target: "Rp 47.2 M", pct: 50.9 },
  { name: "Bea Perolehan Hak atas Tanah dan Bangunan (BPHTB)", real: "Rp 15.9 M", target: "Rp 29.1 M", pct: 54.5 },
  { name: "Pajak Barang dan Jasa Tertentu (PBJT)", sub2: "5 Sub-Jenis", real: "Rp 41.5 M", target: "Rp 87.4 M", pct: 47.5 },
  { name: "Opsen Pajak Kendaraan Bermotor (Opsen PKB)", real: "Rp 30.4 M", target: "Rp 64.5 M", pct: 47.2 },
  { name: "Opsen Bea Balik Nama Kendaraan Bermotor (Opsen BBNKB)", real: "Rp 15.1 M", target: "Rp 27.5 M", pct: 55.0 },
];

const RETRIBUSI_DAERAH_DETAIL: DetailItem[] = [
  { name: "Retribusi Pelayanan Kesehatan di Puskesmas", real: "Rp 38.6 M", target: "Rp 100.4 M", pct: 38.5 },
  { name: "Retribusi Pelayanan Kesehatan di RSUD", sub2: "4 Sub-Jenis", real: "Rp 187.5 M", target: "Rp 452.9 M", pct: 41.4 },
  { name: "Retribusi Pelayanan Kesehatan - Labkesda", real: "Rp 110 Jt", target: "Rp 103 Jt", pct: 106.1 },
  { name: "Retribusi Sewa Kantin", real: "Rp 298 Jt", target: "Rp 1.0 M", pct: 29.8 },
  { name: "Retribusi Persampahan", real: "Rp 460 Jt", target: "Rp 1.3 M", pct: 36.7 },
  { name: "Retribusi Sewa Kios Bunga", real: "Rp 0", target: "Rp 34 Jt", pct: 0.0 },
  { name: "Retribusi Lab. Lingkungan", real: "Rp 0", target: "Rp 0", pct: 0.0 },
  { name: "Retribusi Parkir Harian", real: "Rp 157 Jt", target: "Rp 629 Jt", pct: 25.0 },
  { name: "Retribusi Parkir Berlangganan", real: "Rp 4.8 M", target: "Rp 14.2 M", pct: 33.9 },
  { name: "Retribusi Pelayanan Pasar", sub2: "19 Sub-Jenis", real: "Rp 1.1 M", target: "Rp 3.1 M", pct: 37.0 },
  { name: "Retribusi - Bird Park", real: "Rp 230.000", target: "Rp 8 Jt", pct: 3.1 },
  { name: "Retribusi - Rumah Singgah Wonocolo", real: "Rp 2 Jt", target: "Rp 0", pct: 0.0 },
  { name: "Retribusi Penyewaan Tanah & Bangunan", real: "Rp 40 Jt", target: "Rp 92 Jt", pct: 43.7 },
  { name: "Retribusi - Sewa Lahan Pertanian", real: "Rp 52 Jt", target: "Rp 87 Jt", pct: 59.8 },
  { name: "Retribusi Sewa Tanah Eks Bengkok", real: "Rp 560 Jt", target: "Rp 1.1 M", pct: 53.1 },
  { name: "Retribusi - Laboratorium", real: "Rp 505.000", target: "Rp 50 Jt", pct: 1.0 },
  { name: "Retribusi - Sewa Alat Berat", real: "Rp 38 Jt", target: "Rp 250 Jt", pct: 15.1 },
  { name: "Retribusi Sewa Peralatan & Mesin", real: "Rp 16 Jt", target: "Rp 31 Jt", pct: 52.9 },
  { name: "Retribusi - Setoran Galeri Bengawan", real: "Rp 1 Jt", target: "Rp 15 Jt", pct: 6.8 },
  { name: "Retribusi - Padangan Heritage", real: "Rp 1 Jt", target: "Rp 15 Jt", pct: 9.5 },
  { name: "Retribusi - Tempat Penginapan/Pesanggrahan/Villa", real: "Rp 0", target: "Rp 10 Jt", pct: 0.0 },
  { name: "Retribusi RPH", real: "Rp 21 Jt", target: "Rp 128 Jt", pct: 16.2 },
  { name: "Ret. Sewa GOR Kalitidu", real: "Rp 2 Jt", target: "Rp 0", pct: 0.0 },
  { name: "Ret. Sewa GOR Tambakrejo", real: "Rp 18 Jt", target: "Rp 0", pct: 0.0 },
  { name: "Ret. Sewa GOR Kedewan", real: "Rp 9 Jt", target: "Rp 0", pct: 0.0 },
  { name: "Ret. Sewa GOR Kedungadem", real: "Rp 23 Jt", target: "Rp 0", pct: 0.0 },
  { name: "Ret. Sewa GOR Kanor", real: "Rp 30 Jt", target: "Rp 0", pct: 0.0 },
  { name: "Ret. Sewa GOR Sumberrejo", real: "Rp 25 Jt", target: "Rp 0", pct: 0.0 },
  { name: "Retribusi - Lapangan Tenis Stadion", real: "Rp 200.000", target: "Rp 20 Jt", pct: 1.0 },
  { name: "Retribusi - Sewa GOR Kota/KONI (Lapangan Bulutangkis)", real: "Rp 44 Jt", target: "Rp 30 Jt", pct: 146.8 },
  { name: "Retribusi - Sewa Gedung Olah Raga (GOR) Utama", real: "Rp 192 Jt", target: "Rp 65 Jt", pct: 294.9 },
  { name: "Retribusi - Waduk Pacal", real: "Rp 33 Jt", target: "Rp 80 Jt", pct: 40.7 },
  { name: "Retribusi - Sewa Stadion Letjen H Soedirman", real: "Rp 133 Jt", target: "Rp 115 Jt", pct: 115.5 },
  { name: "Retribusi - Sewa Gedung Serba Guna", real: "Rp 28 Jt", target: "Rp 150 Jt", pct: 18.7 },
  { name: "Retribusi - Kayangan Api", real: "Rp 245 Jt", target: "Rp 340 Jt", pct: 72.0 },
  { name: "Retribusi - Dander Park", real: "Rp 222 Jt", target: "Rp 500 Jt", pct: 44.3 },
  { name: "Retribusi Persetujuan Bangunan Gedung (PBG)", real: "Rp 835 Jt", target: "Rp 4.2 M", pct: 19.7 },
  { name: "Retribusi Penggunaan Tenaga Kerja Asing (TKA)", real: "Rp 41 Jt", target: "Rp 57 Jt", pct: 71.5 },
];

const HASIL_PENGELOLAAN_DETAIL: DetailItem[] = [
  { name: "BUMD Bank Perkreditan Rakyat", real: "Rp 13.2 M", target: "Rp 16.4 M", pct: 80.9 },
  { name: "BUMD Bank Pembangunan Daerah Jawa Timur", real: "Rp 17.0 M", target: "Rp 13.6 M", pct: 125.0 },
  { name: "PDAM", real: "Rp 233 Jt", target: "Rp 3.0 M", pct: 7.8 },
  { name: "PT. BBS", real: "Rp 0", target: "Rp 736 Jt", pct: 0.0 },
  { name: "BPR Jatim", real: "Rp 653 Jt", target: "Rp 472 Jt", pct: 138.2 },
  { name: "Griya Dharma Kusuma", real: "Rp 0", target: "Rp 0", pct: 0.0 },
  { name: "PT. ADS", real: "Rp 104.5 M", target: "Rp 72.9 M", pct: 143.3 },
];

const LAIN_LAIN_PAD_DETAIL: DetailItem[] = [
  { name: "Hasil Penjualan BMD yang Tidak Dipisahkan", sub2: "1 Sub-Jenis", real: "Rp 303 Jt", target: "Rp 400 Jt", pct: 75.7 },
  { name: "Hasil Pemanfaatan BMD yang Tidak Dipisahkan", real: "Rp 25 Jt", target: "Rp 600 Jt", pct: 4.2 },
  { name: "Jasa Giro", real: "Rp 9.5 M", target: "Rp 12.5 M", pct: 75.9 },
  { name: "Pendapatan Bunga", real: "Rp 31.8 M", target: "Rp 85.9 M", pct: 37.1 },
  { name: "Penerimaan atas Tuntutan Ganti Kerugian Keuangan Daerah", real: "Rp 1.0 M", target: "Rp 1.8 M", pct: 59.4 },
  { name: "Pendapatan Denda atas Keterlambatan Pelaksanaan Pekerjaan", real: "Rp 1.5 M", target: "Rp 4.8 M", pct: 31.5 },
  { name: "Pendapatan dari Pengembalian", real: "Rp 7.7 M", target: "Rp 1.6 M", pct: 480.7 },
  { name: "Jumlah BLUD", sub2: "7 Sub-Jenis", real: "Rp 905 Jt", target: "Rp 1.3 M", pct: 67.8 },
];

const TRANSFER_PUSAT_DETAIL: DetailItem[] = [
  { name: "Dana Desa", real: "Rp 75.1 M", target: "Rp 342.2 M", pct: 21.9 },
  { name: "Insentif Fiskal", real: "Rp 0", target: "Rp 0", pct: 0.0 },
  { name: "Dana Bagi Hasil (DBH)", sub2: "2 Sub-Jenis", real: "Rp 468.9 M", target: "Rp 1.3 T", pct: 35.8 },
  { name: "Dana Alokasi Umum (DAU)", sub2: "2 Sub-Jenis", real: "Rp 598.1 M", target: "Rp 1.2 T", pct: 48.8 },
  { name: "Dana Alokasi Khusus (DAK)", sub2: "4 Sub-Jenis", real: "Rp 130.1 M", target: "Rp 480.1 M", pct: 27.1 },
];

const PENDAPATAN_TRANSFER_DETAIL: DetailItem[] = [
  { name: "Pendapatan Transfer Pemerintah Pusat", sub2: "5 Sub-Jenis", real: "Rp 1.3 T", target: "Rp 3.4 T", pct: 37.9, detail: TRANSFER_PUSAT_DETAIL },
  { name: "Pendapatan Transfer Antar Daerah", sub2: "2 Sub-Jenis", real: "Rp 36.9 M", target: "Rp 123.0 M", pct: 30.0 },
];

const PAD_DETAIL: DetailItem[] = [
  { name: "Jumlah PAD", real: "Rp 557.0 M", target: "Rp 1.1 T", pct: 51.3 },
  { name: "Pajak Daerah", sub2: "9 Sub-Jenis", real: "Rp 131.6 M", target: "Rp 286.2 M", pct: 46.0, detail: PAJAK_DAERAH_DETAIL },
  { name: "Retribusi Daerah", sub2: "38 Sub-Jenis", real: "Rp 235.7 M", target: "Rp 580.9 M", pct: 40.6, detail: RETRIBUSI_DAERAH_DETAIL },
  { name: "Hasil Pengelolaan Kekayaan Daerah yang Dipisahkan", sub2: "7 Sub-Jenis", real: "Rp 135.6 M", target: "Rp 107.1 M", pct: 126.7, detail: HASIL_PENGELOLAAN_DETAIL },
  { name: "Lain-lain PAD yang Sah", sub2: "8 Sub-Jenis", real: "Rp 54.2 M", target: "Rp 112.4 M", pct: 48.2, detail: LAIN_LAIN_PAD_DETAIL },
  { name: "Pendapatan Denda Pajak Daerah", real: "Rp 229 Jt", target: "Rp 0", pct: 0.0 },
  { name: "Pendapatan Denda Retribusi Daerah", real: "Rp 114.609", target: "Rp 0", pct: 0.0 },
  { name: "Pendapatan Zakat, Infaq, Shadaqah, dan Wakaf", real: "Rp 369.494", target: "Rp 0", pct: 0.0 },
  { name: "Pendapatan atas Sanksi Administrasi Pajak Daerah", real: "Rp 103 Jt", target: "Rp 0", pct: 0.0 },
  { name: "Pendapatan atas Sanksi Administrasi Retribusi Daerah", real: "Rp 1 Jt", target: "Rp 0", pct: 0.0 },
];

const ROOT_ITEMS: DetailItem[] = [
  { key: "pad", name: "Pendapatan Asli Daerah", sub2: "10 Sub-Jenis", real: "Rp 459.1 M", target: "Rp 1.1 T", pct: 42.3, detail: PAD_DETAIL },
  { key: "transfer", name: "Pendapatan Transfer", sub2: "2 Sub-Jenis", real: "Rp 1.24 T", target: "Rp 3.5 T", pct: 35.4, detail: PENDAPATAN_TRANSFER_DETAIL },
];

export function PendapatanPage({ darkMode }: { darkMode: boolean }) {
  const [query, setQuery] = useState("");
  const [path, setPath] = useState<DetailItem[]>([]); // breadcrumb stack, root = []
  const card = darkMode ? "bg-gray-800" : "bg-white";
  const txt = darkMode ? "text-gray-100" : "text-gray-800";
  const sub = darkMode ? "text-gray-400" : "text-gray-500";
  const track = darkMode ? "bg-gray-700" : "bg-gray-100";
  const heroPct = useCountUp(37.1);

  const currentParent = path[path.length - 1];
  const currentTitle = currentParent ? currentParent.name : "Rincian Pendapatan";
  const currentList = (currentParent ? currentParent.detail ?? [] : ROOT_ITEMS).filter(i =>
    i.name.toLowerCase().includes(query.toLowerCase())
  );

  const goInto = (item: DetailItem) => {
    if (item.detail && item.detail.length > 0) {
      setPath([...path, item]);
      setQuery("");
    }
  };
  const goBack = () => {
    setPath(path.slice(0, -1));
    setQuery("");
  };

  const renderRow = (item: DetailItem, i: number) => {
    const barColor = item.pct >= 50 ? "#2ECC71" : item.pct > 0 ? "#F39C12" : "#D1D5DB";
    const pctColor = item.pct >= 100 ? "#16A34A" : item.pct >= 50 ? "#2ECC71" : item.pct > 0 ? "#E67E22" : "#9CA3AF";
    const clickable = !!(item.detail && item.detail.length > 0);
    return (
      <button
        key={i}
        onClick={() => goInto(item)}
        disabled={!clickable}
        className={`flex-1 min-w-[260px] text-left border ${darkMode ? "border-gray-700" : "border-gray-100"} rounded-xl p-3 ${clickable ? "hover:border-[#1F9EB0] transition-colors" : "opacity-90"}`}
      >
        <div className="flex items-start justify-between mb-2 gap-2">
          <div>
            <p className={`text-[14px] font-bold ${txt}`}>{item.name}</p>
            {item.sub2 && (
              <div className="flex items-center gap-1 mt-0.5">
                <div className={`w-4 h-4 rounded flex items-center justify-center ${darkMode ? "bg-[#164752]" : "bg-[#D5F5E3]"}`}>
                  <Layers className={`w-2.5 h-2.5 ${darkMode ? "text-[#4ADE80]" : "text-[#27AE60]"}`} />
                </div>
                <span className={`text-[12px] font-semibold ${darkMode ? "text-[#4ADE80]" : "text-[#27AE60]"}`}>{item.sub2}</span>
              </div>
            )}
          </div>
          {clickable && <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />}
        </div>
        <div className={`flex justify-between text-[11px] mb-1 uppercase font-semibold ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
          <span>Realisasi</span><span>Persentase</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className={`text-[14px] font-bold ${txt}`}>{item.real}</span>
          <span className="text-[14px] font-bold" style={{ color: pctColor }}>{item.pct.toFixed(1)}%</span>
        </div>
        <div className={`h-1.5 ${track} rounded-full overflow-hidden`}>
          <div className="h-full rounded-full" style={{ width: `${Math.min(item.pct, 100)}%`, background: barColor }} />
        </div>
        <p className={`text-[11px] ${sub} mt-1`}>Target: {item.target}</p>
      </button>
    );
  };

  return (
    <div className="px-4 py-4 space-y-5 lg:px-8 lg:py-6 lg:space-y-6">
      <div className="rounded-2xl p-5 text-white relative overflow-hidden" style={{ background: darkMode ? "linear-gradient(135deg, #14532D 0%, #0F3D22 100%)" : "linear-gradient(135deg, #16A34A 0%, #15803D 100%)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10"><svg viewBox="0 0 120 120" fill="white"><circle cx="100" cy="20" r="80" /></svg></div>
        <div className="relative">
          <div className="flex items-start justify-between mb-1">
            <p className="text-[12px] font-bold uppercase tracking-wider opacity-80">Total Realisasi Pendapatan</p>
            <div className="flex items-center gap-1 text-[12px] opacity-75 bg-white/10 px-2 py-0.5 rounded-full">
              <Clock className="w-3 h-3" /><span>31 Mei 2026, 00:00</span>
            </div>
          </div>
          <div className="flex items-end gap-3 mt-1 mb-0.5">
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-4xl font-extrabold">Rp 1.7 T</h2>
            <span className="text-xl font-bold opacity-90 mb-0.5">{heroPct.toFixed(1)}%</span>
          </div>
          <p className="text-sm opacity-75">Dari Target Rp 4.6 T</p>
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="opacity-80">Persentase Capaian</span>
              <span className="font-bold">{heroPct.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all duration-75" style={{ width: `${heroPct}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5 lg:space-y-6">
        <div className={`${card} rounded-2xl p-5 shadow-sm flex flex-col gap-4`}>
          <h2 className={`text-base font-bold ${txt}`}>Ringkasan Pendapatan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Total Realisasi", val: "Rp 1.7 T", color: darkMode ? "#4ADE80" : "#16A34A", bg: "#D5F5E3" },
              { label: "Target Pendapatan", val: "Rp 4.6 T", color: darkMode ? "#5EEAD4" : "#1F9EB0", bg: "#E0F7FA" },
              { label: "Persentase Capaian", val: `${heroPct.toFixed(1)}%`, color: darkMode ? "#FBBF24" : "#E67E22", bg: "#FDEBD0" },
            ].map((s, i) => (
              <div key={i} className="rounded-xl p-4" style={{ background: darkMode ? "rgba(255,255,255,0.05)" : s.bg }}>
                <p className={`text-[11px] font-semibold uppercase ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{s.label}</p>
                <p className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-extrabold mt-1" style={{ color: s.color }}>{s.val}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`${card} rounded-2xl p-4 shadow-sm`}>
          {path.length > 0 && (
            <button
              onClick={goBack}
              aria-label="Kembali"
              className={`group flex items-center justify-center w-8 h-8 rounded-full mb-4 transition-all ${
                darkMode ? "bg-[#0F3D3F] hover:bg-[#164752]" : "bg-[#E0F7FA] hover:bg-[#C7F0F3]"
              }`}
              style={{ color: darkMode ? "#5EEAD4" : "#1F9EB0" }}
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            </button>
          )}

          {path.length > 0 && (
            <div className={`text-[11px] ${sub} mb-1 flex flex-wrap items-center gap-1`}>
              <span>Rincian Pendapatan</span>
              {path.map((p, i) => (
                <span key={i} className="flex items-center gap-1">
                  <ChevronRight className="w-3 h-3" />
                  <span className={i === path.length - 1 ? `font-semibold ${txt}` : ""}>{p.name}</span>
                </span>
              ))}
            </div>
          )}

          <h2 className={`text-base font-bold ${txt}`}>{currentTitle}</h2>
          <p className={`text-[12px] ${sub} mb-3 mt-0.5`}>{currentList.length} Item</p>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={query} onChange={e => setQuery(e.target.value)}
              className={`w-full ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-gray-50 border-gray-100"} rounded-xl pl-9 pr-4 py-2.5 text-[13px] outline-none border placeholder:text-gray-400`}
              placeholder="Cari pendapatan..." />
          </div>

          <div className="flex flex-wrap gap-3 max-h-[600px] overflow-y-auto pr-1">
            {currentList.map((item, i) => renderRow(item, i))}
          </div>
        </div>
      </div>
    </div>
  );
}