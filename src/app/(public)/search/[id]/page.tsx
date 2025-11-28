"use client";

// Components
import {
  InstitutionSidebar,
  InstitutionGeneralInfo,
  InstitutionPricingInfo,
  InstitutionCustomFees,
  InstitutionReviews,
  // InstitutionCampusInfo,
  InstitutionCampusDetail,
  InstitutionBrandDetail,
  InstitutionStatistics,
  InstitutionLocationInfo,
  // InstitutionSeoInfo,
  InstitutionCampaigns,
  AppointmentCreate,
  CurrentAppointment,
  Gallery,
  Posts,
  Notes,
  useInstitutionDetail,
  ProtectedUserGuard,
} from "./_shared";

// UI Components
import {
  TabContent,
  TabNavigation,
  type TabItem,
  CoverImage,
  CustomCard,
  LoadingSpinner,
} from "@/components";
import { usePageTitle } from "@/hooks";

export default function InstitutionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  usePageTitle("Kurum Detayı");
  const schoolId = parseInt(params.id);

  const { school, loading } = useInstitutionDetail();

  // Show loading state while data is being fetched
  if (loading) {
    return (
      <div className="container py-40">
        <CustomCard>
          <LoadingSpinner
            message="Kurum bilgileri yükleniyor..."
            size="lg"
            variant="spinner"
          />
        </CustomCard>
      </div>
    );
  }

  // Show error state if school data is not available
  if (!school) {
    return (
      <div className="container py-5">
        <CustomCard>
          <div className="alert alert-warning" role="alert">
            Kurum bilgileri yüklenemedi.
          </div>
        </CustomCard>
      </div>
    );
  }

  // Tab content dizisi
  // * = API'ye bağlı (gerçek veri), ⚡ = Mock/Statik veri, 🔄 = Karışık (API + Mock)
  const tabItems: TabItem[] = [
    {
      id: "pills-tutionInfo",
      icon: "ph-bold ph-info",
      title: "Genel Bilgiler",
      label: "Genel Bilgiler",
      content: (
        <div>
          <InstitutionGeneralInfo />
          <InstitutionBrandDetail />
          <InstitutionCampusDetail />
          <InstitutionLocationInfo />
        </div>
      ),
      isActive: true,
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
      content: (
        <ProtectedUserGuard message="Ücret bilgilerine erişim için lütfen giriş yapınız.">
          <InstitutionPricingInfo />
          <InstitutionCustomFees />
        </ProtectedUserGuard>
      ),
    },
    // {
    //   id: "pills-custom-fees",
    //   icon: "ph-bold ph-receipt",
    //   title: "Ek Ücretler",
    //   label: "Ek Ücretler",
    //   content: <InstitutionCustomFees />,
    // },
    {
      id: "pills-campaigns",
      icon: "ph-bold ph-tag",
      title: "Kampanyalar",
      label: "Kampanyalar",
      content: (
        <ProtectedUserGuard message="Kampanya bilgilerine erişim için lütfen giriş yapınız.">
          <InstitutionCampaigns />
        </ProtectedUserGuard>
      ),
    },
    {
      id: "pills-statistics",
      icon: "ph-bold ph-chart-bar",
      title: "Analiz & Değerlendirme",
      label: "Analiz & Değerlendirme",
      content: (
        <ProtectedUserGuard message="Analiz ve değerlendirme bilgilerine erişim için lütfen giriş yapınız.">
          <div>
            <InstitutionReviews />
            <InstitutionStatistics />
          </div>
        </ProtectedUserGuard>
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
      content: (
        <ProtectedUserGuard message="Galeri görüntüleme için lütfen giriş yapınız.">
          <Gallery institutionId={params.id} />
        </ProtectedUserGuard>
      ),
    },
    {
      id: "pills-posts",
      icon: "ph-bold ph-chat-circle-text",
      title: "Sosyal Medya",
      label: "Sosyal Medya",
      content: (
        <ProtectedUserGuard message="Sosyal medya paylaşımlarına erişim için lütfen giriş yapınız.">
          <Posts institutionId={params.id} />
        </ProtectedUserGuard>
      ),
    },
    {
      id: "pills-current-appointment",
      icon: "ph-bold ph-clock",
      title: "Randevum",
      label: "Randevum",
      content: (
        <ProtectedUserGuard message="Randevu bilgilerine erişim için lütfen giriş yapınız.">
          <CurrentAppointment />
        </ProtectedUserGuard>
      ),
    },
    {
      id: "pills-appointment-create",
      icon: "ph-bold ph-plus-circle",
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
            <div className="my-24">
              <CoverImage
                coverImageUrl={school.coverImageUrl}
                logoUrl={school.logoUrl}
                title={school.name}
                subtitle={school.institutionType.displayName}
                height={300}
                useCard={false}
                borderRadius="rounded-16"
                showGradient={true}
                logoPosition="top-right"
                contentPosition="bottom-left"
              />
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

              {/* Notes - Protected (Hidden mode - giriş yoksa hiçbir şey gösterme) */}
              <ProtectedUserGuard hidden>
                <Notes />
              </ProtectedUserGuard>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
