import React from "react";
import { CustomCard } from "@/components/ui";
import { useBrandDetail } from "../context";
import {
  BrandDetailLoadingSection,
  BrandDetailErrorSection,
  BrandDetailNotFoundSection,
  BrandDetailEmptySection,
} from "./brand-detail-state-sections";

interface BrandDetailSectionProps {
  direction?: "row" | "column";
}

/**
 * Marka detay bilgilerini gösteren section bileşeni
 */
export const BrandDetailSection: React.FC<BrandDetailSectionProps> = ({
  direction = "column",
}) => {
  const {
    currentBrand: brand,
    isLoading,
    error,
    allSections,
  } = useBrandDetail();

  // Loading durumu
  if (isLoading) {
    return <BrandDetailLoadingSection />;
  }

  // Error durumu
  if (error) {
    return <BrandDetailErrorSection error={error} />;
  }

  // Empty state durumu
  if (!brand) {
    return <BrandDetailNotFoundSection />;
  }

  // Section'lar yoksa
  if (!allSections?.length) {
    return <BrandDetailEmptySection />;
  }

  return (
    <div
      className={`d-flex ${
        direction === "row" ? "flex-row" : "flex-column"
      } gap-24`}
    >
      <CustomCard
        title="Marka Detayları"
        multiItems={allSections.map((section) => ({
          title: section.title,
          titleColor: section.titleColor,
          titleIcon: section.titleIcon,
          items: section.items
            .filter((item: any) => item.isShowing)
            .map((item: any) => ({
              label: item.label,
              value: item.value,
              isShowing: item.isShowing,
            })),
        }))}
      />
    </div>
  );
};
