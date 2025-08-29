export interface LocationCreateDto {
  name?: string;
  nameEn?: string;
  code?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  parentId?: number;
}
