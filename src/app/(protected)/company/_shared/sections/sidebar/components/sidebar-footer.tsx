"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { SidebarFooterProps } from "../types";
import { useAuth } from "@/contexts";

const SidebarFooter: React.FC<SidebarFooterProps> = () => {
  const { logout } = useAuth();
  return (
    <div className="sidebar-footer px-8 pb-8">
      <div className="border border-neutral-30 rounded-12 bg-white p-6">
        <div className="d-flex flex-column gap-3">
          {/* Ana Sayfa Linki - Fixed Layout */}
          <div className="sidebar-footer-item">
            <Link
              href="/"
              className="d-flex align-items-center p-3 rounded-8 text-decoration-none sidebar-footer-link transition-all w-100"
              title="Ana Sayfaya Git"
            >
              <div className="sidebar-footer-icon-wrapper w-28-px h-28-px flex-center flex-shrink-0">
                <i
                  className="ph-bold ph-house text-neutral-600"
                  style={{ fontSize: "14px" }}
                ></i>
              </div>
              <div className="flex-grow-1 text-center">
                <span className="text-sm fw-medium text-neutral-700">
                  Ana Sayfaya Git
                </span>
              </div>
              <div className="w-28-px flex-center flex-shrink-0">
                <i className="ph-bold ph-arrow-right text-xs text-neutral-400"></i>
              </div>
            </Link>
          </div>

          {/* Ayırıcı Çizgi */}
          <div className="sidebar-footer-separator">
            <div className="border-top border-neutral-100"></div>
          </div>

          {/* Çıkış Yap Butonu - Fixed Layout */}
          <div className="sidebar-footer-item">
            <button
              onClick={() => logout()}
              className="d-flex align-items-center p-3 rounded-8 w-100 border-0 bg-transparent sidebar-footer-link transition-all"
              title="Çıkış Yap"
            >
              <div className="sidebar-footer-icon-wrapper w-28-px h-28-px flex-center flex-shrink-0">
                <i
                  className="ph-bold ph-sign-out text-neutral-600"
                  style={{ fontSize: "14px" }}
                ></i>
              </div>
              <div className="flex-grow-1 text-center">
                <span className="text-sm fw-medium text-neutral-700">
                  Çıkış Yap
                </span>
              </div>
              <div className="w-28-px flex-center flex-shrink-0">
                <i className="ph-bold ph-arrow-right text-xs text-neutral-400"></i>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarFooter;
