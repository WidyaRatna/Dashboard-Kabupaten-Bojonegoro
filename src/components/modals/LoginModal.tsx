import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Lock } from "lucide-react";

export function LoginModal({ onClose }: { onClose: () => void }) {
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{ background: "#EEF2FA" }}
    >
      {/* Pola dekoratif tipis di background */}
      <div
        className="fixed inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#C7D2E8 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* Aksen gradient lembut di pojok - diperlebar */}
      <div className="fixed -top-60 -left-60 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-40 pointer-events-none" style={{ background: "#3B82F6" }} />
      <div className="fixed -bottom-60 -right-60 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-40 pointer-events-none" style={{ background: "#1F9EB0" }} />
      <div className="fixed top-1/3 -right-40 w-80 h-80 rounded-full blur-3xl opacity-25 pointer-events-none" style={{ background: "#60A5FA" }} />
      <div className="fixed bottom-1/3 -left-40 w-80 h-80 rounded-full blur-3xl opacity-25 pointer-events-none" style={{ background: "#5EEAD4" }} />

      {/* Tombol kembali */}
      <button
        onClick={onClose}
        aria-label="Kembali"
        className="fixed top-6 left-6 z-10 text-gray-600 hover:text-gray-900 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium shadow-sm hover:shadow transition-all"
      >
        Kembali
      </button>

      {/* Card */}
      <div className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl my-8">
        <div
          className="flex flex-col items-center py-12 px-6"
          style={{ background: "linear-gradient(160deg, #1D4ED8 0%, #2563EB 60%, #3B82F6 100%)" }}
        >
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-extrabold text-white tracking-widest">DASHBOARD</h1>
          <p className="text-blue-200 text-[15px] mt-1 text-center">Silakan masuk untuk melanjutkan</p>
        </div>

        <div className="bg-white px-6 py-8 space-y-4 relative">
          {loggedIn ? (
            <div className="flex flex-col items-center justify-center h-48">
              <div className="w-16 h-16 bg-[#D5F5E3] rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl text-[#2ECC71]">✓</span>
              </div>
              <p className="font-bold text-gray-800">Login Berhasil!</p>
              <button onClick={onClose} className="mt-4 px-8 py-2 rounded-xl text-white font-bold" style={{ background: "#1F9EB0" }}>Lanjut</button>
            </div>
          ) : (
            <>
              <div>
                <label className="text-[14px] font-semibold text-gray-500 mb-1 block">NIP / Username / Email</label>
                <input
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] outline-none focus:border-[#1F9EB0] bg-gray-50"
                  placeholder="Masukkan NIP / Username / Email"
                />
              </div>
              <div>
                <label className="text-[14px] font-semibold text-gray-500 mb-1 block">Password</label>
                <div className="relative">
                  <input
                    type={showPwd ? "text" : "password"}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-10 text-[15px] outline-none focus:border-[#1F9EB0] bg-gray-50"
                    placeholder="Masukkan password"
                  />
                  <button
                    onClick={() => setShowPwd(s => !s)}
                    aria-label={showPwd ? "Sembunyikan password" : "Tampilkan password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#1F9EB0]" />
                <span className="text-[15px] text-gray-600">Ingat saya</span>
              </label>
              <button onClick={() => setLoggedIn(true)}
                className="w-full py-3 rounded-xl text-white font-bold text-[15px]" style={{ background: "#1F9EB0" }}>
                Masuk
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}