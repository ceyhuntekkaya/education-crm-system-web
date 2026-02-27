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

      {/* Nasıl Çalışır — 3 Adım (merak uyandır) */}
      <HowItWorksSection />

      {/* Platform Tanıtım Videosu */}
      <VideoTeaserSection />

      {/* Özel Okullar — Carousel */}
      <PrivateSchoolsSection />

      {/* Kurslar: Lise & Üniversite — Tab Grid */}
      <EduCoursesSection />

      {/* Kurslar: Dil — Koyu Tema */}
      <LanguageCoursesSection />

      {/* Kurslar: Aktivite — Masonry Grid */}
      <ActivityCoursesSection />

      {/* Webinar & Etkinlikler */}
      <WebinarsSection />

      {/* İK - Eğitim Sektörüne Özel */}
      <HrEducationSection />

      {/* Güven Barı + Final CTA */}
      <TrustCtaSection />
    </div>
  );
}
