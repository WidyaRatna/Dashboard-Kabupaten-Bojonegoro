import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const BOJONEGORO_LOGO_SRC = "https://upload.wikimedia.org/wikipedia/commons/1/18/Logo_Kabupaten_Bojonegoro.png";
const GAPURA_BG_SRC = "/pin/gapura.png"; // sesuaikan ekstensi file kamu (.png/.jpg/.jpeg/.webp)

export function PinModal({ onSuccess }: { onSuccess: () => void }) {
  const [pin, setPin] = useState<string[]>([]);
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState("");

  const handleKey = (k: string | number) => {
    if (k === "del") {
      setPin(p => p.slice(0, -1));
      setError("");
      return;
    }
    if (k === "eye") {
      setShowPin(s => !s);
      return;
    }
    if (pin.length < 6) {
      setPin(p => [...p, String(k)]);
      setError("");
    }
  };

  const handleVerify = () => {
    const enteredPin = pin.join("");

    if (enteredPin === "123456") {
      onSuccess();
      return;
    }

    setPin([]);
    setError("PIN salah. Silakan coba lagi.");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.45) 0%, rgba(15,23,42,0.15) 40%, rgba(15,23,42,0.6) 100%), url(${GAPURA_BG_SRC})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="relative w-full max-w-sm rounded-[28px] bg-white/95 backdrop-blur-sm p-6 pb-8 shadow-[0_24px_80px_rgba(15,23,42,0.45)] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute inset-0 rounded-[28px] border border-[#1F9EB0]/10" />
        <div className="absolute inset-x-4 top-3 h-3 rounded-full bg-[linear-gradient(90deg,#1F9EB0_0%,#22D3EE_50%,#1F9EB0_100%)] opacity-20" />
        <div className="absolute inset-x-3 bottom-3 h-2 rounded-full bg-[linear-gradient(90deg,#1F9EB0_0%,#0F172A_60%,#1F9EB0_100%)] opacity-10" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-4 mt-2">
            <img
              src={BOJONEGORO_LOGO_SRC}
              alt="Logo Pemkab Bojonegoro"
              className="w-16 h-20 object-contain"
            />
          </div>
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-center font-extrabold text-gray-800 text-lg mb-1 tracking-[0.18em]">VERIFIKASI PIN</h2>
          <p className="text-center text-[14px] text-gray-500 mb-6">Silakan masukkan 6 digit PIN keamanan Anda</p>

          <div className="flex justify-center gap-3 mb-3">
            {Array.from({ length: 6 }).map((_, i) => {
              const filled = pin.length > i;

              if (showPin) {
                return (
                  <div
                    key={i}
                    className={`w-7 h-8 rounded-lg border-2 flex items-center justify-center text-sm font-bold transition-colors ${filled ? "border-[#1F9EB0] text-[#1F9EB0]" : "border-gray-300 text-gray-300"}`}
                    aria-label={filled ? `Digit ${i + 1}: ${pin[i]}` : `Digit ${i + 1} kosong`}
                  >
                    {filled ? pin[i] : ""}
                  </div>
                );
              }

              return (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full border-2 transition-colors ${filled ? "border-[#1F9EB0] bg-[#1F9EB0]" : "border-gray-300"}`}
                  aria-label={filled ? `Digit ${i + 1} terisi` : `Digit ${i + 1} kosong`}
                />
              );
            })}
          </div>

          {error ? <p className="text-center text-xs text-red-500 mb-4">{error}</p> : <div className="h-4 mb-4" />}

          <div className="grid grid-cols-3 gap-2 mb-4 w-full">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, "eye", 0, "del"].map((k, i) => (
              <button
                key={i}
                onClick={() => handleKey(k)}
                aria-label={k === "eye" ? (showPin ? "Sembunyikan PIN" : "Tampilkan PIN") : k === "del" ? "Hapus" : `Angka ${k}`}
                className="h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-lg font-bold text-gray-700 active:bg-gray-100 border border-gray-100"
              >
                {k === "del" ? <span className="text-base">⌫</span> : k === "eye" ? (showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />) : k}
              </button>
            ))}
          </div>

          <button
            onClick={handleVerify}
            disabled={pin.length < 6}
            className="w-full py-3 rounded-xl text-white font-bold transition-opacity disabled:opacity-40"
            style={{ background: "#1F9EB0" }}
          >
            VERIFIKASI PIN
          </button>
        </div>
      </div>
    </div>
  );
}