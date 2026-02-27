export interface TeacherProfileCreateDto {
  fullName: string; // Zorunlu, max 100
  email: string; // Zorunlu, geçerli email, max 100
  phone?: string; // max 20
  city?: string; // max 50
  branch?: string; // max 100
  // NOT: educationLevel ve experienceYears backend DTO'sunda YOK.
  // Eğitim bilgileri: POST /hr/teacher-profiles/{id}/educations ile eklenir.
  // Deneyim bilgileri: POST /hr/teacher-profiles/{id}/experiences ile eklenir.
  bio?: string;
  profilePhotoUrl?: string; // max 500
  videoUrl?: string; // Tanıtım videosu linki, max 500
  cvUrl?: string; // max 500
  isActive?: boolean; // default: true
  provinceIds?: number[]; // Çalışmak istediği iller
}
