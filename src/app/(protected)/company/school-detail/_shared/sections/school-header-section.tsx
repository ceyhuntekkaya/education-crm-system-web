import React from "react";
import { CustomCard } from "@/components/ui";
import { useSchoolDetail } from "../context/school-detail-context";

export default function SchoolHeaderSection() {
  const { selectedSchool, refreshSchool } = useSchoolDetail();

  if (!selectedSchool) {
    return (
      <CustomCard title="Okul Bilgileri" subtitle="Henüz okul seçilmemiş">
        <p className="text-neutral-500">Lütfen bir okul seçin.</p>
      </CustomCard>
    );
  }

  const headerAction = (
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
  );

  return (
    <CustomCard
      title="Okul Bilgileri"
      subtitle="Okul detaylarını görüntüleyin ve bilgileri yönetin"
      headerAction={headerAction}
    />
  );
}
