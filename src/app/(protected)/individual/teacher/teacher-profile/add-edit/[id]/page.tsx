"use client";

import React from "react";
import { usePageTitle } from "@/hooks";
import { CustomCard } from "@/components";
import { TeacherProfileForm, useTeacherProfileAddEdit } from "../_shared";

interface TeacherProfileAddEditPageProps {}

const TeacherProfileAddEditPage: React.FC<
  TeacherProfileAddEditPageProps
> = () => {
  const { isEditMode, teacherProfile, profileDetailLoading } =
    useTeacherProfileAddEdit();

  const pageTitle = isEditMode ? "Profil Düzenle" : "Yeni Profil Oluştur";

  usePageTitle(pageTitle);

  return (
    <CustomCard
      title={pageTitle}
      subtitle={
        isEditMode
          ? "Mevcut profilinizi düzenleyin"
          : "Yeni bir öğretmen profili oluşturun"
      }
      isBack
      isLoading={profileDetailLoading && isEditMode}
    >
      <TeacherProfileForm
        isEditMode={isEditMode}
        initialData={teacherProfile}
      />
    </CustomCard>
  );
};

export default TeacherProfileAddEditPage;
