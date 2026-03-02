import Link from "next/link";

const features = [
  {
    icon: "ph-bold ph-wifi-high",
    title: "Online, Yüz Yüze & Hibrit",
    desc: "Dilediğiniz formatta, dilediğiniz yerden katılın.",
    num: "01",
  },
  {
    icon: "ph-bold ph-calendar-check",
    title: "Takvim Entegrasyonu",
    desc: "Google, Outlook ve Apple takvimlerinize anında ekleyin.",
    num: "02",
  },
  {
    icon: "ph-bold ph-certificate",
    title: "Katılım Sertifikası",
    desc: "Her etkinlik sonrasında dijital sertifikanızı alın.",
    num: "03",
  },
  {
    icon: "ph-bold ph-video-camera",
    title: "Kayıt & Tekrar İzle",
    desc: "Kaçırdığınız etkinlikleri istediğiniz zaman izleyin.",
    num: "04",
  },
];

const stats = [
  { value: "120+", label: "Etkinlik" },
  { value: "45K+", label: "Katılımcı" },
  { value: "80+", label: "Uzman Konuşmacı" },
];

const floatingIcons = [
  {
    icon: "ph-bold ph-video-camera",
    top: "10%",
    left: "14%",
    delay: 0,
    duration: "3.8s",
  },
  {
    icon: "ph-bold ph-microphone-stage",
    top: "24%",
    right: "12%",
    delay: 100,
    duration: "4.3s",
  },
  {
    icon: "ph-bold ph-calendar-dots",
    bottom: "32%",
    left: "8%",
    delay: 200,
    duration: "3.5s",
  },
  {
    icon: "ph-bold ph-presentation-chart",
    top: "54%",
    right: "16%",
    delay: 300,
    duration: "4.7s",
  },
  {
    icon: "ph-bold ph-users-three",
    bottom: "14%",
    left: "32%",
    delay: 150,
    duration: "3.2s",
  },
];

export default function WebinarsSection() {
  return (
    <section className="webinar-section scroll-reveal-section">
      <div className="container">
        <div className="webinar-teaser-split">
          {/* Sol — İçerik + Özellikler + CTA */}
          <div className="webinar-teaser-split__content">
            <div className="webinar-teaser-split__badge" data-aos="fade-down">
              <i className="ph-bold ph-video-camera" />
              Webinar & Etkinlik
            </div>

            <h2 className="webinar-teaser-split__title wow fadeInUp">
              Uzmanlarla Buluşun,{" "}
              <span className="text-main-two-600">Gelişime Katılın</span>
            </h2>

            <p
              className="webinar-teaser-split__desc wow fadeInUp"
              data-wow-delay="0.1s"
            >
              Eğitim dünyasının önde gelen uzmanlarıyla canlı webinar ve
              etkinliklere katılın. Dijitalden yüz yüzeye, her formatta
              profesyonel gelişiminize yatırım yapın.
            </p>

            {/* Features — numaralı badge'ler eklendi */}
            <div className="webinar-teaser-split__features">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="webinar-feature-item wow fadeInUp"
                  data-wow-delay={`${i * 0.1}s`}
                >
                  <div className="webinar-feature-item__num">{f.num}</div>
                  <div className="webinar-feature-item__icon">
                    <i className={f.icon} />
                  </div>
                  <div className="webinar-feature-item__body">
                    <h6>{f.title}</h6>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="d-flex flex-wrap gap-12">
              <Link
                href="/webinars"
                className="btn btn-orange rounded-pill flex-align gap-8 d-inline-flex wow fadeInUp"
                data-wow-delay="0.35s"
              >
                Tüm Etkinlikleri Gör
                <i className="ph-bold ph-arrow-up-right d-flex text-lg" />
              </Link>
              <Link
                href="/search"
                className="btn btn-outline-orange rounded-pill flex-align gap-8 d-inline-flex wow fadeInUp"
                data-wow-delay="0.4s"
              >
                Etkinlik Ara
                <i className="ph-bold ph-magnifying-glass d-flex text-lg" />
              </Link>
            </div>
          </div>

          {/* Sağ — Dekoratif Görsel Alan */}
          <div className="webinar-teaser-split__visual wow fadeInRight">
            <div className="webinar-teaser-split__illustration">
              <div className="webinar-teaser-split__gradient" />

              {/* Floating ikonlar — farklı duration'larla organik hareket */}
              {floatingIcons.map((fi, i) => (
                <div
                  key={i}
                  className="webinar-teaser-split__float-icon wow zoomIn"
                  style={
                    {
                      top: fi.top,
                      left: fi.left,
                      right: fi.right,
                      bottom: fi.bottom,
                      animationDuration: fi.duration,
                    } as React.CSSProperties
                  }
                  data-wow-delay={`${fi.delay / 1000}s`}
                >
                  <i className={fi.icon} />
                </div>
              ))}

              <div className="webinar-teaser-split__center-icon">
                <i className="ph-bold ph-video-camera" />
              </div>

              <div className="webinar-teaser-split__floating-stats">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className="webinar-teaser-split__stat-chip wow zoomIn"
                    data-wow-delay={`${i * 0.1 + 0.2}s`}
                  >
                    <span className="webinar-teaser-split__stat-val">
                      {s.value}
                    </span>
                    <span className="webinar-teaser-split__stat-lbl">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
