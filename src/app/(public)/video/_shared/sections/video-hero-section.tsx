import React from "react";

export const VideoHeroSection: React.FC = () => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="video-hero" data-aos="fade-up">
          <div className="flex-align gap-8 mb-16 justify-content-center">
            <span className="w-8 h-8 bg-main-600 rounded-circle" />
            <h5 className="text-main-600 mb-0">
              <span className="text-main-two-600">Tanıtım</span>{" "}
              <span className="text-main-600">Videosu</span>
            </h5>
          </div>
          <h1
            className="video-hero__title"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <span className="text-main-600">Eğitim İste</span>&apos;yi Keşfedin
          </h1>
          <p
            className="video-hero__description"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Eğitim kurumlarını keşfetmenin, karşılaştırmanın ve doğru seçimi
            yapmanın en kolay yolu! Platformumuzu tanıtan videomuz ile tüm
            özellikleri keşfedin.
          </p>
        </div>
      </div>
    </div>
  );
};

