import React from "react";
import { CustomCard } from "@/components/ui";
import { Button } from "@/components";
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
        headerAction={
          <div className="d-flex gap-8">
            <Button
              variant="outline"
              size="sm"
              leftIcon="ph-plus"
              href="/company/brand-detail/add-edit/new"
            >
              Yeni Ekle
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon="ph-pencil-simple"
              href={`/company/brand-detail/add-edit/${brand?.id}`}
            >
              Düzenle
            </Button>
          </div>
        }
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
