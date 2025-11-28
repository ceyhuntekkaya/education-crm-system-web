"use client";

import React from "react";
import { CustomCard, LoadingSpinner } from "@/components/ui";
import { useCustomFeeDetail } from "../_shared/context";
import { usePageTitle } from "@/hooks";

const CustomFeeDetailPage: React.FC = () => {
  usePageTitle("Özel Ücret Detayı");
  const {
    currentCustomFee: customFee,
    isLoading: customFeeLoading,
    error: customFeeError,
    allSections,
  } = useCustomFeeDetail();

  if (customFeeLoading) {
    return (
      <CustomCard title="Ek Ücret Detayı">
        <LoadingSpinner message="Ek ücret bilgisi yükleniyor..." />
      </CustomCard>
    );
  }

  if (customFeeError) {
    return (
      <CustomCard
        title="Hata"
        bgColor="bg-danger-25"
        border="border border-danger-30"
      >
        <div className="text-center py-8">
          <i className="ph ph-warning-circle text-danger fs-2 mb-3"></i>
          <p className="text-danger mb-0">
            Ek ücret bilgisi yüklenirken hata oluştu: {customFeeError}
          </p>
        </div>
      </CustomCard>
    );
  }

  if (!customFee) {
    return (
      <CustomCard title="Bilgi">
        <div className="text-center py-8">
          <i className="ph ph-info text-neutral-500 fs-2 mb-3"></i>
          <p className="text-neutral-600 mb-0">Ek ücret bilgisi bulunamadı.</p>
        </div>
      </CustomCard>
    );
  }

  return (
    <CustomCard
      title="Ek Ücret Detayı"
      subtitle="Ek ücret bilgilerini detaylı olarak görüntüleyin"
      editButtonUrl={
        customFee?.id
          ? `/company/custom-fees/add-edit/${customFee.id}`
          : undefined
      }
      multiItems={allSections}
      isBack={true}
    />
  );
};

export default CustomFeeDetailPage;
