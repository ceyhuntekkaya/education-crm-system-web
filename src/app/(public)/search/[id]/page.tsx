"use client";

import Image from "next/image";
// Components
import {
  InstitutionSidebar,
  InstitutionGeneralInfo,
  InstitutionPricingInfo,
  InstitutionReviews,
  // InstitutionCampusInfo,
  InstitutionCampusDetail,
  InstitutionBrandDetail,
  InstitutionStatistics,
  InstitutionLocationInfo,
  // InstitutionSeoInfo,
  InstitutionCampaigns,
  AppointmentCreate,
  Gallery,
  Posts,
  Notes,
  useInstitutionDetail,
} from "./_shared";

// Appointment Table
// import { AppointmentTable } from "./_shared/sections/appointment-table";

// UI Components
import { TabContent, TabNavigation, type TabItem } from "@/components";

const tempUrl =
  "https://t4.ftcdn.net/jpg/02/14/31/63/360_F_214316329_vX8WM2z1DLYfzcyRxqOenc9SJV7gXOyJ.jpg";

export default function InstitutionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const schoolId = parseInt(params.id);

  const { school } = useInstitutionDetail();

  // Tab content dizisi
  // * = API'ye bağlı (gerçek veri), ⚡ = Mock/Statik veri, 🔄 = Karışık (API + Mock)
  const tabItems: TabItem[] = [
    {
      id: "pills-tutionInfo",
      icon: "ph-bold ph-info",
      title: "Genel Bilgiler", // API'ye bağlı + temp görseller (tempUrl, tempIconUrl)
      label: "Genel Bilgiler",
      content: (
        <div>
          <InstitutionGeneralInfo />
          <InstitutionBrandDetail />
          <InstitutionCampusDetail />
          <InstitutionLocationInfo />
        </div>
      ),
    },
    // {
    //   id: "pills-brand",
    //   icon: "ph-bold ph-bank",
    //   title: "Kurum Bilgileri *", // Tamamen API'ye bağlı - useInstitutionDetail context
    //   label: "Kurum Bilgileri *",
    //   content: <InstitutionBrandDetail />,
    // },
    // {
    //   id: "pills-campus",
    //   icon: "ph-bold ph-buildings",
    //   title: "Kampüs Bilgileri *", // Tamamen API'ye bağlı - useInstitutionDetail context
    //   label: "Kampüs Bilgileri *",
    //   content: <InstitutionCampusDetail />,
    // },

    // {
    //   id: "pills-location",
    //   icon: "ph-bold ph-map-pin",
    //   title: "Konum Bilgileri *", // Tamamen API'ye bağlı - useInstitutionDetail context
    //   label: "Konum Bilgileri *",
    //   content: <InstitutionLocationInfo />,
    // },
    {
      id: "pills-qualification",
      icon: "ph-bold ph-currency-circle-dollar",
      title: "Ücretler",
      label: "Ücretler",
      content: <InstitutionPricingInfo />,
    },
    {
      id: "pills-campaigns",
      icon: "ph-bold ph-tag",
      title: "Kampanyalar",
      label: "Kampanyalar",
      content: <InstitutionCampaigns />,
    },
    {
      id: "pills-statistics",
      icon: "ph-bold ph-chart-bar",
      title: "Analiz & Değerlendirme",
      label: "Analiz & Değerlendirme",
      content: (
        <div>
          <InstitutionReviews />
          <InstitutionStatistics />
        </div>
      ),
    },
    // {
    //   id: "pills-seo",
    //   icon: "ph-bold ph-magnifying-glass",
    //   title: "SEO Bilgileri",
    //   label: "SEO Bilgileri",
    //   content: <InstitutionSeoInfo />,
    // },
    // {
    //   id: "pills-reviews",
    //   icon: "ph-bold ph-star",
    //   title: "Değerlendirmeler",
    //   label: "Değerlendirmeler",
    //   content: <InstitutionReviews />,
    // },
    {
      id: "pills-gallery",
      icon: "ph-bold ph-images",
      title: "Galeri",
      label: "Galeri",
      content: <Gallery institutionId={params.id} />,
    },
    {
      id: "pills-posts",
      icon: "ph-bold ph-chat-circle-text",
      title: "Sosyal Medya",
      label: "Sosyal Medya",
      content: <Posts institutionId={params.id} />,
      isActive: true,
    },
    // {
    //   id: "pills-appointments",
    //   icon: "ph-bold ph-calendar-check",
    //   title: "Randevular",
    //   label: "Randevular",
    //   content: <AppointmentTable />,
    // },
    {
      id: "pills-appointment-create",
      icon: "ph-bold ph-calendar-plus",
      title: "Randevu Oluştur",
      label: "Randevu Oluştur",
      content: <AppointmentCreate schoolId={schoolId} />,
    },
  ];

  return (
    <div>
      {/* Cover Image */}

      <section className="tutor-details">
        <div className="container">
          {school.coverImageUrl && (
            <div
              className="position-relative rounded-16 overflow-hidden my-24 "
              style={{ height: "300px" }}
            >
              <Image
                src={tempUrl || school.coverImageUrl}
                alt={school.name}
                fill
                className="object-cover"
              />
              <div className="position-absolute inset-0 bg-gradient-to-t from-black-50 to-transparent"></div>
              <div className="position-absolute bottom-0 left-0 p-24 text-white">
                <h2 className="h3 fw-bold mb-8">{school.name}</h2>
                <p className="text-white text-opacity-90 mb-0">
                  {school.institutionType.displayName}
                </p>
              </div>
            </div>
          )}

          <div className="row gy-4">
            {/* Sol Sidebar - Profil ve İletişim */}
            <div className="col-lg-4">
              <InstitutionSidebar />
            </div>

            {/* Sağ İçerik - Tab Yapısı */}
            <div className="col-lg-8">
              {/* Tab Navigation */}
              <div className="border border-neutral-30 rounded-12 bg-white p-8">
                <TabNavigation tabs={tabItems} iconOnly />
              </div>

              {/* Tab Content */}
              <TabContent tabs={tabItems} />

              <Notes />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
