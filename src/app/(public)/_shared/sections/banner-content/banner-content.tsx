import Link from "next/link";

export default function BannerContent() {
  return (
    <section className="banner-content pe-lg-4 text-center text-lg-start">
      <div
        className="flex-align gap-8 mb-16 justify-content-center justify-content-lg-start"
        data-aos="fade-down"
      >
        <span className="w-8 h-8 bg-main-600 rounded-circle" />
        <h5 className="text-main-600 mb-0">
          <span className="text-main-two-600">Eğitim Kurumunu</span>{" "}
          <span className="text-main-600">Hemen Bul</span>
        </h5>
      </div>
      <h1 className="display2 mb-16 mb-lg-24 wow bounceInLeft">
        <span className="text-main-600">Hızlı Arama</span>,{" "}
        <span className="text-main-two-600">Kolay Seçim</span>
      </h1>
      <p className="text-neutral-500 text-line-2 wow bounceInUp mb-3 mb-lg-0">
        <span className="text-main-600">Ara</span>,{" "}
        <span className="text-main-two-600">Filtrele</span>,{" "}
        <span className="text-main-600">Keşfet</span>.
      </p>
      <div className="buttons-wrapper flex-align flex-wrap gap-16 gap-lg-24 mt-24 mt-lg-40 justify-content-center justify-content-lg-start">
        <Link
          href="/search"
          className="btn btn-main rounded-pill flex-align gap-8"
          data-aos="fade-right"
        >
          Eğitim Ara
          <i className="ph-bold ph-arrow-up-right d-flex text-lg" />
        </Link>
        <Link
          href="/about"
          className="btn btn-outline-main rounded-pill flex-align gap-8"
          data-aos="fade-left"
        >
          Hakkımızda
          <i className="ph-bold ph-arrow-up-right d-flex text-lg" />
        </Link>
      </div>

      {/* Video Link - Subtle */}
      <div className="mt-24 mt-lg-32" data-aos="fade-up" data-aos-delay="200">
        <Link
          href="/video"
          className="video-quick-link flex-align gap-8 justify-content-center justify-content-lg-start"
        >
          <i className="ph-fill ph-play-circle text-main-600"></i>
          <span className="text-main-600">Platformu Tanıtan Videoyu İzle</span>
          <i className="ph ph-arrow-right text-main-600"></i>
        </Link>
      </div>
    </section>
  );
}
