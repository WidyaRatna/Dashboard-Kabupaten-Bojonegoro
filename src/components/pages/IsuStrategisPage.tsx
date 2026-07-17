import { useEffect, useState } from "react";
import { AlertCircle, Calendar, ChevronRight, Download, X } from "lucide-react";
import { INFOGRAFIS_MINGGUAN, MONTH_OPTIONS } from "../../data/isuStrategis";
import { sanitizeFileName } from "../../utils/fileHelpers";
import type { Page } from "../../types";

function InfografisImage({ src, fallbackSrc, alt, className, onClick }: { src: string; fallbackSrc: string; alt: string; className?: string; onClick?: () => void }) {
  const [activeSrc, setActiveSrc] = useState(src);

  useEffect(() => {
    setActiveSrc(src);
  }, [src]);

  return (
    <img
      src={activeSrc}
      alt={alt}
      className={className}
      onClick={onClick}
      onError={() => {
        if (activeSrc !== fallbackSrc) setActiveSrc(fallbackSrc);
      }}
    />
  );
}

export function IsuStrategisPage({ darkMode, setPage }: { darkMode: boolean; setPage: (p: Page) => void }) {
  const [monthIdx, setMonthIdx] = useState(1);
  const [weekIdx, setWeekIdx] = useState(0);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedBriefIdx, setSelectedBriefIdx] = useState(0);
  const card = darkMode ? "bg-gray-800" : "bg-white";
  const txt = darkMode ? "text-gray-100" : "text-gray-800";
  const sub = darkMode ? "text-gray-400" : "text-gray-500";
  const selectedMonth = MONTH_OPTIONS[monthIdx] ?? MONTH_OPTIONS[0];
  const weeks = selectedMonth.weeks;
  const selectedWeek = weeks[weekIdx] ?? weeks[0];
  const weeklyInfografis = INFOGRAFIS_MINGGUAN[selectedWeek.infografisIndex] ?? INFOGRAFIS_MINGGUAN[0];
  const policyBriefs = [
    { title: "Optimalisasi Pendapatan Asli Daerah (PAD)", detail: "Fokus pada peningkatan efisiensi pajak daerah, optimalisasi retribusi, dan penguatan basis data wajib pajak untuk menjaga stabilitas pendapatan kabupaten.", image: INFOGRAFIS_MINGGUAN[1]?.primaryImage ?? INFOGRAFIS_MINGGUAN[0]?.primaryImage ?? "" },
    { title: "Peningkatan Kualitas Infrastruktur Dasar", detail: "Prioritas pembangunan jalan, air bersih, dan fasilitas dasar yang mempercepat akses layanan publik di wilayah pinggiran dan desa terdampak.", image: INFOGRAFIS_MINGGUAN[2]?.primaryImage ?? INFOGRAFIS_MINGGUAN[0]?.primaryImage ?? "" },
    { title: "Pengembangan Sektor UMKM dan Pariwisata", detail: "Mendorong digitalisasi usaha kecil, promosi destinasi lokal, dan kolaborasi lintas OPD agar ekonomi kreatif tumbuh lebih merata.", image: INFOGRAFIS_MINGGUAN[3]?.primaryImage ?? INFOGRAFIS_MINGGUAN[0]?.primaryImage ?? "" },
    { title: "Penguatan Sistem Pengadaan Barang/Jasa", detail: "Transparansi pengadaan, pemeriksaan kualitas vendor, dan integrasi data tender untuk memperpendek waktu penyelesaian proyek strategis.", image: INFOGRAFIS_MINGGUAN[0]?.primaryImage ?? INFOGRAFIS_MINGGUAN[1]?.primaryImage ?? "" },
    { title: "Transformasi Digital Layanan Publik", detail: "Penyederhanaan proses layanan, integrasi aplikasi internal, dan peningkatan literasi digital bagi warga agar pelayanan lebih cepat dan akuntabel.", image: INFOGRAFIS_MINGGUAN[1]?.primaryImage ?? INFOGRAFIS_MINGGUAN[0]?.primaryImage ?? "" },
    { title: "Peningkatan Kapasitas SDM Aparatur", detail: "Pelatihan teknis, penguatan kompetensi digital, dan mekanisme evaluasi kinerja untuk meningkatkan kualitas pelayanan publik.", image: INFOGRAFIS_MINGGUAN[2]?.primaryImage ?? INFOGRAFIS_MINGGUAN[0]?.primaryImage ?? "" },
    { title: "Pengelolaan Lingkungan Hidup Berkelanjutan", detail: "Penguatan pengawasan sampah, konservasi wilayah rawan bencana, dan program adaptasi iklim yang menyeimbangkan pembangunan ekonomi dengan pelestarian alam.", image: INFOGRAFIS_MINGGUAN[3]?.primaryImage ?? INFOGRAFIS_MINGGUAN[0]?.primaryImage ?? "" },
    { title: "Ketahanan Pangan dan Pertanian Lokal", detail: "Penguatan rantai pasok bahan pangan, dukungan petani lokal, dan pemanfaatan teknologi pertanian untuk stabilisasi harga dan produksi.", image: INFOGRAFIS_MINGGUAN[0]?.primaryImage ?? INFOGRAFIS_MINGGUAN[1]?.primaryImage ?? "" },
    { title: "Pelayanan Kesehatan Masyarakat", detail: "Perluasan layanan primer, optimalisasi posyandu, dan penguatan sistem rujukan untuk meningkatkan kualitas dan akses kesehatan masyarakat.", image: INFOGRAFIS_MINGGUAN[1]?.primaryImage ?? INFOGRAFIS_MINGGUAN[2]?.primaryImage ?? "" },
    { title: "Penanggulangan Kemiskinan & Kesenjangan", detail: "Program perlindungan sosial, penguatan ekonomi desa, dan pemberdayaan kelompok rentan untuk mengurangi kesenjangan antarwilayah.", image: INFOGRAFIS_MINGGUAN[2]?.primaryImage ?? INFOGRAFIS_MINGGUAN[0]?.primaryImage ?? "" },
  ];
  const selectedPolicyBrief = policyBriefs[selectedBriefIdx] ?? policyBriefs[0];

  useEffect(() => {
    setWeekIdx(0);
  }, [monthIdx]);

  const handleDownloadInfografis = () => {
    const fileMonth = sanitizeFileName(selectedMonth.label);
    const fileWeek = sanitizeFileName(selectedWeek.label);
    const link = document.createElement("a");
    link.href = weeklyInfografis.primaryImage;
    link.download = `infografis-${fileMonth}-${fileWeek}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInfografis = (src: string) => {
    setPreviewImage(src);
  };

  return (
    <div className="px-4 pt-2 pb-4 lg:px-8 lg:pt-3 lg:pb-6 space-y-5 lg:space-y-6">
      {previewImage && (
        <div className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setPreviewImage(null)}>
          <div className="relative w-full max-w-2xl rounded-[28px] bg-white/10 p-3 shadow-2xl ring-1 ring-white/10" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between rounded-2xl bg-black/20 px-3 py-2 text-white">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] opacity-70">Preview Infografis</span>
              <button
                onClick={() => setPreviewImage(null)}
                aria-label="Tutup preview infografis"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 overflow-hidden rounded-2xl bg-black/20">
              <img src={previewImage} alt="Preview infografis penuh" className="max-h-[50vh] w-full object-contain" />
            </div>
          </div>
        </div>
      )}

      <div
        className="w-full rounded-2xl px-4 py-3 shadow-lg text-white"
        style={{ background: darkMode ? "linear-gradient(135deg, #14636E 0%, #0E4952 100%)" : "linear-gradient(135deg, #1F9EB0 0%, #17798A 100%)" }}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] opacity-80">Infografis Mingguan</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <div className="min-w-0">
            <p className="text-lg font-extrabold truncate">10</p>
            <p className="text-[11px] opacity-80 truncate">Isu Strategis</p>
          </div>
          <div className="min-w-0">
            <p className="text-lg font-extrabold truncate" title={selectedWeek.label}>{selectedWeek.label.split(" (")[0]}</p>
            <p className="text-[11px] opacity-80 truncate">Minggu Aktif</p>
          </div>
          <div className="min-w-0">
            <p className="text-lg font-extrabold truncate">Mingguan</p>
            <p className="text-[11px] opacity-80 truncate">Update</p>
          </div>
        </div>
      </div>

      <div className={`${card} rounded-2xl p-4 shadow-sm`}>
        <div className={`flex items-center gap-1 text-[12px] ${sub} mb-3`}>
          <Calendar className="w-3.5 h-3.5 text-[#F39C12]" />
          <span className="font-semibold text-[#F39C12]">{selectedWeek.label}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <label className="text-[12px] font-semibold">
            <span className={sub}>Bulan</span>
            <select
              value={monthIdx}
              onChange={(e) => setMonthIdx(Number(e.target.value))}
              className={`mt-1 w-full rounded-xl border px-3 py-2 text-[14px] font-semibold ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-200 text-gray-700"}`}
            >
              {MONTH_OPTIONS.map((m, i) => (
                <option key={m.label} value={i}>{m.label}</option>
              ))}
            </select>
          </label>
          <label className="text-[12px] font-semibold">
            <span className={sub}>Minggu</span>
            <select
              value={weekIdx}
              onChange={(e) => setWeekIdx(Number(e.target.value))}
              className={`mt-1 w-full rounded-xl border px-3 py-2 text-[14px] font-semibold ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-200 text-gray-700"}`}
            >
              {weeks.map((w, i) => (
                <option key={w.label} value={i}>{w.label}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="space-y-5 lg:space-y-6">
        <div className={`${card} rounded-2xl p-4 shadow-sm`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${darkMode ? "bg-[#7A5228]" : "bg-[#FDEBD0]"}`}>
                <AlertCircle className="w-4 h-4 text-[#E67E22]" />
              </div>
              <h2 className={`text-sm font-bold ${txt}`}>Isu Prioritas</h2>
            </div>
            <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${darkMode ? "bg-[#7A5228] text-[#FBBF24]" : "bg-[#FDEBD0] text-[#E67E22]"}`}>Mingguan</span>
          </div>
          <div className={`rounded-2xl overflow-hidden border ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
            <div className="p-4" style={{ background: darkMode ? "linear-gradient(135deg, #14636E 0%, #0E4952 100%)" : "linear-gradient(135deg, #1F9EB0 0%, #17798A 100%)" }}>
              <p className="text-white text-[14px] font-bold opacity-90">Kabupaten Bojonegoro</p>
              <p className="text-white/70 text-[12px]">{weeklyInfografis.title} — {selectedWeek.label}</p>
            </div>
            <div className={`p-4 space-y-3 ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
              <div className={`rounded-2xl overflow-hidden border bg-white ${darkMode ? "border-gray-600" : "border-gray-200"}`}>
                <InfografisImage
                  src={weeklyInfografis.primaryImage}
                  fallbackSrc={weeklyInfografis.image}
                  alt={`Infografis mingguan ${selectedWeek.label}`}
                  className="w-full h-72 object-contain cursor-pointer bg-white"
                  onClick={() => handleOpenInfografis(weeklyInfografis.primaryImage)}
                />
              </div>
              <div className="space-y-2">
                {weeklyInfografis.points.map((point, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 text-[12px] font-black text-[#1F9EB0]">●</span>
                    <p className={`text-[12px] leading-relaxed ${sub}`}>{point}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                {INFOGRAFIS_MINGGUAN.map((item, idx) => (
                  <div key={item.title} className={`rounded-xl overflow-hidden border bg-white ${idx === selectedWeek.infografisIndex ? "border-[#1F9EB0]" : darkMode ? "border-gray-600" : "border-gray-200"}`}>
                    <InfografisImage
                      src={item.primaryImage}
                      fallbackSrc={item.image}
                      alt={item.title}
                      className="w-full aspect-[4/3] object-contain cursor-pointer bg-white"
                      onClick={() => handleOpenInfografis(item.primaryImage)}
                    />
                    <p className={`px-2 py-1 text-[11px] font-semibold ${sub} truncate`}>{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={handleDownloadInfografis}
            className="w-full mt-3 py-2 rounded-xl text-[14px] font-bold flex items-center justify-center gap-1.5 text-white"
            style={{ background: "#1F9EB0" }}
          >
            <Download className="w-3.5 h-3.5" /> Download Infografis
          </button>
        </div>

        <div className={`${card} rounded-2xl p-4 shadow-sm`}>
          <h2 className={`text-sm font-bold ${txt} mb-3`}>Policy Brief</h2>
          <p className={`text-[11px] font-bold ${sub} uppercase tracking-wide mb-2`}>10 ISU STRATEGI KEBIJAKAN BOJONEGORO</p>
          <div className="space-y-2">
            {policyBriefs.map((item, i) => {
              const selected = selectedBriefIdx === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedBriefIdx(i)}
                  className={`w-full flex items-center gap-3 rounded-xl px-2 py-2.5 border-b transition-colors ${selected ? (darkMode ? "bg-gray-700/50" : "bg-[#ECF9FB]") : ""} ${darkMode ? "border-gray-700" : "border-gray-50"} last:border-0`}
                >
                  <span className="text-[12px] font-extrabold text-[#1F9EB0] w-5 flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`text-[14px] text-left ${txt} ${selected ? "font-semibold" : "font-normal"}`}>{item.title}</span>
                  <ChevronRight className={`w-3 h-3 flex-shrink-0 ml-auto ${darkMode ? "text-gray-600" : "text-gray-300"}`} />
                </button>
              );
            })}
          </div>
          <div className={`mt-3 rounded-2xl border p-3 ${darkMode ? "border-gray-700 bg-gray-700/40" : "border-[#DDF4F6] bg-[#F3FBFC]"}`}>
            <div className="overflow-hidden rounded-xl border bg-white">
              <InfografisImage
                src={selectedPolicyBrief.image}
                fallbackSrc={selectedPolicyBrief.image}
                alt={selectedPolicyBrief.title}
                className="w-full aspect-[16/10] object-contain bg-white"
                onClick={() => handleOpenInfografis(selectedPolicyBrief.image)}
              />
            </div>
            <p className={`mt-3 text-[11px] font-bold uppercase tracking-[0.2em] ${sub} mb-1`}>Detail Isu Terpilih</p>
            <p className={`text-[15px] font-semibold ${txt}`}>{selectedPolicyBrief.title}</p>
            <p className={`mt-1 text-[12px] leading-relaxed ${sub}`}>{selectedPolicyBrief.detail}</p>
          </div>
        </div>
      </div>
    </div>
  );
}