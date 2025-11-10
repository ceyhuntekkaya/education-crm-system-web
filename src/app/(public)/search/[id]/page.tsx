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
} from "./_shared";

// UI Components
import {
  TabContent,
  TabNavigation,
  type TabItem,
  CoverImage,
  CustomCard,
  LoadingSpinner,
  Button,
  Icon,
} from "@/components";

// Auth Context
import { useAuth } from "@/contexts/auth-context";

export default function InstitutionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const schoolId = parseInt(params.id);

  const { school, loading } = useInstitutionDetail();
  const { user } = useAuth();

  // Helper component for protected content
  const ProtectedContent = ({ children }: { children: React.ReactNode }) => {
    if (!user) {
      return (
        <CustomCard className="text-center mt-20">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <Icon
              icon="ph-bold ph-lock"
              variant="inline"
              size="lg"
              className="text-neutral-400 mb-24"
              style={{ width: "80px", height: "80px", fontSize: "48px" }}
            />
            <h4 className="text-neutral-700 mb-12">Giriş Yapmanız Gerekiyor</h4>
            <p
              className="text-neutral-500 mb-32 text-center"
              style={{ maxWidth: "400px" }}
            >
              Bu bölüme erişim için lütfen önce giriş yapınız.
            </p>
            <Button
              variant="inline"
              size="md"
              leftIcon="ph-bold ph-sign-in"
              href="/login"
            >
              Giriş Yap
            </Button>
          </div>
        </CustomCard>
      );
    }
    return <>{children}</>;
  };

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
        <ProtectedContent>
          <InstitutionPricingInfo />
          <InstitutionCustomFees />
        </ProtectedContent>
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
        <ProtectedContent>
          <InstitutionCampaigns />
        </ProtectedContent>
      ),
    },
    {
      id: "pills-statistics",
      icon: "ph-bold ph-chart-bar",
      title: "Analiz & Değerlendirme",
      label: "Analiz & Değerlendirme",
      content: (
        <ProtectedContent>
          <div>
            <InstitutionReviews />
            <InstitutionStatistics />
          </div>
        </ProtectedContent>
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
        <ProtectedContent>
          <Gallery institutionId={params.id} />
        </ProtectedContent>
      ),
    },
    {
      id: "pills-posts",
      icon: "ph-bold ph-chat-circle-text",
      title: "Sosyal Medya",
      label: "Sosyal Medya",
      content: (
        <ProtectedContent>
          <Posts institutionId={params.id} />
        </ProtectedContent>
      ),
    },
    {
      id: "pills-current-appointment",
      icon: "ph-bold ph-clock",
      title: "Randevum",
      label: "Randevum",
      content: (
        <ProtectedContent>
          <CurrentAppointment />
        </ProtectedContent>
      ),
      isActive: true,
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

              <Notes />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
