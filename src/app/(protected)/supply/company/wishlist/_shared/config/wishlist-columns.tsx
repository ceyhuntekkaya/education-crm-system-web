import { GridColDef } from "@/components/ui/data-grid";
import { CustomImage } from "@/components/ui";
import { formatDate } from "@/utils";
import { ProductResultDto } from "@/app/(protected)/supply/company/products/_shared/types";
import type { WishlistDto } from "../hooks/api/useWishlistApi";
import { AddToFavorite } from "@/app/(protected)/supply/company/_shared/sections/add-to-favorite";

/**
 * Wishlist için özel column yapısı
 * Normal product columns'dan farklı olarak:
 * - Favoriye eklenme tarihi gösterir
 * - Favorilerden çıkarma butonu içerir
 */
export const createWishlistColumns = (
  wishlistItems: WishlistDto[]
): GridColDef<ProductResultDto>[] => [
  {
    field: "mainImageUrl",
    headerName: "Görsel",
    width: 120,
    align: "center",
    renderCell: (params: any) => {
      const imageUrl = params.value;
      return (
        <CustomImage
          src={imageUrl}
          alt={params.row.name || "Ürün"}
          width={48}
          height={48}
          variant="card"
        />
      );
    },
  },
  {
    field: "name",
    headerName: "Ürün Adı",
    width: 260,
    renderCell: (params: any) => (
      <div className="fw-semibold text-truncate" title={params.value}>
        {params.value || "-"}
      </div>
    ),
  },
  {
    field: "sku",
    headerName: "SKU",
    width: 180,
    renderCell: (params: any) => params.row.sku || "-",
  },
  {
    field: "supplierName",
    headerName: "Tedarikçi",
    width: 240,
    renderCell: (params: any) => (
      <span className="text-truncate d-block" title={params.value}>
        {params.value || "-"}
      </span>
    ),
  },
  {
    field: "createdAt",
    headerName: "Eklenme Tarihi",
    width: 180,
    renderCell: (params: any) => {
      // WishlistDto'dan createdAt'i al
      const wishlistItem = wishlistItems.find(
        (item) => item.productId === params.row.id
      );
      const date = wishlistItem?.createdAt;

      return date ? formatDate(date) : "-";
    },
  },
  {
    field: "actions",
    headerName: "İşlemler",
    width: 200,
    align: "center",
    renderCell: (params: any) => {
      // WishlistDto'dan ID'yi al
      const wishlistItem = wishlistItems.find(
        (item) => item.productId === params.row.id
      );

      if (!wishlistItem?.id || !params.row.id) return null;

      const favoriteKey = `favorite-${params.row.id}-${wishlistItem.id}`;

      return (
        <div
          className="d-flex align-items-center justify-content-center"
          onClick={(e) => e.stopPropagation()}
        >
          <AddToFavorite
            key={favoriteKey}
            productId={params.row.id}
            wishlistId={wishlistItem.id}
            initialIsFavorite={true}
            size="xxs"
            type="button"
          />
        </div>
      );
    },
  },
];
