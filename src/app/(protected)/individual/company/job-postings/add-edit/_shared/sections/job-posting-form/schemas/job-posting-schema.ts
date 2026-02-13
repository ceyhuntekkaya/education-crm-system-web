import * as yup from "yup";

export const jobPostingSchema = yup.object().shape({
  positionTitle: yup
    .string()
    .required("Pozisyon başlığı zorunludur")
    .max(200, "Pozisyon başlığı en fazla 200 karakter olabilir"),
  branch: yup
    .string()
    .required("Branş zorunludur")
    .max(100, "Branş en fazla 100 karakter olabilir"),
  employmentType: yup
    .string()
    .max(50, "İstihdam tipi en fazla 50 karakter olabilir"),
  startDate: yup.string().nullable(),
  contractDuration: yup
    .string()
    .max(100, "Sözleşme süresi en fazla 100 karakter olabilir"),
  requiredExperienceYears: yup
    .number()
    .nullable()
    .min(0, "Tecrübe yılı negatif olamaz"),
  requiredEducationLevel: yup
    .string()
    .max(50, "Eğitim seviyesi en fazla 50 karakter olabilir"),
  salaryMin: yup.number().nullable().min(0, "Maaş negatif olamaz"),
  salaryMax: yup.number().nullable().min(0, "Maaş negatif olamaz"),
  showSalary: yup.boolean(),
  description: yup.string(),
  applicationDeadline: yup.string().nullable(),
  status: yup.string().oneOf(["DRAFT", "PUBLISHED", "CLOSED", "COMPLETED"]),
  isPublic: yup.boolean(),
  provinceIds: yup.array().of(yup.number()),
});

export type JobPostingFormValues = yup.InferType<typeof jobPostingSchema>;
