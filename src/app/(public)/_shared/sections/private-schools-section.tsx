import Link from "next/link";

const categories = [
  {
    icon: "ph-bold ph-baby",
    label: "Anaokulu & Kreş",
    count: "120+ okul",
    color: "var(--main-three-600)",
    bg: "var(--main-three-50)",
  },
  {
    icon: "ph-bold ph-book-open-text",
    label: "İlkokul",
    count: "280+ okul",
    color: "var(--main-600)",
    bg: "var(--main-50)",
  },
  {
    icon: "ph-bold ph-student",
    label: "Ortaokul",
    count: "210+ okul",
    color: "var(--main-two-600)",
    bg: "var(--main-two-50)",
  },
  {
    icon: "ph-bold ph-graduation-cap",
    label: "Lise",
    count: "240+ okul",
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
];

const stats = [
  { value: "850+", label: "Kayıtlı Okul" },
  { value: "4.8★", label: "Ort. Puan" },
  { value: "12K+", label: "Veli Yorumu" },
];

/* Gradient "illustration" alanındaki floating ikonlar */
const floatingIcons = [
  { icon: "ph-bold ph-buildings", top: "12%", left: "15%", delay: 0 },
  { icon: "ph-bold ph-star", top: "25%", right: "12%", delay: 100 },
  { icon: "ph-bold ph-map-pin", bottom: "30%", left: "10%", delay: 200 },
  { icon: "ph-bold ph-certificate", top: "55%", right: "18%", delay: 300 },
  { icon: "ph-bold ph-users-three", bottom: "12%", left: "35%", delay: 150 },
];

export default function PrivateSchoolsSection() {
  return (
    <section className="private-schools-section">
      <div className="container">
        <div className="school-teaser-split">
          {/* Sol — Dekoratif Görsel Alan (CSS Gradient Illustration) */}
          <div className="school-teaser-split__visual" data-aos="fade-right">
            <div className="school-teaser-split__illustration">
              {/* Gradient arka plan */}
              <div className="school-teaser-split__gradient" />

              {/* Floating ikonlar */}
              {floatingIcons.map((fi, i) => (
                <div
                  key={i}
                  className="school-teaser-split__float-icon"
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
              <div className="school-teaser-split__center-icon">
                <i className="ph-bold ph-buildings" />
              </div>

              {/* Floating stat chips */}
              <div className="school-teaser-split__floating-stats">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className="school-teaser-split__stat-chip"
                    data-aos="zoom-in"
                    data-aos-delay={i * 100 + 200}
                  >
                    <span className="school-teaser-split__stat-val">
                      {s.value}
                    </span>
                    <span className="school-teaser-split__stat-lbl">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sağ — İçerik + Kategoriler + CTA */}
          <div className="school-teaser-split__content" data-aos="fade-left">
            <div className="school-teaser-split__badge">
              <i className="ph-bold ph-buildings" />
              Özel Okullar
            </div>

            <h2 className="school-teaser-split__title">
              <span className="text-main-600">Türkiye&apos;nin En İyi</span>{" "}
              Özel Okullarını Keşfedin
            </h2>

            <p className="school-teaser-split__desc">
              Anaokulu&apos;ndan liseye, Türkiye genelindeki özel okulları
              keşfedin. Konuma, fiyata ve değerlendirmelere göre karşılaştırın,
              tanışma randevusu alın.
            </p>

            {/* Kategori Kartları */}
            <div className="school-teaser-split__categories">
              {categories.map((cat, i) => (
                <Link
                  href="/search"
                  key={i}
                  className="school-teaser-split__cat-card"
                  data-aos="fade-up"
                  data-aos-delay={i * 70}
                >
                  <div
                    className="school-teaser-split__cat-icon"
                    style={{ background: cat.bg, color: cat.color }}
                  >
                    <i className={cat.icon} />
                  </div>
                  <div className="school-teaser-split__cat-text">
                    <span className="school-teaser-split__cat-label">
                      {cat.label}
                    </span>
                    <span className="school-teaser-split__cat-count">
                      {cat.count}
                    </span>
                  </div>
                  <i className="ph ph-arrow-right school-teaser-split__cat-arrow" />
                </Link>
              ))}
            </div>

            <Link
              href="/search"
              className="btn btn-main rounded-pill flex-align gap-8 d-inline-flex"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Tüm Okulları Keşfet
              <i className="ph-bold ph-arrow-up-right d-flex text-lg" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
