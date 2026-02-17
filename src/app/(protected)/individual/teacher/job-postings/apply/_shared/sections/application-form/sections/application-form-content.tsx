"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form } from "@/components/forms";
import { useApplicationAdd } from "../../../context";
import type { ApplicationCreateDto } from "@/types";
import {
  JobPostingSummaryCard,
  TeacherProfileSummaryCard,
  CoverLetterSection,
  ApplicationInfoAlert,
  ApplicationFormActions,
  ApplicationSuccessMessage,
} from "./index";

/**
 * Başvuru formu içeriği
 */
export const ApplicationFormContent: React.FC = () => {
  const router = useRouter();
  const { jobPosting, teacherProfileId, submitApplication } =
    useApplicationAdd();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (values: any) => {
    if (!jobPosting || !teacherProfileId) {
      return;
    }

    const applicationData: ApplicationCreateDto = {
      jobPostingId: jobPosting.id,
      teacherProfileId,
      coverLetter: values.coverLetter?.trim() || undefined,
      documents: values.documents || [],
    };

    const success = await submitApplication(applicationData);

    if (success) {
      setShowSuccess(true);
      // 2 saniye sonra yönlendir
      setTimeout(() => {
        router.push("/individual/teacher/job-postings/applications");
        router.refresh();
      }, 2000);
    }
  };

  // Başarı mesajı gösteriliyorsa
  if (showSuccess) {
    return <ApplicationSuccessMessage />;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className="row row-gap-20">
        {/* İki Kolonlu Layout */}
        <div className="col-lg-5">
          {/* İlan Özet Kartı */}
          <div className="sticky-top" style={{ top: "100px" }}>
            <JobPostingSummaryCard />
          </div>
        </div>

        <div className="col-lg-7">
          {/* Profil Özet Kartı */}
          <TeacherProfileSummaryCard />

          {/* Başvuru Formu */}
          <CoverLetterSection />

          {/* Bilgilendirme */}
          <ApplicationInfoAlert />

          {/* Form Actions */}
          <ApplicationFormActions />
        </div>
      </div>
    </Form>
  );
};
