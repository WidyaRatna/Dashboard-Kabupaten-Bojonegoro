import { useEffect, useRef, useState } from "react";
import type { Page, ModalType, CommentItem, EmployeeItem } from "../types";
import { Header as HeaderComponent, DESKTOP_TOPBAR_HEIGHT } from "../components/layout/Header";
import { Sidebar as SidebarComponent } from "../components/layout/Sidebar";
import { PinModal as PinModalComponent } from "../components/modals/PinModal";
import { LoginModal as LoginModalComponent } from "../components/modals/LoginModal";
import { SemualMenuModal as SemualMenuModalComponent } from "../components/modals/SemualMenuModal";
import { TrendingDetailModal as TrendingDetailModalComponent } from "../components/modals/TrendingDetailModal";
import { CommentDetailModal as CommentDetailModalComponent } from "../components/modals/CommentDetailModal";
import { BatikBackgroundWatermark as BatikBackgroundWatermarkComponent } from "../components/shared/BatikBackgroundWatermark";
import { HomePage as HomePageModule } from "../components/pages/HomePage";
import { RealisasiPage as RealisasiPageModule } from "../components/pages/RealisasiPage";
import { OpdFullPage as OpdFullPageModule } from "../components/pages/OpdFullPage";
import { RealisasiListPage as RealisasiListPageModule } from "../components/pages/RealisasiListPage";
import { PendapatanPage as PendapatanPageModule } from "../components/pages/PendapatanPage";
import { SentimenPage as SentimenPageModule } from "../components/pages/SentimenPage";
import { PengadaanPage as PengadaanPageModule } from "../components/pages/PengadaanPage";
import { PegawaiPage as PegawaiPageModule } from "../components/pages/PegawaiPage";
import { EmployeeDetailPage as EmployeeDetailPageModule } from "../components/pages/EmployeeDetailPage";
import { IsuStrategisPage as IsuStrategisPageModule } from "../components/pages/IsuStrategisPage";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [modal, setModal] = useState<ModalType>("pin");
  const [darkMode, setDarkMode] = useState(false);
  const [selectedComment, setSelectedComment] = useState<CommentItem | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeItem | null>(null);
  const [isPinVerified, setIsPinVerified] = useState(false);

  const mobileHeaderRef = useRef<HTMLDivElement>(null);
  const [mobileHeaderHeight, setMobileHeaderHeight] = useState(76);
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");

    // Set kondisi awal: sidebar terbuka default di desktop, tertutup default di mobile
    setIsDesktop(mq.matches);
    setSidebarCollapsed(!mq.matches);

    const update = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = mobileHeaderRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.height > 0) setMobileHeaderHeight(entry.contentRect.height);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const navigate = (p: Page) => {
    setPage(p);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setIsPinVerified(false);
    setModal("pin");
  };

  return (
    <div className="min-h-screen font-[Inter,sans-serif] relative" style={{ background: darkMode ? "#111827" : "#F0F2F7" }}>
      {modal === "pin" && !isPinVerified && (
        <PinModalComponent
          onSuccess={() => {
            setIsPinVerified(true);
            setModal(null);
          }}
        />
      )}
      {modal === "login" && <LoginModalComponent onClose={() => setModal(null)} />}
      {modal === "semua-menu" && <SemualMenuModalComponent onClose={() => setModal(null)} setPage={navigate} />}
      {modal === "trending-detail" && <TrendingDetailModalComponent onClose={() => setModal(null)} />}
      {modal === "comment-detail" && selectedComment && (
        <CommentDetailModalComponent
          comment={selectedComment}
          onClose={() => {
            setModal(null);
            setSelectedComment(null);
          }}
        />
      )}

      {isPinVerified && (
        <div className="w-full min-h-screen relative z-10 flex flex-col" style={{ background: darkMode ? "#1F2937" : "#F0F2F7" }}>
          <BatikBackgroundWatermarkComponent opacity={darkMode ? 0.07 : 0.13} />

          <div ref={mobileHeaderRef} style={{ ["--sidebar-w" as string]: `${sidebarWidth}px` }}>
            <HeaderComponent
              page={page}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              onLock={handleLogout}
              onProfile={() => setModal("login")}
              sidebarCollapsed={sidebarCollapsed}
              onOpenSidebar={() => setSidebarCollapsed(false)}
              isDesktop={isDesktop}
            />
          </div>

          <SidebarComponent
            page={page}
            setPage={navigate}
            darkMode={darkMode}
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
            onWidthChange={setSidebarWidth}
            onLogout={handleLogout}
            isDesktop={isDesktop}
          />

          <main
            className="flex-1 min-w-0 pb-8 overflow-x-clip relative z-10"
            style={{
              paddingLeft: isDesktop ? sidebarWidth : 0,
              paddingTop: isDesktop ? DESKTOP_TOPBAR_HEIGHT : mobileHeaderHeight,
            }}
          >
            {page === "home" && (
              <HomePageModule
                setPage={navigate}
                darkMode={darkMode}
                onOpenAllMenus={() => setModal("semua-menu")}
              />
            )}
            {page === "realisasi" && <RealisasiPageModule darkMode={darkMode} setPage={navigate} />}
            {page === "realisasi-list" && <RealisasiListPageModule darkMode={darkMode} setPage={navigate} />}
            {page === "opd-full" && <OpdFullPageModule darkMode={darkMode} setPage={navigate} />}
            {page === "pendapatan" && <PendapatanPageModule darkMode={darkMode} />}
            {page === "sentimen" && (
              <SentimenPageModule
                darkMode={darkMode}
                setModal={setModal}
                setSelectedComment={setSelectedComment}
              />
            )}
            {page === "pengadaan" && <PengadaanPageModule darkMode={darkMode} />}
            {page === "pegawai" && (
              <PegawaiPageModule
                darkMode={darkMode}
                setSelectedEmployee={setSelectedEmployee}
                setPage={navigate}
              />
            )}
            {page === "employee-detail" && selectedEmployee && (
              <EmployeeDetailPageModule employee={selectedEmployee} darkMode={darkMode} setPage={navigate} />
            )}
            {page === "isu-strategis" && <IsuStrategisPageModule darkMode={darkMode} setPage={navigate} />}
          </main>
        </div>
      )}
    </div>
  );
}