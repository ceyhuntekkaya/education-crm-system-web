"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@/contexts/form-context";
import { Form, FormTextarea } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components";
import { useFormHook } from "@/hooks";
import { useApplicationAdd } from "../../../context";
import { formatDate } from "@/utils";
import type { ApplicationCreateDto } from "@/types";

/**
 * Başvuru formu içeriği
 */
export const ApplicationFormContent: React.FC = () => {
  const { hasErrors } = useFormHook();
  const { reset } = useForm();
  const router = useRouter();
  const { jobPosting, teacherProfileId, submitApplication, submitting } =
    useApplicationAdd();

  const handleSubmit = async (values: any) => {
    if (!jobPosting || !teacherProfileId) {
      return;
    }

    const applicationData: ApplicationCreateDto = {
      jobPostingId: jobPosting.id,
      teacherProfileId,
      coverLetter: values.coverLetter?.trim() || undefined,
      documents: [],
    };

    const success = await submitApplication(applicationData);

    // Sadece başarılı olduğunda yönlendir
    if (success) {
      router.push("/individual/teacher/job-postings");
      router.refresh();
    }
  };

  const handleCancel = () => {
    reset();
    router.back();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="row row-gap-24">
        {/* İlan Bilgileri */}
        <div className="col-12">
          <h5 className="mb-3">
            <i className="ph ph-briefcase me-2"></i>
            İlan Bilgileri
          </h5>
        </div>

        <div className="col-12">
          <div className="soft-card rounded-12 p-20">
            <h6 className="mb-12 fw-semibold text-neutral-900">
              {jobPosting?.positionTitle || "İlan Yükleniyor..."}
            </h6>
            {jobPosting && (
              <div className="d-flex flex-column gap-8">
                {jobPosting.branch && (
                  <div className="d-flex align-items-center gap-8 text-sm text-neutral-600">
                    <i className="ph-bold ph-books"></i>
                    <span>{jobPosting.branch}</span>
                  </div>
                )}
                {jobPosting.campus && (
                  <div className="d-flex align-items-center gap-8 text-sm text-neutral-600">
                    <i className="ph-bold ph-building"></i>
                    <span>{jobPosting.campus.name}</span>
                  </div>
                )}
                {jobPosting.employmentType && (
                  <div className="d-flex align-items-center gap-8 text-sm text-neutral-600">
                    <i className="ph-bold ph-briefcase"></i>
                    <span>{jobPosting.employmentType}</span>
                  </div>
                )}
                {jobPosting.applicationDeadline && (
                  <div className="d-flex align-items-center gap-8 text-sm text-neutral-600">
                    <i className="ph-bold ph-calendar"></i>
                    <span>
                      Son Başvuru: {formatDate(jobPosting.applicationDeadline)}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="col-12">
          <Divider />
        </div>

        {/* Başvuru Formu */}
        <div className="col-12">
          <h5 className="mb-3">
            <i className="ph ph-file-text me-2"></i>
            Başvuru Bilgileri
          </h5>
        </div>

        <div className="col-12">
          <FormTextarea
            label="Ön Yazı"
            name="coverLetter"
            rows={10}
            placeholder="Kendinizi tanıtın ve neden bu pozisyon için uygun olduğunuzu açıklayın... (En az 50 karakter)"
            disabled={submitting}
            helperText="Başvurunuzda kendinizi tanıtabilir, deneyimlerinizi ve neden bu pozisyon için uygun olduğunuzu belirtebilirsiniz."
          />
        </div>

        {/* Bilgilendirme */}
        <div className="col-12">
          <div className="alert alert-info d-flex align-items-start gap-12">
            <i
              className="ph-bold ph-info text-info-600"
              style={{ fontSize: "20px" }}
            ></i>
            <div className="flex-grow-1">
              <p className="mb-0 text-sm text-neutral-700">
                Başvurunuz gönderildikten sonra okul yetkilisi tarafından
                değerlendirilecektir. Başvuru durumunuzu{" "}
                <strong>Başvurularım</strong> sayfasından takip edebilirsiniz.
              </p>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="col-12">
          <div className="d-flex gap-12 justify-content-end">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={submitting}
            >
              İptal
            </Button>
            <Button
              type="submit"
              variant="inline"
              loading={submitting}
              disabled={hasErrors}
            >
              Başvuruyu Gönder
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};
