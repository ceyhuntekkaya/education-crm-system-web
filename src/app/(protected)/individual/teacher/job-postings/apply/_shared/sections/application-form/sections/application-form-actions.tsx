"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useFormHook } from "@/hooks";
import { useForm } from "@/contexts/form-context";
import { useApplicationAdd } from "../../../context";

/**
 * Başvuru formu aksiyon butonları
 */
export const ApplicationFormActions: React.FC = () => {
  const { hasErrors } = useFormHook();
  const { reset } = useForm();
  const router = useRouter();
  const { submitting } = useApplicationAdd();

  const handleCancel = () => {
    reset();
    router.back();
  };

  return (
    <div className="d-flex gap-12 justify-content-end">
      <Button variant="outline" onClick={handleCancel} disabled={submitting}>
        <i className="ph ph-x me-2"></i>
        İptal
      </Button>
      <Button
        type="submit"
        variant="inline"
        loading={submitting}
        disabled={hasErrors}
      >
        <i className="ph ph-paper-plane-tilt me-2"></i>
        Başvuruyu Gönder
      </Button>
    </div>
  );
};
