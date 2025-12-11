"use client";

import { useState } from "react";
import { usePageTitle } from "@/hooks";
import {
  AboutHeroSection,
  AboutStatsSection,
  AboutValuesSection,
  AboutFeaturesSection,
  AboutTabSection,
  MissionVisionSection,
  ParentAppSection,
  InstitutionModulesSection,
  InfoSection,
} from "./_shared/sections";
import {
  ABOUT_STATS,
  PLATFORM_VALUES,
  parentFeatures,
  institutionFeatures,
} from "./_shared/config";

const AboutPage = () => {
  usePageTitle("Hakkımızda");
  const [activeTab, setActiveTab] = useState<"parent" | "institution">("parent");

  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section - Modern Tasarım */}
        <AboutHeroSection />

        {/* İstatistikler */}
        <AboutStatsSection stats={ABOUT_STATS} />

        {/* Misyon & Vizyon */}
        <MissionVisionSection />

        {/* Değerlerimiz */}
        <AboutValuesSection values={PLATFORM_VALUES} />

        {/* Tab Navigation - Veliler ve Kurumlar İçin */}
        <AboutTabSection activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Veliler İçin İçerik */}
        {activeTab === "parent" && (
          <div className="about-tab-content" data-aos="fade-up">
            {/* Veliler İçin Özellikler */}
            <AboutFeaturesSection
              title="Veliler İçin Özellikler"
              subtitle="Çocuğunuz için en doğru eğitim kurumunu bulmanın kolay yolu"
              features={parentFeatures}
              targetAudience="parent"
            />

            {/* Eğitim İste'yi Cebinize İndirin - Eski Tasarım Korundu */}
            <div className="row mb-40">
              <div className="col-12">
                <ParentAppSection />
              </div>
            </div>
          </div>
        )}

        {/* Kurumlar İçin İçerik */}
        {activeTab === "institution" && (
          <div className="about-tab-content" data-aos="fade-up">
            {/* Kurumlar İçin Özellikler */}
            <AboutFeaturesSection
              title="Eğitim Kurumları İçin Özellikler"
              subtitle="Kurumunuzu dijital dünyada öne çıkarın"
              features={institutionFeatures}
              targetAudience="institution"
            />

            {/* Kurumunuzu Dijitale Taşıyın - Eski Tasarım Korundu */}
            <div className="row mb-40">
              <div className="col-12">
                <InstitutionModulesSection />
              </div>
            </div>
          </div>
        )}

        {/* İletişim Bilgisi - Tab'a Göre Değişen İçerik */}
        <InfoSection
          activeTab={activeTab === "parent" ? "parent-tab" : "institution-tab"}
        />
      </div>
    </div>
  );
};

export default AboutPage;
