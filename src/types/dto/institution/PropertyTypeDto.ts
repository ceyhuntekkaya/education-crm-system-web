export interface PropertyTypeDto {
  id?: number;
  name?: string;
  displayName?: string;
  propertyGroupTypeId?: number;
  isActive?: boolean;
  createdAt?: string; // ISO date string (LocalDateTime in Java)
  isSelected?: boolean;
}
