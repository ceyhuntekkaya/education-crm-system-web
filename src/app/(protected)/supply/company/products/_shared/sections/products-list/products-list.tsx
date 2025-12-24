"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DataGrid } from "@/components/ui/data-grid";
import { ProductResultDto } from "../../types";
import { createProductColumns } from "../../config/product-columns";

interface ProductsListProps {
  products: ProductResultDto[];
  loading?: boolean;
}

export const ProductsList: React.FC<ProductsListProps> = ({
  products,
  loading,
}) => {
  const router = useRouter();

  // Kolonları oluştur
  const columns = createProductColumns();

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
        loading={loading}
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
          icon: "ph-magnifying-glass",
          title: "Ürün Bulunamadı",
          description:
            "Arama kriterlerinize uygun ürün bulunamadı. Lütfen farklı filtreler deneyiniz.",
          showActions: false,
        }}
      />
    </div>
  );
};
