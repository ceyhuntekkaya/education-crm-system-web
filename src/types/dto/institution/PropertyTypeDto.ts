export interface PropertyTypeDto {
  id?: number;
  name?: string;
  displayName?: string;
  propertyGroupTypeId?: number;
  isActive?: boolean;
  isSelected?: boolean;
  createdAt?: string; // ISO date string
}
