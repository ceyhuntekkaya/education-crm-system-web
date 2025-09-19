import Link from "next/link";
import Animation from "@/helper/animation";
import Image from "next/image";
import FilterForSearchForm from "./filter-for-search-form";

export default function Banner() {
  return (
    <>
      <Animation />
      <section className="banner py-80 position-relative overflow-hidden">
        {/* Animasyonlu şekiller */}
        <Image
          src="/assets/images/shapes/shape1.png"
          alt=""
          width={48}
          height={48}
          className="shape one animation-rotation"
          priority
        />
        <Image
          src="/assets/images/shapes/shape2.png"
          alt=""
          width={48}
          height={48}
          className="shape two animation-scalation"
          priority
        />
        <Image
          src="/assets/images/shapes/shape3.png"
          alt=""
          width={48}
          height={48}
          className="shape three animation-walking"
          priority
        />
        <Image
          src="/assets/images/shapes/shape4.png"
          alt=""
          width={48}
          height={48}
          className="shape four animation-scalation"
          priority
        />
        <Image
          src="/assets/images/shapes/shape5.png"
          alt=""
          width={48}
          height={48}
          className="shape five animation-walking"
          priority
        />
        <div className="container">
          <div className="row gy-5 align-items-center">
            <div className="col-xl-6">
              <div className="banner-content pe-md-4">
                <div className="flex-align gap-8 mb-16" data-aos="fade-down">
                  <span className="w-8 h-8 bg-main-600 rounded-circle" />
                  <h5 className="text-main-600 mb-0">
                    <span className="text-main-two-600">Okulunu</span>{" "}
                    <span className="text-main-600">Hemen Bul</span>
                  </h5>
                </div>
                <h1 className="display2 mb-24 wow bounceInLeft">
                  <span className="text-main-600">Hızlı Arama</span>,{" "}
                  <span className="text-main-two-600">Kolay Seçim</span>
                </h1>
                <p className="text-neutral-500 text-line-2 wow bounceInUp">
                  <span className="text-main-600">Ara</span>,{" "}
                  <span className="text-main-two-600">Filtrele</span>,{" "}
                  <span className="text-main-600">Keşfet</span>.
                </p>
                <div className="buttons-wrapper flex-align flex-wrap gap-24 mt-40">
                  <Link
                    href="/course"
                    className="btn btn-main rounded-pill flex-align gap-8"
                    data-aos="fade-right"
                  >
                    Okul Ara
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
              </div>
            </div>
            <div className="col-xl-6">
              <FilterForSearchForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
