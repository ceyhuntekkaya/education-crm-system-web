"use client";

import React from "react";
import { FormProvider, useForm } from "@/contexts";
import { AppointmentProvider } from "./contexts";
import { AppointmentFormContent } from "./components/appointment-form-content";
import { AppointmentCreateFormData } from "./types/form-types";

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

interface AppointmentCreateProps {
  schoolId: number;
  isOnline?: boolean;
}

/**
 * Main AppointmentCreate component with providers
 * This component serves as the entry point for appointment creation
 */
export const AppointmentCreate: React.FC<AppointmentCreateProps> = ({
  schoolId,
  isOnline = false,
}) => {
  // AppointmentCreateDto formatına uygun initial values
  const initialValues: AppointmentCreateFormData = {
    // Required/essential fields from props
    schoolId,
    isOnline,

    // DTO fields with default values
    appointmentSlotId: undefined,
    parentUserId: undefined,
    appointmentDate: undefined,
    startTime: undefined,
    endTime: undefined,
    appointmentType: undefined,
    title: undefined,
    description: undefined,
    location: undefined,
    parentName: undefined,
    parentEmail: undefined,
    parentPhone: undefined,
    studentName: undefined,
    studentAge: undefined,
    studentBirthDate: undefined,
    studentGender: undefined,
    currentSchool: undefined,
    gradeInterested: undefined,
    specialRequests: undefined,
    notes: undefined,
    participants: undefined,

    // Form-specific fields (not in DTO)
    agreedToTerms: false,
    communicationPreference: "EMAIL" as const,
    selectedSlotId: undefined,
    timeSlotData: undefined,
  };

  return (
    <AppointmentProvider schoolId={schoolId} isOnline={isOnline}>
      <FormProvider initialValues={initialValues}>
        <FormDebugger />
        <AppointmentFormContent />
      </FormProvider>
    </AppointmentProvider>
  );
};
