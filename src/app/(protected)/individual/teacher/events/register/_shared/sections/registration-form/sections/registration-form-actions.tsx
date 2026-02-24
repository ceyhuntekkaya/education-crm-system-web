"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components";
import { useEventRegistrationAdd } from "../../../context";

/**
 * Kayıt formu aksiyon butonları
 */
export const RegistrationFormActions: React.FC = () => {
  const router = useRouter();
  const { submitting } = useEventRegistrationAdd();

  return (
    <div className="bg-white rounded-12 shadow-sm p-20">
      <div className="d-flex align-items-center gap-12">
        <Button
          variant="outline"
          size="md"
          fullWidth
          onClick={() => router.back()}
          disabled={submitting}
        >
          <i className="ph ph-arrow-left me-6" />
          Geri Dön
        </Button>
        <Button
          type="submit"
          variant="success"
          size="md"
          fullWidth
          disabled={submitting}
          loading={submitting}
        >
          {submitting ? (
            "Kaydediliyor..."
          ) : (
            <>
              <i className="ph ph-calendar-check me-6" />
              Kaydı Tamamla
            </>
          )}
        </Button>
      </div>

      <p className="text-xs text-neutral-400 mt-12 mb-0 text-center">
        Kaydı tamamladığınızda etkinlik organizatörü tarafından
        bilgilendirileceksiniz.
      </p>
    </div>
  );
};
