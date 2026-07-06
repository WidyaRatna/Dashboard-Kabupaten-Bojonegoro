export function SentimentBadge({ sentiment }: { sentiment: string }) {
  const cfg: Record<string, string> = {
    Positif: "bg-[#D5F5E3] text-[#1E8449]",
    Netral: "bg-[#FEF9E7] text-[#B7770D]",
    Negatif: "bg-[#FDEDEC] text-[#C0392B]",
  };
  const icon = sentiment === "Positif" ? "✓" : sentiment === "Negatif" ? "✗" : "→";
  return (
    <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full ${cfg[sentiment] ?? "bg-gray-100 text-gray-600"}`}>
      {icon} {sentiment}
    </span>
  );
}