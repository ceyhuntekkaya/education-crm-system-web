"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/hooks";
import { CustomCard } from "@/components";
import { ApplicationForm } from "../_shared/sections/application-form/application-form";
import { useApplicationAdd } from "../_shared/context";

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
      <CustomCard
        title="Profil Gerekli"
        subtitle="Başvuru yapmak için önce öğretmen profilinizi oluşturmalısınız"
        isBack
      >
        <div className="text-center py-32">
          <i
            className="ph-duotone ph-user-circle text-warning-600 mb-16"
            style={{ fontSize: "64px" }}
          ></i>
          <p className="text-neutral-600 mb-24">
            İş ilanlarına başvuru yapabilmek için önce profilinizi oluşturmanız
            gerekmektedir.
          </p>
          <button
            className="btn btn-primary"
            onClick={() =>
              router.push("/individual/teacher/teacher-profile/add-edit/new")
            }
          >
            <i className="ph-bold ph-user-plus me-2"></i>
            Profil Oluştur
          </button>
        </div>
      </CustomCard>
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
        <div className="text-center py-32">
          <i
            className="ph-duotone ph-warning-circle text-warning-600 mb-16"
            style={{ fontSize: "64px" }}
          ></i>
          <p className="text-neutral-600 mb-24">
            Görüntülemeye çalıştığınız ilan bulunamadı veya artık yayında değil.
          </p>
          <button
            className="btn btn-outline-primary"
            onClick={() => router.push("/individual/teacher/job-postings")}
          >
            <i className="ph-bold ph-arrow-left me-2"></i>
            İlanlara Dön
          </button>
        </div>
      </CustomCard>
    );
  }

  return (
    <CustomCard
      title={pageTitle}
      subtitle="Başvuru formunu doldurun ve başvurunuzu gönderin"
      isBack
      isLoading={jobPostingLoading}
    >
      <ApplicationForm />
    </CustomCard>
  );
};

export default ApplicationAddPage;
