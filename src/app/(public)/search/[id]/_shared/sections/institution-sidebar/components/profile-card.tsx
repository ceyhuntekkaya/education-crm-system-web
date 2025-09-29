import React from "react";
import Image from "next/image";
import { useInstitutionSidebarData } from "../hooks/useInstitutionSidebarData";
import { QuickInfoStats } from "./quick-info-stats";
import { SocialMediaLinks } from "./social-media-links";
import { ContactInformation } from "./contact-information";
import { SaveButton } from "./save-button";

const tempImgUrl =
  "https://static.vecteezy.com/system/resources/previews/004/641/880/non_2x/illustration-of-high-school-building-school-building-free-vector.jpg";

export const ProfileCard: React.FC = () => {
  const { school, renderStars } = useInstitutionSidebarData();

  return (
    <div className="border border-neutral-30 rounded-12 bg-white p-8 position-relative">
      {/* Kaydet İkonu - Sağ üst köşe */}
      <SaveButton />

      <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
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

        <div className="flex-center gap-10 flex-wrap my-20">
          <span className="text-neutral-500 text-md">
            ID: <span className="text-main-600 fw-medium">#{school.id}</span>
          </span>
          <span className="w-4 h-4 bg-main-600 rounded-circle" />
          <span className="text-neutral-500 text-md">
            Tür:{" "}
            <span className="text-main-600 fw-medium">
              {school.institutionType?.displayName}
            </span>
          </span>
          <span className="w-4 h-4 bg-main-600 rounded-circle" />
          <div className="flex-align gap-4">
            {renderStars(school.ratingAverage || 0)}
            <span className="text-md text-neutral-700 ms-8">
              {school.ratingAverage}
              <span className="text-neutral-100"> ({school.ratingCount})</span>
            </span>
          </div>
        </div>

        {/* Hızlı Bilgiler */}
        <QuickInfoStats />

        {/* Social Media Links */}
        <SocialMediaLinks />

        <span className="d-block border border-neutral-30 my-20 border-dashed" />

        {/* Contact Information */}
        <ContactInformation />
      </div>
    </div>
  );
};
