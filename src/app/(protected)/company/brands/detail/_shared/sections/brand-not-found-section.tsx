import React from "react";
import { CustomCard } from "@/components/ui";

export default function BrandNotFoundSection() {
  return (
    <CustomCard title="Marka Bulunamadı">
      <div className="text-center py-48">
        <div className="mb-24">
          <i
            className="ph ph-magnifying-glass"
            style={{ fontSize: "64px", color: "#6b7280" }}
          />
        </div>
        <h3 className="mb-16 text-neutral-700">Marka bilgileri bulunamadı</h3>
        <p className="text-neutral-500 mb-0">
          Seçili marka için detay bilgileri mevcut değil veya bir hata oluştu.
        </p>
      </div>
    </CustomCard>
  );
}
