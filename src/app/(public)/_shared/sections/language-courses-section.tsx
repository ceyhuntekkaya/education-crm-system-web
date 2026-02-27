import Link from "next/link";

const languages = [
  { id: 1, code: "GB", name: "İngilizce", count: 284, href: "/search" },
  { id: 2, code: "DE", name: "Almanca", count: 98, href: "/search" },
  { id: 3, code: "FR", name: "Fransızca", count: 76, href: "/search" },
  { id: 4, code: "ES", name: "İspanyolca", count: 54, href: "/search" },
  { id: 5, code: "JP", name: "Japonca", count: 32, href: "/search" },
  { id: 6, code: "RU", name: "Rusça", count: 41, href: "/search" },
  { id: 7, code: "SA", name: "Arapça", count: 67, href: "/search" },
  { id: 8, code: "CN", name: "Çince (Mandarin)", count: 28, href: "/search" },
];

const features = [
  {
    icon: "ph-bold ph-certificate",
    label: "Uluslararası Sertifika",
    desc: "IELTS, TOEFL, Goethe, DELE ve daha fazlası",
  },
  {
    icon: "ph-bold ph-users-three",
    label: "Küçük Grup Dersleri",
    desc: "Maksimum 8–12 kişilik sınıflar, kişisel ilgi",
  },
  {
    icon: "ph-bold ph-monitor-play",
    label: "Online & Yüz Yüze",
    desc: "Dilediğin formatta, dilediğin tempoda öğren",
  },
  {
    icon: "ph-bold ph-trend-up",
    label: "Hızlı İlerleme Garantisi",
    desc: "Kanıtlanmış metodoloji, ölçülebilir sonuçlar",
  },
];

const stats = [
  { num: "600+", label: "Dil Kursu" },
  { num: "8", label: "Farklı Dil" },
  { num: "50K+", label: "Mezun Öğrenci" },
];

export default function LanguageCoursesSection() {
  return (
    <section className="language-courses-section">
      <div className="container">
        <div className="lang-split">
          {/* Sol İçerik */}
          <div className="lang-split__content" data-aos="fade-right">
            {/* Badge */}
            <div className="lang-info__badge">
              <i className="ph-bold ph-translate" />
              Dil Eğitimi
            </div>

            {/* Title */}
            <h2 className="lang-info__title">
              Dünyaya Açılan Kapı:{" "}
              <span style={{ color: "var(--main-400)" }}>Dil Kursları</span>
            </h2>

            {/* Description */}
            <p className="lang-info__description">
              8 farklı dilde 600&apos;den fazla kurum arasından size en uygun
              dil kursunu seçin. Her seviyeye, her hedefe uygun programlar ve
              uluslararası geçerlilikte sertifikalar.
            </p>

            {/* Features */}
            <div className="lang-info__features">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="lang-info__feature-row"
                  data-aos="fade-right"
                  data-aos-delay={i * 70}
                >
                  <div className="icon-box">
                    <i className={f.icon} />
                  </div>
                  <div className="text">
                    <span className="label">{f.label}</span>
                    <span className="desc">{f.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/search"
              className="btn btn-white rounded-pill flex-align gap-8 d-inline-flex"
              data-aos="fade-up"
              data-aos-delay="280"
            >
              Tüm Dil Kurslarını Gör
              <i className="ph-bold ph-arrow-up-right d-flex text-lg" />
            </Link>

            {/* Stats */}
            <div
              className="lang-info__stats"
              data-aos="fade-up"
              data-aos-delay="320"
            >
              {stats.map((s, i) => (
                <div key={i} className="lang-info__stat-item">
                  <span className="num">{s.num}</span>
                  <span className="lbl">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sağ Dil Grid */}
          <div className="lang-split__grid" data-aos="fade-left">
            {languages.map((lang, idx) => (
              <Link
                href={lang.href}
                key={lang.id}
                className="lang-card"
                data-aos="fade-up"
                data-aos-delay={idx * 55}
              >
                <span className="lang-card__code">{lang.code}</span>
                <div className="lang-card__info">
                  <span className="lang-card__name">{lang.name}</span>
                  <span className="lang-card__count">{lang.count} kurum</span>
                </div>
                <i className="ph ph-arrow-right lang-card__arrow" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
