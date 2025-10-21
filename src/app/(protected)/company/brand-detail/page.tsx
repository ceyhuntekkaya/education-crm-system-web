"use client";
import React from "react";

import { useBrandDetail } from "./_shared/context/brand-detail-context";
import {
  BrandCoverImage,
  BrandNotFoundSection,
  BrandDetailSection,
  BrandCampusSection,
} from "./_shared/sections";
import { LoadingSpinner } from "@/components/ui/loadings";
import { CustomCard } from "@/components/ui";

const BrandDetailPage: React.FC = () => {
  const { currentBrand, isLoading } = useBrandDetail();

  if (isLoading) {
    return (
      <CustomCard title="Marka Bilgileri Yükleniyor" className="text-center">
        <div className="py-5">
          <LoadingSpinner
            size="lg"
            message="Marka detayları yükleniyor..."
            variant="dots"
          />
        </div>
      </CustomCard>
    );
  }

  if (!currentBrand) {
    return <BrandNotFoundSection />;
  }

  return (
    <div className="d-flex flex-column gap-24">
      <BrandCoverImage />
      <BrandDetailSection />
      <BrandCampusSection />
    </div>
  );
};

export default BrandDetailPage;
