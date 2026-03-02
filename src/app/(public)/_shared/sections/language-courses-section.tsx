import Link from "next/link";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { useState } from "react";

const languages = [
  {
    id: 1,
    code: "GB",
    flag: "🇬🇧",
    name: "İngilizce",
    count: 284,
    href: "/search",
  },
  {
    id: 2,
    code: "DE",
    flag: "🇩🇪",
    name: "Almanca",
    count: 98,
    href: "/search",
  },
  {
    id: 3,
    code: "FR",
    flag: "🇫🇷",
    name: "Fransızca",
    count: 76,
    href: "/search",
  },
  {
    id: 4,
    code: "ES",
    flag: "🇪🇸",
    name: "İspanyolca",
    count: 54,
    href: "/search",
  },
  {
    id: 5,
    code: "JP",
    flag: "🇯🇵",
    name: "Japonca",
    count: 32,
    href: "/search",
  },
  { id: 6, code: "RU", flag: "🇷🇺", name: "Rusça", count: 41, href: "/search" },
  { id: 7, code: "SA", flag: "🇸🇦", name: "Arapça", count: 67, href: "/search" },
  {
    id: 8,
    code: "CN",
    flag: "🇨🇳",
    name: "Çince (Mandarin)",
    count: 28,
    href: "/search",
  },
];

const features = [
  {
    icon: "ph-bold ph-certificate",
    label: "Sertifika Yönetimi",
    desc: "IELTS, TOEFL ve kurumsal sertifikaları dijital olarak verin ve takip edin.",
  },
  {
    icon: "ph-bold ph-users-three",
    label: "Sınıf Planlama",
    desc: "Maksimum doluluk için ders programlarını ve sınıf kapasitelerini optimize edin.",
  },
  {
    icon: "ph-bold ph-monitor-play",
    label: "Hibrit Eğitim Altyapısı",
    desc: "Online ve yüz yüze eğitimleri tek platformdan yönetin.",
  },
  {
    icon: "ph-bold ph-trend-up",
    label: "Seviye Tespit",
    desc: "Potansiyel öğrencilerin seviyelerini online testlerle belirleyin.",
  },
];

const stats = [
  { end: 600, suffix: "+", label: "Dil Kursu" },
  { end: 8, suffix: "", label: "Farklı Dil" },
  { end: 50, suffix: "K+", label: "Mezun Öğrenci" },
];

export default function LanguageCoursesSection() {
  const [viewed, setViewed] = useState(false);

  return (
    <section className="language-courses-section scroll-reveal-section">
      {/* Breathing dekoratif orb'lar */}
      <div className="lang-orb lang-orb--1" />
      <div className="lang-orb lang-orb--2" />

      <div className="container">
        <div className="lang-split">
          {/* Sol İçerik */}
          <div className="lang-split__content">
            <div className="lang-info__badge" data-aos="fade-down">
              <i className="ph-bold ph-translate" />
              Dil Eğitimi
            </div>

            <h2 className="lang-info__title wow fadeInUp">
              Kurumunuzu Dünyaya Açın:{" "}
              <span style={{ color: "var(--main-400)" }}>Dil Okulları</span>
            </h2>

            <p
              className="lang-info__description wow fadeInUp"
              data-wow-delay="0.1s"
            >
              Yabancı dil eğitim programlarınızı listeleyin, seviye tespit
              sınavları düzenleyin ve yeni öğrenciler kazanın. Uluslararası
              standartlarda yönetim araçlarıyla tanışın.
            </p>

            {/* Features — stagger animasyonlu */}
            <div className="lang-info__features">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="lang-info__feature-row wow fadeInUp"
                  data-wow-delay={`${i * 0.1}s`}
                >
                  <div className="icon-box">
                    <i className={f.icon} />
                  </div>
                  <div className="text">
                    <span className="label">{f.label}</span>
                    <span className="desc">{f.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex flex-wrap gap-12">
              <Link
                href="/language-courses"
                className="btn btn-white rounded-pill flex-align gap-8 d-inline-flex wow fadeInUp"
                data-wow-delay="0.35s"
              >
                Yönetim Panelini Tanıyın
                <i className="ph-bold ph-arrow-up-right d-flex text-lg" />
              </Link>
              <Link
                href="/auth/register"
                className="btn btn-outline-white rounded-pill flex-align gap-8 d-inline-flex wow fadeInUp"
                data-wow-delay="0.4s"
              >
                Hemen Üye Olun
                <i className="ph-bold ph-user-plus d-flex text-lg" />
              </Link>
            </div>

            {/* Stats — CountUp */}
            <VisibilitySensor
              onChange={(isVisible: boolean) => {
                if (isVisible) setViewed(true);
              }}
              partialVisibility
              delayedCall
            >
              <div
                className="lang-info__stats wow fadeInUp"
                data-wow-delay="0.4s"
              >
                {stats.map((s, i) => (
                  <div key={i} className="lang-info__stat-item">
                    <span className="num">
                      {viewed ? (
                        <CountUp end={s.end} duration={2} suffix={s.suffix} />
                      ) : (
                        `0${s.suffix}`
                      )}
                    </span>
                    <span className="lbl">{s.label}</span>
                  </div>
                ))}
              </div>
            </VisibilitySensor>
          </div>

          {/* Sağ Dil Grid — bayrak emoji eklendi */}
          <div
            className="lang-split__grid wow fadeInRight"
            data-wow-delay="0.1s"
          >
            {languages.map((lang, idx) => (
              <Link
                href={lang.href}
                key={lang.id}
                className="lang-card wow fadeInUp"
                data-wow-delay={`${idx * 0.08}s`}
              >
                <span className="lang-card__flag">{lang.flag}</span>
                <span className="lang-card__code">{lang.code}</span>
                <div className="lang-card__info">
                  <span className="lang-card__name">{lang.name}</span>
                  <span className="lang-card__count">{lang.count} kurum</span>
                </div>
                <i className="ph ph-arrow-right lang-card__arrow" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
