import type { ReactNode } from "react";

export type Page =
  | "home"
  | "realisasi"
  | "pendapatan"
  | "sentimen"
  | "pengadaan"
  | "pegawai"
  | "isu-strategis"
  | "realisasi-list"
  | "opd-full"
  | "employee-detail";

export type ModalType =
  | "pin"
  | "login"
  | "semua-menu"
  | "trending-detail"
  | "comment-detail"
  | null;

export interface CommentItem {
  user: string;
  comment: string;
  sentiment: string;
  color: string;
  time: string;
}

export interface EmployeeItem {
  name: string;
  pos: string;
  in: string;
  out: string;
  status: string;
  color: string;
}

export interface MenuItem {
  icon: ReactNode;
  label: string;
  bg: string;
  fg: string;
  page: Page | null;
}
