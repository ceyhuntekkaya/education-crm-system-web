export interface InstitutionPropertyValueSetDto {
  propertyId?: number;
  textValue?: string;
  numberValue?: number;
  booleanValue?: boolean;
  dateValue?: string;
  datetimeValue?: string;
  jsonValue?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
}
