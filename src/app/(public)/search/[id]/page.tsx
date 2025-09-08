"use client";

// Components
import {
  InstitutionSidebar,
  InstitutionGeneralInfo,
  InstitutionPricingInfo,
  InstitutionReviews,
  InstitutionCampusInfo,
  InstitutionStatistics,
  InstitutionLocationInfo,
  InstitutionSeoInfo,
  InstitutionCampaigns,
} from "./_sections";

// UI Components
import { TabContent, TabNavigation, type TabItem } from "@/components";

// Utils
import { formatCurrency, renderStars } from "./_utils";

// Mock data
import { institutionMockData, campaignMockData } from "./_mock";

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
      id: "pills-campus",
      icon: "ph-bold ph-buildings",
      title: "Kampüs & Okul Grubu",
      children: (
        <InstitutionCampusInfo school={school} campus={campus} brand={brand} />
      ),
    },
    {
      id: "pills-location",
      icon: "ph-bold ph-map-pin",
      title: "Konum Bilgileri",
      children: <InstitutionLocationInfo school={school} campus={campus} />,
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
      id: "pills-campaigns",
      icon: "ph-bold ph-tag",
      title: "Kampanyalar",
      children: <InstitutionCampaigns campaigns={campaignMockData} />,
    },
    {
      id: "pills-statistics",
      icon: "ph-bold ph-chart-bar",
      title: "İstatistikler",
      children: <InstitutionStatistics school={school} campus={campus} />,
    },
    {
      id: "pills-seo",
      icon: "ph-bold ph-magnifying-glass",
      title: "SEO Bilgileri",
      children: <InstitutionSeoInfo school={school} />,
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
          <div className="col-lg-4">
            <InstitutionSidebar
              school={school as any}
              campus={campus as any}
              renderStars={renderStars}
            />
          </div>

          {/* Sağ İçerik - Tab Yapısı */}
          <div className="col-lg-8">
            {/* Tab Navigation */}
            <div className="border border-neutral-30 rounded-12 bg-white p-8">
              <TabNavigation tabs={tabItems} />
            </div>

            {/* Tab Content */}
            <TabContent tabs={tabItems} />
          </div>
        </div>
      </div>
    </section>
  );
}
