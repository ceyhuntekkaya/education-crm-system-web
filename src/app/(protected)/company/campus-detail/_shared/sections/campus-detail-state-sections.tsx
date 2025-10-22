import React from "react";
import { CustomCard } from "@/components/ui";

interface CampusDetailErrorSectionProps {
  error: string;
}

/**
 * Kampüs hata durumu bileşeni
 */
export const CampusDetailErrorSection: React.FC<
  CampusDetailErrorSectionProps
> = ({ error }) => {
  return (
    <CustomCard>
      <div className="text-center py-5">
        <i
          className="ph ph-warning-circle text-danger-600 mb-3"
          style={{ fontSize: "64px" }}
        ></i>
        <h4 className="text-danger-600 mb-2">Bir Hata Oluştu</h4>
        <p className="text-neutral-600 mb-0">{error}</p>
      </div>
    </CustomCard>
  );
};
