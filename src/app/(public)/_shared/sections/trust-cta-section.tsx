import Link from "next/link";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import Marquee from "react-fast-marquee";
import { useState } from "react";

const stats = [
  { end: 10000, suffix: "+", label: "Kullanıcı", icon: "ph-bold ph-users" },
  {
    end: 500,
    suffix: "+",
    label: "Kayıtlı Kurum",
    icon: "ph-bold ph-buildings",
  },
  {
    end: 4.9,
    decimals: 1,
    suffix: "★",
    label: "Ortalama Puan",
    icon: "ph-bold ph-star",
  },
  {
    end: 100,
    prefix: "%",
    suffix: "",
    label: "Ücretsiz Keşif",
    icon: "ph-bold ph-gift",
  },
];

const logos = [
  { name: "Özel Okul A", icon: "ph-bold ph-graduation-cap" },
  { name: "Dil Akademisi B", icon: "ph-bold ph-translate" },
  { name: "Spor Kulübü C", icon: "ph-bold ph-trophy" },
  { name: "Müzik Atölyesi D", icon: "ph-bold ph-music-notes" },
  { name: "Teknoloji Lab E", icon: "ph-bold ph-cpu" },
  { name: "Sanat Merkezi F", icon: "ph-bold ph-palette" },
  { name: "Bilim Koleji G", icon: "ph-bold ph-atom" },
  { name: "Etüt Merkezi H", icon: "ph-bold ph-book-open" },
];

export default function TrustCtaSection() {
  const [viewed, setViewed] = useState(false);

  return (
    <section className="trust-section scroll-reveal-section">
      {/* Breathing Orbs */}
      <div className="trust-section__orb trust-section__orb--1" />
      <div className="trust-section__orb trust-section__orb--2" />

      <div className="container">
        {/* Üst — Badge + Başlık */}
        <div className="trust-section__header">
          <div className="trust-section__badge" data-aos="fade-down">
            <i className="ph-bold ph-shield-check" />
            Güvenilir Platform
          </div>
          <h2 className="trust-section__title wow fadeInUp">
            Türkiye&apos;nin Eğitim Ekosistemi{" "}
            <span className="text-gradient-main">Tek Çatı Altında</span>
          </h2>
          <p
            className="trust-section__subtitle wow fadeInUp"
            data-wow-delay="0.1s"
          >
            Binlerce veli, öğrenci ve kurumun güvendiği platformda yerinizi
            alın.
          </p>
        </div>

        {/* Stats Grid — CountUp */}
        <VisibilitySensor
          onChange={(isVisible: boolean) => {
            if (isVisible) setViewed(true);
          }}
          partialVisibility
          delayedCall
        >
          <div className="trust-stats wow fadeInUp" data-wow-delay="0.1s">
            {stats.map((s, i) => (
              <div
                key={i}
                className="trust-stats__card wow zoomIn"
                data-wow-delay={`${i * 0.1 + 0.1}s`}
              >
                <div className="trust-stats__icon">
                  <i className={s.icon} />
                </div>
                <span className="trust-stats__value">
                  {viewed ? (
                    <CountUp
                      end={s.end}
                      duration={2.4}
                      separator="."
                      decimals={s.decimals || 0}
                      prefix={s.prefix || ""}
                      suffix={s.suffix}
                    />
                  ) : (
                    `0${s.suffix}`
                  )}
                </span>
                <span className="trust-stats__label">{s.label}</span>
              </div>
            ))}
          </div>
        </VisibilitySensor>

        {/* Marquee Logo Strip */}
        <div className="trust-logos wow fadeInUp" data-wow-delay="0.2s">
          <span className="trust-logos__label">Bize güvenen kurumlar:</span>
          <Marquee
            speed={40}
            gradient
            gradientColor="rgb(7, 20, 49)"
            gradientWidth={60}
            pauseOnHover
            className="trust-logos__marquee"
          >
            {logos.map((logo, i) => (
              <div key={i} className="trust-logos__item">
                <i className={logo.icon} />
                <span>{logo.name}</span>
              </div>
            ))}
          </Marquee>
        </div>

        {/* CTA Card */}
        <div className="trust-cta wow fadeInUp" data-wow-delay="0.25s">
          <div className="trust-cta__inner">
            <div className="trust-cta__gradient" />
            <div className="trust-cta__content">
              <div className="trust-cta__icon wow zoomIn" data-wow-delay="0.28s">
                <i className="ph-fill ph-shield-check" />
              </div>
              <h3
                className="trust-cta__title wow fadeInUp"
                data-wow-delay="0.3s"
              >
                Eğitimde Doğru Adımı{" "}
                <span>Şimdi Atın</span>
              </h3>
              <p
                className="trust-cta__desc wow fadeInUp"
                data-wow-delay="0.35s"
              >
                Ücretsiz hesabınızla hemen başlayın veya kurumunuzu kaydedin.
              </p>
              <div className="trust-cta__buttons">
                <Link
                  href="/auth/register"
                  className="btn btn-white rounded-pill flex-align gap-8 d-inline-flex wow fadeInUp"
                  data-wow-delay="0.4s"
                >
                  <i className="ph-bold ph-rocket-launch d-flex text-lg" />
                  Hemen Ücretsiz Başla
                  <i className="ph-bold ph-arrow-right d-flex text-lg" />
                </Link>
                <Link
                  href="/auth/register"
                  className="btn btn-outline-white rounded-pill flex-align gap-8 d-inline-flex wow fadeInUp"
                  data-wow-delay="0.45s"
                >
                  <i className="ph-bold ph-buildings d-flex text-lg" />
                  Kurumunuzu Kaydedin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
