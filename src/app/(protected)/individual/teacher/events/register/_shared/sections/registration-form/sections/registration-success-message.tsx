"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components";
import { useEventRegistrationAdd } from "../../../context";

/**
 * Başarılı kayıt sonrası gösterilen mesaj
 */
export const RegistrationSuccessMessage: React.FC = () => {
  const router = useRouter();
  const { event } = useEventRegistrationAdd();

  return (
    <div className="text-center py-48">
      <div
        className="d-flex align-items-center justify-content-center mx-auto mb-24 rounded-circle"
        style={{
          width: 88,
          height: 88,
          background:
            "linear-gradient(135deg, hsl(var(--success-50)) 0%, hsl(var(--success-100)) 100%)",
        }}
      >
        <i
          className="ph-fill ph-check-circle text-success-600"
          style={{ fontSize: 48 }}
        />
      </div>

      <h4 className="fw-bold text-neutral-900 mb-12">
        Kayıt Başarıyla Tamamlandı!
      </h4>

      {event?.title && (
        <p className="text-neutral-600 mb-8 fw-medium">
          <span className="text-neutral-400">Etkinlik: </span>
          {event.title}
        </p>
      )}

      <p className="text-neutral-500 mb-32 mx-auto" style={{ maxWidth: 480 }}>
        Etkinliğe kaydınız alınmıştır. Etkinlik tarihi yaklaştığında organizatör
        tarafından bilgilendirileceksiniz.
      </p>

      <div className="d-flex align-items-center justify-content-center gap-16 flex-wrap">
        <Button
          variant="outline"
          size="md"
          onClick={() => router.push("/individual/teacher/events")}
        >
          <i className="ph ph-arrow-left me-6" />
          Etkinliklere Dön
        </Button>
        <Button
          variant="inline"
          size="md"
          onClick={() => router.push("/individual/teacher/events")}
        >
          <i className="ph ph-calendar me-6" />
          Diğer Etkinlikleri İncele
        </Button>
      </div>
    </div>
  );
};
