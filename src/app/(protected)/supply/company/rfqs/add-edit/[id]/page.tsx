"use client";

import React from "react";
import { usePageTitle } from "@/hooks";
import { CustomCard } from "@/components";
import { RFQForm } from "../_shared";
import { useRFQAddEdit } from "../_shared/context";

const RFQAddEditPage: React.FC = () => {
  const { rfq, rfqDetailLoading, isEditing } = useRFQAddEdit();

  const pageTitle = isEditing ? "Teklif Talebi Düzenle" : "Yeni Teklif Talebi";

  usePageTitle(pageTitle);

  return (
    <CustomCard
      title={pageTitle}
      subtitle={
        isEditing
          ? "Mevcut teklif talebini düzenleyin"
          : "Yeni bir teklif talebi oluşturun"
      }
      isBack
      isLoading={isEditing && rfqDetailLoading}
    >
      <RFQForm initialData={isEditing ? rfq ?? undefined : undefined} />
    </CustomCard>
  );
};

export default RFQAddEditPage;
