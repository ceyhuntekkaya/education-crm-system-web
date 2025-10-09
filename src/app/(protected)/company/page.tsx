"use client";
import React from "react";
import Link from "next/link";
import { companyLayoutNavigation } from "./_shared/navigation/navigation";

const CompanyPage: React.FC = () => {
  // Icon mapping - eğer navigation'dan gelen icon uygun değilse alternatif kullan
  const getModuleIcon = (label: string, originalIcon: string) => {
    const iconMap: { [key: string]: string } = {
      "Okul Listesi": "ph-buildings",
      "Okul Bilgileri": "ph-graduation-cap",
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

  // Kurum yönetim paneli için genel ve dinamik açıklamalar
  const getModuleDescription = (label: string, href: string) => {
    const descriptions: { [key: string]: string } = {
      "Okul Listesi":
        "Eğitim kurumlarınızın kapsamlı listesini görüntüleyin, filtreleyin ve detaylı yönetim işlemlerini gerçekleştirin",
      "Okul Bilgileri":
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

  const getModuleVariant = (index: number, label: string) => {
    const variants = [
      "primary",
      "success",
      "warning",
      "info",
      "purple",
      "pink",
      "teal",
      "orange",
    ];

    // Bazı önemli modüller için özel renkler
    const specialVariants: { [key: string]: string } = {
      Kampanyalar: "primary",
      "Analitik Raporları": "info",
      Kullanıcılar: "success",
      "Üyelik Planları": "warning",
      "Okul Listesi": "purple",
      "Fiyat Bilgileri": "orange",
    };

    return specialVariants[label] || variants[index % variants.length];
  };

  // Navigation'dan gelen verileri filtrele (Giriş hariç)
  const moduleItems = companyLayoutNavigation
    .filter((item) => item.href !== "/company") // Giriş sayfasını hariç tut
    .map((item, index) => ({
      ...item,
      icon: getModuleIcon(item.label, item.icon), // Icon mapping uygula
      description: getModuleDescription(item.label, item.href),
      variant: getModuleVariant(index, item.label),
    }));

  return (
    <div className="company-dashboard">
      {/* Hero Section */}
      <section className="company-dashboard__hero">
        <div className="company-dashboard__hero-pattern"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {/* Welcome Header */}
              <div className="company-dashboard__welcome">
                <div className="company-dashboard__welcome-icon">
                  <i className="ph-bold ph-buildings"></i>
                </div>
                <h1 className="company-dashboard__welcome-title">
                  Kurum Yönetim Paneli �
                </h1>
                <h2 className="company-dashboard__welcome-subtitle">
                  Eğitim Kurumunuzu Profesyonelce Yönetin
                </h2>
                <p className="company-dashboard__welcome-subtitle">
                  Kurumsal süreçlerinizi optimize edin, performansınızı artırın
                  ve büyümenizi hızlandırın
                </p>
              </div>

              {/* Quick Stats */}
              <div className="company-dashboard__stats">
                <div className="row g-4">
                  <div className="col-md-3 col-sm-6">
                    <div className="company-dashboard__stats-card">
                      <i className="ph-bold ph-squares-four"></i>
                      <div className="company-dashboard__stats-card-number">
                        {moduleItems.length}
                      </div>
                      <div className="company-dashboard__stats-card-label">
                        Yönetim Modülü
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="company-dashboard__stats-card">
                      <i className="ph-bold ph-buildings"></i>
                      <div className="company-dashboard__stats-card-number">
                        ∞
                      </div>
                      <div className="company-dashboard__stats-card-label">
                        Kurum Kapasitesi
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="company-dashboard__stats-card">
                      <i className="ph-bold ph-chart-bar"></i>
                      <div className="company-dashboard__stats-card-number">
                        24/7
                      </div>
                      <div className="company-dashboard__stats-card-label">
                        Analitik İzleme
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="company-dashboard__stats-card">
                      <i className="ph-bold ph-shield-checkered"></i>
                      <div className="company-dashboard__stats-card-number">
                        %99.9
                      </div>
                      <div className="company-dashboard__stats-card-label">
                        Sistem Güvenilirliği
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Cards Grid */}
              <div className="company-dashboard__modules">
                <div className="company-dashboard__modules-header">
                  <h3>Kurumsal Yönetim Modülleri</h3>
                  <p>
                    Kurumunuzun farklı alanlarını profesyonelce yönetmek için
                    bir modül seçin
                  </p>
                </div>

                <div className="company-dashboard__modules-grid">
                  {moduleItems.map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`company-dashboard__card company-dashboard__card--${item.variant}`}
                      style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                    >
                      <div className="company-dashboard__card-icon">
                        <i className={`ph-bold ${item.icon}`}></i>
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
                        <i className="ph-bold ph-arrow-right"></i>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="company-dashboard__help">
                  <div className="company-dashboard__help-badge">
                    <i className="ph-bold ph-question"></i>
                    <span>
                      Kurumsal destek mi gerekiyor?
                      <a href="/help">Teknik Destek</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanyPage;
