import * as yup from "yup";

// Gallery filter form validation schema
export const galleryFilterValidationSchema = yup.object({
  searchTerm: yup.string().optional(),
  brandId: yup.number().integer().positive().optional(),
  campusId: yup.number().integer().positive().optional(),
  schoolId: yup.number().integer().positive().optional(),
  galleryType: yup
    .string()
    .oneOf([
      "MIXED",
      "PHOTOS",
      "VIDEOS",
      "SCHOOL_TOUR",
      "EVENTS",
      "FACILITIES",
      "CLASSROOMS",
      "OUTDOOR_AREAS",
      "CAFETERIA",
      "LIBRARY",
      "LABORATORY",
      "SPORTS_FACILITIES",
      "TRANSPORTATION",
      "ACHIEVEMENTS",
      "GRADUATION",
      "CEREMONIES",
      "DAILY_ACTIVITIES",
      "STUDENT_WORK",
      "STAFF",
      "CAMPUS_LIFE",
      "BEFORE_AFTER",
    ])
    .optional(),
  visibility: yup
    .string()
    .oneOf(["PUBLIC", "PRIVATE", "REGISTERED_ONLY", "PASSWORD_PROTECTED"])
    .optional(),
  isFeatured: yup.boolean().optional(),
  tags: yup.string().optional(),
  page: yup.number().integer().positive().default(1),
  size: yup.number().integer().positive().max(100).default(12),
  sortBy: yup.string().optional(),
  sortDirection: yup.string().oneOf(["ASC", "DESC"]).default("DESC"),
});
