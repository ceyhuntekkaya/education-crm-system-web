/**
 * SOSYAL MEDYA DETAY CONFIG KULLANIM REHBERİ
 * ===========================================
 *
 * Bu dosya, yeniden düzenlenen social media detail config'lerinin
 * nasıl kullanılacağını gösterir.
 */

import {
  basicInfoConfig, // Temel post bilgileri
  featuresConfig, // Özellikler (öne çıkarma, sabitleme vs.)
  interactionConfig, // Etkileşim ayarları
  statisticsConfig, // Performans istatistikleri (campaign tarzı)
  mediaConfig, // Medya dosyaları
  ctaConfig, // Call to Action
  timestampConfig, // Zaman damgaları
  metaInfoConfig, // Meta bilgiler (SEO, etiketler vs.)

  // YENİ: Ayrılmış config dosyaları
  authorDetailsConfig, // Yazar detayları
  institutionDetailsConfig, // Kurum detayları
} from "./index";

import { PostDto } from "@/types";

/**
 * KULLANIM ÖRNEKLERİ
 * ==================
 */

// 1. Temel Bilgiler Bölümü
const BasicInfoSection = ({ post }: { post: PostDto | null }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5>Temel Bilgiler</h5>
      </div>
      <div className="card-body">
        {basicInfoConfig.map(
          (config, index) =>
            config.isShowing(post) && (
              <div key={index} className="mb-3">
                <label className="form-label fw-semibold">{config.label}</label>
                <div>{config.value(post)}</div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

// 2. Yazar Detayları Bölümü (YENİ - Ayrılmış)
const AuthorDetailsSection = ({ post }: { post: PostDto | null }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5>Yazar Detayları</h5>
      </div>
      <div className="card-body">
        {authorDetailsConfig.map(
          (config, index) =>
            config.isShowing(post) && (
              <div key={index} className="mb-3">
                <label className="form-label fw-semibold">{config.label}</label>
                <div>{config.value(post)}</div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

// 3. Kurum Detayları Bölümü (YENİ - Ayrılmış)
const InstitutionDetailsSection = ({ post }: { post: PostDto | null }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5>Kurum Detayları</h5>
      </div>
      <div className="card-body">
        {institutionDetailsConfig.map(
          (config, index) =>
            config.isShowing(post) && (
              <div key={index} className="mb-3">
                <label className="form-label fw-semibold">{config.label}</label>
                <div>{config.value(post)}</div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

// 4. Performans İstatistikleri Bölümü (GÜNCELLENDİ - Campaign tarzı)
const StatisticsSection = ({ post }: { post: PostDto | null }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5>Performans İstatistikleri</h5>
        <small className="text-muted">
          Campaign tarzı tasarım ile güncellendi
        </small>
      </div>
      <div className="card-body">
        {statisticsConfig.map(
          (config, index) =>
            config.isShowing(post) && (
              <div key={index} className="mb-3">
                <label className="form-label fw-semibold">{config.label}</label>
                <div>{config.value(post)}</div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

// 5. Ana Detay Sayfası Örneği
const PostDetailPage = ({ post }: { post: PostDto | null }) => {
  return (
    <div className="container-fluid">
      <div className="row g-4">
        {/* Sol Kolon */}
        <div className="col-lg-8">
          <BasicInfoSection post={post} />

          <div className="mt-4">
            {/* Medya bölümü */}
            {mediaConfig.map(
              (config, index) =>
                config.isShowing(post) && (
                  <div key={index} className="card">
                    <div className="card-header">
                      <h5>{config.label}</h5>
                    </div>
                    <div className="card-body">{config.value(post)}</div>
                  </div>
                )
            )}
          </div>
        </div>

        {/* Sağ Kolon */}
        <div className="col-lg-4">
          <AuthorDetailsSection post={post} />

          <div className="mt-4">
            <InstitutionDetailsSection post={post} />
          </div>

          <div className="mt-4">
            <StatisticsSection post={post} />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * DEĞİŞİKLİK ÖZETİ
 * ================
 *
 * 1. ✅ Yazar & Kurum bilgileri ayrı config'lere bölündü
 *    - authorDetailsConfig: Yazar profil ve iletişim bilgileri
 *    - institutionDetailsConfig: Kurum bilgileri (genel, ücret, değerlendirme)
 *
 * 2. ✅ Statistics config campaign tarzında yeniden tasarlandı
 *    - Performans Özeti kartları
 *    - CTR hesaplamaları
 *    - Renk kodlu metrikler
 *
 * 3. ✅ Yanlış yerleştirilen veriler düzeltildi
 *    - Ortalama okuma süresi meta-info'dan statistics'e taşındı
 *    - Her bilgi kendi alakalı bölümünde
 *
 * 4. ✅ Config dosyaları optimize edildi
 *    - Daha temiz kod yapısı
 *    - Campaign tasarım rehberini takip eden UI
 *    - Responsive grid sistemleri
 */

export {
  BasicInfoSection,
  AuthorDetailsSection,
  InstitutionDetailsSection,
  StatisticsSection,
  PostDetailPage,
};
