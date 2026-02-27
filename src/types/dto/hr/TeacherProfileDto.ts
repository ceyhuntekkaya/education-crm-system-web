import type { ProvinceSummaryDto } from "../location/ProvinceSummaryDto";
import type { TeacherEducationDto } from "./TeacherEducationDto";
import type { TeacherExperienceDto } from "./TeacherExperienceDto";

export interface TeacherProfileDto {
  id: number;
  userId: number;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  branch: string;
  // NOT: educationLevel ve experienceYears backend'de TeacherProfileDto'da YOK.
  // Eğitim bilgileri 'educations' array'inden, deneyim 'experiences' array'inden gelir.
  bio: string;
  profilePhotoUrl: string;
  videoUrl: string;
  cvUrl: string;
  isActive: boolean;
  provinces: ProvinceSummaryDto[];
  educations: TeacherEducationDto[];
  experiences: TeacherExperienceDto[];
  createdAt: string;
  updatedAt: string;
}
