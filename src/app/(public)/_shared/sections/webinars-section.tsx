import Link from "next/link";

const features = [
  {
    icon: "ph-bold ph-wifi-high",
    title: "Online, Yüz Yüze & Hibrit",
    desc: "Dilediğiniz formatta, dilediğiniz yerden katılın.",
  },
  {
    icon: "ph-bold ph-calendar-check",
    title: "Takvim Entegrasyonu",
    desc: "Google, Outlook ve Apple takvimlerinize anında ekleyin.",
  },
  {
    icon: "ph-bold ph-certificate",
    title: "Katılım Sertifikası",
    desc: "Her etkinlik sonrasında dijital sertifikanızı alın.",
  },
  {
    icon: "ph-bold ph-video-camera",
    title: "Kayıt & Tekrar İzle",
    desc: "Kaçırdığınız etkinlikleri istediğiniz zaman izleyin.",
  },
];

const stats = [
  { value: "120+", label: "Etkinlik" },
  { value: "45K+", label: "Katılımcı" },
  { value: "80+", label: "Uzman Konuşmacı" },
];

const floatingIcons = [
  { icon: "ph-bold ph-video-camera", top: "10%", left: "14%", delay: 0 },
  { icon: "ph-bold ph-microphone-stage", top: "24%", right: "12%", delay: 100 },
  { icon: "ph-bold ph-calendar-dots", bottom: "32%", left: "8%", delay: 200 },
  {
    icon: "ph-bold ph-presentation-chart",
    top: "54%",
    right: "16%",
    delay: 300,
  },
  { icon: "ph-bold ph-users-three", bottom: "14%", left: "32%", delay: 150 },
];

export default function WebinarsSection() {
  return (
    <section className="webinar-section">
      <div className="container">
        <div className="webinar-teaser-split">
          {/* Sol — İçerik + Özellikler + CTA */}
          <div className="webinar-teaser-split__content" data-aos="fade-right">
            <div className="webinar-teaser-split__badge">
              <i className="ph-bold ph-video-camera" />
              Webinar & Etkinlik
            </div>

            <h2 className="webinar-teaser-split__title">
              Uzmanlarla Buluşun,{" "}
              <span className="text-main-two-600">Gelişime Katılın</span>
            </h2>

            <p className="webinar-teaser-split__desc">
              Eğitim dünyasının önde gelen uzmanlarıyla canlı webinar ve
              etkinliklere katılın. Dijitalden yüz yüzeye, her formatta
              profesyonel gelişiminize yatırım yapın.
            </p>

            {/* Features — icon + title + desc (diğer sectionlarla uyumlu) */}
            <div className="webinar-teaser-split__features">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="webinar-feature-item"
                  data-aos="fade-right"
                  data-aos-delay={i * 70}
                >
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
            <Link
              href="/search"
              className="btn btn-main-two rounded-pill flex-align gap-8 d-inline-flex"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Tüm Etkinlikleri Gör
              <i className="ph-bold ph-arrow-up-right d-flex text-lg" />
            </Link>
          </div>

          {/* Sağ — Dekoratif Görsel Alan */}
          <div className="webinar-teaser-split__visual" data-aos="fade-left">
            <div className="webinar-teaser-split__illustration">
              {/* Gradient arka plan */}
              <div className="webinar-teaser-split__gradient" />

              {/* Floating ikonlar */}
              {floatingIcons.map((fi, i) => (
                <div
                  key={i}
                  className="webinar-teaser-split__float-icon"
                  style={
                    {
                      top: fi.top,
                      left: fi.left,
                      right: fi.right,
                      bottom: fi.bottom,
                    } as React.CSSProperties
                  }
                  data-aos="zoom-in"
                  data-aos-delay={fi.delay}
                >
                  <i className={fi.icon} />
                </div>
              ))}

              {/* Merkez büyük ikon */}
              <div className="webinar-teaser-split__center-icon">
                <i className="ph-bold ph-video-camera" />
              </div>

              {/* Floating stat chips */}
              <div className="webinar-teaser-split__floating-stats">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className="webinar-teaser-split__stat-chip"
                    data-aos="zoom-in"
                    data-aos-delay={i * 100 + 200}
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
