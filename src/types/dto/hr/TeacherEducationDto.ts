export interface TeacherEducationDto {
  id: number;
  teacherProfileId: number;
  educationLevel: string;
  institution: string;
  department: string | null;
  startYear: number | null;
  endYear: number | null;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface TeacherEducationCreateDto {
  educationLevel: string;
  institution: string;
  department?: string;
  startYear?: number;
  endYear?: number;
  displayOrder?: number;
}

export interface TeacherEducationUpdateDto {
  educationLevel?: string;
  institution?: string;
  department?: string;
  startYear?: number;
  endYear?: number;
  displayOrder?: number;
}
