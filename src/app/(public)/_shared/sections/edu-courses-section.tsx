import Link from "next/link";

const categories = [
  {
    icon: "ph-bold ph-math-operations",
    label: "LGS Hazırlık",
    count: "120+ kurs",
    color: "var(--main-600)",
    bg: "var(--main-50)",
  },
  {
    icon: "ph-bold ph-graduation-cap",
    label: "YKS / AYT",
    count: "98+ kurs",
    color: "var(--main-two-600)",
    bg: "var(--main-two-50)",
  },
  {
    icon: "ph-bold ph-book-open",
    label: "Lise Destek",
    count: "76+ kurs",
    color: "var(--main-three-600)",
    bg: "var(--main-three-50)",
  },
  {
    icon: "ph-bold ph-chalkboard-teacher",
    label: "Birebir Özel Ders",
    count: "210+ ilan",
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
];

const stats = [
  { value: "420+", label: "Aktif Kurs" },
  { value: "%87", label: "Başarı Oranı" },
  { value: "18K+", label: "Öğrenci" },
];

/* Gradient "illustration" alanındaki floating ikonlar */
const floatingIcons = [
  { icon: "ph-bold ph-graduation-cap", top: "12%", left: "15%", delay: 0 },
  { icon: "ph-bold ph-book-open", top: "25%", right: "12%", delay: 100 },
  { icon: "ph-bold ph-target", bottom: "30%", left: "10%", delay: 200 },
  { icon: "ph-bold ph-trophy", top: "55%", right: "18%", delay: 300 },
  { icon: "ph-bold ph-chart-line-up", bottom: "12%", left: "35%", delay: 150 },
];

export default function EduCoursesSection() {
  return (
    <section className="edu-courses-section scroll-reveal-section">
      <div className="container">
        <div className="edu-teaser-split">
          {/* Sol — İçerik + Kategoriler + CTA */}
          <div className="edu-teaser-split__content">
            <div className="edu-teaser-split__badge" data-aos="fade-down">
              <i className="ph-bold ph-graduation-cap" />
              Lise & Üniversite
            </div>

            <h2 className="edu-teaser-split__title wow fadeInUp">
              <span className="text-main-two-600">Sınav Hazırlık</span>{" "}
              Kurslarında Fark Yaratın
            </h2>

            <p
              className="edu-teaser-split__desc wow fadeInUp"
              data-wow-delay="0.1s"
            >
              LGS, YKS, AYT ve üniversite hazırlık programlarında Türkiye
              genelindeki en iyi kurslara ulaşın. Uzman eğitmenler, kanıtlanmış
              müfredat ve garantili başarı.
            </p>

            {/* Kategori Kartları */}
            <div className="edu-teaser-split__categories">
              {categories.map((cat, i) => (
                <Link
                  href="/search"
                  key={i}
                  className="edu-teaser-split__cat-card wow fadeInUp"
                  data-wow-delay={`${i * 0.1}s`}
                >
                  <div
                    className="edu-teaser-split__cat-icon"
                    style={{ background: cat.bg, color: cat.color }}
                  >
                    <i className={cat.icon} />
                  </div>
                  <div className="edu-teaser-split__cat-text">
                    <span className="edu-teaser-split__cat-label">
                      {cat.label}
                    </span>
                    <span className="edu-teaser-split__cat-count">
                      {cat.count}
                    </span>
                  </div>
                  <i className="ph ph-arrow-right edu-teaser-split__cat-arrow" />
                </Link>
              ))}
            </div>

            <div className="d-flex flex-wrap gap-12">
              <Link
                href="/edu-courses"
                className="btn btn-orange rounded-pill flex-align gap-8 d-inline-flex wow fadeInUp"
                data-wow-delay="0.35s"
              >
                Detaylı Bilgi
                <i className="ph-bold ph-arrow-up-right d-flex text-lg" />
              </Link>
              <Link
                href="/search"
                className="btn btn-outline-orange rounded-pill flex-align gap-8 d-inline-flex wow fadeInUp"
                data-wow-delay="0.4s"
              >
                Kurs Ara
                <i className="ph-bold ph-magnifying-glass d-flex text-lg" />
              </Link>
            </div>
          </div>

          {/* Sağ — Dekoratif Görsel Alan (CSS Gradient Illustration) */}
          <div className="edu-teaser-split__visual wow fadeInRight">
            <div className="edu-teaser-split__illustration">
              {/* Gradient arka plan */}
              <div className="edu-teaser-split__gradient" />

              {/* Floating ikonlar */}
              {floatingIcons.map((fi, i) => (
                <div
                  key={i}
                  className="edu-teaser-split__float-icon wow zoomIn"
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

              {/* Merkez büyük ikon */}
              <div className="edu-teaser-split__center-icon">
                <i className="ph-bold ph-graduation-cap" />
              </div>

              {/* Floating stat chips */}
              <div className="edu-teaser-split__floating-stats">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className="edu-teaser-split__stat-chip wow zoomIn"
                    data-wow-delay={`${i * 0.1 + 0.2}s`}
                  >
                    <span className="edu-teaser-split__stat-val">
                      {s.value}
                    </span>
                    <span className="edu-teaser-split__stat-lbl">
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
