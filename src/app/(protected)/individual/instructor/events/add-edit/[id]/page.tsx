"use client";

import React from "react";
import { usePageTitle } from "@/hooks";
import { CustomCard } from "@/components";
import { EventForm, useEventAddEdit } from "../_shared";

const EventAddEditPage: React.FC = () => {
  const { isEditMode, event, eventDetailLoading } = useEventAddEdit();

  const pageTitle = isEditMode ? "Etkinliği Düzenle" : "Yeni Etkinlik Ekle";

  usePageTitle(pageTitle);

  return (
    <CustomCard
      title={pageTitle}
      subtitle={
        isEditMode
          ? "Mevcut etkinlik bilgilerini düzenleyin"
          : "Yeni bir etkinlik oluşturun"
      }
      isBack
      isLoading={eventDetailLoading && isEditMode}
    >
      <EventForm isEditMode={isEditMode} initialData={event} />
    </CustomCard>
  );
};

export default EventAddEditPage;
