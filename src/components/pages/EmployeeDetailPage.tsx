import { BackButton } from "../shared/BackButton";
import type { EmployeeItem, Page } from "../../types";

export function EmployeeDetailPage({ employee, darkMode, setPage }: { employee: EmployeeItem; darkMode: boolean; setPage: (p: Page) => void }) {
  const card = darkMode ? "bg-gray-800" : "bg-white";
  const txt = darkMode ? "text-gray-100" : "text-gray-800";
  const sub = darkMode ? "text-gray-400" : "text-gray-500";

  const attendance = [
    { date: "Senin, 23 Jun", in: "07:05", out: "16:02", status: "Hadir" },
    { date: "Selasa, 24 Jun", in: "06:46", out: "---", status: "Hadir" },
    { date: "Rabu, 25 Jun", in: "---", out: "---", status: "Ijin" },
    { date: "Kamis, 19 Jun", in: "07:20", out: "15:55", status: "Hadir" },
    { date: "Jumat, 20 Jun", in: "07:10", out: "16:10", status: "Hadir" },
  ];

  return (
    <div className="px-4 py-4 space-y-4 lg:px-8 lg:py-6">
      <BackButton onClick={() => setPage("pegawai")} darkMode={darkMode} />
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6 space-y-4 lg:space-y-0">
        <div className={`${card} rounded-2xl p-5 shadow-sm text-center lg:col-span-1`}>
          <div className={`w-24 h-24 ${employee.color} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
            <span className="text-white text-3xl font-extrabold">{employee.name.slice(0, 2)}</span>
          </div>
          <h2 className={`text-base font-extrabold ${txt}`}>{employee.name}</h2>
          <p className={`text-sm ${sub}`}>{employee.pos}</p>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {[
              { label: "Check In", val: employee.in },
              { label: "Check Out", val: employee.out },
              { label: "Status", val: employee.status },
            ].map((s, i) => (
              <div key={i} className={`rounded-xl p-3 ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                <p className={`text-[11px] ${sub} font-semibold uppercase`}>{s.label}</p>
                <p className={`text-[14px] font-bold ${txt} mt-0.5`}>{s.val}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`${card} rounded-2xl p-4 shadow-sm lg:col-span-2`}>
          <h3 className={`text-sm font-bold ${txt} mb-3`}>Riwayat Kehadiran</h3>
          <div className="space-y-2">
            {attendance.map((a, i) => (
              <div key={i} className={`flex items-center justify-between py-2.5 border-b ${darkMode ? "border-gray-700" : "border-gray-50"} last:border-0`}>
                <p className={`text-[14px] ${txt} font-medium`}>{a.date}</p>
                <div className="flex items-center gap-3">
                  <span className={`text-[12px] ${sub}`}>{a.in} – {a.out}</span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${a.status === "Hadir" ? "bg-[#D5F5E3] text-[#1E8449]" : "bg-[#FDEBD0] text-[#A04000]"}`}>{a.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}