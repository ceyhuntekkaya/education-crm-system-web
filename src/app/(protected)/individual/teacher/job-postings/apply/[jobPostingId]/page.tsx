"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/hooks";
import { CustomCard } from "@/components";
import { ApplicationForm } from "../_shared/sections/application-form/application-form";
import { useApplicationAdd } from "../_shared/context";
import { EmptyProfileState } from "@/app/(protected)/individual/teacher/teacher-profile/_shared/sections";

/**
 * İş ilanına başvuru sayfası
 */
const ApplicationAddPage: React.FC = () => {
  const router = useRouter();
  const { jobPosting, jobPostingLoading, teacherProfileId } =
    useApplicationAdd();

  const pageTitle = "İş İlanına Başvur";
  usePageTitle(pageTitle);

  // No teacher profile - Early return
  if (!jobPostingLoading && !teacherProfileId) {
    return (
      <EmptyProfileState onCreateProfile={() => router.push("/individual/teacher/teacher-profile/create")} />
    );
  }

  // Job posting not found - Early return
  if (!jobPostingLoading && !jobPosting) {
    return (
      <CustomCard
        title="İlan Bulunamadı"
        subtitle="Aradığınız ilan artık mevcut değil"
        isBack
      >
        <div className="text-center py-48">
          <i
            className="ph-duotone ph-warning-circle text-warning-600 mb-24"
            style={{ fontSize: "80px" }}
          ></i>
          <h5 className="mb-12 text-neutral-900">İlan Bulunamadı</h5>
          <p
            className="text-neutral-600 mb-32 mx-auto"
            style={{ maxWidth: "500px" }}
          >
            Görüntülemeye çalıştığınız ilan bulunamadı veya artık yayında değil.
            Diğer ilanları incelemek için ilanlar sayfasına dönebilirsiniz.
          </p>
          <button
            className="btn btn-outline-primary btn-lg"
            onClick={() => router.push("/individual/teacher/job-postings")}
          >
            <i className="ph-bold ph-arrow-left me-8"></i>
            İlanlara Dön
          </button>
        </div>
      </CustomCard>
    );
  }

  return (
    <CustomCard
      title={pageTitle}
      subtitle="İlan detaylarını inceleyin ve başvurunuzu tamamlayın"
      isBack
      isLoading={jobPostingLoading}
    >
      <ApplicationForm />
    </CustomCard>
  );
};

export default ApplicationAddPage;
