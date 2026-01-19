import React from "react";
import { useRouter } from "next/navigation";
import { useProductDetail } from "../context";

/**
 * Ürün detay sayfası için minimal geri dön butonu ve düzenle butonu
 */
export const ProductBackButton: React.FC = () => {
  const router = useRouter();
  const { productId } = useProductDetail();

  const handleEdit = () => {
    router.push(`/supply/supplier/products/edit/${productId}`);
  };

  return (
    <div
      className="d-flex align-items-center justify-content-between mb-24"
      style={{ width: "100%" }}
    >
      <button
        className="product-detail-page__back-button"
        onClick={() => router.push("/supply/supplier/products")}
      >
        <i className="ph ph-arrow-left"></i>
        <span>Geri Dön</span>
      </button>

      <button className="product-detail-page__back-button" onClick={handleEdit}>
        <i className="ph ph-pencil-simple"></i>
        <span>Düzenle</span>
      </button>
    </div>
  );
};
