import Link from "next/link";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { useState } from "react";

const features = [
  {
    icon: "ph-bold ph-user-circle-gear",
    title: "Yetenek Yönetimi & Aday Havuzu",
    desc: "Eğitimli bireyleri filtreleyin, nitelikli öğretmen ve danışmanları hızla bulun.",
  },
  {
    icon: "ph-bold ph-clipboard-text",
    title: "Eğitim Sektörüne Özel İş İlanları",
    desc: "Öğretmen, rehber öğretmen, eğitim danışmanı ve yönetici pozisyonları.",
  },
  {
    icon: "ph-bold ph-chart-line-up",
    title: "Performans & Gelişim Takibi",
    desc: "Çalışan gelişimini izleyin, bireysel eğitim ihtiyaçlarını tespit edin.",
  },
  {
    icon: "ph-bold ph-shield-check",
    title: "MEB Mevzuatına Uygun Süreçler",
    desc: "Yasal gerekliliklere uygun belgeleme ve işe alım süreci yönetimi.",
  },
];

const stats = [
  {
    icon: "ph-bold ph-users",
    end: 2400,
    suffix: "+",
    label: "Kayıtlı Eğitimci",
  },
  {
    icon: "ph-bold ph-briefcase",
    end: 380,
    suffix: "+",
    label: "Aktif İş İlanı",
  },
  {
    icon: "ph-bold ph-buildings",
    end: 150,
    suffix: "+",
    label: "Kurum İşveren",
  },
  {
    icon: "ph-bold ph-handshake",
    end: 94,
    prefix: "%",
    suffix: "",
    label: "İşe Yerleşme",
  },
];

export default function HrEducationSection() {
  const [viewed, setViewed] = useState(false);

  return (
    <section className="hr-education-section scroll-reveal-section">
      {/* Dekoratif daireler */}
      <div className="hr-section__circle hr-section__circle--1" />
      <div className="hr-section__circle hr-section__circle--2" />

      <div className="container">
        {/* Centered Header */}
        <div className="hr-fullwidth__header">
          <div className="hr-fullwidth__badge" data-aos="fade-down">
            <i className="ph-bold ph-briefcase" />
            İnsan Kaynakları
          </div>
          <h2 className="hr-fullwidth__title wow bounceInRight">
            Eğitim Sektörüne{" "}
            <span style={{ color: "var(--main-200)" }}>Özel İK</span> Çözümleri
          </h2>
          <p className="hr-fullwidth__subtitle wow bounceInUp">
            Okulunuz veya kurumunuz için doğru eğitimciyi bulun. Hızlı ve şeffaf
            işe alım & insan kaynakları yönetim platformu.
          </p>
        </div>

        {/* Feature Grid — 4 kolon */}
        <div className="hr-fullwidth__features">
          {features.map((f, i) => (
            <div
              key={i}
              className="hr-fullwidth__feature-card wow fadeInUp"
              data-wow-delay={`${i * 0.12}s`}
            >
              <div className="hr-fullwidth__feature-icon">
                <i className={f.icon} />
              </div>
              <h5 className="hr-fullwidth__feature-title">{f.title}</h5>
              <p className="hr-fullwidth__feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats Grid — 4 kolon, CountUp */}
        <VisibilitySensor
          onChange={(isVisible: boolean) => {
            if (isVisible) setViewed(true);
          }}
          partialVisibility
          delayedCall
        >
          <div className="hr-fullwidth__stats">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="hr-fullwidth__stat-card wow zoomIn"
                data-wow-delay={`${idx * 0.1}s`}
              >
                <div className="hr-fullwidth__stat-icon">
                  <i className={stat.icon} />
                </div>
                <div className="hr-fullwidth__stat-num">
                  {viewed ? (
                    <CountUp
                      end={stat.end}
                      duration={2.2}
                      separator="."
                      prefix={stat.prefix || ""}
                      suffix={stat.suffix}
                    />
                  ) : (
                    `0${stat.suffix}`
                  )}
                </div>
                <div className="hr-fullwidth__stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </VisibilitySensor>

        {/* CTA Band */}
        <div
          className="hr-fullwidth__cta-band wow fadeInUp"
          data-wow-delay="0.3s"
        >
          <div className="hr-fullwidth__cta-inner">
            <div className="hr-fullwidth__cta-text">
              <i className="ph-bold ph-megaphone" />
              <div>
                <span className="hr-fullwidth__cta-title">
                  Kurumunuz için iş ilanı verin
                </span>
                <span className="hr-fullwidth__cta-sub">
                  Eğitim sektörünün en büyük yetenek platformuna ücretsiz erişin
                </span>
              </div>
            </div>
            <div className="hr-fullwidth__cta-buttons">
              <Link
                href="/search"
                className="btn btn-white rounded-pill flex-align gap-8 d-inline-flex"
              >
                İş İlanlarını Gör
                <i className="ph-bold ph-arrow-up-right d-flex text-lg" />
              </Link>
              <Link
                href="/about"
                className="btn btn-outline-white rounded-pill flex-align gap-8 d-inline-flex"
              >
                Kurum Olarak Kaydol
                <i className="ph-bold ph-arrow-right d-flex text-lg" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
