import Link from "next/link";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { useState } from "react";

const steps = [
  {
    icon: "ph-bold ph-magnifying-glass",
    title: "Ara & Keşfet",
    desc: "İhtiyacınıza uygun okul, kurs veya etkinliği konum, fiyat ve değerlendirmelere göre arayın.",
    gradient: "linear-gradient(135deg, var(--main-600), #6c5ce7)",
    stat: { end: 850, suffix: "+", label: "Kurum" },
  },
  {
    icon: "ph-bold ph-scales",
    title: "Karşılaştır & İncele",
    desc: "Kurumları yan yana karşılaştırın, veli yorumlarını okuyun ve en doğru kararı verin.",
    gradient: "linear-gradient(135deg, var(--main-two-600), #f7931e)",
    stat: { end: 12, suffix: "K+", label: "Yorum" },
  },
  {
    icon: "ph-bold ph-rocket-launch",
    title: "Kayıt Ol & Başla",
    desc: "Beğendiğiniz kuruma hemen randevu alın veya online kayıt sürecini başlatın.",
    gradient: "linear-gradient(135deg, var(--main-three-600), #00cec9)",
    stat: { end: 10, suffix: "K+", label: "Kullanıcı" },
  },
];

export default function HowItWorksSection() {
  const [viewed, setViewed] = useState(false);

  return (
    <section className="hiw-section">
      {/* Dekoratif breathing arka plan orb'ları */}
      <div className="hiw-section__orb hiw-section__orb--1" />
      <div className="hiw-section__orb hiw-section__orb--2" />
      <div className="hiw-section__orb hiw-section__orb--3" />

      <div className="container">
        {/* Başlık */}
        <div className="hiw-section__header" data-aos="fade-up">
          <div className="hiw-section__badge">
            <i className="ph-bold ph-path" />
            Nasıl Çalışır?
          </div>
          <h2 className="hiw-section__title">
            Üç Basit Adımda{" "}
            <span className="text-gradient-main">Hedefinize Ulaşın</span>
          </h2>
          <p className="hiw-section__subtitle">
            Hayalinizdeki eğitim kurumunu bulun, inceleyin ve kayıt olun — hepsi
            bu kadar kolay.
          </p>
        </div>

        {/* Steps — Timeline */}
        <VisibilitySensor
          onChange={(isVisible: boolean) => {
            if (isVisible) setViewed(true);
          }}
          partialVisibility
          delayedCall
        >
          <div className="hiw-timeline">
            {/* SVG Bağlantı çizgisi — animate stroke */}
            <div className="hiw-timeline__line" />

            {steps.map((step, i) => (
              <div
                key={i}
                className="hiw-timeline__step"
                data-aos="zoom-in-up"
                data-aos-delay={i * 150}
              >
                {/* Numara dairesi — CountUp */}
                <div
                  className="hiw-timeline__number"
                  style={{ background: step.gradient }}
                >
                  {i + 1}
                </div>

                {/* Kart */}
                <div className="hiw-timeline__card">
                  <div
                    className="hiw-timeline__icon"
                    style={{ background: step.gradient }}
                  >
                    <i className={step.icon} />
                  </div>
                  <h5 className="hiw-timeline__card-title">{step.title}</h5>
                  <p className="hiw-timeline__card-desc">{step.desc}</p>

                  {/* Kart içi stat — CountUp */}
                  <div className="hiw-timeline__card-stat">
                    <span className="hiw-timeline__card-stat-num">
                      {viewed ? (
                        <CountUp
                          end={step.stat.end}
                          duration={2}
                          suffix={step.stat.suffix}
                        />
                      ) : (
                        `0${step.stat.suffix}`
                      )}
                    </span>
                    <span className="hiw-timeline__card-stat-label">
                      {step.stat.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </VisibilitySensor>

        {/* CTA */}
        <div
          className="hiw-section__cta"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <Link
            href="/search"
            className="btn btn-main rounded-pill flex-align gap-8 d-inline-flex hiw-cta-btn"
          >
            Hemen Keşfet
            <i className="ph-bold ph-arrow-up-right d-flex text-lg" />
          </Link>
        </div>
      </div>
    </section>
  );
}
