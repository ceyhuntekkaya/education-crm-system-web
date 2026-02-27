import Link from "next/link";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { useState } from "react";

const stats = [
  {
    icon: "ph-bold ph-users-three",
    end: 10000,
    suffix: "+",
    label: "Kullanıcı",
  },
  { icon: "ph-bold ph-buildings", end: 500, suffix: "+", label: "Kurum" },
  {
    icon: "ph-bold ph-star",
    prefix: "%",
    end: 100,
    suffix: "",
    label: "Memnuniyet",
  },
];

const floatingIcons = [
  {
    icon: "ph-bold ph-monitor-play",
    top: "10%",
    left: "14%",
    delay: 0,
    duration: "3.5s",
  },
  {
    icon: "ph-bold ph-chalkboard-teacher",
    top: "24%",
    right: "12%",
    delay: 100,
    duration: "4.2s",
  },
  {
    icon: "ph-bold ph-magnifying-glass",
    bottom: "32%",
    left: "8%",
    delay: 200,
    duration: "3.8s",
  },
  {
    icon: "ph-bold ph-calendar-check",
    top: "54%",
    right: "16%",
    delay: 300,
    duration: "4.5s",
  },
  {
    icon: "ph-bold ph-map-pin",
    bottom: "14%",
    left: "32%",
    delay: 150,
    duration: "3.2s",
  },
];

export default function VideoTeaserSection() {
  const [viewed, setViewed] = useState(false);

  return (
    <section className="video-teaser-section scroll-reveal-section">
      <div className="container">
        <div className="video-teaser-split">
          {/* Sol — Video Görsel Alanı */}
          <div className="video-teaser-split__content">
            <div className="video-teaser-split__badge" data-aos="fade-down">
              <i className="ph ph-video-camera" />
              Tanıtım Videosu
            </div>

            <h2 className="video-teaser-split__title wow fadeInUp">
              <span className="text-main-600">Eğitim İste</span>&apos;yi{" "}
              <span className="text-main-two-600">5 Dakikada</span> Keşfedin
            </h2>

            <p
              className="video-teaser-split__desc wow fadeInUp"
              data-wow-delay="0.1s"
            >
              Platformumuzun tüm özelliklerini keşfedin. Eğitim kurumlarını
              nasıl bulacağınızı, karşılaştıracağınızı ve randevu alacağınızı
              öğrenin.
            </p>

            {/* CTA — shimmer efektli */}
            <Link
              href="/video"
              className="btn btn-main rounded-pill flex-align gap-8 d-inline-flex shimmer-btn wow fadeInUp"
              data-wow-delay="0.2s"
            >
              Videoyu İzle
              <i className="ph-bold ph-play-circle d-flex text-lg" />
            </Link>
          </div>

          {/* Sağ — İçerik */}

          <div className="video-teaser-split__visual wow fadeInRight">
            <Link href="/video" className="video-teaser-split__illustration">
              {/* Gradient arka plan */}
              <div className="video-teaser-split__gradient" />

              {/* Floating ikonlar — farklı duration'larla organik hareket */}
              {floatingIcons.map((fi, i) => (
                <div
                  key={i}
                  className="video-teaser-split__float-icon wow zoomIn"
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

              {/* Merkez play butonu — pulse animasyonu */}
              <div className="video-teaser-split__center-play">
                <div className="video-teaser-split__play-pulse" />
                <i className="ph-fill ph-play" />
              </div>

              {/* Süre badge */}
              <div className="video-teaser-split__duration">
                <i className="ph ph-clock" />
                <span>5 dakika</span>
              </div>

              {/* Floating stat chips — CountUp */}
              <VisibilitySensor
                onChange={(isVisible: boolean) => {
                  if (isVisible) setViewed(true);
                }}
                partialVisibility
                delayedCall
              >
                <div className="video-teaser-split__floating-stats">
                  {stats.map((s, i) => (
                    <div
                      key={i}
                      className="video-teaser-split__stat-chip wow zoomIn"
                      data-wow-delay={`${i * 0.1 + 0.2}s`}
                    >
                      <span className="video-teaser-split__stat-val">
                        {viewed ? (
                          <CountUp
                            end={s.end}
                            duration={2.5}
                            separator=","
                            prefix={s.prefix || ""}
                            suffix={s.suffix}
                          />
                        ) : (
                          "0"
                        )}
                      </span>
                      <span className="video-teaser-split__stat-lbl">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </VisibilitySensor>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
