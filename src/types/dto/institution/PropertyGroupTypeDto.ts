import { PropertyTypeDto } from "./PropertyTypeDto";

export interface PropertyGroupTypeDto {
  id?: number;
  name?: string;
  displayName?: string;
  institutionTypeId?: number;
  isActive?: boolean;
  isMultiple?: boolean;
  createdAt?: string; // ISO date string
  propertyTypes?: PropertyTypeDto[];
}
