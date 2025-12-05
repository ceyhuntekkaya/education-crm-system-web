import React from "react";

interface SchoolCardProps {
  schoolName: string;
  location?: string;
}

export const SchoolCard: React.FC<SchoolCardProps> = ({
  schoolName,
  location = "İstanbul, Türkiye",
}) => {
  return (
    <div className="text-center mb-24">
      <div className="bg-main-25 border border-main-200 rounded-12 p-20">
        <h5 className="text-main-700 fw-semibold mb-6">{schoolName}</h5>
        <div className="d-flex align-items-center justify-content-center gap-4 mb-12">
          <i className="ph ph-map-pin text-main-500 text-xs" />
          <span className="text-main-600 text-sm">{location}</span>
        </div>
        <div className="bg-main-600 rounded-8 px-12 py-4 d-inline-flex align-items-center gap-6">
          <i className="ph-bold ph-bookmark-simple text-white text-xs" />
          <span className="text-white text-sm fw-medium">Listeye Kaydet</span>
        </div>
      </div>
      <p className="text-neutral-600 text-sm mt-16 mb-0">
        Bu Kurumu hangi listeye kaydetmek istiyorsunuz?
      </p>
    </div>
  );
};
