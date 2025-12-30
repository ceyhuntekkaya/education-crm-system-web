"use client";

import React from "react";
import { Modal, ModalHeader, ModalBody } from "@/components/ui";
import { FormProvider } from "@/contexts/form-context";
import { RFQFormContent } from "./sections";
import {
  validationSchema as rfqValidationSchema,
  initialValues as rfqInitialValues,
} from "./schemas";
import { RFQFormModalProps, RFQFormData } from "./types";
import { useWishlistContext } from "../../contexts";

/**
 * RFQ Form Modal Component
 * Seçilen ürünler için RFQ oluşturma formu
 */
export const RFQFormModal: React.FC<RFQFormModalProps> = () => {
  const { isRFQModalOpen, closeRFQModal, selectedProductIds } =
    useWishlistContext();

  // selectedProductIds değiştiğinde initial values'u güncelle
  const formInitialValues: RFQFormData = {
    ...rfqInitialValues,
    productIds: selectedProductIds,
  };

  const handleModalClose = () => {
    closeRFQModal();
  };

  return (
    <Modal
      isOpen={isRFQModalOpen}
      onClose={handleModalClose}
      size="lg"
      closeOnBackdropClick
      closeOnEscape
      scrollable
    >
      <ModalHeader onClose={handleModalClose}>
        <div className="d-flex align-items-center gap-12">
          <div
            className="d-flex align-items-center justify-content-center rounded-12"
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: "hsl(var(--success-100))",
            }}
          >
            <i
              className="ph-fill ph-file-text text-success-600"
              style={{ fontSize: "24px" }}
            ></i>
          </div>
          <div>
            <h4 className="mb-0 fw-semibold text-neutral-900">
              Yeni RFQ Oluştur
            </h4>
            <p className="mb-0 text-sm text-neutral-600 mt-4">
              Seçilen ürünler için teklif talebi oluşturun
            </p>
          </div>
        </div>
      </ModalHeader>

      <ModalBody>
        <FormProvider
          initialValues={formInitialValues}
          validationSchema={rfqValidationSchema}
        >
          <RFQFormContent />
        </FormProvider>
      </ModalBody>
    </Modal>
  );
};
