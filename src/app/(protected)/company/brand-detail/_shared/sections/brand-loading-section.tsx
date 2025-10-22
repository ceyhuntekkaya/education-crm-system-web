import React from "react";
import { CustomCard, LoadingSpinner } from "@/components/ui";

export default function BrandLoadingSection() {
  return (
    <div className="d-flex flex-column gap-24">
      <CustomCard title="Marka Bilgileri">
        <LoadingSpinner
          message="Marka bilgileri yükleniyor..."
          size="lg"
          variant="dots"
        />
      </CustomCard>
    </div>
  );
}
