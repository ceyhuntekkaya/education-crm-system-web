"use client";

import React from "react";
import { CustomCard, LoadingSpinner } from "@/components/ui";

/**
 * Post detay sayfası için loading durumu bileşeni
 */
export const LoadingSection: React.FC = () => {
  return (
    <CustomCard title="Post Detayı">
      <LoadingSpinner message="Post bilgisi yükleniyor..." />
    </CustomCard>
  );
};
