"use client";
import { useState, type ReactNode } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import Navigation from "../Navigation";
import Sidebar from "./Sidebar";

export type PageTitleProps = {
  subtitle: string;
  title: string;
};

type HeaderProps = {
  pageTitle?: PageTitleProps;
  children?: ReactNode;
  headerBgClass?: string;
};

export default function Header({
  pageTitle,
  children,
  headerBgClass = "bg-[#0d0d0d]",
}: HeaderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* 헤더 전체 컨테이너 */}
      <header className={`flex flex-col ${headerBgClass}`}>
        {/* 네비게이션 영역 */}
        <div className="flex h-[80px] items-center justify-between px-6">
          {/* 로고 */}
          <Image src={logo} alt="logo" />

          {/* 네비 + 사이드바 토글 */}
          <div className="flex items-center gap-8">
            <div className="hidden lg:block">
              <Navigation />
            </div>
            <button
              className="flex h-[52px] w-[52px] items-center justify-center rounded-full transition"
              aria-label="사이드바 열기"
              onClick={() => setSidebarOpen(true)}
            >
              <BiMenuAltLeft className="text-main h-10 w-10" />
            </button>
          </div>
        </div>

        {/* pageTitle 섹션 (옵션) */}
        {pageTitle && (
          <section className="text-center ${headerBgClass} pb-4 lg:pb-10">
            <p className="text-xs lg:text-base text-white">{pageTitle.subtitle}</p>
            <h1 className="mt-2 text-xl lg:text-4xl font-bold">
              <span className="bg-gradient-to-r from-[#1cebb9] to-[#7f74ff] bg-clip-text text-transparent">
                {pageTitle.title}
              </span>
            </h1>
          </section>
        )}

        <div className="flex justify-center">{children}</div>
      </header>

      {/* 사이드바 오버레이 */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* 반투명 배경 */}
          <div
            className="fixed inset-0 bg-black/80"
            onClick={() => setSidebarOpen(false)}
            aria-label="오버레이 닫기"
          />
          {/* 실제 사이드바 */}
          <aside className="relative z-50">
            <Sidebar />
          </aside>
        </div>
      )}
    </>
  );
}