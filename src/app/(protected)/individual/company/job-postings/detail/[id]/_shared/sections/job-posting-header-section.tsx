"use client";

import React from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useSnackbar } from "@/contexts";
import { useJobPostingDetailContext } from "../context";
import { useJobPostingsContext } from "../../../../_shared/contexts";
import { ActionButton } from "@/components/layouts/detail-layout/components";

/**
 * Job Posting Header Section
 * İş ilanı detay sayfasında kullanılacak header bölümü
 * - Geri Dön butonu (liste sayfasına yönlendirir)
 * - İlanı Düzenle butonu (DRAFT veya PUBLISHED durumunda)
 * - Job Posting verisini context'ten alır
 */
export const JobPostingHeaderSection: React.FC = () => {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const params = useParams();
  const pathname = usePathname();
  const jobPostingId = params.id as string;

  // Job Posting verisini context'ten al
  const { jobPosting, isLoading } = useJobPostingDetailContext();
  const { setSelectedJobPosting } = useJobPostingsContext();

  // Geri buton linkini belirle
  const getBackButtonHref = () => {
    return "/individual/company/job-postings";
  };

  // Düzenle handler
  const handleEdit = () => {
    if (!jobPosting) return;

    // Sadece DRAFT veya PUBLISHED durumunda düzenlenebilir
    if (jobPosting.status !== "DRAFT" && jobPosting.status !== "PUBLISHED") {
      showSnackbar(
        "Yalnızca taslak veya yayınlanmış ilanlar düzenlenebilir.",
        "warning",
      );
      return;
    }

    // Detay verisini context'e kaydet (API çağrısını önlemek için)
    setSelectedJobPosting(jobPosting);
    // Edit sayfasına yönlendir
    router.push(`/individual/company/job-postings/add-edit/${jobPostingId}`);
  };

  // Başvurular sayfasına yönlendir
  const handleViewApplications = () => {
    router.push(
      `/individual/company/job-postings/detail/${jobPostingId}/applications`,
    );
  };

  // Başvuru sayısı
  const applicationCount = jobPosting?.applicationCount || 0;
  const hasApplications = applicationCount > 0;

  // Action buttons
  const actionButtons = [
    {
      id: "back",
      label: "Geri Dön",
      href: getBackButtonHref(),
    },
    {
      id: "applications",
      label: `Başvurular (${applicationCount})`,
      onClick: handleViewApplications,
      disabled: isLoading || !jobPosting,
      icon: "ph-users",
    },
    {
      id: "edit",
      label: "İlanı Düzenle",
      onClick: handleEdit,
      disabled:
        isLoading ||
        !jobPosting ||
        (jobPosting.status !== "DRAFT" && jobPosting.status !== "PUBLISHED"),
    },
  ];

  return (
    <div className="detail-layout-header">
      <div className="job-posting-detail-page__header">
        {/* Action Buttons */}
        {actionButtons.length > 0 && (
          <div className="job-posting-detail-page__header-actions d-flex justify-content-between align-items-center w-100">
            {actionButtons.map((button) => (
              <ActionButton
                key={button.id}
                config={{
                  id: button.id,
                  label: button.label,
                  href: button.href,
                  onClick: button.onClick,
                  disabled: button.disabled,
                  icon: button.icon,
                  variant:
                    button.id === "back"
                      ? "outline"
                      : button.id === "applications"
                        ? "secondary"
                        : button.id === "edit"
                          ? "primary"
                          : "secondary",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
