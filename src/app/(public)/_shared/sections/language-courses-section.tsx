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
    label: "Uluslararası Sertifika",
    desc: "IELTS, TOEFL, Goethe, DELE ve daha fazlası",
  },
  {
    icon: "ph-bold ph-users-three",
    label: "Küçük Grup Dersleri",
    desc: "Maksimum 8–12 kişilik sınıflar, kişisel ilgi",
  },
  {
    icon: "ph-bold ph-monitor-play",
    label: "Online & Yüz Yüze",
    desc: "Dilediğin formatta, dilediğin tempoda öğren",
  },
  {
    icon: "ph-bold ph-trend-up",
    label: "Hızlı İlerleme Garantisi",
    desc: "Kanıtlanmış metodoloji, ölçülebilir sonuçlar",
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
    <section className="language-courses-section">
      {/* Breathing dekoratif orb'lar */}
      <div className="lang-orb lang-orb--1" />
      <div className="lang-orb lang-orb--2" />

      <div className="container">
        <div className="lang-split">
          {/* Sol İçerik */}
          <div className="lang-split__content" data-aos="fade-right">
            <div className="lang-info__badge">
              <i className="ph-bold ph-translate" />
              Dil Eğitimi
            </div>

            <h2 className="lang-info__title">
              Dünyaya Açılan Kapı:{" "}
              <span style={{ color: "var(--main-400)" }}>Dil Kursları</span>
            </h2>

            <p className="lang-info__description">
              8 farklı dilde 600&apos;den fazla kurum arasından size en uygun
              dil kursunu seçin. Her seviyeye, her hedefe uygun programlar ve
              uluslararası geçerlilikte sertifikalar.
            </p>

            {/* Features — stagger animasyonlu */}
            <div className="lang-info__features">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="lang-info__feature-row"
                  data-aos="fade-right"
                  data-aos-delay={i * 80}
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

            <Link
              href="/search"
              className="btn btn-white rounded-pill flex-align gap-8 d-inline-flex shimmer-btn"
              data-aos="fade-up"
              data-aos-delay="320"
            >
              Tüm Dil Kurslarını Gör
              <i className="ph-bold ph-arrow-up-right d-flex text-lg" />
            </Link>

            {/* Stats — CountUp */}
            <VisibilitySensor
              onChange={(isVisible: boolean) => {
                if (isVisible) setViewed(true);
              }}
              partialVisibility
              delayedCall
            >
              <div
                className="lang-info__stats"
                data-aos="fade-up"
                data-aos-delay="360"
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
          <div className="lang-split__grid" data-aos="fade-left">
            {languages.map((lang, idx) => (
              <Link
                href={lang.href}
                key={lang.id}
                className="lang-card"
                data-aos="fade-up"
                data-aos-delay={idx * 60}
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
