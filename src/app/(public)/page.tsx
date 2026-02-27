"use client";

import {
  Banner,
  VideoTeaserSection,
  PrivateSchoolsSection,
  EduCoursesSection,
  HowItWorksSection,
  LanguageCoursesSection,
  ActivityCoursesSection,
  HrEducationSection,
  WebinarsSection,
  TrustCtaSection,
} from "./_shared/sections";

export default function PublicHomePage() {
  return (
    <div>
      {/* Hero Banner */}
      <Banner />

      {/* Platform Tanıtım Videosu */}
      <VideoTeaserSection />

      {/* Özel Okullar */}
      <PrivateSchoolsSection />

      {/* Kurslar: Lise & Üniversite */}
      <EduCoursesSection />

      {/* Nasıl Çalışır — 3 Adım */}
      <HowItWorksSection />

      {/* Kurslar: Dil */}
      <LanguageCoursesSection />

      {/* Kurslar: Aktivite */}
      <ActivityCoursesSection />

      {/* İK - Eğitim Sektörüne Özel */}
      <HrEducationSection />

      {/* Webinar & Etkinlikler */}
      <WebinarsSection />

      {/* Güven Barı + Final CTA */}
      <TrustCtaSection />
    </div>
  );
}
