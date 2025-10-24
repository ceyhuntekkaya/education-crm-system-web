"use client";

import React from "react";
import { CustomCard } from "@/components/ui";

interface ErrorSectionProps {
  error: string;
}

/**
 * Post detay sayfası için hata durumu bileşeni
 */
export const ErrorSection: React.FC<ErrorSectionProps> = ({ error }) => {
  return (
    <CustomCard
      title="Hata"
      bgColor="bg-danger-25"
      border="border border-danger-30"
    >
      <div className="text-center py-8">
        <i className="ph ph-warning-circle text-danger fs-2 mb-3"></i>
        <p className="text-danger mb-0">
          Post bilgisi yüklenirken hata oluştu: {error}
        </p>
      </div>
    </CustomCard>
  );
};
