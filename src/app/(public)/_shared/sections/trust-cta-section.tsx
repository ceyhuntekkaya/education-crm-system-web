import Link from "next/link";

const stats = [
  { value: "10K+", label: "Kullanıcı", icon: "ph-bold ph-users" },
  { value: "500+", label: "Kayıtlı Kurum", icon: "ph-bold ph-buildings" },
  { value: "4.9★", label: "Ortalama Puan", icon: "ph-bold ph-star" },
  { value: "%100", label: "Ücretsiz Keşif", icon: "ph-bold ph-gift" },
];

const logos = [
  "Özel Okul A",
  "Dil Akademisi B",
  "Spor Kulübü C",
  "Müzik Atölyesi D",
  "Teknoloji Lab E",
];

export default function TrustCtaSection() {
  return (
    <section className="trust-section">
      <div className="container">
        {/* Üst — Badge + Başlık */}
        <div className="trust-section__header" data-aos="fade-up">
          <div className="trust-section__badge">
            <i className="ph-bold ph-shield-check" />
            Güvenilir Platform
          </div>
          <h2 className="trust-section__title">
            Türkiye&apos;nin Eğitim Ekosistemi <span>Tek Çatı Altında</span>
          </h2>
          <p className="trust-section__subtitle">
            Binlerce veli, öğrenci ve kurumun güvendiği platformda yerinizi
            alın.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="trust-stats" data-aos="fade-up" data-aos-delay="100">
          {stats.map((s, i) => (
            <div
              key={i}
              className="trust-stats__card"
              data-aos="zoom-in"
              data-aos-delay={i * 80 + 100}
            >
              <div className="trust-stats__icon">
                <i className={s.icon} />
              </div>
              <span className="trust-stats__value">{s.value}</span>
              <span className="trust-stats__label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Kurum logoları satırı */}
        <div className="trust-logos" data-aos="fade-up" data-aos-delay="200">
          <span className="trust-logos__label">Bize güvenen kurumlar:</span>
          <div className="trust-logos__row">
            {logos.map((name, i) => (
              <div key={i} className="trust-logos__item">
                <i className="ph-bold ph-buildings" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <div className="trust-cta" data-aos="fade-up" data-aos-delay="300">
          <div className="trust-cta__inner">
            <div className="trust-cta__gradient" />
            <div className="trust-cta__content">
              <h3 className="trust-cta__title">
                Eğitimde Doğru Adımı <span>Şimdi Atın</span>
              </h3>
              <p className="trust-cta__desc">
                Ücretsiz hesabınızla hemen başlayın veya kurumunuzu kaydedin.
              </p>
              <div className="trust-cta__buttons">
                <Link
                  href="/auth/register"
                  className="btn btn-main rounded-pill flex-align gap-8 d-inline-flex"
                >
                  <i className="ph-bold ph-rocket-launch d-flex text-lg" />
                  Hemen Ücretsiz Başla
                </Link>
                <Link
                  href="/auth/register"
                  className="btn btn-outline-main-two rounded-pill flex-align gap-8 d-inline-flex"
                >
                  <i className="ph-bold ph-buildings d-flex text-lg" />
                  Kurumunuzu Kaydedin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
