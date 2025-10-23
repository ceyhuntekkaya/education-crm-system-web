"use client";

import React from "react";
import { CustomCard } from "@/components/ui";

/**
 * Post detay sayfası için bulunamadı durumu bileşeni
 */
export const NotFoundSection: React.FC = () => {
  return (
    <CustomCard title="Bilgi">
      <div className="text-center py-8">
        <i className="ph ph-info text-neutral-500 fs-2 mb-3"></i>
        <p className="text-neutral-600 mb-0">Post bilgisi bulunamadı.</p>
      </div>
    </CustomCard>
  );
};
