import Link from "next/link";

const steps = [
  {
    icon: "ph-bold ph-magnifying-glass",
    title: "Ara & Keşfet",
    desc: "İhtiyacınıza uygun okul, kurs veya etkinliği konum, fiyat ve değerlendirmelere göre arayın.",
    gradient: "linear-gradient(135deg, var(--main-600), #6c5ce7)",
  },
  {
    icon: "ph-bold ph-scales",
    title: "Karşılaştır & İncele",
    desc: "Kurumları yan yana karşılaştırın, veli yorumlarını okuyun ve en doğru kararı verin.",
    gradient: "linear-gradient(135deg, var(--main-two-600), #f7931e)",
  },
  {
    icon: "ph-bold ph-rocket-launch",
    title: "Kayıt Ol & Başla",
    desc: "Beğendiğiniz kuruma hemen randevu alın veya online kayıt sürecini başlatın.",
    gradient: "linear-gradient(135deg, var(--main-three-600), #00cec9)",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="hiw-section">
      <div className="container">
        {/* Başlık */}
        <div className="hiw-section__header" data-aos="fade-up">
          <div className="hiw-section__badge">
            <i className="ph-bold ph-path" />
            Nasıl Çalışır?
          </div>
          <h2 className="hiw-section__title">
            Üç Basit Adımda{" "}
            <span className="text-main-600">Hedefinize Ulaşın</span>
          </h2>
          <p className="hiw-section__subtitle">
            Hayalinizdeki eğitim kurumunu bulun, inceleyin ve kayıt olun — hepsi
            bu kadar kolay.
          </p>
        </div>

        {/* Steps — Timeline */}
        <div className="hiw-timeline">
          {/* Bağlantı çizgisi (CSS ile) */}
          <div className="hiw-timeline__line" />

          {steps.map((step, i) => (
            <div
              key={i}
              className="hiw-timeline__step"
              data-aos="fade-up"
              data-aos-delay={i * 120}
            >
              {/* Numara dairesi */}
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
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="hiw-section__cta"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <Link
            href="/search"
            className="btn btn-main rounded-pill flex-align gap-8 d-inline-flex"
          >
            Hemen Keşfet
            <i className="ph-bold ph-arrow-up-right d-flex text-lg" />
          </Link>
        </div>
      </div>
    </section>
  );
}
