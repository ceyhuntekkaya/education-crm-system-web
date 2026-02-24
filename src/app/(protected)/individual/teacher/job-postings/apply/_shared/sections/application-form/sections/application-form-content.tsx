"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, FormValues } from "@/components/forms";
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

    // Documents array'ini backend formatına dönüştür
    let documents = undefined;

    if (values.documents) {
      // String ise (tek eleman), array'e çevir
      const docsArray = Array.isArray(values.documents)
        ? values.documents
        : [values.documents];

      // Array'i backend formatına dönüştür
      if (docsArray.length > 0) {
        documents = docsArray
          .map((doc: any) => {
            // String ise (URL), basit document objesi oluştur
            if (typeof doc === "string") {
              const fileName = doc.split("/").pop() || "document";
              return {
                documentName: fileName,
                documentUrl: doc,
                documentType: "DOCUMENT",
              };
            }

            // Object ise, field mapping yap
            return {
              documentName: doc.fileName || doc.documentName,
              documentUrl: doc.fileUrl || doc.documentUrl,
              documentType: doc.itemType || doc.documentType,
              fileSize: doc.fileSize,
            };
          })
          .filter((doc: any) => doc.documentUrl); // Boş olanları filtrele
      }
    }

    const applicationData: ApplicationCreateDto = {
      jobPostingId: jobPosting.id,
      teacherProfileId,
      coverLetter: values.coverLetter?.trim() || undefined,
      ...(documents && documents.length > 0 ? { documents } : {}),
    };

    const success = await submitApplication(applicationData);

    if (success) {
      setShowSuccess(true);
      // 2 saniye sonra yönlendir
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
          <FormValues className="mb-24" />
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
