"use client";
import { FilterForm, Results, ActiveFilters } from "./_shared";
import { Breadcrumb } from "@/components";

const SearchPage = () => {
  return (
    <div>
      <Breadcrumb title={"Okulları Listele"} />
      <section
        className="course-list-view py-120 background-img bg-img"
        data-background-image="assets/images/bg/gradient-bg.png"
      >
        <div className={`side-overlay`}></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <FilterForm />
            </div>
            <div className="col-lg-9">
              <ActiveFilters />
              <Results />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchPage;
