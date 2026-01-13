/**
 * 🎨 DETAIL LAYOUT - MAIN COMPONENT
 *
 * Generic detail sayfaları için layout componenti
 * RFQ, Order, Customer gibi detay sayfalarında ortak kullanım için
 *
 * FEATURES:
 * ✅ Header (Back Button + Action Buttons)
 * ✅ Loading/Error/Empty states
 * ✅ Main section (ana bilgi kartı)
 * ✅ Detail sections (detay kartları)
 * ✅ Responsive grid system
 * ✅ Modüler yapı
 * ✅ Customizable components
 *
 * USAGE:
 * ```tsx
 * <DetailLayout
 *   header={{
 *     backButton: { label: "Geri Dön" },
 *     actionButtons: [{ id: "edit", label: "Düzenle" }]
 *   }}
 *   mainSection={{
 *     id: "main",
 *     children: <RFQInfoSection />
 *   }}
 *   detailSections={[
 *     { id: "details", children: <RFQDetailsSection /> }
 *   ]}
 *   loading={{ isLoading: false }}
 * />
 * ```
 */

"use client";

import React from "react";
import { Header, MainSection, DetailSections } from "./sections";
import {
  DetailLoadingState,
  DetailErrorState,
  DetailEmptyState,
  ColumnRenderer,
} from "./components";
import { useDetailLayoutConfig } from "./hooks";
import type { DetailLayoutProps } from "./types";

/**
 * Detail Layout Ana Bileşeni
 */
export function DetailLayout(props: DetailLayoutProps) {
  const {
    headerConfig,
    mainSectionConfig,
    detailSectionsConfig,
    loadingConfig,
    errorConfig,
    emptyConfig,
    containerClassName,
    spacingConfig,
    customChildren,
    shouldShowLoading,
    shouldShowError,
    shouldShowEmpty,
    shouldShowContent,
  } = useDetailLayoutConfig(props);

  const getSpacingClass = () => {
    switch (spacingConfig) {
      case "sm":
        return "detail-layout--spacing-sm";
      case "lg":
        return "detail-layout--spacing-lg";
      default:
        return "";
    }
  };

  const layoutClassName = [
    "detail-layout",
    "rfq-detail-page", // RFQ için default class
    getSpacingClass(),
    containerClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={layoutClassName}>
      <div className="detail-layout__container">
        {/* Header */}
        <Header config={headerConfig} />

        {/* Loading State */}
        <DetailLoadingState config={loadingConfig} />

        {/* Error State */}
        <DetailErrorState config={errorConfig} />

        {/* Empty State */}
        <DetailEmptyState config={emptyConfig} />

        {/* Content */}
        {shouldShowContent && (
          <div className="detail-layout__content">
            {/* Custom Children (eğer varsa sadece onu göster) */}
            {customChildren ? (
              <div className="detail-layout__custom-content">
                {customChildren}
              </div>
            ) : props.columns ? (
              /* Column based rendering */
              <div className="detail-layout__columns-content">
                <ColumnRenderer columnsConfig={props.columns} />
              </div>
            ) : (
              <>
                {/* Main Section */}
                <MainSection
                  config={mainSectionConfig}
                  className="detail-layout__main-section"
                />

                {/* Detail Sections */}
                <DetailSections
                  sections={detailSectionsConfig}
                  spacing={spacingConfig}
                  className="detail-layout__detail-sections"
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
