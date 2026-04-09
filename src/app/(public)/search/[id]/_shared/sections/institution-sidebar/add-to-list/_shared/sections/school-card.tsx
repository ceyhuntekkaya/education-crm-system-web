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
    <div className="mb-20">
      <div className="d-flex align-items-center gap-12 p-14 bg-main-25 border border-main-200 rounded-12">
        <div
          className="bg-main-600 rounded-10 d-flex align-items-center justify-content-center flex-shrink-0"
          style={{ width: "40px", height: "40px" }}
        >
          <i className="ph-bold ph-buildings text-white text-lg" />
        </div>
        <div className="flex-grow-1 min-w-0">
          <h6 className="text-main-700 fw-semibold mb-0 text-truncate">
            {schoolName}
          </h6>
          <div className="d-flex align-items-center gap-4 mt-2">
            <i className="ph ph-map-pin text-main-500 text-xs" />
            <span className="text-main-500 text-xs">{location}</span>
          </div>
        </div>
      </div>
      <p className="text-neutral-600 text-sm mt-12 mb-0">
        Hangi listenize eklemek istiyorsunuz?
      </p>
    </div>
  );
};
