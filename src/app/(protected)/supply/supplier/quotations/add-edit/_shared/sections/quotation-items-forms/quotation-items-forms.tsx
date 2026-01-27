"use client";

import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { CustomCard, LoadingSpinner } from "@/components";
import { useQuotationAddEdit } from "../../context";
import {
  QuotationItemDynamicForm,
  QuotationItemFormHandle,
} from "./quotation-item-dynamic-form";

export interface QuotationItemsFormsHandle {
  submitAllForms: (quotationId: number) => Promise<void>;
}

/**
 * Quotation Items Forms - RFQ itemlarına göre dinamik formlar
 */
export const QuotationItemsForms = forwardRef<QuotationItemsFormsHandle, {}>(
  (props, ref) => {
    const { rfqItems, rfqItemsLoading, rfqItemsError, quotation, isEditing } =
      useQuotationAddEdit();

    // Create refs for each form - must be at the top before any conditionals
    const formRefs = useRef<(QuotationItemFormHandle | null)[]>([]);

    // Expose submitAllForms method to parent
    useImperativeHandle(ref, () => ({
      submitAllForms: async (quotationId: number) => {
        console.log(
          `🔄 ${formRefs.current.length} adet item formu gönderiliyor...`,
        );

        try {
          // Submit all forms in parallel (not sequentially)
          const submitPromises = formRefs.current
            .filter((formRef) => formRef !== null)
            .map((formRef) => formRef!.submitForm(quotationId));

          await Promise.all(submitPromises);

          console.log("✅ Tüm item formları başarıyla gönderildi");
        } catch (error) {
          console.error("❌ Item formları gönderilirken hata:", error);
          throw error; // Re-throw to parent (page.tsx)
        }
      },
    }));

    if (rfqItemsLoading) {
      return (
        <CustomCard title="Kalemler">
          <div className="flex justify-center items-center py-8">
            <LoadingSpinner />
          </div>
        </CustomCard>
      );
    }

    if (rfqItemsError) {
      return (
        <CustomCard title="Kalemler">
          <div className="text-red-500 text-center py-4">
            Kalemler yüklenirken bir hata oluştu: {rfqItemsError}
          </div>
        </CustomCard>
      );
    }

    if (!rfqItems || rfqItems.length === 0) {
      return (
        <CustomCard title="Kalemler">
          <div className="text-gray-500 text-center py-4">
            Bu alım ilanına ait kalem bulunmamaktadır.
          </div>
        </CustomCard>
      );
    }

    return (
      <div className="d-flex flex-column gap-24">
        {rfqItems.map((rfqItem, index) => (
          <QuotationItemDynamicForm
            key={rfqItem.id}
            ref={(el) => {
              formRefs.current[index] = el;
            }}
            rfqItem={rfqItem}
            index={index}
          />
        ))}
      </div>
    );
  },
);

QuotationItemsForms.displayName = "QuotationItemsForms";
