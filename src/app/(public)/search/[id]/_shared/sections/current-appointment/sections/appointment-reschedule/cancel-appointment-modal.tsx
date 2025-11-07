"use client";

import React from "react";
import {
  Modal,
  CustomCard,
  Icon,
  Button,
  Form,
  FormTextarea,
} from "@/components";
import { FormProvider } from "@/contexts";
import * as yup from "yup";
import { CancelledByType } from "@/enums";

interface CancelAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (values: CancelFormValues) => void;
  isLoading?: boolean;
}

interface CancelFormValues {
  cancellationReason: string;
  canceledByType: CancelledByType;
}

// Validation schema
const cancelValidationSchema = yup.object({
  cancellationReason: yup
    .string()
    .required("İptal nedeni zorunludur")
    .min(10, "İptal nedeni en az 10 karakter olmalıdır")
    .max(500, "İptal nedeni en fazla 500 karakter olabilir"),
});

// Form initial values
const initialValues: CancelFormValues = {
  cancellationReason: "",
  canceledByType: CancelledByType.PARENT, // Public sayfada parent olarak set et
};

export const CancelAppointmentModal: React.FC<CancelAppointmentModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}) => {
  const handleFormSubmit = (values: any) => {
    onConfirm({
      cancellationReason: values.cancellationReason,
      canceledByType: values.canceledByType || CancelledByType.PARENT,
    });
  };

  return (
    <FormProvider
      initialValues={initialValues}
      validationSchema={cancelValidationSchema}
    >
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Randevuyu İptal Et"
        size="md"
      >
        <div className="d-flex flex-column gap-20 p-16">
          {/* Warning Card */}
          <CustomCard
            bgColor="bg-danger-subtle"
            padding="p-16"
            borderRadius="rounded-8"
          >
            <div className="d-flex align-items-start gap-12">
              <Icon
                icon="ph-warning"
                size="lg"
                className="text-danger flex-shrink-0"
              />
              <div>
                <h6 className="text-danger fw-semibold mb-6 fs-14 lh-sm">
                  Dikkat!
                </h6>
                <p className="text-danger-emphasis mb-0 fs-13 lh-base">
                  Bu randevuyu iptal etmek üzeresiniz. Bu işlem geri alınamaz.
                </p>
              </div>
            </div>
          </CustomCard>

          <Form onSubmit={handleFormSubmit}>
            <div className="d-flex flex-column gap-16">
              <FormTextarea
                name="cancellationReason"
                label="İptal Nedeni"
                variant="inline"
                placeholder="İptal nedenini açıklayın (en az 10 karakter)"
                rows={4}
                helperText="Lütfen iptal nedenini detaylı bir şekilde açıklayınız"
                disabled={isLoading}
              />

              <div className="d-flex justify-content-end gap-12 pt-16 border-top">
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Vazgeç
                </Button>
                <Button
                  type="submit"
                  variant="error"
                  loading={isLoading}
                  disabled={isLoading}
                  leftIcon="ph-x-circle"
                >
                  İptal Et
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </Modal>
    </FormProvider>
  );
};
