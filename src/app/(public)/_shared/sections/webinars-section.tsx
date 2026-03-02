import Link from "next/link";

const features = [
  {
    icon: "ph-bold ph-ticket",
    title: "Kayıt Yönetimi",
    desc: "Katılımcı kayıtlarını toplayın, bilet satışlarını yönetin ve raporlayın.",
    num: "01",
  },
  {
    icon: "ph-bold ph-users-three",
    title: "Hedef Kitle Erişimi",
    desc: "Etkinliklerinizi doğru kitleye ulaştırarak doluluk oranlarını artırın.",
    num: "02",
  },
  {
    icon: "ph-bold ph-certificate",
    title: "Otomatik Sertifika",
    desc: "Katılımcılara özel tasarımlı dijital sertifikaları otomatik gönderin.",
    num: "03",
  },
  {
    icon: "ph-bold ph-chart-bar",
    title: "Analiz & Raporlama",
    desc: "Etkinlik performansını ve katılımcı geri bildirimlerini detaylı analiz edin.",
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
              Kurum Etkinliklerinizi{" "}
              <span className="text-main-two-600">Profesyonelce Yönetin</span>
            </h2>

            <p
              className="webinar-teaser-split__desc wow fadeInUp"
              data-wow-delay="0.1s"
            >
              Tanıtım günleri, seminerler, webinarlar ve atölye çalışmalarınızı
              geniş kitlelere duyurun. Kayıt, biletleme ve sertifika süreçlerini
              dijitalleştirin.
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
                Etkinlik Özellikleri
                <i className="ph-bold ph-arrow-up-right d-flex text-lg" />
              </Link>
              <Link
                href="/auth/register"
                className="btn btn-outline-orange rounded-pill flex-align gap-8 d-inline-flex wow fadeInUp"
                data-wow-delay="0.4s"
              >
                Etkinlik Oluştur
                <i className="ph-bold ph-plus-circle d-flex text-lg" />
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
