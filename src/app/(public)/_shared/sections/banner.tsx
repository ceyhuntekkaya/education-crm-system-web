import Animation from "@/helper/animation";
import FilterForSearchForm from "./filter-for-search-form";
import BannerContent from "./banner-content";
import BannerShapes from "./banner-shapes";

export default function Banner() {
  return (
    <>
      <Animation />
      <section className="banner pb-80 pt-40 position-relative overflow-hidden">
        {/* Animasyonlu şekiller */}
        <BannerShapes />
        <div className="container">
          <div className="row gy-4 gy-lg-5 align-items-center">
            <div className="col-12 col-lg-6">
              <BannerContent />
            </div>
            <div className="col-12 col-lg-6">
              <FilterForSearchForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
