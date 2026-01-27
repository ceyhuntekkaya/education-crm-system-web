"use client";

import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { Button } from "@/components/ui/button";
import { RFQItemDynamicForm, RFQItemFormHandle } from "./rfq-item-dynamic-form";

export interface RFQItemsFormsHandle {
  submitAllForms: (rfqId: number) => Promise<void>;
}

/**
 * RFQ Items Forms - Dinamik kalem formları
 */
export const RFQItemsForms = forwardRef<RFQItemsFormsHandle, {}>(
  (props, ref) => {
    // Dynamic forms state
    const [formCount, setFormCount] = React.useState(1);

    // Create refs for each form
    const formRefs = useRef<(RFQItemFormHandle | null)[]>([]);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);


    // Expose submitAllForms method to parent
    useImperativeHandle(ref, () => ({
      submitAllForms: async (rfqId: number) => {
        try {
          // Submit all forms sequentially
          for (let i = 0; i < formRefs.current.length; i++) {
            const formRef = formRefs.current[i];
            
            if (formRef) {
              await formRef.submitForm(rfqId);
            }
          }
        } catch (error) {
          console.error("❌ Kalem formları gönderilirken hata:", error);
          throw error;
        }
      },
    }));

    // Add new form
    const handleAddForm = () => {
      const newIndex = formCount;
      setFormCount((prev) => prev + 1);

      // Scroll to new form after state update
      setTimeout(() => {
        const newCardRef = cardRefs.current[newIndex];
        if (newCardRef) {
          newCardRef.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    };

    // Remove form
    const handleRemoveForm = (index: number) => {
      setFormCount((prev) => prev - 1);
      // Remove ref from array
      formRefs.current.splice(index, 1);
      cardRefs.current.splice(index, 1);
    };

    return (
      <div className="d-flex flex-column gap-24">
        {/* Dynamic Forms */}
        {Array.from({ length: formCount }, (_, index) => (
          <div
            key={index}
            ref={(el: HTMLDivElement | null) => {
              cardRefs.current[index] = el;
            }}
          >
            <RFQItemDynamicForm
              ref={(el: RFQItemFormHandle | null) => {
                formRefs.current[index] = el;
              }}
              index={index}
              onRemove={() => handleRemoveForm(index)}
            />
          </div>
        ))}

        {/* Add Button */}
        <div className="d-flex justify-content-center">
          <Button
            type="button"
            variant="outline"
            onClick={handleAddForm}
            className="w-auto"
          >
            + Yeni Kalem Ekle
          </Button>
        </div>
      </div>
    );
  },
);

RFQItemsForms.displayName = "RFQItemsForms";
