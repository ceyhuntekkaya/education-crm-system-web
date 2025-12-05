import React from "react";
import { CustomImage } from "@/components";
import { useInstitutionSidebarData } from "../hooks/useInstitutionSidebarData";

export const SchoolLogoAndName: React.FC = () => {
  const { school } = useInstitutionSidebarData();

  return (
    <>
      {/* Logo */}
      <div className="p-16 border border-neutral-50 rounded-circle aspect-ratio-1 max-w-150 max-h-150 mx-auto">
        <div className="position-relative">
          <CustomImage
            src={school.logoUrl}
            alt={school.name || "Kurum Logosu"}
            width={150}
            height={150}
            className="rounded-circle bg-dark-yellow aspect-ratio-1 cover-img"
          />
          <span className="w-32 h-32 bg-success-600 rounded-circle border border-main-25 border-3 flex-center text-white position-absolute inset-block-end-0 inset-inline-end-0 me-4">
            <i className="ph-bold ph-check" />
          </span>
        </div>
      </div>

      <h4 className="mb-16 text-center mt-40">{school.name}</h4>
    </>
  );
};
