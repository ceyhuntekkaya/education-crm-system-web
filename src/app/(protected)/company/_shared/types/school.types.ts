// School entity type definitions

export interface School {
  id: number;
  name: string;
  type?: string;
}

// School ile ilgili diğer type'lar buraya eklenebilir
export type SchoolType = "İlkokul" | "Ortaokul" | "Lise" | "Üniversite";

export interface SchoolCreateRequest {
  name: string;
  type: string;
}

export interface SchoolUpdateRequest extends Partial<SchoolCreateRequest> {
  id: number;
}
