"use client";

import React from "react";
import { usePageTitle } from "@/hooks";
import { CustomCard } from "@/components";
import { OrganizerForm, useOrganizerAddEdit } from "../_shared";

const OrganizerAddEditPage: React.FC = () => {
  const { isEditMode, organizer, organizerDetailLoading } =
    useOrganizerAddEdit();

  const pageTitle = isEditMode
    ? "Organizatörü Düzenle"
    : "Yeni Organizatör Ekle";

  usePageTitle(pageTitle);

  return (
    <CustomCard
      title={pageTitle}
      subtitle={
        isEditMode
          ? "Mevcut organizatör bilgilerini düzenleyin"
          : "Yeni bir organizatör ekleyin"
      }
      isBack
      isLoading={organizerDetailLoading && isEditMode}
    >
      <OrganizerForm isEditMode={isEditMode} initialData={organizer} />
    </CustomCard>
  );
};

export default OrganizerAddEditPage;
