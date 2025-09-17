"use client";

import React from "react";
import { FormProvider, useForm } from "@/contexts";
import { AppointmentProvider } from "./contexts";
import { AppointmentFormContent } from "./components/appointment-form-content";
import { AppointmentCreateProps } from "./types";
import { createInitialValues } from "./schemas/initial-values-schema";

// Debug component to show form data
const FormDebugger: React.FC = () => {
  const { values, errors } = useForm();

  // Console log form values whenever they change
  React.useEffect(() => {
    console.log("📋 Form Values:", values);
    console.log("❌ Form Errors:", errors);
  }, [values, errors]);

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        backgroundColor: "#f0f0f0",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        maxWidth: "300px",
        maxHeight: "400px",
        overflow: "auto",
        fontSize: "12px",
        zIndex: 9999,
      }}
    >
      <h4 style={{ margin: "0 0 10px 0" }}>Form Debug</h4>
      <div>
        <strong>Values:</strong>
        <pre style={{ fontSize: "10px", margin: "5px 0" }}>
          {JSON.stringify(values, null, 2)}
        </pre>
      </div>
      <div>
        <strong>Errors:</strong>
        <pre style={{ fontSize: "10px", margin: "5px 0" }}>
          {JSON.stringify(errors, null, 2)}
        </pre>
      </div>
    </div>
  );
};

/**
 * Main AppointmentCreate component with providers
 * This component serves as the entry point for appointment creation
 */
export const AppointmentCreate: React.FC<AppointmentCreateProps> = ({
  schoolId,
  isOnline = false,
}) => {
  // Schema'dan initial values oluştur
  const initialValues = createInitialValues(schoolId, isOnline);

  return (
    <div className="tutor-details__content">
      <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
          <AppointmentProvider schoolId={schoolId} isOnline={isOnline}>
            <FormProvider initialValues={initialValues}>
              {/* <FormDebugger /> */}
              <AppointmentFormContent />
            </FormProvider>
          </AppointmentProvider>
        </div>
      </div>
    </div>
  );
};
