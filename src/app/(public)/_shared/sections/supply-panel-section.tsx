import Link from "next/link";

const companyFeatures = [
  {
    num: "01",
    icon: "ph-bold ph-package",
    title: "Ürün & Hizmet Kataloğu",
    desc: "5.800+ onaylı ürün ve hizmeti kategori, marka ve fiyata göre filtreleyin.",
  },
  {
    num: "02",
    icon: "ph-bold ph-file-text",
    title: "Alım İlanı (RFQ) Sistemi",
    desc: "Satın alma talebinizi yayınlayın; birden fazla tedarikçiden rekabetçi teklif alın.",
  },
  {
    num: "03",
    icon: "ph-bold ph-buildings",
    title: "Onaylı Tedarikçi Rehberi",
    desc: "320+ doğrulanmış tedarikçiyi inceleyin, değerlendirme puanlarına göre karşılaştırın.",
  },
];

const floatingIcons = [
  { icon: "ph-bold ph-package", top: "10%", left: "14%", delay: 0 },
  { icon: "ph-bold ph-file-text", top: "24%", right: "12%", delay: 100 },
  { icon: "ph-bold ph-buildings", bottom: "32%", left: "8%", delay: 200 },
  { icon: "ph-bold ph-clipboard-text", top: "55%", right: "16%", delay: 300 },
  { icon: "ph-bold ph-storefront", bottom: "14%", left: "32%", delay: 150 },
];

const stats = [
  { value: "320+", label: "Onaylı Tedarikçi" },
  { value: "5.8K+", label: "Ürün & Hizmet" },
  { value: "%96", label: "Memnuniyet" },
];

export default function SupplyPanelSection() {
  return (
    <section className="supply-panel-section scroll-reveal-section">
      <div className="container">
        <div className="supply-teaser-split">
          {/* Sol — İçerik */}
          <div className="supply-teaser-split__content">
            <div className="supply-teaser-split__badge" data-aos="fade-down">
              <i className="ph-bold ph-storefront" />
              Tedarik Paneli
            </div>

            <h2 className="supply-teaser-split__title wow fadeInUp">
              Eğitim Tedarikini{" "}
              <span className="text-main-600">Dijitalleştirin</span>
            </h2>

            <p
              className="supply-teaser-split__desc wow fadeInUp"
              data-wow-delay="0.1s"
            >
              Eğitim kurumları ile tedarikçileri tek platformda buluşturan
              akıllı tedarik sistemi. Ürün arayın, alım ilanı oluşturun,
              teklifleri karşılaştırın.
            </p>

            {/* Özellikler */}
            <div className="supply-teaser-split__features">
              {companyFeatures.map((f, i) => (
                <div
                  key={i}
                  className="supply-feature-item wow fadeInUp"
                  data-wow-delay={`${i * 0.1}s`}
                >
                  <div className="supply-feature-item__num">{f.num}</div>
                  <div className="supply-feature-item__icon">
                    <i className={f.icon} />
                  </div>
                  <div className="supply-feature-item__body">
                    <h6>{f.title}</h6>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="d-flex flex-wrap gap-12 mt-32">
              <Link
                href="/supply-panel"
                className="btn btn-main rounded-pill flex-align gap-8 d-inline-flex wow fadeInUp"
                data-wow-delay="0.35s"
              >
                <i className="ph-bold ph-storefront d-flex text-lg" />
                Tedarik Platformunu Keşfet
              </Link>
              <Link
                href="/auth/register/institution"
                className="btn btn-outline-main rounded-pill flex-align gap-8 d-inline-flex wow fadeInUp"
                data-wow-delay="0.4s"
              >
                Kurum Kaydı Yap
                <i className="ph-bold ph-arrow-right d-flex text-lg" />
              </Link>
            </div>
          </div>

          {/* Sağ — Dekoratif İllüstrasyon */}
          <div className="supply-teaser-split__visual wow fadeInRight">
            <div className="supply-teaser-split__illustration">
              <div className="supply-teaser-split__gradient" />

              {floatingIcons.map((fi, i) => (
                <div
                  key={i}
                  className="supply-teaser-split__float-icon wow zoomIn"
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

              <div className="supply-teaser-split__center-icon">
                <i className="ph-bold ph-storefront" />
              </div>

              <div className="supply-teaser-split__floating-stats">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className="supply-teaser-split__stat-chip wow zoomIn"
                    data-wow-delay={`${i * 0.1 + 0.2}s`}
                  >
                    <span className="supply-teaser-split__stat-val">
                      {s.value}
                    </span>
                    <span className="supply-teaser-split__stat-lbl">
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
