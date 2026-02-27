import Link from "next/link";

const features = [
  {
    icon: "ph-bold ph-user-circle-gear",
    title: "Yetenek Yönetimi & Aday Havuzu",
    desc: "Eğitimli bireyleri filtreleyin, nitelikli öğretmen ve danışmanları hızla bulun.",
  },
  {
    icon: "ph-bold ph-clipboard-text",
    title: "Eğitim Sektörüne Özel İş İlanları",
    desc: "Öğretmen, rehber öğretmen, eğitim danışmanı ve yönetici pozisyonları.",
  },
  {
    icon: "ph-bold ph-chart-line-up",
    title: "Performans & Gelişim Takibi",
    desc: "Çalışan gelişimini izleyin, bireysel eğitim ihtiyaçlarını tespit edin.",
  },
  {
    icon: "ph-bold ph-shield-check",
    title: "MEB Mevzuatına Uygun Süreçler",
    desc: "Yasal gerekliliklere uygun belgeleme ve işe alım süreci yönetimi.",
  },
];

const stats = [
  {
    icon: "ph-bold ph-users",
    num: "2.400+",
    label: "Kayıtlı Eğitimci",
  },
  {
    icon: "ph-bold ph-briefcase",
    num: "380+",
    label: "Aktif İş İlanı",
  },
  {
    icon: "ph-bold ph-buildings",
    num: "150+",
    label: "Kurum İşveren",
  },
  {
    icon: "ph-bold ph-handshake",
    num: "%94",
    label: "İşe Yerleşme Oranı",
  },
];

export default function HrEducationSection() {
  return (
    <section className="hr-education-section">
      <div className="container">
        <div className="hr-teaser-split">
          {/* Sol İçerik */}
          <div className="hr-teaser-split__content" data-aos="fade-right">
            <div className="hr-info">
              {/* Badge */}
              <div className="hr-info__badge">
                <i className="ph-bold ph-briefcase" />
                İnsan Kaynakları
              </div>

              {/* Title */}
              <h2 className="hr-info__title">
                Eğitim Sektörüne{" "}
                <span style={{ color: "var(--main-200)" }}>Özel İK</span>{" "}
                Çözümleri
              </h2>

              {/* Description */}
              <p className="hr-info__description">
                Okulunuz veya kurumunuz için doğru eğitimciyi bulun. Eğitim
                dünyasının kendine özgü dinamiklerine uygun, hızlı ve şeffaf işe
                alım & insan kaynakları yönetim platformu.
              </p>

              {/* Features */}
              <div className="hr-info__features">
                {features.map((f, i) => (
                  <div
                    key={i}
                    className="hr-feature-item"
                    data-aos="fade-right"
                    data-aos-delay={i * 70}
                  >
                    <div className="hr-feature-item__icon">
                      <i className={f.icon} />
                    </div>
                    <div className="hr-feature-item__body">
                      <h6>{f.title}</h6>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div
                className="hr-info__ctas"
                data-aos="fade-up"
                data-aos-delay="260"
              >
                <Link
                  href="/search"
                  className="btn btn-white rounded-pill flex-align gap-8 d-inline-flex"
                >
                  İş İlanlarını Gör
                  <i className="ph-bold ph-arrow-up-right d-flex text-lg" />
                </Link>
                <Link
                  href="/about"
                  className="btn btn-outline-white rounded-pill flex-align gap-8 d-inline-flex"
                >
                  Kurum Olarak Kaydol
                  <i className="ph-bold ph-arrow-right d-flex text-lg" />
                </Link>
              </div>
            </div>
          </div>

          {/* Sağ İstatistikler */}
          <div
            className="hr-teaser-split__sidebar"
            data-aos="fade-left"
            data-aos-delay="80"
          >
            {/* 2×2 Stats Grid */}
            <div className="hr-stats-grid">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="hr-stat-card"
                  data-aos="zoom-in"
                  data-aos-delay={80 + idx * 70}
                >
                  <div className="hr-stat-card__icon">
                    <i className={stat.icon} />
                  </div>
                  <div className="hr-stat-card__num">{stat.num}</div>
                  <div className="hr-stat-card__label">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Info Card */}
            <div
              className="hr-info-card"
              data-aos="fade-up"
              data-aos-delay="360"
            >
              <div className="hr-info-card__icon">
                <i className="ph-bold ph-megaphone" />
              </div>
              <div className="hr-info-card__text">
                <span className="title">Kurumunuz için iş ilanı verin</span>
                <span className="sub">
                  Eğitim sektörünün en büyük yetenek platformuna ücretsiz erişin
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
