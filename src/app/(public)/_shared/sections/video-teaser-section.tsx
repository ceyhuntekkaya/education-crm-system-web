import Link from "next/link";

const stats = [
  { icon: "ph-bold ph-users-three", value: "10,000+", label: "Kullanıcı" },
  { icon: "ph-bold ph-buildings", value: "500+", label: "Kurum" },
  { icon: "ph-bold ph-star", value: "%100", label: "Memnuniyet" },
];

const floatingIcons = [
  { icon: "ph-bold ph-monitor-play", top: "10%", left: "14%", delay: 0 },
  {
    icon: "ph-bold ph-chalkboard-teacher",
    top: "24%",
    right: "12%",
    delay: 100,
  },
  {
    icon: "ph-bold ph-magnifying-glass",
    bottom: "32%",
    left: "8%",
    delay: 200,
  },
  { icon: "ph-bold ph-calendar-check", top: "54%", right: "16%", delay: 300 },
  { icon: "ph-bold ph-map-pin", bottom: "14%", left: "32%", delay: 150 },
];

export default function VideoTeaserSection() {
  return (
    <section className="video-teaser-section">
      <div className="container">
        <div className="video-teaser-split">
          {/* Sol — Video Görsel Alanı */}
          <div className="video-teaser-split__visual" data-aos="fade-right">
            <Link href="/video" className="video-teaser-split__illustration">
              {/* Gradient arka plan */}
              <div className="video-teaser-split__gradient" />

              {/* Floating ikonlar */}
              {floatingIcons.map((fi, i) => (
                <div
                  key={i}
                  className="video-teaser-split__float-icon"
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

              {/* Merkez play butonu */}
              <div className="video-teaser-split__center-play">
                <i className="ph-fill ph-play" />
              </div>

              {/* Süre badge */}
              <div className="video-teaser-split__duration">
                <i className="ph ph-clock" />
                <span>5 dakika</span>
              </div>

              {/* Floating stat chips */}
              <div className="video-teaser-split__floating-stats">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className="video-teaser-split__stat-chip"
                    data-aos="zoom-in"
                    data-aos-delay={i * 100 + 200}
                  >
                    <span className="video-teaser-split__stat-val">
                      {s.value}
                    </span>
                    <span className="video-teaser-split__stat-lbl">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </Link>
          </div>

          {/* Sağ — İçerik */}
          <div className="video-teaser-split__content" data-aos="fade-left">
            <div className="video-teaser-split__badge">
              <i className="ph ph-video-camera" />
              Tanıtım Videosu
            </div>

            <h2 className="video-teaser-split__title">
              <span className="text-main-600">Eğitim İste</span>&apos;yi{" "}
              <span className="text-main-two-600">5 Dakikada</span> Keşfedin
            </h2>

            <p className="video-teaser-split__desc">
              Platformumuzun tüm özelliklerini keşfedin. Eğitim kurumlarını
              nasıl bulacağınızı, karşılaştıracağınızı ve randevu alacağınızı
              öğrenin.
            </p>

            {/* CTA */}
            <Link
              href="/video"
              className="btn btn-main rounded-pill flex-align gap-8 d-inline-flex"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Videoyu İzle
              <i className="ph-bold ph-play-circle d-flex text-lg" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
