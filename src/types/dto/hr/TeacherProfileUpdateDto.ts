export interface TeacherProfileUpdateDto {
  fullName?: string;
  email?: string;
  phone?: string;
  city?: string;
  branch?: string;
  // NOT: educationLevel ve experienceYears backend DTO'sunda YOK.
  // Eğitim: PUT /hr/teacher-profiles/{id}/educations/{educationId}
  // Deneyim: PUT /hr/teacher-profiles/{id}/experiences/{experienceId}
  bio?: string;
  profilePhotoUrl?: string;
  videoUrl?: string;
  cvUrl?: string;
  isActive?: boolean;
  provinceIds?: number[];
}
