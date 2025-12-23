"use client";

import React from "react";
import { usePageTitle } from "@/hooks";
import {
  ProductsFilterForm,
  ProductsResults,
  InitialProductsSearchState,
  useProductsSearchContext,
} from "./_shared";

const ProductsPage: React.FC = () => {
  const { hasSearched } = useProductsSearchContext();
  usePageTitle("Ürün Arama");

  return (
    <div>
      <section
        className="course-list-view py-40 background-img bg-img"
        data-background-image="assets/images/bg/gradient-bg.png"
      >
        <div className={`side-overlay`}></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <ProductsFilterForm />
            </div>
            <div className="col-lg-9">
              {!hasSearched ? (
                <InitialProductsSearchState />
              ) : (
                <ProductsResults />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
