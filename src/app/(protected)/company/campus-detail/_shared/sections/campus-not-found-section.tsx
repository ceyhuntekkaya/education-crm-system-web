import React from "react";
import { CustomCard } from "@/components/ui";

/**
 * Kampüs bulunamadı durumu bileşeni
 */
export const CampusDetailNotFoundSection: React.FC = () => {
  return (
    <CustomCard>
      <div className="text-center py-5">
        <i
          className="ph ph-magnifying-glass text-neutral-400 mb-3"
          style={{ fontSize: "64px" }}
        ></i>
        <h4 className="text-neutral-600 mb-2">Kampüs Bulunamadı</h4>
        <p className="text-neutral-500 mb-0">
          Seçili kampüs bilgisi bulunamadı. Lütfen farklı bir kampüs seçiniz.
        </p>
      </div>
    </CustomCard>
  );
};
