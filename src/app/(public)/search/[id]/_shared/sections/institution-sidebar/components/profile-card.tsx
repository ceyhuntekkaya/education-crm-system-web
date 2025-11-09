import React from "react";
import { QuickInfoStats } from "./quick-info-stats";
import { SocialMediaLinks } from "./social-media-links";
import { ContactInformation } from "./contact-information";
import { AddToListButton } from "../add-to-list";
import { AgeCapacityInfo } from "./age-capacity-info";
import { EducationLanguages } from "./education-languages";
import { CurriculumInfo } from "./curriculum-info";
import { SchoolDescription } from "./school-description";
import { SchoolBasicInfo } from "./school-basic-info";
import { SchoolLogoAndName } from "./school-logo-and-name";

export const ProfileCard: React.FC = () => {
  return (
    <div className="border border-neutral-30 rounded-12 bg-white p-8 position-relative">
      {/* Listeye Ekle İkonu - Sağ üst köşe */}
      <AddToListButton />

      <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
        {/* Logo ve İsim */}
        <SchoolLogoAndName />

        {/* Açıklama */}
        <SchoolDescription />

        {/* Temel Bilgiler */}
        <SchoolBasicInfo />

        {/* Yaş Aralığı ve Kapasite */}
        <AgeCapacityInfo />

        {/* Eğitim Dilleri */}
        <EducationLanguages />

        {/* Müfredat Bilgisi */}
        <CurriculumInfo />

        {/* Ücret Bilgileri */}
        {/* <PricingInfo /> */}

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
