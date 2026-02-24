"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts";
import { Form } from "@/components/forms";
import { useEventRegistrationAdd } from "../../../context";
import {
  EventSummaryCard,
  RegistrationFormActions,
  RegistrationNoteSection,
  RegistrationSuccessMessage,
} from "./index";

/**
 * Kayıt formu içeriği — sol: etkinlik özeti, sağ: form
 */
export const RegistrationFormContent: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { event, submitRegistration } = useEventRegistrationAdd();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (values: any) => {
    if (!event || !user?.id) return;

    const success = await submitRegistration({
      eventId: event.id,
      teacherId: user.id,
      registrationNote: values.registrationNote?.trim() || undefined,
    });

    if (success) {
      setShowSuccess(true);
    }
  };

  if (showSuccess) {
    return <RegistrationSuccessMessage />;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className="row row-gap-20">
        {/* SOL: Etkinlik Özeti */}
        <div className="col-lg-5">
          <div className="sticky-top" style={{ top: "100px" }}>
            <EventSummaryCard />
          </div>
        </div>

        {/* SAĞ: Form */}
        <div className="col-lg-7">
          <RegistrationNoteSection />
          <RegistrationFormActions />
        </div>
      </div>
    </Form>
  );
};
