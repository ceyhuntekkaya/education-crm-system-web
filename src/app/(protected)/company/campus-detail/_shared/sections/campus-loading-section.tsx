import React from "react";
import { LoadingSpinner } from "@/components";

/**
 * Kampüs yükleme durumu bileşeni
 */
export const CampusLoadingSection: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <LoadingSpinner
        message="Kampüs bilgileri yükleniyor..."
        size="lg"
        variant="dots"
      />
    </div>
  );
};
