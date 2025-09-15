import { PropertyTypeDto } from "./PropertyTypeDto";

export interface PropertyGroupTypeDto {
  id?: number;
  name?: string;
  displayName?: string;
  institutionTypeId?: number;
  isActive?: boolean;
  createdAt?: string; // ISO date string (LocalDateTime in Java)
  propertyTypes?: PropertyTypeDto[];
  isMultiple?: boolean;
}
