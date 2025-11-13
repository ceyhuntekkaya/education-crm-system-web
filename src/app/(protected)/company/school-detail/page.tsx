"use client";
import React from "react";

import { useSchoolDetailContext } from "./_shared/context/school-detail-context";
import {
  SchoolGeneralInfo,
  SchoolCampusDetail,
  SchoolLocationInfo,
  SchoolBrandDetail,
  SchoolPricingInfo,
  SchoolCoverImage,
  SchoolHeaderSection,
  SchoolLoadingSection,
  SchoolNotFoundSection,
  SchoolAdditionalFeatures,
} from "./_shared/sections";

const SchoolDetailPage: React.FC = () => {
  const { currentSchool, isLoading } = useSchoolDetailContext();

  if (isLoading) {
    return <SchoolLoadingSection />;
  }

  if (!currentSchool) {
    return <SchoolNotFoundSection />;
  }

  return (
    <div className="d-flex flex-column gap-24">
      <SchoolCoverImage />
      <SchoolGeneralInfo />
      <SchoolBrandDetail />
      <SchoolCampusDetail />
      <SchoolLocationInfo />
      <SchoolAdditionalFeatures />
    </div>
  );
};

export default SchoolDetailPage;
