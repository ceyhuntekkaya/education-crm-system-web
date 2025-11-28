"use client";

import { TabNavigation, TabContent } from "@/components";
import {
  AboutHeroSection,
  MissionVisionSection,
  BrandSection,
  InfoSection,
} from "./_shared/sections";
import { getAboutTabs } from "./_shared/utils";
import { usePageTitle } from "@/hooks";

const AboutPage = () => {
  usePageTitle("Hakkımızda");
  const tabs = getAboutTabs();

  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        <AboutHeroSection />

        {/* Tab Navigation */}
        <div className=" mb-40">
          <div className="col-12">
            <TabNavigation
              tabs={tabs}
              navigationId="about-tabs"
              size="md"
              allowMultiline={false}
              center={true}
            />
          </div>
        </div>

        {/* Tab Content */}
        <TabContent tabs={tabs} contentId="about-tabs-content" />

        {/* Ortak Misyon & Vizyon */}
        <MissionVisionSection />

        {/* Eğitim İste Logo Section */}
        <BrandSection />

        {/* İletişim Bilgisi */}
        <InfoSection />
      </div>
    </div>
  );
};

export default AboutPage;
