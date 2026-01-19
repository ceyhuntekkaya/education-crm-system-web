"use client";

import React from "react";
import { CustomCard } from "@/components";
import { QuotationForm, useQuotationAddEdit } from "../_shared";
import { usePageTitle } from "@/hooks";

interface QuotationAddEditPageProps {}

const QuotationAddEditPage: React.FC<QuotationAddEditPageProps> = () => {
  usePageTitle("Teklif Düzenle");
  const { isEditing, quotation, quotationDetailLoading } =
    useQuotationAddEdit();

  const pageTitle = isEditing
    ? "Teklif Bilgisi Düzenle"
    : "Yeni Teklif Oluştur";

  return (
    <CustomCard
      title={pageTitle}
      subtitle={
        isEditing
          ? "Mevcut teklif bilgilerini düzenleyin"
          : "Yeni teklif bilgilerini oluşturun"
      }
      isBack
      isLoading={quotationDetailLoading && isEditing}
    >
      <QuotationForm isEditing={isEditing} initialData={quotation} />
    </CustomCard>
  );
};

export default QuotationAddEditPage;
