export interface InstitutionDetailDto {
  id: number;
  name: string;
  description?: string;
  institutionType?: {
    id: number;
    name: string;
    displayName: string;
  };
  location?: {
    country?: {
      id: number;
      name: string;
    };
    province?: {
      id: number;
      name: string;
    };
    district?: {
      id: number;
      name: string;
    };
    neighborhood?: {
      id: number;
      name: string;
    };
    address?: string;
  };
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  facilities?: string[];
  establishedYear?: number;
  studentCapacity?: number;
  currentStudentCount?: number;
  teacherCount?: number;
  rating?: number;
  images?: string[];
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
