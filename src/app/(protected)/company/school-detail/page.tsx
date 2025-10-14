"use client";
import React from "react";

import { useSchoolDetail } from "./_shared/context/school-detail-context";
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
} from "./_shared/sections";

const SchoolDetailPage: React.FC = () => {
  const { currentSchool, isLoading } = useSchoolDetail();

  if (isLoading) {
    return <SchoolLoadingSection />;
  }

  if (!currentSchool) {
    return <SchoolNotFoundSection />;
  }

  return (
    <div className="d-flex flex-column gap-24">
      {/* <SchoolHeaderSection /> */}
      <SchoolCoverImage />

      <SchoolGeneralInfo />
      <SchoolPricingInfo />
      <SchoolBrandDetail />
      <SchoolCampusDetail />
      <SchoolLocationInfo />
    </div>
  );
};

export default SchoolDetailPage;
