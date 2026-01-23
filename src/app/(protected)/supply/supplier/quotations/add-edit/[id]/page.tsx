"use client";

import React from "react";
import { usePageTitle } from "@/hooks";
import { CustomCard } from "@/components";
import { QuotationForm } from "../_shared";
import { useQuotationAddEdit } from "../_shared/context";

const QuotationAddEditPage: React.FC = () => {
  const { quotation, quotationDetailLoading, isEditing } =
    useQuotationAddEdit();

  const pageTitle = isEditing ? "Teklif Düzenle" : "Yeni Teklif Oluştur";

  usePageTitle(pageTitle);

  return (
    <CustomCard
      title={pageTitle}
      subtitle={
        isEditing
          ? "Mevcut teklifi düzenleyin"
          : "Alım ilanına yeni bir teklif oluşturun"
      }
      isBack
      isLoading={isEditing && quotationDetailLoading}
    >
      <QuotationForm
        initialData={isEditing ? (quotation ?? undefined) : undefined}
      />
    </CustomCard>
  );
};

export default QuotationAddEditPage;
