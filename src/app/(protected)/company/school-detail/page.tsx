"use client";
import React from "react";
import { SchoolInfoSection } from "./_shared/sections/school-info-section";
import { SchoolSelector } from "../_shared/sections/school-selector";

const SchoolDetailPage: React.FC = () => {
  return (
    <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24">
      <div className="border border-neutral-30 rounded-12 bg-main-25 p-24">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-20">
          <div>
            <h2 className="mb-8">Okul Bilgileri</h2>
            <p className="text-neutral-600 mb-0">
              Okulunuzun detaylı bilgilerini görüntüleyin ve yönetin
            </p>
          </div>
          <div className="col-md-4">
            <SchoolSelector
              showLabel={false}
              placeholder="Okul seçiniz..."
              variant="outline"
            />
          </div>
        </div>

        <span className="d-block border border-neutral-30 my-20 border-dashed" />

        <SchoolInfoSection />
      </div>
    </div>
  );
};

export default SchoolDetailPage;
