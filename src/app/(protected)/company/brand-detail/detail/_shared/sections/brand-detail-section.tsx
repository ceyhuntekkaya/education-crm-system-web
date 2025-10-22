import React from "react";
import { CustomCard } from "@/components/ui";
import { useBrandDetail } from "../context";

interface BrandDetailSectionProps {
  direction?: "row" | "column";
}

/**
 * Marka detay bilgilerini gösteren section bileşeni
 */
export const BrandDetailSection: React.FC<BrandDetailSectionProps> = ({
  direction = "column",
}) => {
  const { currentBrand: brand, allSections } = useBrandDetail();

  return (
    <div
      className={`d-flex ${
        direction === "row" ? "flex-row" : "flex-column"
      } gap-24`}
    >
      <CustomCard
        title="Marka Detayları"
        addButtonUrl="/company/brand-detail/add-edit/new"
        editButtonUrl={`/company/brand-detail/add-edit/${brand?.id}`}
        multiItems={allSections}
      />
    </div>
  );
};
