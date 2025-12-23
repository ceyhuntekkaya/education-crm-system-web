import React from "react";
import { Loading } from "@/components";
import { ProductCard } from "./product-card";
import { useProductsSearchContext } from "../../contexts";

export const ProductsResults: React.FC = () => {
  const { products, searchLoading } = useProductsSearchContext();

  //   if (searchLoading) {
  //     return <Loading />;
  //   }

  //   if (!products || products.length === 0) {
  //     return (
  //       <div className="text-center py-80">
  //         <div className="mb-32">
  //           <i
  //             className="ph-duotone ph-magnifying-glass text-neutral-400"
  //             style={{ fontSize: "64px" }}
  //           ></i>
  //         </div>
  //         <h4 className="mb-16">Ürün Bulunamadı</h4>
  //         <p className="text-neutral-500 mb-0">
  //           Arama kriterlerinize uygun ürün bulunamadı. Lütfen farklı filtreler
  //           deneyiniz.
  //         </p>
  //       </div>
  //     );
  //   }

  return (
    <div>
      {/* Products Grid */}
      <div className="row gy-24">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
