import type { ProvinceSummaryDto } from "../location/ProvinceSummaryDto";

export interface TeacherProfileDto {
  id: number;
  userId: number;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  branch: string;
  educationLevel: string;
  experienceYears: number;
  bio: string;
  profilePhotoUrl: string;
  videoUrl: string;
  cvUrl: string;
  isActive: boolean;
  provinces: ProvinceSummaryDto[];
  createdAt: string;
  updatedAt: string;
}
