/**
 * Form options constants for appointment creation
 * Bu dosya select bileşenleri için hazır seçenekleri içerir
 */

import {
  STUDENT_GENDER_OPTIONS,
  STUDENT_GENDER_LABELS,
} from "./student-constants";
import { GRADE_LEVEL_OPTIONS, GRADE_LEVEL_LABELS } from "./grade-constants";
import {
  APPOINTMENT_TYPE_OPTIONS,
  APPOINTMENT_TYPE_LABELS,
} from "./appointment-type-constants";
import {
  COMMUNICATION_PREFERENCE_OPTIONS,
  COMMUNICATION_PREFERENCE_LABELS,
} from "./communication-constants";

// =============================================================================
// FORM OPTIONS - Select bileşenleri için hazır seçenekler
// =============================================================================

export const FORM_OPTIONS = {
  GENDER: [
    { value: "", label: "Cinsiyet seçiniz" },
    { value: STUDENT_GENDER_OPTIONS.MALE, label: STUDENT_GENDER_LABELS.MALE },
    {
      value: STUDENT_GENDER_OPTIONS.FEMALE,
      label: STUDENT_GENDER_LABELS.FEMALE,
    },
  ],
  GRADE: [
    { value: "", label: "Sınıf seçiniz" },
    {
      value: GRADE_LEVEL_OPTIONS.ANAKurumU,
      label: GRADE_LEVEL_LABELS.ANAKurumU,
    },
    { value: GRADE_LEVEL_OPTIONS.SINIF_1, label: GRADE_LEVEL_LABELS.SINIF_1 },
    { value: GRADE_LEVEL_OPTIONS.SINIF_2, label: GRADE_LEVEL_LABELS.SINIF_2 },
    { value: GRADE_LEVEL_OPTIONS.SINIF_3, label: GRADE_LEVEL_LABELS.SINIF_3 },
    { value: GRADE_LEVEL_OPTIONS.SINIF_4, label: GRADE_LEVEL_LABELS.SINIF_4 },
    { value: GRADE_LEVEL_OPTIONS.SINIF_5, label: GRADE_LEVEL_LABELS.SINIF_5 },
    { value: GRADE_LEVEL_OPTIONS.SINIF_6, label: GRADE_LEVEL_LABELS.SINIF_6 },
    { value: GRADE_LEVEL_OPTIONS.SINIF_7, label: GRADE_LEVEL_LABELS.SINIF_7 },
    { value: GRADE_LEVEL_OPTIONS.SINIF_8, label: GRADE_LEVEL_LABELS.SINIF_8 },
    { value: GRADE_LEVEL_OPTIONS.SINIF_9, label: GRADE_LEVEL_LABELS.SINIF_9 },
    { value: GRADE_LEVEL_OPTIONS.SINIF_10, label: GRADE_LEVEL_LABELS.SINIF_10 },
    { value: GRADE_LEVEL_OPTIONS.SINIF_11, label: GRADE_LEVEL_LABELS.SINIF_11 },
    { value: GRADE_LEVEL_OPTIONS.SINIF_12, label: GRADE_LEVEL_LABELS.SINIF_12 },
  ],
  APPOINTMENT_TYPE: [
    { value: "", label: "Randevu tipi seçiniz" },
    {
      value: APPOINTMENT_TYPE_OPTIONS.ORIENTATION,
      label: APPOINTMENT_TYPE_LABELS.ORIENTATION,
    },
    {
      value: APPOINTMENT_TYPE_OPTIONS.EXAM,
      label: APPOINTMENT_TYPE_LABELS.EXAM,
    },
    {
      value: APPOINTMENT_TYPE_OPTIONS.CONSULTATION,
      label: APPOINTMENT_TYPE_LABELS.CONSULTATION,
    },
    {
      value: APPOINTMENT_TYPE_OPTIONS.ENROLLMENT,
      label: APPOINTMENT_TYPE_LABELS.ENROLLMENT,
    },
  ],
  COMMUNICATION: [
    { value: "", label: "İletişim tercihi seçiniz" },
    {
      value: COMMUNICATION_PREFERENCE_OPTIONS.EMAIL,
      label: COMMUNICATION_PREFERENCE_LABELS.EMAIL,
    },
    {
      value: COMMUNICATION_PREFERENCE_OPTIONS.PHONE,
      label: COMMUNICATION_PREFERENCE_LABELS.PHONE,
    },
    {
      value: COMMUNICATION_PREFERENCE_OPTIONS.SMS,
      label: COMMUNICATION_PREFERENCE_LABELS.SMS,
    },
  ],
} as const;
