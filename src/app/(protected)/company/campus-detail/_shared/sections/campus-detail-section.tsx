import React from "react";
import { CustomCard } from "@/components/ui";
import { useCampusDetail } from "../context";

interface CampusDetailSectionProps {
  direction?: "row" | "column";
}

/**
 * Kampüs detay bilgilerini gösteren section bileşeni
 */
export const CampusDetailSection: React.FC<CampusDetailSectionProps> = ({
  direction = "column",
}) => {
  const { currentCampus: campus, allSections } = useCampusDetail();

  return (
    <div
      className={`d-flex ${
        direction === "row" ? "flex-row" : "flex-column"
      } gap-24`}
    >
      <CustomCard
        title="Kampüs Detayları"
        // addButtonUrl="/company/campus-detail/add-edit/new"
        editButtonUrl={`/company/campus-detail/add-edit/${campus?.id}`}
        multiItems={allSections}
        isBack={true}
      />
    </div>
  );
};
