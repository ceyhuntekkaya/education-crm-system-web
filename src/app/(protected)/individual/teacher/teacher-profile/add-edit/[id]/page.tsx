"use client";

import React, { useRef, useState } from "react";
import { usePageTitle } from "@/hooks";
import { CustomCard } from "@/components";
import { TeacherProfileForm } from "../_shared/sections";
import { useTeacherProfileAddEdit } from "../_shared/context";
import { useTeacherProfileContext } from "../../_shared/contexts";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { TeacherProfileFormHandle } from "../_shared/sections/teacher-profile-form/types";

const TeacherProfileAddEditPage: React.FC = () => {
  const router = useRouter();
  const { isEditMode, teacherProfile, isLoading } = useTeacherProfileAddEdit();
  const { refetch } = useTeacherProfileContext();

  const pageTitle = isEditMode ? "Profil Düzenle" : "Yeni Profil Oluştur";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formRef = useRef<TeacherProfileFormHandle>(null);

  usePageTitle(pageTitle);

  // TeacherProfileDto'yu form data formatına dönüştür
  const getFormInitialData = () => {
    if (!isEditMode || !teacherProfile) return undefined;

    const formData = {
      fullName: teacherProfile.fullName,
      email: teacherProfile.email,
      phone: teacherProfile.phone,
      city: teacherProfile.city,
      branch: teacherProfile.branch,
      educationLevel: teacherProfile.educationLevel,
      experienceYears: teacherProfile.experienceYears,
      bio: teacherProfile.bio,
      profilePhotoUrl: teacherProfile.profilePhotoUrl,
      videoUrl: teacherProfile.videoUrl,
      cvUrl: teacherProfile.cvUrl,
      isActive: teacherProfile.isActive,
      provinceIds: teacherProfile.provinces?.map((p) => p.id) || [],
    };

    return formData;
  };

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      let profileId: number | null = null;

      if (formRef.current) {
        profileId = await formRef.current.submit();
        console.log("Form submit result - profileId:", profileId);
      }

      // Check if profile was created/updated successfully
      if (!profileId) {
        console.error("Profile ID is null or undefined after submit");
        throw new Error("Profil kaydedilemedi. Lütfen formu kontrol edin.");
      }

      // Success - refetch profile data
      await refetch();

      // Profil sayfasına yönlendir
      router.push("/individual/teacher/teacher-profile");
    } catch (error) {
      console.error("Submit error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Profil kaydedilirken hata oluştu";
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="d-flex flex-column gap-24">
      <CustomCard
        title={pageTitle}
        subtitle={
          isEditMode
            ? "Mevcut profilinizi düzenleyin"
            : "Yeni bir öğretmen profili oluşturun"
        }
        isBack
        isLoading={isEditMode && isLoading}
      >
        <TeacherProfileForm ref={formRef} initialData={getFormInitialData()} />

        {/* Error Message */}
        {submitError && (
          <div className="alert alert-danger mt-3">{submitError}</div>
        )}

        {/* Action Buttons */}
        <div className="d-flex justify-content-end gap-8 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            İptal
          </Button>
          <Button
            type="button"
            variant="inline"
            onClick={handleSubmit}
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            {isEditMode ? "Profili Güncelle" : "Profil Oluştur"}
          </Button>
        </div>
      </CustomCard>
    </div>
  );
};

export default TeacherProfileAddEditPage;
