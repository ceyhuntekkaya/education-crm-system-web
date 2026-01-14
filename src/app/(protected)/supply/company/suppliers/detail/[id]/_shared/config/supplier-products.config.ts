import React from "react";
import { ProductSummaryDto } from "@/types";
import { GridColDef } from "@/components/ui/data-grid";
import { Badge } from "@/components";
import { CustomImage } from "@/components/ui";
import { formatDate, formatCurrency } from "@/utils";
import {
  getProductStatusBadgeVariant,
  getProductStatusDisplay,
  getStockColorClass,
} from "../../_shared/utils";

/**
 * Tedarikçi ürünleri için tablo kolonları
 */
export const createSupplierProductsColumns =
  (): GridColDef<ProductSummaryDto>[] => [
    {
      field: "mainImageUrl",
      headerName: "Görsel",
      width: 120,
      align: "center",
      renderCell: (params) => {
        const imageUrl = params.value;
        return React.createElement(CustomImage, {
          src: imageUrl,
          alt: params.row.name || "Ürün",
          width: 48,
          height: 48,
          variant: "card",
        });
      },
    },
    {
      field: "name",
      headerName: "Ürün Adı",
      minWidth: 300,
      renderCell: (params) =>
        React.createElement("div", {}, [
          React.createElement(
            "div",
            {
              key: "name",
              className: "fw-semibold text-primary text-truncate mb-1",
              title: params.value,
            },
            params.value || "-"
          ),
          params.row.sku &&
            React.createElement(
              "div",
              { key: "sku", className: "text-muted text-sm" },
              `SKU: ${params.row.sku}`
            ),
        ]),
    },
    {
      field: "basePrice",
      headerName: "Birim Fiyat",
      width: 140,
      align: "right",
      renderCell: (params) => {
        const price = params.value;
        const currency = params.row.currency || "TRY";
        return React.createElement(
          "div",
          { className: "fw-semibold text-success" },
          price !== undefined ? `${formatCurrency(price)} ${currency}` : "-"
        );
      },
    },
    {
      field: "stockQuantity",
      headerName: "Stok",
      width: 120,
      align: "center",
      renderCell: (params) => {
        const currentStock = params.value;
        const minStockLevel = params.row.minStockLevel;
        const colorClass = getStockColorClass(currentStock, minStockLevel);

        return React.createElement(
          "div",
          { className: `fw-medium ${colorClass}` },
          currentStock !== undefined ? currentStock : "-"
        );
      },
    },
    {
      field: "status",
      headerName: "Durum",
      width: 150,
      align: "center",
      renderCell: (params) => {
        const status = params.value;
        const variant = getProductStatusBadgeVariant(status);
        const display = getProductStatusDisplay(status);

        return React.createElement(
          Badge,
          { variant: variant, size: "sm" },
          display
        );
      },
    },
  ];
