"use client";

import { useCallback } from "react";
import { useAppointment } from "../../contexts";
import { AppointmentCreateFormData } from "../../types";

/**
 * Data management hook for appointment form
 */
export const useAppointmentData = () => {
  const { schoolId, isOnline, formData, setFieldValue, getFieldValue } =
    useAppointment();

  // Get typed form data
  const getTypedFormData =
    useCallback((): Partial<AppointmentCreateFormData> => {
      return formData;
    }, [formData]);

  // Batch field updates
  const updateFields = useCallback(
    async (fields: Record<string, any>) => {
      const promises = Object.entries(fields).map(([key, value]) =>
        setFieldValue(key, value)
      );
      await Promise.all(promises);
    },
    [setFieldValue]
  );

  // Get appointment summary for confirmation
  const getAppointmentSummary = useCallback(() => {
    return {
      school: { id: schoolId },
      type: getFieldValue("appointmentType"),
      date: getFieldValue("appointmentDate"),
      slotId: getFieldValue("selectedSlotId"),
      isOnline,
      parent: {
        name: getFieldValue("parentName"),
        email: getFieldValue("parentEmail"),
        phone: getFieldValue("parentPhone"),
        communication: getFieldValue("communicationPreference"),
      },
      student: {
        name: getFieldValue("studentName"),
        age: getFieldValue("studentAge"),
        gender: getFieldValue("studentGender"),
        grade: getFieldValue("gradeInterested"),
        notes: getFieldValue("additionalNotes"),
      },
    };
  }, [schoolId, isOnline, getFieldValue]);

  return {
    // Context data
    schoolId,
    isOnline,

    // Form data
    formData: getTypedFormData(),

    // Field operations
    getFieldValue,
    setFieldValue,
    updateFields,

    // Data getters
    getAppointmentSummary,
  };
};
