export interface TeacherExperienceDto {
  id: number;
  teacherProfileId: number;
  institution: string;
  roleTitle: string;
  startDate: string;
  endDate: string | null;
  description: string | null;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface TeacherExperienceCreateDto {
  institution: string;
  roleTitle: string;
  startDate: string;
  endDate?: string;
  description?: string;
  displayOrder?: number;
}

export interface TeacherExperienceUpdateDto {
  institution?: string;
  roleTitle?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  displayOrder?: number;
}
