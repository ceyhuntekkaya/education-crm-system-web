"use client";

import React, { useRef, useState } from "react";
import { usePageTitle } from "@/hooks";
import { CustomCard } from "@/components";
import { RFQForm, RFQItemsForms, StickyFooter } from "../_shared";
import { useRFQAddEdit } from "../_shared/context";
import { useRFQsContext } from "../../_shared/contexts";
import { useRouter } from "next/navigation";
import type { RFQFormHandle } from "../_shared/sections/rfq-form/sections/form-content";
import type { RFQItemsFormsHandle } from "../_shared/sections/rfq-items-forms";

const RFQAddEditPage: React.FC = () => {
  const router = useRouter();
  const { rfq, rfqDetailLoading, isEditing } = useRFQAddEdit();
  const { refetch } = useRFQsContext();

  const pageTitle = isEditing ? "Alım İlanı Düzenle" : "Yeni Alım İlanı";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const rfqFormRef = useRef<RFQFormHandle>(null);
  const rfqItemsFormsRef = useRef<RFQItemsFormsHandle>(null);

  usePageTitle(pageTitle);

  const handleCancel = () => {
    router.back();
  };

  const handleSubmitAll = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // 1. Submit RFQ form first and get RFQ ID
      let rfqId: number | null = null;
      if (rfqFormRef.current) {
        rfqId = await rfqFormRef.current.submitForm();
      }

      // Check if RFQ was created successfully
      if (!rfqId) {
        throw new Error(
          "Alım ilanı oluşturulamadı. Lütfen alım ilanı formunu kontrol edin.",
        );
      }

      // 2. Submit all item forms with the RFQ ID
      if (rfqItemsFormsRef.current) {
        await rfqItemsFormsRef.current.submitAllForms(rfqId);
      }

      // Success - Tüm API istekleri başarılı olduğunda önce refetch, sonra yönlendir
      await refetch();
      router.push("/supply/company/rfqs");
    } catch (error) {
      console.error("❌ Alım ilanı gönderilirken hata:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Alım ilanı gönderilirken hata oluştu";
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div
        className="d-flex flex-column gap-24"
        style={{ paddingBottom: "60px" }}
      >
        <CustomCard
          title={pageTitle}
          subtitle={
            isEditing
              ? "Mevcut alım ilanını düzenleyin"
              : "Yeni bir alım ilanı oluşturun"
          }
          isBack
          isLoading={isEditing && rfqDetailLoading}
        >
          <RFQForm
            ref={rfqFormRef}
            initialData={isEditing ? (rfq ?? undefined) : undefined}
          />
        </CustomCard>

        {/* RFQ Items Forms - Yeni Alım İlanı oluştururken */}
        {!isEditing && <RFQItemsForms ref={rfqItemsFormsRef} />}

        {submitError && (
          <div className="alert alert-danger" role="alert">
            {submitError}
          </div>
        )}
      </div>

      <StickyFooter
        onCancel={handleCancel}
        onSubmit={handleSubmitAll}
        isSubmitting={isSubmitting}
        isEditing={isEditing}
      />
    </>
  );
};

export default RFQAddEditPage;
