import React from "react";
import Image from "next/image";
import { useInstitutionSidebarData } from "../hooks/useInstitutionSidebarData";

const tempImgUrl =
  "https://static.vecteezy.com/system/resources/previews/004/641/880/non_2x/illustration-of-high-school-building-school-building-free-vector.jpg";

export const SchoolLogoAndName: React.FC = () => {
  const { school } = useInstitutionSidebarData();

  return (
    <>
      {/* Logo */}
      <div className="p-16 border border-neutral-50 rounded-circle aspect-ratio-1 max-w-150 max-h-150 mx-auto">
        <div className="position-relative">
          <Image
            src={tempImgUrl || school.logoUrl}
            alt={school.name || "Okul Logosu"}
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
