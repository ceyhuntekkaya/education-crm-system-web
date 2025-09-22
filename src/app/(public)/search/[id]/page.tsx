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
  AppointmentCreate,
  Gallery,
} from "./_shared";

// Appointment Table
import { AppointmentTable } from "./_shared/sections/appointment-table";

// UI Components
import { TabContent, TabNavigation, type TabItem } from "@/components";

export default function InstitutionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const schoolId = parseInt(params.id);

  // Tab content dizisi
  // * = API'ye bağlı (gerçek veri), ⚡ = Mock/Statik veri, 🔄 = Karışık (API + Mock)
  const tabItems: TabItem[] = [
    {
      id: "pills-tutionInfo",
      icon: "ph-bold ph-info",
      title: "Genel Bilgiler 🔄", // API'ye bağlı + temp görseller (tempUrl, tempIconUrl)
      label: "Genel Bilgiler 🔄",
      content: <InstitutionGeneralInfo />,
    },
    {
      id: "pills-campus",
      icon: "ph-bold ph-buildings",
      title: "Kampüs & Okul Grubu *", // Tamamen API'ye bağlı - useInstitutionDetail context
      label: "Kampüs & Okul Grubu *",
      content: <InstitutionCampusInfo />,
    },
    {
      id: "pills-location",
      icon: "ph-bold ph-map-pin",
      title: "Konum Bilgileri *", // Tamamen API'ye bağlı - useInstitutionDetail context
      label: "Konum Bilgileri *",
      content: <InstitutionLocationInfo />,
    },
    {
      id: "pills-qualification",
      icon: "ph-bold ph-currency-circle-dollar",
      title: "Ücretler 🔄", // API'ye bağlı + sabit yüzde değerleri (%3, %5 vb.)
      label: "Ücretler 🔄",
      content: <InstitutionPricingInfo />,
    },
    {
      id: "pills-campaigns",
      icon: "ph-bold ph-tag",
      title: "Kampanyalar ⚡", // Tamamen mock veri - campaignMockData
      label: "Kampanyalar ⚡",
      content: <InstitutionCampaigns />,
    },
    {
      id: "pills-statistics",
      icon: "ph-bold ph-chart-bar",
      title: "İstatistikler *", // Tamamen API'ye bağlı - useInstitutionDetail context
      label: "İstatistikler *",
      content: <InstitutionStatistics />,
    },
    {
      id: "pills-seo",
      icon: "ph-bold ph-magnifying-glass",
      title: "SEO Bilgileri *", // Tamamen API'ye bağlı - useInstitutionDetail context
      label: "SEO Bilgileri *",
      content: <InstitutionSeoInfo />,
    },
    {
      id: "pills-reviews",
      icon: "ph-bold ph-star",
      title: "Değerlendirmeler 🔄", // API (rating avg/count) + sabit yüzde değerleri + örnek yorumlar
      label: "Değerlendirmeler 🔄",
      content: <InstitutionReviews />,
    },
    {
      id: "pills-gallery",
      icon: "ph-bold ph-images",
      title: "Galeri 📸", // Kurum galerisi
      label: "Galeri 📸",
      content: <Gallery institutionId={params.id} />,
      isActive: true, // Başlangıçta bu tab aktif olsun
    },
    {
      id: "pills-appointments",
      icon: "ph-bold ph-calendar-check",
      title: "Randevular 🔄", // Randevu listesi ve yönetimi
      label: "Randevular 🔄",
      content: <AppointmentTable />,
    },
    {
      id: "pills-appointment-create",
      icon: "ph-bold ph-calendar-plus",
      title: "Randevu Oluştur ✨", // Yeni randevu oluşturma
      label: "Randevu Oluştur ✨",
      content: <AppointmentCreate schoolId={schoolId} />,
    },
  ];

  return (
    <section className="tutor-details py-120">
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
