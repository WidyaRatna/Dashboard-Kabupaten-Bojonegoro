import { createElement } from "react";
import { Home as HomeIcon, BarChart2, DollarSign, MessageCircle, Package, Users, FileText, MoreHorizontal, AlertCircle } from "lucide-react";
import type { MenuItem, Page } from "../types";

export interface AllMenuItem {
  icon: React.ReactNode;
  title: string;
  cat: string;
  page: Page;
  bg: string;
  fg: string;
}

export const MENU_ITEMS: MenuItem[] = [
  { icon: createElement(HomeIcon, { className: "w-5 h-5" }), label: "Beranda", bg: "bg-[#CCEEF2]", fg: "text-[#1F9EB0]", page: "home" },
  { icon: createElement(BarChart2, { className: "w-5 h-5" }), label: "Realisasi Keuangan", bg: "bg-[#CCEEF2]", fg: "text-[#1F9EB0]", page: "realisasi" },
  { icon: createElement(DollarSign, { className: "w-5 h-5" }), label: "Pendapatan Daerah", bg: "bg-[#D5F5E3]", fg: "text-[#27AE60]", page: "pendapatan" },
  { icon: createElement(Package, { className: "w-5 h-5" }), label: "Pengadaan (Aset & PBJ)", bg: "bg-[#F9E4D4]", fg: "text-[#D35400]", page: "pengadaan" },
  { icon: createElement(MessageCircle, { className: "w-5 h-5" }), label: "Sentimen Publik (Instagram)", bg: "bg-[#FEF9E7]", fg: "text-[#F39C12]", page: "sentimen" },
  { icon: createElement(AlertCircle, { className: "w-5 h-5" }), label: "Laporan Isu Strategis", bg: "bg-[#FDEBD0]", fg: "text-[#E67E22]", page: "isu-strategis" },
  { icon: createElement(Users, { className: "w-5 h-5" }), label: "Statistik Pegawai", bg: "bg-[#FEF9E7]", fg: "text-[#F39C12]", page: "pegawai" },
  { icon: createElement(FileText, { className: "w-5 h-5" }), label: "Laporan & Dokumen", bg: "bg-[#CCEEF2]", fg: "text-[#2BB2C2]", page: "realisasi-list" },
  { icon: createElement(MoreHorizontal, { className: "w-5 h-5" }), label: "Lainnya", bg: "bg-gray-100", fg: "text-gray-500", page: null },
];

export const ALL_MENUS: AllMenuItem[] = [
  { icon: createElement(HomeIcon, { className: "w-5 h-5" }), title: "Beranda", cat: "Utama", page: "home", bg: "bg-[#CCEEF2]", fg: "text-[#1F9EB0]" },
  { icon: createElement(BarChart2, { className: "w-5 h-5" }), title: "Realisasi Keuangan", cat: "Keuangan", page: "realisasi", bg: "bg-[#CCEEF2]", fg: "text-[#1F9EB0]" },
  { icon: createElement(DollarSign, { className: "w-5 h-5" }), title: "Pendapatan Daerah", cat: "Keuangan", page: "pendapatan", bg: "bg-[#D5F5E3]", fg: "text-[#27AE60]" },
  { icon: createElement(Package, { className: "w-5 h-5" }), title: "Pengadaan (Aset & PBJ)", cat: "Pengadaan", page: "pengadaan", bg: "bg-[#F9E4D4]", fg: "text-[#D35400]" },
  { icon: createElement(MessageCircle, { className: "w-5 h-5" }), title: "Sentimen Publik (Instagram)", cat: "Publik", page: "sentimen", bg: "bg-[#FEF9E7]", fg: "text-[#F39C12]" },
  { icon: createElement(AlertCircle, { className: "w-5 h-5" }), title: "Laporan Isu Strategis", cat: "Strategis", page: "isu-strategis", bg: "bg-[#FDEBD0]", fg: "text-[#E67E22]" },
  { icon: createElement(Users, { className: "w-5 h-5" }), title: "Statistik Pegawai", cat: "SDM", page: "pegawai", bg: "bg-[#FEF9E7]", fg: "text-[#F39C12]" },
  { icon: createElement(FileText, { className: "w-5 h-5" }), title: "Laporan & Dokumen", cat: "Laporan", page: "home", bg: "bg-[#CCEEF2]", fg: "text-[#2BB2C2]" },
];
