import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Download, Search } from "lucide-react";
import { SENTIMEN_BY_TAB, TRENDING_BY_TAB } from "../../data/sentimen";
import { useCountUp } from "../../hooks/useCountUp";
import { SentimentBadge } from "../shared/SentimentBadge";
import type { CommentItem, ModalType } from "../../types";

const COMMENTS_PER_PAGE = 4;

export function SentimenPage({
  darkMode, setModal, setSelectedComment,
}: {
  darkMode: boolean;
  setModal: (m: ModalType) => void;
  setSelectedComment: (c: CommentItem) => void;
}) {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [activeTab, setActiveTab] = useState("Mingguan");
  const [commentQ, setCommentQ] = useState("");
  const [commentPg, setCommentPg] = useState(1);

  const data = SENTIMEN_BY_TAB[activeTab];
  const animatedTotal = useCountUp(data.total, 1000);
  const animatedPos = useCountUp(data.pos, 1000);
  const animatedNeu = useCountUp(data.neu, 1000);
  const animatedNeg = useCountUp(data.neg, 1000);

  const allComments = data.comments.filter(c =>
    (activeFilter === "Semua" || c.sentiment === activeFilter) &&
    (c.user.toLowerCase().includes(commentQ.toLowerCase()) || c.comment.toLowerCase().includes(commentQ.toLowerCase()))
  );
  const totalPages = Math.max(1, Math.ceil(allComments.length / COMMENTS_PER_PAGE));
  const paginated = allComments.slice((commentPg - 1) * COMMENTS_PER_PAGE, commentPg * COMMENTS_PER_PAGE);

  useEffect(() => { setCommentPg(1); }, [activeFilter, activeTab, commentQ]);

  const card = darkMode ? "bg-gray-800" : "bg-white";
  const txt = darkMode ? "text-gray-100" : "text-gray-800";
  const sub = darkMode ? "text-gray-400" : "text-gray-500";

  const topics = TRENDING_BY_TAB[activeTab] ?? TRENDING_BY_TAB["Mingguan"];

  return (
    <div className="px-4 py-4 space-y-4 lg:px-8 lg:py-6 lg:space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 lg:overflow-visible lg:flex-wrap lg:pb-0 lg:mx-0 lg:px-0">
        {["Hari Ini", "Mingguan", "Bulanan", "Rentang"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className="px-4 py-2 rounded-xl text-[13px] font-semibold flex-shrink-0 transition-colors"
            style={activeTab === tab ? { background: "#1F9EB0", color: "white" } : { background: darkMode ? "#374151" : "white", color: darkMode ? "#9CA3AF" : "#6B7280", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f3f4f6" }}
          >{tab}</button>
        ))}
        <button className="px-4 py-2 rounded-xl text-[13px] font-semibold flex-shrink-0 flex items-center gap-1 text-white"
          style={{ background: "#2ECC71" }}>
          <Download className="w-3 h-3" /> Export Excel
        </button>
      </div>
      <p className={`text-[12px] ${sub}`}>Data: 24 Mei 2026 — 24 Jun 2026</p>

      <div className="rounded-2xl p-5 text-white relative overflow-hidden" style={{ background: darkMode ? "linear-gradient(135deg, #14636E 0%, #0E4952 100%)" : "linear-gradient(135deg, #1D4ED8 0%, #1F9EB0 100%)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10"><svg viewBox="0 0 120 120" fill="white"><circle cx="100" cy="20" r="80" /></svg></div>
        <div className="relative">
          <div className="flex items-start justify-between mb-2">
            <p className="text-[12px] font-bold uppercase tracking-wider opacity-80">Total Interaksi Instagram</p>
            <div className="flex items-center gap-1 text-[12px] opacity-75 bg-white/10 px-2 py-0.5 rounded-full">
              <Clock className="w-3 h-3" /><span>24 Jun 2026</span>
            </div>
          </div>
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-5xl font-extrabold mb-0.5">{Math.round(animatedTotal).toLocaleString()}</h2>
          <p className="text-[13px] opacity-75 mb-5">Komentar &amp; Balasan</p>
          <div className="flex h-3 rounded-full overflow-hidden mb-2 bg-white/10">
            <div className="transition-all duration-300 ease-out" style={{ width: `${animatedPos}%`, background: "#2ECC71" }} />
            <div className="transition-all duration-300 ease-out" style={{ width: `${animatedNeu}%`, background: "#F39C12" }} />
            <div className="transition-all duration-300 ease-out" style={{ width: `${animatedNeg}%`, background: "#D35400" }} />
          </div>
          <div className="flex justify-between text-[12px]">
            <span style={{ color: "#7DFFB0" }} className="font-semibold">✓ Positif {Math.round(animatedPos)}%</span>
            <span style={{ color: "#FFE083" }} className="font-semibold">→ Netral {Math.round(animatedNeu)}%</span>
            <span style={{ color: "#FFBB88" }} className="font-semibold">✗ Negatif {Math.round(animatedNeg)}%</span>
          </div>
        </div>
      </div>

      {/* Trending Topics - full width, cards sejajar 3 kolom di desktop, bisa diklik untuk buka detail */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className={`text-base font-bold ${txt}`}>Trending Topics</h2>
          <button onClick={() => setModal("trending-detail")} className="text-[13px] text-[#1F9EB0] flex items-center gap-0.5 font-medium">
            Lihat Semua <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {topics.slice(0, 3).map((item, i) => (
            <button
              key={i}
              onClick={() => setModal("trending-detail")}
              className={`${card} rounded-xl p-4 shadow-sm flex flex-col text-left hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className={`text-[13px] font-bold ${sub}`}>#{i + 1}</span>
                <SentimentBadge sentiment={item.tag} />
              </div>
              <p className={`text-[14px] font-bold ${txt}`}>{item.title}</p>
              <p className={`text-[12px] ${sub} mt-1 leading-relaxed flex-1`}>{item.desc}</p>
              <div className={`mt-3 pt-3 border-t ${darkMode ? "border-gray-700" : "border-gray-100"} text-[12px] ${sub} flex items-center gap-1`}>
                💬 {item.mentions} Kali Disebut
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Komentar Terbaru - full width */}
      <div className={`${card} rounded-2xl p-4 shadow-sm`}>
        <div className="flex items-center justify-between mb-3">
          <h2 className={`text-base font-bold ${txt}`}>Komentar Terbaru</h2>
          <span className="text-[13px] text-[#1F9EB0] font-medium">{data.total} Komentar</span>
        </div>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={commentQ} onChange={e => setCommentQ(e.target.value)}
            className={`w-full ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-gray-50 border-gray-100"} rounded-xl pl-9 pr-4 py-2.5 text-[13px] outline-none border placeholder:text-gray-400`}
            placeholder="Cari komentar..." />
        </div>
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1 -mx-4 px-4 lg:overflow-visible lg:pb-0 lg:mx-0 lg:px-0">
          {["Semua", "Positif", "Netral", "Negatif"].map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className="px-3 py-1.5 rounded-full text-[13px] font-semibold flex-shrink-0 transition-colors"
              style={activeFilter === f ? { background: "#1F9EB0", color: "white" } : { background: darkMode ? "#374151" : "#f3f4f6", color: darkMode ? "#D1D5DB" : "#6B7280" }}
            >{f}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-6">
          {paginated.map((item, i) => (
            <button key={i} onClick={() => { setSelectedComment(item); setModal("comment-detail"); }}
              className={`w-full flex items-start gap-3 py-3 border-b ${darkMode ? "border-gray-700" : "border-gray-50"} last:border-0 text-left hover:bg-gray-50/50 rounded-xl px-1 transition-colors`}>
              <div className={`w-9 h-9 ${item.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                <span className="text-white text-[13px] font-bold">{item.user[0].toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className={`text-[13px] font-bold ${txt}`}>{item.user}</p>
                  <span className={`text-[11px] ${darkMode ? "text-gray-500" : "text-gray-400"} flex-shrink-0`}>{item.time}</span>
                </div>
                <p className={`text-[12px] ${sub} mt-0.5 line-clamp-2`}>{item.comment}</p>
                <div className="mt-1"><SentimentBadge sentiment={item.sentiment} /></div>
              </div>
            </button>
          ))}
        </div>
        {totalPages > 1 && (
          <div className={`flex items-center justify-between mt-4 pt-3 border-t ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
            <button
              onClick={() => setCommentPg(p => Math.max(1, p - 1))}
              disabled={commentPg === 1}
              aria-label="Halaman sebelumnya"
              className={`w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-40 ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
              style={{ color: darkMode ? "#5EEAD4" : "#1F9EB0" }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className={`text-[13px] font-semibold ${sub}`}>Hal {commentPg} dari {totalPages}</span>
            <button
              onClick={() => setCommentPg(p => Math.min(totalPages, p + 1))}
              disabled={commentPg === totalPages}
              aria-label="Halaman berikutnya"
              className={`w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-40 ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
              style={{ color: darkMode ? "#5EEAD4" : "#1F9EB0" }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}