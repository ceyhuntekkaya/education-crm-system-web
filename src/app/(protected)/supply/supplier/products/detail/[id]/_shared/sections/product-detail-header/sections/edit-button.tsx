import React from "react";
import { useRouter } from "next/navigation";
import { useProductDetail } from "../../../context";

/**
 * Ürün detay header düzenle butonu
 */
export const EditButton: React.FC = () => {
  const router = useRouter();
  const { productId } = useProductDetail();

  const handleEdit = () => {
    if (!productId) return;
    router.push(`/supply/supplier/products/add-edit/${productId}`);
  };

  return (
    <button className="product-detail-page__back-button" onClick={handleEdit}>
      <i className="ph ph-pencil-simple"></i>
      <span>Düzenle</span>
    </button>
  );
};
