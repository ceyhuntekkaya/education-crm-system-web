"use client";

import { usePageTitle } from "@/hooks";
import Link from "next/link";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { useState } from "react";

/* ── Modüller ── */
const companyModules = [
  {
    icon: "ph-bold ph-package",
    label: "Ürün Arama",
    tag: "Katalog",
    desc: "Katalogdaki ürünleri arayın ve sipariş verin",
    href: "/supply/company/products",
  },
  {
    icon: "ph-bold ph-file-text",
    label: "Alım İlanları",
    tag: "Satın Alma",
    desc: "Hızlıca yeni bir talep oluşturun ve tedarikçilerden teklif alın",
    href: "/supply/company/rfqs",
  },
  {
    icon: "ph-bold ph-buildings",
    label: "Tedarikçiler",
    tag: "Rehber",
    desc: "Onaylı tedarikçilerinizi görüntüleyin ve iletişime geçin",
    href: "/supply/company/suppliers",
  },
  {
    icon: "ph-bold ph-heart",
    label: "İstek Listesi",
    tag: "Takip",
    desc: "Beğendiğiniz ürünleri kaydedin ve fiyat değişikliklerini takip edin",
    href: "/supply/company/wishlist",
  },
  {
    icon: "ph-bold ph-chat-circle",
    label: "Mesajlar",
    tag: "İletişim",
    desc: "Tedarikçilerle platform içi anlık mesajlaşma",
    href: "/supply/company/messages",
  },
];

const supplierModules = [
  {
    icon: "ph-bold ph-package",
    label: "Ürün Yönetimi",
    tag: "Katalog",
    desc: "Hızlıca yeni bir ürün ekleyin ve katalogda yayınlayın",
    href: "/supply/supplier/products",
  },
  {
    icon: "ph-bold ph-file-text",
    label: "Alım İlanları",
    tag: "Fırsatlar",
    desc: "Kurumların alım taleplerini inceleyin ve uygun ilanlara teklif verin",
    href: "/supply/supplier/rfqs",
  },
  {
    icon: "ph-bold ph-clipboard-text",
    label: "Tekliflerim",
    tag: "Yönetim",
    desc: "Gönderdiğiniz teklifleri görüntüleyin ve takip edin",
    href: "/supply/supplier/quotations",
  },
  {
    icon: "ph-bold ph-chat-circle",
    label: "Mesajlaşma",
    tag: "İletişim",
    desc: "Müşterilerinizle iletişime geçin ve sorularını yanıtlayın",
    href: "/supply/supplier/messages",
  },
];

const stats = [
  {
    end: 320,
    suffix: "+",
    label: "Onaylı Tedarikçi",
    icon: "ph-bold ph-buildings",
  },
  {
    end: 5800,
    suffix: "+",
    label: "Ürün & Hizmet",
    icon: "ph-bold ph-package",
  },
  {
    end: 1200,
    suffix: "+",
    label: "Tamamlanan Alım",
    icon: "ph-bold ph-handshake",
  },
  { end: 96, suffix: "%", label: "Memnuniyet", icon: "ph-bold ph-smiley" },
];

const features = [
  {
    icon: "ph-bold ph-magnifying-glass",
    title: "Akıllı Ürün Arama",
    desc: "Kategori, fiyat aralığı, marka ve tedarikçi puanına göre filtreleyin; 5.800+ ürün arasında doğru ürünü saniyeler içinde bulun.",
  },
  {
    icon: "ph-bold ph-file-plus",
    title: "Hızlı Alım İlanı",
    desc: "Teknik özelliklerle detaylandırılmış alım talebinizi yayınlayın; birden fazla tedarikçiden rekabetçi teklifler alın.",
  },
  {
    icon: "ph-bold ph-scales",
    title: "Teklif Karşılaştırma",
    desc: "Gelen teklifleri kalem kalem yan yana karşılaştırın; fiyat, süre ve koşulları analiz ederek en avantajlı seçimi yapın.",
  },
  {
    icon: "ph-bold ph-shield-check",
    title: "Onaylı Tedarikçi Ağı",
    desc: "Her tedarikçi vergi ve ticaret sicil belgesiyle doğrulanır. Kurum değerlendirmeleri şeffaf biçimde profilde yayınlanır.",
  },
  {
    icon: "ph-bold ph-chart-line-up",
    title: "Alım & Satış Analitiği",
    desc: "Harcamalarınızı, teklif dönüşüm oranlarını ve kategori bazlı maliyetleri anlık dashboard üzerinden takip edin.",
  },
  {
    icon: "ph-bold ph-chats",
    title: "Platform İçi Mesajlaşma",
    desc: "Fiyat müzakeresi ve teslimat detaylarını doğrudan platform üzerinden yürütün; tüm yazışmalar kayıt altında kalır.",
  },
];

const howItWorks = [
  {
    step: "01",
    icon: "ph-bold ph-user-circle-plus",
    title: "Kayıt & Doğrulama",
    desc: "Kurumunuz veya firmanız için ücretsiz hesap oluşturun. Doğrulama 24 saat içinde tamamlanır; beklemeden kullanmaya başlayın.",
  },
  {
    step: "02",
    icon: "ph-bold ph-file-text",
    title: "İlan Yayınla / Teklif Ver",
    desc: "Kurumlar alım ilanı yayınlar, tedarikçiler uygun ilanlara detaylı ve rekabetçi teklifler gönderir.",
  },
  {
    step: "03",
    icon: "ph-bold ph-handshake",
    title: "Anlaşın & Büyüyün",
    desc: "En uygun teklifi seçin, platform içi mesajlaşmayla detayları netleştirin ve güvenilir uzun vadeli iş birliği kurun.",
  },
];

const faqs = [
  {
    q: "Tedarik paneline kimler katılabilir?",
    a: "Eğitim kurumları (özel okul, dil kursu, etüt merkezi vb.) kurum paneline; mal veya hizmet satan firmalar ise tedarikçi paneline kayıt olabilir.",
  },
  {
    q: "Alım ilanı yayınlamak ücretli mi?",
    a: "Temel alım ilanı yayınlama ücretsizdir. Öne çıkarma ve ek özellikler için kurumsal paketlerimizi inceleyebilirsiniz.",
  },
  {
    q: "Tedarikçi olmak için nasıl başvurabilirim?",
    a: "Tedarikçi başvuruları iletişim ekibimiz aracılığıyla alınmaktadır. tedarik@egitimiste.com adresine e-posta gönderin; en geç 2 iş günü içinde dönüş yapılır.",
  },
  {
    q: "Tedarikçiler nasıl doğrulanıyor?",
    a: "Her tedarikçi vergi levhası ve ticaret sicil belgesi doğrulamasından geçer. Kurumlardan gelen değerlendirmeler profil sayfasında şeffaf biçimde yayınlanır.",
  },
  {
    q: "Teklif verme süreci nasıl işliyor?",
    a: "Tedarikçiler alım ilanlarını inceleyerek kalem kalem fiyat girebilir, teslimat süresi belirtebilir. Kurumlar gelen teklifleri karşılaştırma tablosunda yan yana görür.",
  },
];

export default function SupplyPanelPage() {
  usePageTitle("Tedarik Paneli");
  const [viewed, setViewed] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"company" | "supplier">("company");

  return (
    <div className="category-detail-page category-detail-page--supply">
      {/* Decorative orbs — matching SupplyPanelSection */}
      <div className="supply-panel__orb supply-panel__orb--1" />
      <div className="supply-panel__orb supply-panel__orb--2" />
      <div className="supply-panel__grid-bg" />

      <div className="container">
        {/* ── Hero ── */}
        <div className="category-hero" data-aos="fade-up">
          <div className="category-hero__badge category-hero__badge--dark">
            <i className="ph-bold ph-storefront" />
            Tedarik Paneli
          </div>
          <h1
            className="category-hero__title"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Eğitim Tedarikini <span>Dijitalleştirin</span>
          </h1>
          <p
            className="category-hero__desc"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Eğitim kurumları ile tedarikçileri tek platformda buluşturan akıllı
            tedarik yönetim sistemi. Ürün arama, alım ilanı, teklif yönetimi ve
            tedarikçi rehberi tek çatı altında.
          </p>
          <div
            className="category-hero__actions"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <Link
              href="/auth/register/institution"
              className="btn btn-white rounded-pill flex-align gap-8 d-inline-flex shimmer-btn"
            >
              <i className="ph-bold ph-graduation-cap d-flex text-lg" />
              Kurum Kaydı Yap
            </Link>
            <a
              href="mailto:tedarik@egitimiste.com"
              className="btn btn-outline-white rounded-pill flex-align gap-8 d-inline-flex"
            >
              <i className="ph-bold ph-envelope-simple d-flex text-lg" />
              Tedarikçi Başvurusu
            </a>
          </div>
        </div>

        {/* ── Stats ── */}
        <VisibilitySensor
          onChange={(isVisible: boolean) => {
            if (isVisible) setViewed(true);
          }}
          partialVisibility
          delayedCall
        >
          <div className="category-stats" data-aos="fade-up">
            {stats.map((s, i) => (
              <div
                key={i}
                className="category-stats__card"
                data-aos="zoom-in"
                data-aos-delay={i * 100}
              >
                <div className="category-stats__icon">
                  <i className={s.icon} />
                </div>
                <span className="category-stats__value">
                  {viewed ? (
                    <CountUp
                      end={s.end}
                      duration={2.4}
                      separator="."
                      suffix={s.suffix}
                    />
                  ) : (
                    `0${s.suffix}`
                  )}
                </span>
                <span className="category-stats__label">{s.label}</span>
              </div>
            ))}
          </div>
        </VisibilitySensor>

        {/* ── Rol Karşılaştırması ── */}
        <div className="supply-page-roles" data-aos="fade-up">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-header__title">Kim İçin Ne Sunuyoruz?</h2>
            <p className="section-header__subtitle">
              Eğitim kurumları ve tedarikçiler için ayrı paneller, ortak
              platform
            </p>
          </div>
          <div className="supply-page-roles__grid">
            {/* Kurum Kartı */}
            <div
              className="supply-page-roles__card supply-page-roles__card--company"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <div className="supply-page-roles__card-header">
                <div className="supply-page-roles__card-icon">
                  <i className="ph-bold ph-graduation-cap" />
                </div>
                <div>
                  <h3 className="supply-page-roles__card-title">
                    Kurum Paneli
                  </h3>
                  <p className="supply-page-roles__card-subtitle">
                    Eğitim kurumları için satın alma yönetimi
                  </p>
                </div>
              </div>
              <ul className="supply-page-roles__feature-list">
                <li>
                  <i className="ph-bold ph-package" />
                  <span>
                    <strong>Ürün Arama</strong> — Katalogdaki ürünleri arayın ve
                    sipariş verin
                  </span>
                </li>
                <li>
                  <i className="ph-bold ph-file-text" />
                  <span>
                    <strong>Alım İlanları</strong> — Talep oluşturun ve
                    tedarikçilerden teklif alın
                  </span>
                </li>
                <li>
                  <i className="ph-bold ph-buildings" />
                  <span>
                    <strong>Tedarikçiler</strong> — Onaylı tedarikçileri
                    görüntüleyin ve iletişime geçin
                  </span>
                </li>
                <li>
                  <i className="ph-bold ph-heart" />
                  <span>
                    <strong>İstek Listesi</strong> — Ürünleri kaydedin, fiyat
                    değişikliklerini takip edin
                  </span>
                </li>
                <li>
                  <i className="ph-bold ph-chat-circle" />
                  <span>
                    <strong>Mesajlar</strong> — Tedarikçilerle anlık iletişim
                  </span>
                </li>
              </ul>
              <Link
                href="/auth/register/institution"
                className="supply-page-roles__cta"
              >
                <i className="ph-bold ph-graduation-cap" />
                Kurum Kaydı Yap
                <i className="ph-bold ph-arrow-right" />
              </Link>
            </div>

            {/* Tedarikçi Kartı */}
            <div
              className="supply-page-roles__card supply-page-roles__card--supplier"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <div className="supply-page-roles__card-header">
                <div className="supply-page-roles__card-icon">
                  <i className="ph-bold ph-storefront" />
                </div>
                <div>
                  <h3 className="supply-page-roles__card-title">
                    Tedarikçi Paneli
                  </h3>
                  <p className="supply-page-roles__card-subtitle">
                    Eğitim sektörüne ürün ve hizmet sunan firmalar için
                  </p>
                </div>
              </div>
              <ul className="supply-page-roles__feature-list">
                <li>
                  <i className="ph-bold ph-package" />
                  <span>
                    <strong>Ürün Yönetimi</strong> — Ürünlerinizi ekleyin ve
                    katalogda yayınlayın
                  </span>
                </li>
                <li>
                  <i className="ph-bold ph-file-text" />
                  <span>
                    <strong>Alım İlanları</strong> — Kurumların taleplerini
                    inceleyin, fırsat yakalayın
                  </span>
                </li>
                <li>
                  <i className="ph-bold ph-clipboard-text" />
                  <span>
                    <strong>Tekliflerim</strong> — Gönderdiğiniz teklifleri
                    görüntüleyin ve takip edin
                  </span>
                </li>
                <li>
                  <i className="ph-bold ph-chat-circle" />
                  <span>
                    <strong>Mesajlaşma</strong> — Müşterilerinizle iletişime
                    geçin, sorularını yanıtlayın
                  </span>
                </li>
              </ul>
              <a
                href="mailto:tedarik@egitimiste.com"
                className="supply-page-roles__cta supply-page-roles__cta--outline"
              >
                <i className="ph-bold ph-envelope-simple" />
                Tedarikçi Başvurusu
                <i className="ph-bold ph-arrow-right" />
              </a>
            </div>
          </div>
        </div>

        {/* ── Modül Grid ── */}
        <div className="category-grid-section">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-header__title">Platform Modülleri</h2>
            <p className="section-header__subtitle">
              Kurum veya tedarikçi olarak hangi özelliklere eriştiğinizi
              keşfedin
            </p>
          </div>

          <div className="supply-page-tabs" data-aos="fade-up">
            <button
              className={`supply-page-tabs__btn${activeTab === "company" ? " supply-page-tabs__btn--active" : ""}`}
              onClick={() => setActiveTab("company")}
            >
              <i className="ph-bold ph-graduation-cap" />
              Kurum Paneli
            </button>
            <button
              className={`supply-page-tabs__btn${activeTab === "supplier" ? " supply-page-tabs__btn--active" : ""}`}
              onClick={() => setActiveTab("supplier")}
            >
              <i className="ph-bold ph-storefront" />
              Tedarikçi Paneli
            </button>
          </div>

          <div className="supply-page-grid">
            {(activeTab === "company" ? companyModules : supplierModules).map(
              (mod, i) => (
                <Link
                  href={mod.href}
                  key={`${activeTab}-${i}`}
                  className="supply-page-grid__card"
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                >
                  <div className="supply-page-grid__card-icon">
                    <i className={mod.icon} />
                  </div>
                  <div className="supply-page-grid__card-body">
                    <h4 className="supply-page-grid__card-name">{mod.label}</h4>
                    <span className="supply-page-grid__card-tag">
                      {mod.tag}
                    </span>
                    <span className="supply-page-grid__card-desc">
                      {mod.desc}
                    </span>
                  </div>
                  <i className="ph-bold ph-arrow-right supply-page-grid__card-arrow" />
                </Link>
              ),
            )}
          </div>
        </div>

        {/* ── Özellikler ── */}
        <div className="category-advantages">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-header__title">
              Tedarik Yönetiminde Fark Yaratan Özellikler
            </h2>
            <p className="section-header__subtitle">
              Eğitim İste Tedarik Paneli ile alım sürecinizin avantajları
            </p>
          </div>
          <div className="category-advantages__grid">
            {features.map((f, i) => (
              <div
                key={i}
                className="category-advantages__card"
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                <div className="category-advantages__card-icon">
                  <i className={f.icon} />
                </div>
                <h5 className="category-advantages__card-title">{f.title}</h5>
                <p className="category-advantages__card-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Nasıl Çalışır ── */}
        <div className="category-levels">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-header__title">Nasıl Çalışır?</h2>
            <p className="section-header__subtitle">
              3 adımda tedarik sürecinizi başlatın
            </p>
          </div>
          <div className="supply-page-steps">
            {howItWorks.map((s, i) => (
              <div
                key={i}
                className="supply-page-steps__card"
                data-aos="fade-up"
                data-aos-delay={i * 120}
              >
                <div className="supply-page-steps__step-num">{s.step}</div>
                <div className="supply-page-steps__icon">
                  <i className={s.icon} />
                </div>
                <h4 className="supply-page-steps__title">{s.title}</h4>
                <p className="supply-page-steps__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="category-faq">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-header__title">Sıkça Sorulan Sorular</h2>
            <p className="section-header__subtitle">
              Tedarik platformu hakkında merak ettikleriniz
            </p>
          </div>
          <div className="category-faq__list">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`category-faq__item ${openFaq === i ? "category-faq__item--open" : ""}`}
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                <button
                  className="category-faq__question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <i
                    className={`ph-bold ${openFaq === i ? "ph-minus" : "ph-plus"}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="category-faq__answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="category-cta" data-aos="fade-up">
          <div className="category-cta__inner category-cta__inner--supply">
            <div className="category-cta__gradient" />
            <div className="category-cta__content">
              <div className="category-cta__icon">
                <i className="ph-fill ph-storefront" />
              </div>
              <h3 className="category-cta__title">
                Tedarik Sürecinizi Bugün Dijitalleştirin
              </h3>
              <p className="category-cta__desc">
                320&apos;den fazla onaylı tedarikçi ve 1.200+ tamamlanan alımla
                Türkiye&apos;nin lider eğitim tedarik platformuna katılın.
              </p>
              <div className="category-cta__buttons">
                <Link
                  href="/auth/register/institution"
                  className="btn btn-white btn-lg rounded-pill flex-align gap-8 d-inline-flex"
                >
                  <i className="ph-bold ph-graduation-cap d-flex text-lg" />
                  Kurum Kaydı Yap
                  <i className="ph-bold ph-arrow-right d-flex text-lg" />
                </Link>
                <a
                  href="mailto:tedarik@egitimiste.com"
                  className="btn btn-outline-white btn-lg rounded-pill flex-align gap-8 d-inline-flex"
                >
                  <i className="ph-bold ph-envelope-simple d-flex text-lg" />
                  Tedarikçi Başvurusu
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
