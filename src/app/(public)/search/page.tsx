"use client";
import {
  FilterForm,
  Results,
  ActiveFilters,
  useSearchContext,
  InitialSearchState,
} from "./_shared";
import { Loading } from "@/components";
import { Suspense } from "react";
import { usePageTitle } from "@/hooks";

const SearchPageContent = () => {
  const { institutions, hasSearched, searchLoading } = useSearchContext();
  usePageTitle("Eğitim Ara");

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
              {!hasSearched ? (
                <InitialSearchState />
              ) : (
                <>
                  <ActiveFilters />
                  <Results
                    institutions={institutions}
                    loading={searchLoading}
                  />
                </>
              )}
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
