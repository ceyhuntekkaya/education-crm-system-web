"use client";

import React from "react";
import { LoadingSpinner, CustomCard } from "@/components";

interface LoadingSectionProps {
  pageTitle: string;
}

/**
 * Post add-edit sayfası için loading durumu bileşeni
 */
export const LoadingSection: React.FC<LoadingSectionProps> = ({
  pageTitle,
}) => {
  return (
    <CustomCard
      title={pageTitle}
      subtitle="Gönderi bilgileri yükleniyor..."
      isBack
    >
      <LoadingSpinner
        message="Gönderi bilgileri yükleniyor..."
        size="md"
        variant="dots"
        className="py-5"
      />
    </CustomCard>
  );
};
