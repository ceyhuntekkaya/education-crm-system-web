import React from "react";
import { useRouter } from "next/navigation";
import { CustomImage } from "@/components/ui";
import { ProductResultDto } from "@/app/(protected)/supply/company/products/_shared/types";
import { getRandomPlaceholderImage } from "../utils";
import { AddToFavorite } from "@/app/(protected)/supply/company/_shared/sections/add-to-favorite";
import { useWishlistContext } from "../contexts";

interface WishlistCardProps {
  product: ProductResultDto;
  wishlistId?: number;
}

export const WishlistCard: React.FC<WishlistCardProps> = ({
  product,
  wishlistId,
}) => {
  const router = useRouter();
  const { isSelectionMode, isProductSelected, toggleProductSelection } =
    useWishlistContext();

  // Key for forcing re-mount on favorite state change
  const favoriteKey = `favorite-${product.id}-${wishlistId || "none"}`;

  // Guard: product.id must be defined
  if (!product.id) return null;

  const isSelected = isProductSelected(product.id);

  const handleCardClick = () => {
    if (isSelectionMode) {
      toggleProductSelection(product.id!);
    }
  };

  const handleAddToProposal = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    if (isSelectionMode) {
      toggleProductSelection(product.id!);
    }
  };

  return (
    <div className="col-4">
      <div
        className={`rounded-16 h-100 overflow-hidden transition-all d-flex flex-column position-relative ${
          isSelectionMode ? "cursor-pointer" : ""
        } ${isSelected ? "bg-primary-50" : "bg-white"}`}
        style={{
          boxShadow: isSelected
            ? "0 4px 16px rgba(72, 127, 255, 0.2), 0 2px 8px rgba(72, 127, 255, 0.15)"
            : "0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",
          border: isSelected
            ? "3px solid hsl(var(--primary-600))"
            : "1.5px solid hsl(var(--neutral-40))",
          transform: isSelected ? "scale(0.98)" : "scale(1)",
          cursor: isSelectionMode ? "pointer" : "default",
        }}
        onClick={handleCardClick}
      >
        {/* Selection Checkbox - Top Left */}
        {isSelectionMode && (
          <div
            className="position-absolute"
            style={{
              top: "12px",
              left: "12px",
              zIndex: 10,
            }}
          >
            <div
              className={`d-flex align-items-center justify-content-center rounded-8 transition-all ${
                isSelected
                  ? "bg-primary-600 text-white"
                  : "bg-white text-neutral-400"
              }`}
              style={{
                width: "32px",
                height: "32px",
                border: isSelected
                  ? "2px solid hsl(var(--primary-600))"
                  : "2px solid hsl(var(--neutral-300))",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
              }}
            >
              {isSelected && (
                <i
                  className="ph-bold ph-check"
                  style={{ fontSize: "18px" }}
                ></i>
              )}
            </div>
          </div>
        )}

        {/* Favorilere Ekle/Çıkar Butonu - Top Right */}
        {!isSelectionMode && (
          <div
            className="position-absolute"
            style={{
              top: "12px",
              right: "12px",
              zIndex: 10,
            }}
          >
            <AddToFavorite
              key={favoriteKey}
              productId={product.id}
              wishlistId={wishlistId}
              initialIsFavorite={true}
              size="sm"
            />
          </div>
        )}

        {/* Selected Badge */}
        {isSelectionMode && isSelected && (
          <div
            className="position-absolute"
            style={{
              top: "12px",
              right: "12px",
              zIndex: 10,
            }}
          >
            <span className="d-inline-flex align-items-center gap-6 text-xs text-white bg-primary-600 px-10 py-6 rounded-8 fw-semibold">
              <i className="ph-bold ph-check-circle text-xs"></i>
              Seçildi
            </span>
          </div>
        )}

        {/* Product Image */}
        <div
          className="position-relative overflow-hidden"
          style={{ height: "200px" }}
        >
          <CustomImage
            src={product.mainImageUrl || ""}
            tempImage={getRandomPlaceholderImage(product.id)}
            alt={product.name || "Ürün"}
            width={400}
            height={200}
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Product Content */}
        <div className="p-16 p-md-20 d-flex flex-column flex-grow-1">
          {/* SKU Badge */}
          <div className="mb-12">
            <span className="d-inline-flex align-items-center gap-6 text-xs text-neutral-700 bg-neutral-50 px-10 py-6 rounded-8 fw-medium">
              <i className="ph-bold ph-barcode text-xs"></i>
              {product.sku || "N/A"}
            </span>
          </div>

          {/* Product Title */}
          <h5 className="mb-12 fw-semibold line-height-1-3 text-md text-lg-lg text-neutral-900">
            {product.name}
          </h5>

          {/* Supplier Info */}
          {product.supplierName && (
            <div className="soft-card rounded-16 mb-16">
              <div className="d-flex align-items-center gap-12 p-12">
                <div
                  className="d-flex align-items-center justify-content-center rounded-8 bg-primary-100 text-primary-700"
                  style={{
                    width: "30px",
                    height: "30px",
                    flexShrink: 0,
                  }}
                >
                  <i
                    className="ph-bold ph-truck"
                    style={{ fontSize: "15px" }}
                  ></i>
                </div>
                <div className="flex-grow-1">
                  <p className="text-xs text-neutral-500 mb-2">Tedarikçi</p>
                  <span className="text-sm fw-medium text-neutral-900">
                    {product.supplierName}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-auto d-flex flex-column gap-8">
            {isSelectionMode ? (
              <button
                className={`d-flex align-items-center justify-content-center gap-6 transition-all rounded-12 fw-semibold border-0 w-100 ${
                  isSelected
                    ? "bg-success-600 text-white"
                    : "bg-white text-neutral-700"
                }`}
                style={{
                  fontSize: "13px",
                  height: "40px",
                  padding: "0 16px",
                  boxShadow: isSelected
                    ? "0 2px 8px rgba(16, 185, 129, 0.25)"
                    : "0 2px 8px rgba(0, 0, 0, 0.04)",
                  border: isSelected
                    ? "none"
                    : "1px solid hsl(var(--neutral-200))",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  if (isSelected) {
                    e.currentTarget.style.backgroundColor =
                      "hsl(var(--success-700))";
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(16, 185, 129, 0.3)";
                  } else {
                    e.currentTarget.style.backgroundColor =
                      "hsl(var(--neutral-50))";
                    e.currentTarget.style.borderColor =
                      "hsl(var(--neutral-300))";
                  }
                }}
                onMouseLeave={(e) => {
                  if (isSelected) {
                    e.currentTarget.style.backgroundColor =
                      "hsl(var(--success-600))";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 8px rgba(16, 185, 129, 0.25)";
                  } else {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.borderColor =
                      "hsl(var(--neutral-200))";
                  }
                }}
                onClick={handleAddToProposal}
                aria-label={isSelected ? "Seçildi" : "İlanı Ekle"}
              >
                <i
                  className={`ph-bold ${
                    isSelected ? "ph-check-circle" : "ph-plus"
                  }`}
                  style={{ fontSize: "18px" }}
                />
                <span>{isSelected ? "Seçildi" : "İlanı Ekle"}</span>
              </button>
            ) : (
              <button
                className="d-flex align-items-center justify-content-center gap-6 transition-all rounded-12 bg-white text-neutral-700 fw-medium border-0 w-100"
                style={{
                  fontSize: "13px",
                  height: "40px",
                  padding: "0 16px",
                  border: "1px solid hsl(var(--neutral-200))",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "hsl(var(--neutral-50))";
                  e.currentTarget.style.borderColor = "hsl(var(--neutral-300))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.borderColor = "hsl(var(--neutral-200))";
                }}
                onClick={() =>
                  router.push(`/supply/company/products/detail/${product.id}`)
                }
                aria-label="Ürün Detayı"
              >
                <span>Ürün Detayı</span>
                <i className="ph-bold ph-eye" style={{ fontSize: "18px" }} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
