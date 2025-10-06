"use client";
import {
  FilterForm,
  Results,
  ActiveFilters,
  useSearchContext,
} from "./_shared";
import { Loading } from "@/components";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const SearchPageContent = () => {
  const { institutions } = useSearchContext();
  const searchParams = useSearchParams();
  const favId = searchParams.get("favId");

  // FavId'ye göre doğrudan favori arama ismi mapping'i
  const getFavSearchName = (favId: string) => {
    const favSearchMap: { [key: string]: string } = {
      "0": "Lise Araması",
      "1": "Anaokulu Araması",
      "2": "İlkokul Araması",
      "3": "Ortaokul Araması",
      "4": "Özel Kurslar",
    };

    return favSearchMap[favId] || "Favori Aramlarım";
  };

  // Breadcrumb başlığını belirle
  const getBreadcrumbTitle = () => {
    if (favId) {
      return getFavSearchName(favId);
    }
    return "Okulları Listele";
  };

  const breadcrumbTitle = getBreadcrumbTitle();

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
