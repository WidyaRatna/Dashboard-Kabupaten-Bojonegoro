import { ExternalLink, X } from "lucide-react";
import type { CommentItem } from "../../types";
import { SentimentBadge } from "../shared/SentimentBadge";

export function CommentDetailModal({ comment, onClose }: { comment: CommentItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="w-full max-w-md bg-white rounded-3xl p-5 my-8 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-extrabold text-gray-800">Detail Komentar</h2>
          <button onClick={onClose} aria-label="Tutup"><X className="w-5 h-5 text-gray-400" /></button>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-12 ${comment.color} rounded-full flex items-center justify-center flex-shrink-0`}>
            <span className="text-white font-bold text-lg">{comment.user[0].toUpperCase()}</span>
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-800">{comment.user}</p>
            <p className=" text-[15px] text-gray-400">{comment.time}</p>
          </div>
          <SentimentBadge sentiment={comment.sentiment} />
        </div>

        <div className="bg-[#E0F7FA] rounded-xl p-3 mb-3">
          <p className=" text-[15px] text-[#1F9EB0] uppercase font-bold mb-1.5">AKUN</p>
          <div className="flex items-center justify-between">
            <p className="text-[15px] font-semibold text-gray-800">{comment.user}</p>
            <button className=" text-[15px] text-[#1F9EB0] flex items-center gap-1 font-semibold border border-[#1F9EB0] px-2 py-1 rounded-lg">
              Buka Post <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="mb-3">
          <p className=" text-[15px] text-gray-400 uppercase font-bold mb-1.5">CAPTION / DESKRIPSI POST</p>
          <p className="text-[14px] text-gray-600 bg-gray-50 rounded-xl p-3 leading-relaxed">
            Dashboard Kabupaten Bojonegoro — Monitoring dan evaluasi kinerja pemerintahan daerah secara real-time untuk mendukung transparansi dan akuntabilitas...
          </p>
        </div>

        <div className="mb-5">
          <p className=" text-[15px] text-gray-400 uppercase font-bold mb-1.5">PESAN KOMENTAR</p>
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <p className="text-[15px] text-gray-800 leading-relaxed">{comment.comment}</p>
          </div>
        </div>

        <button onClick={onClose}
          className="w-full py-3 rounded-xl bg-gray-200 text-gray-700 font-bold text-[15px]">
          Tutup
        </button>
      </div>
    </div>
  );
}