"use client";

// Components
import {
  InstitutionSidebar,
  InstitutionGeneralInfo,
  InstitutionPricingInfo,
  InstitutionReviews,
} from "./_sections";

// UI Components
import { TabContent, TabNavigation, type TabItem } from "@/components";

// Utils
import { formatCurrency, renderStars } from "./_utils";

// Mock data
import { institutionMockData } from "./_mock";

export default function InstitutionDetailPage() {
  const { school, campus, brand } = institutionMockData;

  // Tab content dizisi
  const tabItems: TabItem[] = [
    {
      id: "pills-tutionInfo",
      icon: "ph-bold ph-info",
      title: "Genel Bilgiler",
      children: (
        <InstitutionGeneralInfo
          school={school}
          campus={campus}
          renderStars={renderStars}
        />
      ),
      isActive: true,
    },
    {
      id: "pills-qualification",
      icon: "ph-bold ph-currency-circle-dollar",
      title: "Ücretler",
      children: (
        <InstitutionPricingInfo
          school={school}
          formatCurrency={formatCurrency}
        />
      ),
    },
    {
      id: "pills-reviews",
      icon: "ph-bold ph-star",
      title: "Değerlendirmeler",
      children: (
        <InstitutionReviews school={school} renderStars={renderStars} />
      ),
    },
  ];

  return (
    <section className="tutor-details py-120">
      <div className="container">
        <div className="row gy-4">
          {/* Sol Sidebar - Profil ve İletişim */}
          <InstitutionSidebar
            school={school}
            campus={campus}
            renderStars={renderStars}
          />

          {/* Sağ İçerik - Tab Yapısı */}
          <div className="col-lg-8">
            {/* Tab Navigation */}
            <TabNavigation tabs={tabItems} />

            {/* Tab Content */}
            <TabContent tabs={tabItems} />
          </div>
        </div>
      </div>
    </section>
  );
}
