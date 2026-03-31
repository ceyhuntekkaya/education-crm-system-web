"use client";
import React from "react";
import Link from "next/link";
import { companyLayoutNavigation } from "./_shared/navigation/navigation";
import { useCompany } from "./_shared/context/company-context";
import { usePageTitle } from "@/hooks";

const CompanyPage: React.FC = () => {
  usePageTitle("Kurum Paneli");
  const { selectedSchool } = useCompany();

  const getModuleIcon = (label: string, originalIcon: string) => {
    const iconMap: { [key: string]: string } = {
      "Kurum Listesi": "ph-buildings",
      "Kurum Bilgileri": "ph-graduation-cap",
      "Fiyat Bilgileri": "ph-coins",
      Kampanyalar: "ph-megaphone",
      "Randevu Bilgileri": "ph-calendar",
      Galeri: "ph-image",
      "Sosyal Medya": "ph-share-network",
      Anketler: "ph-clipboard",
      "Analitik Raporları": "ph-chart-bar",
      Kullanıcılar: "ph-users",
      "Üyelik Planları": "ph-crown",
      "Marka Bilgileri": "ph-tag",
    };
    return iconMap[label] || originalIcon;
  };

  const getModuleDescription = (label: string, _href: string) => {
    const descriptions: { [key: string]: string } = {
      "Kurum Listesi":
        "Eğitim kurumlarınızın kapsamlı listesini görüntüleyin, filtreleyin ve detaylı yönetim işlemlerini gerçekleştirin",
      "Kurum Bilgileri":
        "Kampüs bilgileri, yaş aralıkları, ücret yapısı ve kurumsal özelliklerin detaylı yönetimini yapın",
      "Fiyat Bilgileri":
        "Kayıt ücretleri, öğrenim giderleri ve ek hizmet maliyetlerini içeren kapsamlı fiyat yapınızı oluşturun",
      Kampanyalar:
        "İndirim kampanyaları, erken kayıt fırsatları ve hedef kitle odaklı pazarlama stratejilerinizi planlayın",
      "Randevu Bilgileri":
        "Kurumsal toplantılar, bilgilendirme görüşmeleri ve online randevu sistemlerinizi koordine edin",
      Galeri:
        "Etkinlik fotoğrafları, kurumsal görseller ve medya arşivinizi kategorize ederek profesyonelce organize edin",
      "Sosyal Medya":
        "Kurumsal duyurular, etkinlik paylaşımları ve dijital içerik stratejinizi merkezi olarak yönetin",
      Anketler:
        "Müşteri deneyimi, memnuniyet araştırmaları ve geri bildirim sistemleriyle kalite ölçümlerinizi yapın",
      "Analitik Raporları":
        "Trafik verileri, kullanıcı davranışları ve performans metriklerini analiz ederek strateji geliştirin",
      Kullanıcılar:
        "Ekip üyelerinizi, yetki seviyelerini ve kurumsal rolleri içeren kullanıcı yönetimini gerçekleştirin",
      "Üyelik Planları":
        "Abonelik paketleri, fiyatlandırma modelleri ve kurumsal üyelik sistemlerinizi yapılandırın",
      "Marka Bilgileri":
        "Kurumsal kimlik, görsel standartlar ve marka tutarlılığını sağlayan rehberlerinizi oluşturun",
    };
    return (
      descriptions[label] ||
      "Bu modülü kullanarak kurumunuzu daha etkili yönetin"
    );
  };

  const getModuleVariant = (label: string, index: number) => {
    const variants: { [key: string]: string } = {
      "Kurum Listesi": "primary",
      "Kurum Bilgileri": "purple",
      "Fiyat Bilgileri": "warning",
      Kampanyalar: "primary",
      "Randevu Bilgileri": "success",
      Galeri: "info",
      "Sosyal Medya": "purple",
      Anketler: "orange",
      "Analitik Raporları": "info",
      Kullanıcılar: "success",
      "Üyelik Planları": "warning",
      "Marka Bilgileri": "pink",
    };
    const defaults = [
      "primary",
      "success",
      "warning",
      "info",
      "purple",
      "pink",
      "teal",
      "orange",
    ];
    return variants[label] || defaults[index % defaults.length];
  };

  const moduleItems = companyLayoutNavigation
    .filter((item) => item.href !== "/company")
    .map((item, index) => ({
      ...item,
      icon: getModuleIcon(item.label, item.icon),
      description: getModuleDescription(item.label, item.href),
      variant: getModuleVariant(item.label, index),
    }));

  return (
    <div className="company-dashboard">
      {/* ── Hero ── */}
      <section className="dash-hero rounded-16 position-relative overflow-hidden mb-24">
        <div className="dash-hero__pattern position-absolute inset-0" />
        <div className="position-relative d-flex align-items-center justify-content-between flex-wrap gap-16 p-28">
          <div className="d-flex align-items-center gap-16">
            <div className="dash-hero__decor d-none d-md-flex">
              <i className="ph-duotone ph-buildings" />
            </div>
            <div>
              <h1 className="dash-hero__title fw-800 text-white mb-6">
                Kurum Yönetim Paneli
              </h1>
              <p className="dash-hero__subtitle mb-0">
                Kurumsal süreçlerinizi optimize edin, performansınızı artırın ve
                büyümenizi hızlandırın
              </p>
            </div>
          </div>
          <div className="d-flex align-items-center gap-8 flex-wrap">
            <Link href="/company/school-list" className="hero-btn-primary">
              <i className="ph-bold ph-buildings" />
              Kurum Listesi
            </Link>
            {selectedSchool && (
              <Link
                href="/company/school-detail"
                className="hero-btn-secondary"
              >
                <i className="ph-bold ph-gear" />
                Kurum Bilgileri
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ── Quick Stats ── */}
      <div className="row g-3 mb-24">
        {[
          {
            icon: "ph-bold ph-squares-four",
            value: moduleItems.length.toString(),
            label: "Yönetim Modülü",
            bg: "bg-main-50",
            color: "text-main-600",
          },
          {
            icon: "ph-bold ph-buildings",
            value: "∞",
            label: "Kurum Kapasitesi",
            bg: "bg-success-50",
            color: "text-success-600",
          },
          {
            icon: "ph-bold ph-chart-bar",
            value: "24/7",
            label: "Analitik İzleme",
            bg: "bg-info-50",
            color: "text-info-600",
          },
          {
            icon: "ph-bold ph-shield-checkered",
            value: "%99.9",
            label: "Sistem Güvenilirliği",
            bg: "bg-warning-50",
            color: "text-warning-600",
          },
        ].map((stat, i) => (
          <div key={i} className="col-md-3 col-sm-6">
            <div className="stat-card-inner rounded-16 p-20 text-center bg-white">
              <div
                className={`stat-card__icon ${stat.bg} ${stat.color} rounded-12 d-inline-flex align-items-center justify-content-center mb-8`}
              >
                <i className={stat.icon} />
              </div>
              <div className={`stat-card__value fw-800 ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="stat-card__label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Module Cards ── */}
      <div className="dash-panel mb-24">
        <div className="dash-panel-header">
          <div className="d-flex align-items-center gap-10">
            <div className="dash-panel-icon bg-main-50 text-main-600 rounded-10 d-flex align-items-center justify-content-center">
              <i className="ph-bold ph-stack" />
            </div>
            <div>
              <h3 className="dash-panel-title fw-700 text-neutral-900 mb-0">
                Kurumsal Yönetim Modülleri
              </h3>
              <p className="text-xs text-neutral-500 mb-0 mt-2">
                Kurumunuzun farklı alanlarını profesyonelce yönetmek için bir
                modül seçin
              </p>
            </div>
          </div>
        </div>

        <div className="p-20">
          <div className="company-dashboard__modules-grid">
            {moduleItems.map((item, index) => {
              const isDisabled =
                !selectedSchool && item.requiresSchool !== false;

              return isDisabled ? (
                <div
                  key={item.href}
                  className={`company-dashboard__card company-dashboard__card--${item.variant} company-dashboard__card--disabled`}
                  title="Bu modülü kullanmak için önce bir okul seçmelisiniz"
                >
                  <div className="company-dashboard__card-icon">
                    <i className={`ph-bold ${item.icon}`} />
                  </div>
                  <h4 className="company-dashboard__card-title">
                    {item.label}
                  </h4>
                  <p className="company-dashboard__card-description">
                    {item.description}
                  </p>
                  <div className="company-dashboard__card-footer">
                    <span className="company-dashboard__card-footer-text text-neutral-400">
                      <i className="ph-bold ph-lock me-6" />
                      Okul Seçimi Gerekli
                    </span>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`company-dashboard__card company-dashboard__card--${item.variant}`}
                >
                  <div className="company-dashboard__card-icon">
                    <i className={`ph-bold ${item.icon}`} />
                  </div>
                  <h4 className="company-dashboard__card-title">
                    {item.label}
                  </h4>
                  <p className="company-dashboard__card-description">
                    {item.description}
                  </p>
                  <div className="company-dashboard__card-footer">
                    <span className="company-dashboard__card-footer-text">
                      Başlat
                    </span>
                    <i className="ph-bold ph-arrow-right" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
