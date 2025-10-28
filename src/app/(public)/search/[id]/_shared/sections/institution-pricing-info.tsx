"use client";

import React from "react";
import { CustomCard, LoadingSpinner } from "@/components/ui";
import { useInstitutionDetail } from "../contexts";
import { usePricingSections } from "@/app/(protected)/company/pricing/detail/[id]/_shared";

/**
 * Kurum fiyatlandırma bilgilerini gösteren bileşen
 */
export const InstitutionPricingInfo: React.FC = () => {
  const { pricings, loading } = useInstitutionDetail();

  const allSections = usePricingSections(pricings?.[0]);

  if (loading) {
    return (
      <CustomCard title="Ücret Bilgileri">
        <LoadingSpinner message="Ücret bilgileri yükleniyor..." />
      </CustomCard>
    );
  }

  if (!pricings || pricings.length === 0) {
    return (
      <CustomCard
        title="Ücret Bilgileri"
        bgColor="bg-main-25"
        border="border border-neutral-30"
      >
        <div className="text-center py-8">
          <i className="ph ph-info text-neutral-500 fs-2 mb-3"></i>
          <p className="text-neutral-600 mb-0">
            Ücret bilgileri henüz mevcut değil.
          </p>
        </div>
      </CustomCard>
    );
  }

  return (
    <div className="tutor-details__content mt-24">
      <CustomCard
        title="Ücret Bilgileri"
        subtitle="Kurum ücret bilgilerini detaylı olarak görüntüleyin"
        multiItems={allSections}
      />
    </div>
  );
};
