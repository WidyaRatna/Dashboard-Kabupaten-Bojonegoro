import { useState } from "react";
import { createPortal } from "react-dom";
import { Search, FileText, FileSpreadsheet, File, Download, Eye, X } from "lucide-react";
import { BackButton } from "../shared/BackButton";
import type { Page } from "../../types";

type DocType = "pdf" | "xlsx" | "docx";

type DocumentItem = { title: string; kategori: string; type: DocType; date: string; size: string; url: string };

const DOCUMENTS: DocumentItem[] = [
  { title: "Laporan Realisasi Anggaran Triwulan II", kategori: "Kecamatan Temayang", type: "pdf", date: "24 Jun 2026", size: "23 KB", url: "/docs/laporan-triwulan-2.pdf" },
  { title: "Rekapitulasi Belanja Pemeliharaan Jalan", kategori: "Kecamatan Temayang", type: "pdf", date: "24 Jun 2026", size: "87 KB", url: "/docs/Rekapitulasi Belanja Pemeliharaan Jalan.pdf" },
  { title: "SPJ Belanja Jasa Konsultansi Konstruksi", kategori: "Kecamatan Kepohbaru", type: "pdf", date: "23 Jun 2026", size: "25 KB", url: "/docs/SPJ Belanja Jasa Konsultansi Konstruksi.pdf" },
  { title: "Laporan Perjalanan Dinas Dalam Kota", kategori: "Kecamatan Bojonegoro", type: "pdf", date: "23 Jun 2026", size: "86 KB", url: "/docs/Laporan Perjalanan Dinas Dalam Kota.pdf" },
  { title: "Bukti Honorarium PNS Bulan Juni", kategori: "Kecamatan Kalitidu", type: "pdf", date: "22 Jun 2026", size: "86 KB", url: "/docs/Bukti Honorarium PNS Bulan Juni.pdf" },
  { title: "Nota Belanja Bahan Bakar Minyak", kategori: "Kecamatan Trucuk", type: "pdf", date: "22 Jun 2026", size: "85 KB", url: "/docs/Nota Belanja Bahan Bakar Minyak.pdf" },
  { title: "Laporan Pemeliharaan Mesin dan Alat Berat", kategori: "Kecamatan Temayang", type: "pdf", date: "21 Jun 2026", size: "24 KB", url: "/docs/Laporan Pemeliharaan Mesin dan Alat Berat.pdf" },
  { title: "Rekap Realisasi Keuangan Bulanan", kategori: "Seluruh Kecamatan", type: "pdf", date: "20 Jun 2026", size: "86 KB", url: "/docs/Rekap Realisasi Keuangan Bulanan.pdf" }
];

const TYPE_CONFIG: Record<DocType, { icon: typeof FileText; label: string; light: string; dark: string; color: string }> = {
  pdf: { icon: FileText, label: "PDF", light: "#FEE2E2", dark: "#5C1F2A", color: "#DC2626" },
  xlsx: { icon: FileSpreadsheet, label: "XLSX", light: "#D5F5E3", dark: "#14532D", color: "#16A34A" },
  docx: { icon: File, label: "DOCX", light: "#DBEAFE", dark: "#1E3A6B", color: "#2563EB" }
};

function getViewerUrl(doc: DocumentItem): string {
  if (doc.type === "pdf") {
    return doc.url;
  }
  const encoded = encodeURIComponent(doc.url);
  return "https://view.officeapps.live.com/op/embed.aspx?src=" + encoded;
}

function PreviewModal(props: { doc: DocumentItem; darkMode: boolean; onClose: () => void }) {
  const doc = props.doc;
  const darkMode = props.darkMode;
  const viewerUrl = getViewerUrl(doc);

  const modalBg = darkMode ? "bg-gray-800" : "bg-white";
  const headerBorder = darkMode ? "border-gray-700" : "border-gray-100";
  const titleColor = darkMode ? "text-gray-100" : "text-gray-800";
  const closeIconColor = "text-gray-400";
  const downloadBtnStyle = { background: "#1F9EB0" };

  function stopClick(e: React.MouseEvent) {
    e.stopPropagation();
  }

  const modalContent = (
    <div
      className="fixed inset-0 flex items-center justify-center p-3"
      style={{ zIndex: 9999, background: "rgba(0,0,0,0.7)" }}
      onClick={props.onClose}
    >
      <div
        className={modalBg + " w-full max-w-3xl rounded-2xl flex flex-col overflow-hidden"}
        style={{ height: "min(85vh, 700px)", maxHeight: "calc(100vh - 24px)" }}
        onClick={stopClick}
      >
        <div className={"flex items-center justify-between px-4 py-3 border-b flex-shrink-0 " + headerBorder}>
          <p className={"text-[14px] font-bold truncate pr-3 " + titleColor}>{doc.title}</p>
          <div className="flex items-center gap-2 flex-shrink-0">
            <a href={doc.url} download className="flex items-center gap-1.5 text-[12px] font-bold px-3 py-1.5 rounded-lg text-white" style={downloadBtnStyle}>
              <Download className="w-3.5 h-3.5" />
              Download
            </a>
            <button onClick={props.onClose} aria-label="Tutup">
              <X className={"w-5 h-5 " + closeIconColor} />
            </button>
          </div>
        </div>
        <div className="flex-1 bg-gray-200 min-h-0">
          <iframe src={viewerUrl} title={doc.title} className="w-full h-full border-0" />
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export function RealisasiListPage(props: { darkMode: boolean; setPage: (p: Page) => void }) {
  const darkMode = props.darkMode;
  const setPage = props.setPage;
  const [q, setQ] = useState("");
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);

  const card = darkMode ? "bg-gray-800" : "bg-white";
  const txt = darkMode ? "text-gray-100" : "text-gray-800";
  const sub = darkMode ? "text-gray-400" : "text-gray-500";
  const sep = darkMode ? "border-gray-700" : "border-gray-50";
  const inputBorder = darkMode ? "border-gray-700 text-gray-100" : "border-gray-100";
  const btnBorder = darkMode ? "border-gray-700 hover:bg-gray-700" : "border-gray-100 hover:bg-gray-50";

  const qLower = q.toLowerCase();
  const filtered = DOCUMENTS.filter(function (d) {
    return d.title.toLowerCase().indexOf(qLower) !== -1 || d.kategori.toLowerCase().indexOf(qLower) !== -1;
  });

  function goHome() {
    setPage("home");
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQ(e.target.value);
  }

  function closePreview() {
    setPreviewDoc(null);
  }

  return (
    <div className="px-4 py-4 space-y-4 lg:px-8 lg:py-6">
      {previewDoc && <PreviewModal doc={previewDoc} darkMode={darkMode} onClose={closePreview} />}

      <BackButton onClick={goHome} darkMode={darkMode} />
      <h2 className={"text-base font-extrabold " + txt}>Dokumen Realisasi Keuangan</h2>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input value={q} onChange={handleSearchChange} className={"w-full " + card + " rounded-xl pl-9 pr-4 py-2.5 text-[13px] outline-none border " + inputBorder + " placeholder:text-gray-400"} placeholder="Cari dokumen..." />
      </div>
      <div className={card + " rounded-2xl p-4 shadow-sm"}>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 space-y-3 lg:space-y-0">
          {filtered.length === 0 && <p className={"col-span-2 text-center text-[13px] py-8 " + sub}>Tidak ada dokumen ditemukan.</p>}
          {filtered.map(function (doc, i) {
            const cfg = TYPE_CONFIG[doc.type];
            const Icon = cfg.icon;
            const thumbBg = darkMode ? cfg.dark : cfg.light;
            const badgeStyle = { background: thumbBg, color: cfg.color };
            const thumbStyle = { background: thumbBg };
            const iconStyle = { color: cfg.color };
            const downloadStyle = { background: "#1F9EB0" };
            const metaColor = darkMode ? "text-gray-500" : "text-gray-400";
            const rowClass = "flex items-start gap-3 pb-3 border-b " + sep + " last:border-0 last:pb-0 lg:last:border-b-0";

            function openPreview() {
              setPreviewDoc(doc);
            }

            return (
              <div key={i} className={rowClass}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={thumbStyle}>
                  <Icon className="w-5 h-5" style={iconStyle} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={"text-[14px] font-bold leading-tight " + txt}>{doc.title}</p>
                  <p className={"text-[12px] mt-0.5 " + sub}>{doc.kategori}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase" style={badgeStyle}>{cfg.label}</span>
                    <span className={"text-[11px] " + metaColor}>{doc.date} - {doc.size}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 flex-shrink-0 pt-0.5">
                  <button onClick={openPreview} aria-label={"Lihat " + doc.title} className={"w-8 h-8 rounded-lg flex items-center justify-center border transition-colors " + btnBorder}>
                    <Eye className="w-4 h-4 text-[#1F9EB0]" />
                  </button>
                  <a href={doc.url} download aria-label={"Unduh " + doc.title} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={downloadStyle}>
                    <Download className="w-4 h-4 text-white" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}