"use client";
import React from "react";

import { useCampusDetail } from "../_shared/context/campus-detail-context";
import {
  CampusCoverImage,
  CampusDetailSection,
  CampusLoadingSection,
  CampusDetailErrorSection,
  CampusDetailNotFoundSection,
  CampusDetailEmptySection,
} from "../_shared";
import { usePageTitle } from "@/hooks";

const CampusDetailWithIdPage: React.FC = () => {
  usePageTitle("Kampüs Detayı");
  const { currentCampus, isLoading, error, allSections } = useCampusDetail();

  // Loading durumu
  if (isLoading) {
    return <CampusLoadingSection />;
  }

  // Error durumu
  if (error) {
    return <CampusDetailErrorSection error={error} />;
  }

  // Empty state durumu
  if (!currentCampus) {
    return <CampusDetailNotFoundSection />;
  }

  // Section'lar yoksa
  if (!allSections?.length) {
    return <CampusDetailEmptySection />;
  }

  return (
    <div className="d-flex flex-column gap-24">
      <CampusCoverImage />
      <CampusDetailSection />
    </div>
  );
};

export default CampusDetailWithIdPage;
