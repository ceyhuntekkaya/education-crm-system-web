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
  SchoolLoadingSection,
  SchoolNotFoundSection,
} from "./_shared/sections";

const SchoolDetailPage: React.FC = () => {
  const { currentSchool, isLoading, refreshSchool, selectedSchool } =
    useSchoolDetail();

  if (isLoading) {
    return <SchoolLoadingSection />;
  }

  if (!currentSchool) {
    return <SchoolNotFoundSection refreshSchool={refreshSchool} />;
  }

  return (
    <div>
      {/* Okul Kapak Görseli */}
      <SchoolCoverImage />

      <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-24">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div>
              <h2 className="mb-8">Okul Bilgileri</h2>
              <p className="text-neutral-600 mb-0">
                Okul detaylarını görüntüleyin ve bilgileri yönetin
              </p>
            </div>
            <div className="d-flex align-items-center gap-12">
              <span className="text-sm text-neutral-500">
                Seçili Okul: <strong>{selectedSchool?.name}</strong>
              </span>
              <button
                onClick={refreshSchool}
                className="btn btn-outline-main btn-sm"
                title="Bilgileri Yenile"
              >
                <i className="ph-bold ph-arrows-clockwise"></i>
              </button>
            </div>
          </div>

          <span className="d-block border border-neutral-30 my-20 border-dashed" />
        </div>

        {/* Okul Detay Bileşenleri */}
        <SchoolGeneralInfo />
        <SchoolPricingInfo />
        <SchoolBrandDetail />
        <SchoolCampusDetail />
        <SchoolLocationInfo />
      </div>
    </div>
  );
};

export default SchoolDetailPage;
