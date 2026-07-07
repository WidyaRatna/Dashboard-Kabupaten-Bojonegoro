export function BackButton({ onClick, darkMode }: { onClick: () => void; darkMode: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`text-[14px] font-semibold mb-4 px-3 py-1.5 rounded-xl shadow-sm border transition-colors ${
        darkMode
          ? "bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700"
          : "bg-white border-gray-100 text-gray-600 hover:bg-gray-50"
      }`}
    >
      Kembali
    </button>
  );
}