import Link from "next/link";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { useState } from "react";

const features = [
  {
    icon: "ph-bold ph-user-circle-gear",
    title: "Geniş Aday Havuzu",
    desc: "Binlerce onaylı eğitimci özgeçmişine anında erişim sağlayın.",
  },
  {
    icon: "ph-bold ph-clipboard-text",
    title: "Hızlı İlan Yayınlama",
    desc: "Öğretmen, idari kadro ve destek personel ilanlarınızı dakikalar içinde oluşturun.",
  },
  {
    icon: "ph-bold ph-chart-line-up",
    title: "Başvuru Yönetim Paneli",
    desc: "Gelen başvuruları kolayca filtreleyin, mülakatları planlayın ve süreci yönetin.",
  },
  {
    icon: "ph-bold ph-shield-check",
    title: "Kurumsal Marka Yönetimi",
    desc: "Kurumunuzun işveren markasını güçlendirin ve en iyi yetenekleri cezbedin.",
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
          <h2 className="hr-fullwidth__title wow fadeInUp">
            Eğitim Sektörüne{" "}
            <span style={{ color: "var(--main-200)" }}>Özel İK</span> Çözümleri
          </h2>
          <p
            className="hr-fullwidth__subtitle wow fadeInUp"
            data-wow-delay="0.1s"
          >
            Nitelikli öğretmen ve idari personel ihtiyaçlarınızı en hızlı
            şekilde karşılayın. Eğitim sektörüne özel İK çözümleriyle kadronuzu
            güçlendirin.
          </p>
        </div>

        {/* Feature Grid — 4 kolon */}
        <div className="hr-fullwidth__features">
          {features.map((f, i) => (
            <div
              key={i}
              className="hr-fullwidth__feature-card wow fadeInUp"
              data-wow-delay={`${i * 0.1}s`}
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
                  Aradığınız Yeteneği Hemen Bulun
                </span>
                <span className="hr-fullwidth__cta-sub">
                  İlk iş ilanınızı ücretsiz yayınlayın ve adaylarla tanışın.
                </span>
              </div>
            </div>
            <div className="hr-fullwidth__cta-buttons">
              <Link
                href="/hr-education"
                className="btn btn-white rounded-pill flex-align gap-8 d-inline-flex wow fadeInUp"
                data-wow-delay="0.35s"
              >
                İK Çözümlerini İncele
                <i className="ph-bold ph-arrow-up-right d-flex text-lg" />
              </Link>
              <Link
                href="/auth/register"
                className="btn btn-outline-white rounded-pill flex-align gap-8 d-inline-flex wow fadeInUp"
                data-wow-delay="0.4s"
              >
                İlan Yayınla
                <i className="ph-bold ph-plus-circle d-flex text-lg" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
