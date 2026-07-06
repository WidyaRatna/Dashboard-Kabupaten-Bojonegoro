import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Download, X } from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";
import { SENTIMENT_PIE, TRENDING_BY_TAB } from "../../data/sentimen";
import { SentimentBadge } from "../shared/SentimentBadge";

const TRENDING_TABS = ["Hari Ini", "Mingguan", "Bulanan"];

export function TrendingDetailModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState("Mingguan");
  const [showInfografis, setShowInfografis] = useState(false);
  const topics = TRENDING_BY_TAB[tab] ?? [];

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, []);

  const modalContent = (
    <div
      className="fixed inset-0 z-[999] bg-black/60 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl flex flex-col overflow-hidden"
        style={{ maxHeight: "85dvh" }}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-extrabold text-gray-800">Detail Trending Topics</h2>
            <button onClick={onClose} aria-label="Tutup"><X className="w-5 h-5 text-gray-400" /></button>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1 flex-1">
              {TRENDING_TABS.map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className="px-3 py-1.5 rounded-xl  text-[15px] font-semibold flex-1 transition-colors"
                  style={tab === t ? { background: "#1F9EB0", color: "white" } : { background: "#f3f4f6", color: "#6b7280" }}
                >{t}</button>
              ))}
            </div>
            <button onClick={() => setShowInfografis(s => !s)}
              className="px-3 py-1.5 rounded-xl  text-[15px] font-bold text-white flex items-center gap-1 flex-shrink-0"
              style={{ background: "#2ECC71" }}>
              <span>⊞</span> Generate
            </button>
          </div>
        </div>

        <div className="overflow-y-auto overscroll-contain flex-1 p-4 pb-10 space-y-4">
          {showInfografis && (
            <div className="bg-gray-900 rounded-2xl p-4 text-white">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[14px] font-bold">Preview Infografis</p>
                <button className=" text-[15px] bg-[#2ECC71] px-3 py-1 rounded-lg font-bold flex items-center gap-1">
                  <Download className="w-3 h-3" /> Download PNG
                </button>
              </div>
              <div className="flex gap-4 items-center">
                <PieChart width={110} height={110}>
                  <Pie data={SENTIMENT_PIE} cx={55} cy={55} innerRadius={32} outerRadius={50} dataKey="value" stroke="none">
                    {SENTIMENT_PIE.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
                <div className="flex-1">
                  <p className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-extrabold">898</p>
                  <p className=" text-[15px] text-gray-400 mb-2">Total Komentar</p>
                  {SENTIMENT_PIE.map((e, i) => (
                    <div key={i} className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full" style={{ background: e.color }} />
                      <span className=" text-[15px] text-gray-300 flex-1">{e.name}</span>
                      <span className=" text-[15px] font-bold" style={{ color: e.color }}>{e.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3 border-t border-gray-700 pt-3">
                <p className=" text-[15px] text-gray-400 mb-2 uppercase font-semibold">Top Topik</p>
                {topics.slice(0, 3).map((t, i) => (
                  <div key={i} className="flex items-center justify-between mb-1">
                    <span className=" text-[15px] text-gray-300">{i + 1}. {t.title}</span>
                    <span className=" text-[15px] font-bold text-[#F39C12]">{t.mentions}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            {topics.map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-3 flex gap-3 items-start border border-gray-100">
                <div className="flex-1">
                  <SentimentBadge sentiment={item.tag} />
                  <p className="text-[15px] font-bold text-gray-800 mt-1.5">{item.title}</p>
                  <p className=" text-[15px] text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className=" text-[15px] text-gray-400 font-semibold uppercase">Mention</p>
                  <p className="text-base font-extrabold text-gray-700">{item.mentions}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}