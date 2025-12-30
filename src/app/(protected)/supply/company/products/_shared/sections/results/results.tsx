import React from "react";
import { Loading } from "@/components";
import { ProductCard } from "../product-card";
import { ProductsList } from "../products-list";
import { useProductsSearchContext } from "../../contexts";
import { Header } from "../header/header";

export const Results: React.FC = () => {
  const { products, searchLoading, viewMode } = useProductsSearchContext();

  if (searchLoading) {
    return <Loading />;
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-80">
        <div className="mb-32">
          <i
            className="ph-duotone ph-magnifying-glass text-neutral-400"
            style={{ fontSize: "64px" }}
          ></i>
        </div>
        <h4 className="mb-16">Ürün Bulunamadı</h4>
        <p className="text-neutral-500 mb-0">
          Arama kriterlerinize uygun ürün bulunamadı. Lütfen farklı filtreler
          deneyiniz.
        </p>
      </div>
    );
  }

  return (
    <div className="products-results">
      {/* Results Header */}
      <Header />

      {/* Conditional View Rendering */}
      {viewMode === "grid" ? (
        <div className="row row-gap-24">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <ProductsList products={products} loading={false} />
      )}
    </div>
  );
};
