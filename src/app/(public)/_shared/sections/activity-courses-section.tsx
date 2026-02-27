import Link from "next/link";

const categories = [
  {
    icon: "ph-bold ph-music-note",
    label: "Müzik",
    count: "120+ kurum",
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    icon: "ph-bold ph-soccer-ball",
    label: "Spor",
    count: "85+ kurum",
    color: "#16a34a",
    bg: "#f0fdf4",
  },
  {
    icon: "ph-bold ph-paint-brush",
    label: "Resim & Sanat",
    count: "94+ kurum",
    color: "#d97706",
    bg: "#fffbeb",
  },
  {
    icon: "ph-bold ph-person-simple-walk",
    label: "Dans",
    count: "67+ kurum",
    color: "#db2777",
    bg: "#fdf2f8",
  },
  {
    icon: "ph-bold ph-crown",
    label: "Satranç",
    count: "51+ kurum",
    color: "#0f766e",
    bg: "#f0fdfa",
  },
  {
    icon: "ph-bold ph-swimming-pool",
    label: "Yüzme",
    count: "73+ kurum",
    color: "#0369a1",
    bg: "#eff6ff",
  },
];

const stats = [
  { value: "500+", label: "Aktif Kurum" },
  { value: "8", label: "Kategori" },
  { value: "35K+", label: "Öğrenci" },
];

const floatingIcons = [
  { icon: "ph-bold ph-music-note", top: "10%", left: "12%", delay: 0 },
  { icon: "ph-bold ph-soccer-ball", top: "22%", right: "14%", delay: 100 },
  { icon: "ph-bold ph-paint-brush", bottom: "32%", left: "8%", delay: 200 },
  { icon: "ph-bold ph-mask-happy", top: "52%", right: "10%", delay: 300 },
  { icon: "ph-bold ph-robot", bottom: "14%", left: "30%", delay: 150 },
];

export default function ActivityCoursesSection() {
  return (
    <section className="activity-courses-section scroll-reveal-section">
      <div className="container">
        <div className="activity-teaser-split">
          {/* Sol — Dekoratif Görsel Alan */}
          <div className="activity-teaser-split__visual wow fadeInLeft">
            <div className="activity-teaser-split__illustration">
              <div className="activity-teaser-split__gradient" />

              {floatingIcons.map((fi, i) => (
                <div
                  key={i}
                  className="activity-teaser-split__float-icon wow zoomIn"
                  style={
                    {
                      top: fi.top,
                      left: fi.left,
                      right: fi.right,
                      bottom: fi.bottom,
                    } as React.CSSProperties
                  }
                  data-wow-delay={`${fi.delay / 1000}s`}
                >
                  <i className={fi.icon} />
                </div>
              ))}

              <div className="activity-teaser-split__center-icon">
                <i className="ph-bold ph-sparkle" />
              </div>

              <div className="activity-teaser-split__floating-stats">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className="activity-teaser-split__stat-chip wow zoomIn"
                    data-wow-delay={`${i * 0.1 + 0.2}s`}
                  >
                    <span className="activity-teaser-split__stat-val">
                      {s.value}
                    </span>
                    <span className="activity-teaser-split__stat-lbl">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sağ — İçerik + Kategoriler + CTA */}
          <div className="activity-teaser-split__content">
            <div className="activity-teaser-split__badge" data-aos="fade-down">
              <i className="ph-bold ph-sparkle" />
              Aktivite Kursları
            </div>

            <h2 className="activity-teaser-split__title wow fadeInUp">
              <span className="text-main-three-600">Yeteneği Keşfet</span>,
              Tutkuyu Geliştir
            </h2>

            <p
              className="activity-teaser-split__desc wow fadeInUp"
              data-wow-delay="0.1s"
            >
              Müzikten spora, sanattan teknolojiye — çocuğunuzun ilgi alanına
              uygun aktivite kurslarını bulun ve yeteneklerini en iyi
              eğitmenlerle geliştirin.
            </p>

            {/* Kategori Kartları — 2×3 Grid */}
            <div className="activity-teaser-split__categories">
              {categories.map((cat, i) => (
                <Link
                  href="/search"
                  key={i}
                  className="activity-teaser-split__cat-card wow fadeInUp"
                  data-wow-delay={`${i * 0.1}s`}
                >
                  <div
                    className="activity-teaser-split__cat-icon"
                    style={{ background: cat.bg, color: cat.color }}
                  >
                    <i className={cat.icon} />
                  </div>
                  <div className="activity-teaser-split__cat-text">
                    <span className="activity-teaser-split__cat-label">
                      {cat.label}
                    </span>
                    <span className="activity-teaser-split__cat-count">
                      {cat.count}
                    </span>
                  </div>
                  <i className="ph ph-arrow-right activity-teaser-split__cat-arrow" />
                </Link>
              ))}
            </div>

            <Link
              href="/search"
              className="btn btn-main-three rounded-pill flex-align gap-8 d-inline-flex wow fadeInUp"
              data-wow-delay="0.4s"
            >
              Tüm Aktiviteleri Keşfet
              <i className="ph-bold ph-arrow-up-right d-flex text-lg" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
