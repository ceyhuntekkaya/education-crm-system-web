"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useQuotationDetail } from "../../_shared/context";

/**
 * Quotation düzenleme butonu
 */
export const QuotationEditButton: React.FC = () => {
  const router = useRouter();
  const { quotation } = useQuotationDetail();

  if (!quotation) return null;

  // Sadece DRAFT durumunda düzenlenebilir
  const canEdit = quotation.status === "DRAFT";

  if (!canEdit) return null;

  const handleEdit = () => {
    router.push(`/supply/supplier/quotations/add-edit/${quotation.id}`);
  };

  return (
    <Button
      onClick={handleEdit}
      className="btn-md btn-outline-primary"
      type="button"
    >
      <i className="ri-edit-line me-8"></i>
      Düzenle
    </Button>
  );
};
