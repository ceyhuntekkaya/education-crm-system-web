export interface TeacherProfileUpdateDto {
  fullName?: string;
  email?: string;
  phone?: string;
  city?: string;
  branch?: string;
  educationLevel?: string;
  experienceYears?: number;
  bio?: string;
  profilePhotoUrl?: string;
  videoUrl?: string;
  cvUrl?: string;
  isActive?: boolean;
  provinceIds?: number[];
}
