import { SchoolFormData } from "../../../types/school-form-data";

export const initialValues: SchoolFormData = {
  campusId: undefined,
  institutionTypeId: undefined,
  name: "",
  description: "",
  logoUrl: "",
  coverImageUrl: "",
  email: "",
  phone: "",
  extension: "",
  minAge: undefined,
  maxAge: undefined,
  capacity: undefined,
  currentStudentCount: undefined,
  classSizeAverage: undefined,
  curriculumType: "",
  languageOfInstruction: "",
  foreignLanguages: "",
  registrationFee: undefined,
  monthlyFee: undefined,
  annualFee: undefined,

  // Property Values
  propertyValues: [],

  // SEO
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
};
