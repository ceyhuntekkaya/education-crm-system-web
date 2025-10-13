"use client";
import React from "react";

import { useSchoolDetail } from "./_shared/context/school-detail-context";

const SchoolDetailPage: React.FC = () => {
  const { currentSchool, isLoading, error, refreshSchool, selectedSchool } =
    useSchoolDetail();

  console.log("currentSchool in school detail page:", currentSchool);

  return (
    <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24">
      <div className="border border-neutral-30 rounded-12 bg-main-25 p-24">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div>
            <h2 className="mb-8">Okul Bilgileri</h2>
            <p className="text-neutral-600 mb-0">
              Okul detaylarını görüntüleyin ve bilgileri yönetin
            </p>
          </div>
        </div>

        <span className="d-block border border-neutral-30 my-20 border-dashed" />
      </div>
    </div>
  );
};

export default SchoolDetailPage;
