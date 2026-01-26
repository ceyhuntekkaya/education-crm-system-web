"use client";

import React from "react";
import { usePageTitle } from "@/hooks";
import { CustomCard } from "@/components";
import { RFQForm } from "../_shared";
import { useRFQAddEdit } from "../_shared/context";
import { RFQHeaderSection } from "../../detail/[id]/_shared";

const RFQAddEditPage: React.FC = () => {
  const { rfq, rfqDetailLoading, isEditing } = useRFQAddEdit();

  const pageTitle = isEditing ? "Alım İlanı Düzenle" : "Yeni Alım İlanı";

  usePageTitle(pageTitle);

  return (
    <>
      {/* RFQ Header Section */}
      <RFQHeaderSection />

      <CustomCard
        title={pageTitle}
        subtitle={
          isEditing
            ? "Mevcut alım ilanını düzenleyin"
            : "Yeni bir alım ilanı oluşturun"
        }
        isBack
        isLoading={isEditing && rfqDetailLoading}
      >
        <RFQForm initialData={isEditing ? (rfq ?? undefined) : undefined} />
      </CustomCard>
    </>
  );
};

export default RFQAddEditPage;
