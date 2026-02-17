"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

/**
 * Başarılı başvuru mesajı
 */
export const ApplicationSuccessMessage: React.FC = () => {
  const router = useRouter();

  const handleGoToApplications = () => {
    router.push("/individual/teacher/job-postings/applications");
  };

  return (
    <div className="d-flex align-items-center justify-content-center py-48">
      <div className="text-center" style={{ maxWidth: "560px" }}>
        {/* Success Icon */}
        <div className="mb-32">
          <div
            className="d-inline-flex align-items-center justify-content-center bg-success-50 rounded-circle"
            style={{ width: "96px", height: "96px" }}
          >
            <i
              className="ph-duotone ph-check-circle text-success-600"
              style={{ fontSize: "48px" }}
            ></i>
          </div>
        </div>

        {/* Title */}
        <h4 className="mb-16 text-neutral-900 fw-semibold">
          Başvurunuz Gönderildi!
        </h4>

        {/* Description */}
        <p
          className="text-neutral-600 mb-32"
          style={{ lineHeight: "1.6", fontSize: "15px" }}
        >
          Başvurunuz başarıyla iletildi. Okul yetkilisi sizinle en kısa sürede
          iletişime geçecektir.
        </p>

        {/* Action Button */}
        <div className="d-flex justify-content-center">
          <Button variant="inline" onClick={handleGoToApplications}>
            <i className="ph ph-list-checks me-2"></i>
            Başvurularımı Görüntüle
          </Button>
        </div>
      </div>
    </div>
  );
};
