import React from "react";
import { CustomCard } from "@/components/ui";
import { useSchoolDetailContext } from "../context/school-detail-context";

export default function SchoolHeaderSection() {
  const { selectedSchool, refreshSchool } = useSchoolDetailContext();

  if (!selectedSchool) {
    return (
      <CustomCard title="Kurum Bilgileri" subtitle="Henüz Kurum seçilmemiş">
        <p className="text-neutral-500">Lütfen bir Kurum seçin.</p>
      </CustomCard>
    );
  }

  const headerAction = (
    <div className="d-flex align-items-center gap-12">
      <span className="text-sm text-neutral-500">
        Seçili Kurum: <strong>{selectedSchool?.name}</strong>
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
      title="Kurum Bilgileri"
      subtitle="Kurum detaylarını görüntüleyin ve bilgileri yönetin"
      headerAction={headerAction}
    />
  );
}
