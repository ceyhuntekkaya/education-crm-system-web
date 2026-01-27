"use client";

import React, { useRef, useState } from "react";
import { usePageTitle } from "@/hooks";
import { CustomCard } from "@/components";
import { QuotationForm, QuotationItemsForms, StickyFooter } from "../_shared";
import { useQuotationAddEdit } from "../_shared/context";
import { useQuotationsContext } from "../../_shared/contexts";
import { useRouter } from "next/navigation";
import type { QuotationFormHandle } from "../_shared/sections/quotation-form/sections/form-content";
import type { QuotationItemsFormsHandle } from "../_shared/sections/quotation-items-forms/quotation-items-forms";

const QuotationAddEditPage: React.FC = () => {
  const router = useRouter();
  const { quotation, quotationDetailLoading, isEditing } =
    useQuotationAddEdit();
  const { refetch } = useQuotationsContext();

  const pageTitle = isEditing ? "Teklif Düzenle" : "Yeni Teklif Oluştur";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const quotationFormRef = useRef<QuotationFormHandle>(null);
  const quotationItemsFormsRef = useRef<QuotationItemsFormsHandle>(null);

  usePageTitle(pageTitle);

  const handleCancel = () => {
    router.back();
  };

  const handleSubmitAll = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // 1. Submit quotation form first and get quotation ID
      let quotationId: number | null = null;
      if (quotationFormRef.current) {
        quotationId = await quotationFormRef.current.submitForm();
      }

      // Check if quotation was created successfully
      if (!quotationId) {
        throw new Error(
          "Teklif oluşturulamadı. Lütfen teklif formunu kontrol edin.",
        );
      }

      console.log("✅ Quotation başarıyla oluşturuldu, ID:", quotationId);

      // 2. Submit all item forms with the quotation ID
      if (quotationItemsFormsRef.current) {
        console.log("🔄 Item formları gönderiliyor...");
        await quotationItemsFormsRef.current.submitAllForms(quotationId);
        console.log("✅ Tüm item formları başarıyla gönderildi");
      }

      // Success - Tüm API istekleri başarılı olduğunda önce refetch, sonra yönlendir
      console.log("✅ Tüm işlemler başarılı, liste API'si yenileniyor...");
      await refetch();
      console.log(
        "✅ Liste yenilendi, quotations listesine yönlendiriliyor...",
      );
      router.push("/supply/supplier/quotations");
    } catch (error) {
      console.error("❌ Teklif gönderilirken hata:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Teklif gönderilirken hata oluştu";
      setSubmitError(errorMessage);
      // Hata olduğunda router.back() yapma
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
              ? "Mevcut teklifi düzenleyin"
              : "Alım ilanına yeni bir teklif oluşturun"
          }
          isBack
          isLoading={isEditing && quotationDetailLoading}
        >
          <QuotationForm
            ref={quotationFormRef}
            initialData={isEditing ? (quotation ?? undefined) : undefined}
          />
        </CustomCard>

        {/* Quotation Items Forms - Dinamik olarak RFQ itemlarına göre */}
        <QuotationItemsForms ref={quotationItemsFormsRef} />

        {/* Error Message */}
        {submitError && <div className="alert alert-danger">{submitError}</div>}
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

export default QuotationAddEditPage;
