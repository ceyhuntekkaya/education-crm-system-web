"use client";

import ModalExamples from "@/docs/modal-examples";
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
} from "./_shared";

// Appointment Table
import { AppointmentTable } from "./_shared/sections/appointment-table";

// UI Components
import { TabContent, TabNavigation, type TabItem } from "@/components";

export default function InstitutionDetailPage() {
  // Tab content dizisi
  // * = API'ye bağlı (gerçek veri), ⚡ = Mock/Statik veri, 🔄 = Karışık (API + Mock)
  const tabItems: TabItem[] = [
    {
      id: "pills-tutionInfo",
      icon: "ph-bold ph-info",
      title: "Genel Bilgiler 🔄", // API'ye bağlı + temp görseller (tempUrl, tempIconUrl)
      children: <InstitutionGeneralInfo />,
    },
    {
      id: "pills-campus",
      icon: "ph-bold ph-buildings",
      title: "Kampüs & Okul Grubu *", // Tamamen API'ye bağlı - useInstitutionDetail context
      children: <InstitutionCampusInfo />,
    },
    {
      id: "pills-location",
      icon: "ph-bold ph-map-pin",
      title: "Konum Bilgileri *", // Tamamen API'ye bağlı - useInstitutionDetail context
      children: <InstitutionLocationInfo />,
    },
    {
      id: "pills-qualification",
      icon: "ph-bold ph-currency-circle-dollar",
      title: "Ücretler 🔄", // API'ye bağlı + sabit yüzde değerleri (%3, %5 vb.)
      children: <InstitutionPricingInfo />,
    },
    {
      id: "pills-campaigns",
      icon: "ph-bold ph-tag",
      title: "Kampanyalar ⚡", // Tamamen mock veri - campaignMockData
      children: <InstitutionCampaigns />,
    },
    {
      id: "pills-statistics",
      icon: "ph-bold ph-chart-bar",
      title: "İstatistikler *", // Tamamen API'ye bağlı - useInstitutionDetail context
      children: <InstitutionStatistics />,
    },
    {
      id: "pills-seo",
      icon: "ph-bold ph-magnifying-glass",
      title: "SEO Bilgileri *", // Tamamen API'ye bağlı - useInstitutionDetail context
      children: <InstitutionSeoInfo />,
    },
    {
      id: "pills-reviews",
      icon: "ph-bold ph-star",
      title: "Değerlendirmeler 🔄", // API (rating avg/count) + sabit yüzde değerleri + örnek yorumlar
      children: <InstitutionReviews />,
    },
    {
      id: "pills-appointments",
      icon: "ph-bold ph-calendar-check",
      title: "Randevular 🔄", // Randevu listesi ve yönetimi
      children: <AppointmentTable />,
      isActive: true,
    },
  ];

  return (
    <section className="tutor-details py-120">
      <ModalExamples />
      <div className="container">
        <div className="row gy-4">
          {/* Sol Sidebar - Profil ve İletişim */}
          <div className="col-lg-4">
            <InstitutionSidebar />
          </div>

          {/* Sağ İçerik - Tab Yapısı */}
          <div className="col-lg-8">
            {/* Tab Navigation */}
            <div className="border border-neutral-30 rounded-12 bg-white p-8">
              <TabNavigation tabs={tabItems} navigationId="" />
            </div>

            {/* Tab Content */}
            <TabContent tabs={tabItems} />
          </div>
        </div>
      </div>
    </section>
  );
}
