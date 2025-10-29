export interface SchoolCreateDto {
  campusId?: number;
  institutionTypeId?: number;
  name?: string;
  description?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  email?: string;
  phone?: string;
  extension?: string;
  minAge?: number;
  maxAge?: number;
  capacity?: number;
  currentStudentCount?: number;
  classSizeAverage?: number;
  curriculumType?: string;
  languageOfInstruction?: string;
  foreignLanguages?: string;
  registrationFee?: number;
  monthlyFee?: number;
  annualFee?: number;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  propertyTypeIds?: number[]; // Seçili property type ID'leri
}
