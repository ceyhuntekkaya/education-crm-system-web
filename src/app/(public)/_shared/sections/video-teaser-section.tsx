import Link from "next/link";

export default function VideoTeaserSection() {
  return (
    <section className="video-teaser-section py-40 py-lg-60">
      <div className="container">
        {/* Compact Card Design */}
        <div className="video-teaser-card" data-aos="fade-up">
          <div className="row align-items-center g-0">
            {/* Sol Taraf - Video Thumbnail (Daha Küçük) */}
            <div className="col-lg-5">
              <Link href="/video" className="video-teaser-thumbnail">
                <div className="video-teaser-thumbnail__wrapper">
                  <div className="video-teaser-thumbnail__overlay">
                    <div className="video-teaser-thumbnail__play-btn">
                      <i className="ph-fill ph-play-circle"></i>
                    </div>
                  </div>
                  <div className="video-teaser-thumbnail__gradient"></div>
                  
                  {/* Video Badge */}
                  <div className="video-teaser-thumbnail__badge">
                    <i className="ph ph-clock"></i>
                    <span>5 dakika</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Sağ Taraf - Compact İçerik */}
            <div className="col-lg-7">
              <div className="video-teaser-content">
                <span className="video-teaser-content__badge">
                  <i className="ph ph-video-camera"></i>
                  Tanıtım Videosu
                </span>
                
                <h3 className="video-teaser-content__title">
                  <span className="text-main-600">Eğitim İste</span>&apos;yi{" "}
                  <span className="text-main-two-600">5 Dakikada</span> Keşfedin
                </h3>
                
                <p className="video-teaser-content__description">
                  Platformumuzun tüm özelliklerini keşfedin. Eğitim kurumlarını
                  nasıl bulacağınızı, karşılaştıracağınızı ve randevu alacağınızı
                  öğrenin.
                </p>

                <div className="video-teaser-stats">
                  <div className="video-teaser-stat">
                    <i className="ph-bold ph-users-three"></i>
                    <span>10,000+ Kullanıcı</span>
                  </div>
                  <div className="video-teaser-stat">
                    <i className="ph-bold ph-buildings"></i>
                    <span>500+ Kurum</span>
                  </div>
                  <div className="video-teaser-stat">
                    <i className="ph-bold ph-star"></i>
                    <span>%100 Memnuniyet</span>
                  </div>
                </div>

                <Link
                  href="/video"
                  className="video-teaser-content__link"
                >
                  <span>Videoyu İzle</span>
                  <i className="ph-bold ph-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

