"use client";
import {
  FilterForm,
  Results,
  ActiveFilters,
  useSearchContext,
} from "./_shared";
import { Loading } from "@/components";
import { Suspense } from "react";

const SearchPageContent = () => {
  const { institutions } = useSearchContext();

  return (
    <div>
      {/* <Breadcrumb title={breadcrumbTitle} /> */}
      <section
        className="course-list-view py-40 background-img bg-img"
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
              <Results institutions={institutions} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const SearchPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SearchPageContent />
    </Suspense>
  );
};

export default SearchPage;
