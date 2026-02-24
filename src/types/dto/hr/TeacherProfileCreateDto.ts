export interface TeacherProfileCreateDto {
  fullName: string; // Zorunlu, max 100
  email: string; // Zorunlu, geçerli email, max 100
  phone?: string; // max 20
  city?: string; // max 50
  branch?: string; // max 100
  educationLevel?: string; // max 50
  experienceYears?: number;
  bio?: string;
  profilePhotoUrl?: string; // max 500
  videoUrl?: string; // Tanıtım videosu linki, max 500
  cvUrl?: string; // max 500
  isActive?: boolean; // default: true
  provinceIds?: number[]; // Çalışmak istediği iller
}
