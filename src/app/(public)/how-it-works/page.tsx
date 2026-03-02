"use client";

import { usePageTitle } from "@/hooks";
import Link from "next/link";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { useState } from "react";

/* ── Veri ── */
const steps = [
  {
    number: "01",
    icon: "ph-bold ph-magnifying-glass",
    title: "Ara & Keşfet",
    desc: "İhtiyacınıza uygun okul, kurs veya etkinliği arayın. Konum, fiyat, puan ve müfredat türüne göre filtreleme yapın.",
    details: [
      "Gelişmiş filtreleme sistemi ile binlerce kurum arasından size uygun olanları bulun",
      "Harita üzerinde yakınlardaki kurumları görüntüleyin",
      "Arama sonuçlarını kaydedin ve daha sonra tekrar inceleyin",
    ],
    gradient: "linear-gradient(135deg, var(--main-600), #6c5ce7)",
    color: "var(--main-600)",
  },
  {
    number: "02",
    icon: "ph-bold ph-scales",
    title: "Karşılaştır & İncele",
    desc: "Beğendiğiniz kurumları yan yana karşılaştırın. Veli yorumlarını okuyun ve detaylı bilgiye ulaşın.",
    details: [
      "Kurumları yan yana karşılaştırma özelliği",
      "Doğrulanmış veli ve öğrenci yorumlarını okuyun",
      "Fiyat, müfredat, konum ve puan karşılaştırması",
    ],
    gradient: "linear-gradient(135deg, var(--main-two-600), #f7931e)",
    color: "var(--main-two-600)",
  },
  {
    number: "03",
    icon: "ph-bold ph-rocket-launch",
    title: "Kayıt Ol & Başla",
    desc: "Karar verdiğiniz kuruma online başvuru yapın veya tanışma randevusu oluşturun.",
    details: [
      "Online randevu oluşturma — tarih ve saat seçimi",
      "Doğrudan kurumla mesajlaşma imkânı",
      "Başvuru sürecini platform üzerinden takip edin",
    ],
    gradient: "linear-gradient(135deg, var(--main-three-600), #00cec9)",
    color: "var(--main-three-600)",
  },
];

const stats = [
  { end: 850, suffix: "+", label: "Kurum", icon: "ph-bold ph-buildings" },
  { end: 12000, suffix: "+", label: "Yorum", icon: "ph-bold ph-chat-circle-text" },
  { end: 10000, suffix: "+", label: "Kullanıcı", icon: "ph-bold ph-users" },
  { end: 100, suffix: "%", label: "Ücretsiz", icon: "ph-bold ph-gift" },
];

const audiences = [
  {
    icon: "ph-bold ph-user-circle",
    title: "Veliler İçin",
    desc: "Çocuğunuz için en doğru eğitim kurumunu bulun, karşılaştırın ve randevu alın.",
    features: ["Okulları araştırın ve karşılaştırın", "Veli yorumlarını okuyun", "Online randevu oluşturun"],
    href: "/search",
    btnText: "Okul Ara",
    color: "var(--main-600)",
  },
  {
    icon: "ph-bold ph-student",
    title: "Öğrenciler İçin",
    desc: "Kurslar, dil eğitimleri, aktiviteler ve kariyer fırsatlarını keşfedin.",
    features: ["Kursları ve aktiviteleri keşfedin", "Webinar ve etkinliklere katılın", "Kariyer fırsatlarını takip edin"],
    href: "/search",
    btnText: "Kurs Ara",
    color: "var(--main-two-600)",
  },
  {
    icon: "ph-bold ph-buildings",
    title: "Kurumlar İçin",
    desc: "Kurumunuzu kaydedin, ilanlarınızı yayınlayın ve yeni öğrencilere ulaşın.",
    features: ["Kurum profilinizi oluşturun", "İş ilanları yayınlayın", "Öğrenci başvurularını yönetin"],
    href: "/auth/register",
    btnText: "Kurum Kaydı",
    color: "var(--main-three-600)",
  },
];

const platformFeatures = [
  { icon: "ph-bold ph-lock-simple", title: "Güvenli & Gizli", desc: "Kişisel bilgileriniz SSL şifreleme ile korunur." },
  { icon: "ph-bold ph-device-mobile", title: "Her Cihazda", desc: "Masaüstü, tablet ve mobilde sorunsuz deneyim." },
  { icon: "ph-bold ph-headset", title: "7/24 Destek", desc: "Sorularınız için her zaman yanınızdayız." },
  { icon: "ph-bold ph-star", title: "Doğrulanmış Yorumlar", desc: "Tüm yorumlar gerçek kullanıcılar tarafından yazılır." },
  { icon: "ph-bold ph-currency-circle-dollar", title: "Tamamen Ücretsiz", desc: "Platform kullanımı veliler ve öğrenciler için ücretsizdir." },
  { icon: "ph-bold ph-arrows-clockwise", title: "Güncel Bilgiler", desc: "Kurum bilgileri düzenli olarak güncellenir." },
];

export default function HowItWorksPage() {
  usePageTitle("Nasıl Çalışır?");
  const [viewed, setViewed] = useState(false);

  return (
    <div className="category-detail-page category-detail-page--dark">
      <div className="container">
        {/* Hero Section */}
        <div className="category-hero" data-aos="fade-up">
          <div className="category-hero__badge category-hero__badge--dark">
            <i className="ph-bold ph-path" />
            Nasıl Çalışır?
          </div>
          <h1 className="category-hero__title" data-aos="fade-up" data-aos-delay="100">
            Üç Basit Adımda <span className="text-gradient-main">Hedefinize Ulaşın</span>
          </h1>
          <p className="category-hero__desc" data-aos="fade-up" data-aos-delay="200">
            Hayalinizdeki eğitim kurumunu bulun, inceleyin ve kayıt olun — hepsi bu kadar kolay.
            Eğitim İste platformunu adım adım keşfedin.
          </p>
          <div className="category-hero__actions" data-aos="fade-up" data-aos-delay="300">
            <Link
              href="/search"
              className="btn btn-main rounded-pill flex-align gap-8 d-inline-flex shimmer-btn"
            >
              <i className="ph-bold ph-magnifying-glass d-flex text-lg" />
              Hemen Keşfet
            </Link>
            <Link
              href="/video"
              className="btn btn-outline-white rounded-pill flex-align gap-8 d-inline-flex"
            >
              <i className="ph-bold ph-play-circle d-flex text-lg" />
              Videoyu İzle
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <VisibilitySensor
          onChange={(isVisible: boolean) => { if (isVisible) setViewed(true); }}
          partialVisibility
          delayedCall
        >
          <div className="category-stats" data-aos="fade-up">
            {stats.map((s, i) => (
              <div key={i} className="category-stats__card" data-aos="zoom-in" data-aos-delay={i * 100}>
                <div className="category-stats__icon">
                  <i className={s.icon} />
                </div>
                <span className="category-stats__value">
                  {viewed ? (
                    <CountUp end={s.end} duration={2.4} separator="." suffix={s.suffix} />
                  ) : ( `0${s.suffix}` )}
                </span>
                <span className="category-stats__label">{s.label}</span>
              </div>
            ))}
          </div>
        </VisibilitySensor>

        {/* Steps Section — Detailed */}
        <div className="hiw-steps-detail">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-header__title">Adım Adım Rehber</h2>
            <p className="section-header__subtitle">
              Her adımda ne yapacağınızı detaylıca öğrenin
            </p>
          </div>
          {steps.map((step, i) => (
            <div
              key={i}
              className={`hiw-steps-detail__step ${i % 2 !== 0 ? "hiw-steps-detail__step--reverse" : ""}`}
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="hiw-steps-detail__step-visual">
                <div className="hiw-steps-detail__step-number" style={{ background: step.gradient }}>
                  {step.number}
                </div>
                <div className="hiw-steps-detail__step-icon" style={{ background: step.gradient }}>
                  <i className={step.icon} />
                </div>
              </div>
              <div className="hiw-steps-detail__step-content">
                <h3 className="hiw-steps-detail__step-title" style={{ color: step.color }}>
                  {step.title}
                </h3>
                <p className="hiw-steps-detail__step-desc">{step.desc}</p>
                <ul className="hiw-steps-detail__step-list">
                  {step.details.map((detail, di) => (
                    <li key={di}>
                      <i className="ph-bold ph-check-circle" style={{ color: step.color }} />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Audiences Section */}
        <div className="hiw-audiences">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-header__title">Kimler İçin?</h2>
            <p className="section-header__subtitle">
              Eğitim İste herkese açık, herkes için faydalı
            </p>
          </div>
          <div className="hiw-audiences__grid">
            {audiences.map((aud, i) => (
              <div key={i} className="hiw-audiences__card" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="hiw-audiences__card-icon" style={{ color: aud.color }}>
                  <i className={aud.icon} />
                </div>
                <h4 className="hiw-audiences__card-title">{aud.title}</h4>
                <p className="hiw-audiences__card-desc">{aud.desc}</p>
                <ul className="hiw-audiences__card-features">
                  {aud.features.map((f, fi) => (
                    <li key={fi}>
                      <i className="ph ph-check" style={{ color: aud.color }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={aud.href}
                  className="btn btn-outline-white rounded-pill flex-align gap-8 d-inline-flex mt-auto"
                >
                  {aud.btnText}
                  <i className="ph-bold ph-arrow-right d-flex text-lg" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Features */}
        <div className="category-advantages">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-header__title">Platform Özellikleri</h2>
            <p className="section-header__subtitle">
              Eğitim İste&apos;yi güvenle kullanmanız için sunduğumuz özellikler
            </p>
          </div>
          <div className="category-advantages__grid">
            {platformFeatures.map((pf, i) => (
              <div key={i} className="category-advantages__card" data-aos="fade-up" data-aos-delay={i * 80}>
                <div className="category-advantages__card-icon">
                  <i className={pf.icon} />
                </div>
                <h5 className="category-advantages__card-title">{pf.title}</h5>
                <p className="category-advantages__card-desc">{pf.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="category-cta" data-aos="fade-up">
          <div className="category-cta__inner category-cta__inner--hiw">
            <div className="category-cta__gradient" />
            <div className="category-cta__content">
              <div className="category-cta__icon">
                <i className="ph-fill ph-path" />
              </div>
              <h3 className="category-cta__title">
                Eğitimde Doğru Adımı Şimdi Atın
              </h3>
              <p className="category-cta__desc">
                Ücretsiz hesabınızla hemen başlayın. Binlerce kurum arasından size en uygununu bulun.
              </p>
              <div className="category-cta__buttons">
                <Link
                  href="/auth/register"
                  className="btn btn-white btn-lg rounded-pill flex-align gap-8 d-inline-flex"
                >
                  <i className="ph-bold ph-rocket-launch d-flex text-lg" />
                  Hemen Ücretsiz Başla
                  <i className="ph-bold ph-arrow-right d-flex text-lg" />
                </Link>
                <Link
                  href="/search"
                  className="btn btn-outline-white btn-lg rounded-pill flex-align gap-8 d-inline-flex"
                >
                  <i className="ph-bold ph-magnifying-glass d-flex text-lg" />
                  Kurum Ara
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
