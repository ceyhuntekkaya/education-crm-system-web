"use client";

import React from "react";
import { LeftInfo } from "./header/sections/left-info";
import { HeaderActions } from "./header/sections/header-actions";
import { ViewModeToggle } from "./header/sections/view-mode-toggle";
import { SelectionInfoBar } from "./header/sections/selection-info-bar";
import { Divider } from "@/components";
import { useWishlistContext } from "../contexts";

/**
 * 📋 HEADER COMPONENT
 * Favori ürünler header - info, görünüm kontrolü ve RFQ oluşturma
 */
export const Header: React.FC = () => {
  const { isSelectionMode } = useWishlistContext();

  return (
    <div
      className="bg-white rounded-16 mb-24 transition-all"
      style={{
        border: "1.5px solid hsl(var(--neutral-40))",
        boxShadow:
          "0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",
        padding: "16px",
      }}
    >
      {/* Row 1: Başlık Bilgisi ve Aksiyon Butonları */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-16 mb-16">
        <LeftInfo />
        <HeaderActions />
      </div>

      {/* Divider */}
      <Divider size="xs" />

      {/* Row 2: Seçim İşlemleri (Sol) & Görünüm Kontrolü (Sağ) */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-8">
        {/* Sol: Seçim Modu Bilgileri */}
        <div className="flex-grow-1">
          {isSelectionMode && <SelectionInfoBar />}
        </div>

        {/* Sağ: Görünüm Toggle */}
        <ViewModeToggle />
      </div>
    </div>
  );
};
