"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSupplierDetail } from "../context";

/**
 * Supplier detay sayfası için minimal düzenle butonu
 */
export const SupplierEditButton: React.FC = () => {
  const router = useRouter();
  const { supplier } = useSupplierDetail();

  const handleEdit = () => {
    if (!supplier?.id) return;
    router.push(`/supply/company/suppliers/edit/${supplier.id}`);
  };

  if (!supplier?.id) return null;

  return (
    <button
      className="supplier-detail-page__edit-button"
      onClick={handleEdit}
      aria-label="Tedarikçiyi düzenle"
    >
      <i className="ph ph-pencil-simple"></i>
      <span>Düzenle</span>
    </button>
  );
};
