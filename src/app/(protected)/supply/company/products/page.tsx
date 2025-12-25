"use client";

import React from "react";
import { usePageTitle } from "@/hooks";
import {
  ProductsFilterForm,
  InitialProductsSearchState,
  useProductsSearchContext,
  Results,
} from "./_shared";

const ProductsPage: React.FC = () => {
  const { hasSearched } = useProductsSearchContext();
  usePageTitle("Ürün Arama");

  return (
    <div className="d-flex flex-column gap-24">
      {/* Filter Form - Header Tarzı */}
      <ProductsFilterForm />

      {/* Results - Alt Kısım */}
      <div className="row">
        <div className="col-12">
          {!hasSearched ? <InitialProductsSearchState /> : <Results />}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
