"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DataGrid } from "@/components/ui/data-grid";
import { ProductResultDto } from "@/app/(protected)/supply/company/products/_shared/types";
import { createWishlistColumns } from "../config";
import { useWishlistContext } from "../contexts";
import { mapWishlistsToProducts } from "../utils";

/**
 * Wishlist ürünlerini list/table layout ile gösterir
 */
export const WishlistList: React.FC = () => {
  const router = useRouter();
  const { wishlistItems } = useWishlistContext();
  const products = mapWishlistsToProducts(wishlistItems);

  // Kolonları oluştur
  const columns = createWishlistColumns(wishlistItems);

  // Row click handler
  const handleRowClick = (params: { row: ProductResultDto }) => {
    if (params.row.id) {
      router.push(`/supply/company/products/detail/${params.row.id}`);
    }
  };

  return (
    <div>
      <DataGrid<ProductResultDto>
        rows={products}
        columns={columns}
        loading={false}
        onRowClick={handleRowClick}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        height={"auto"}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
        emptyState={{
          icon: "ph-heart",
          title: "Favori Ürününüz Yok",
          description:
            "Beğendiğiniz ürünleri favorilere ekleyerek hızlıca ulaşabilir ve takip edebilirsiniz.",
          showActions: false,
        }}
      />
    </div>
  );
};
