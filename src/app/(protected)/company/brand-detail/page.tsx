"use client";
import React from "react";

import { useBrandDetail } from "./_shared/context/brand-detail-context";
import {
  BrandCoverImage,
  BrandDetailSection,
  BrandCampusSection,
  BrandLoadingSection,
  BrandDetailErrorSection,
  BrandDetailNotFoundSection,
  BrandDetailEmptySection,
} from "./_shared/sections";

const BrandDetailPage: React.FC = () => {
  const { currentBrand, isLoading, error, allSections } = useBrandDetail();

  // Loading durumu
  if (isLoading) {
    return <BrandLoadingSection />;
  }

  // Error durumu
  if (error) {
    return <BrandDetailErrorSection error={error} />;
  }

  // Empty state durumu
  if (!currentBrand) {
    return <BrandDetailNotFoundSection />;
  }

  // Section'lar yoksa
  if (!allSections?.length) {
    return <BrandDetailEmptySection />;
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
