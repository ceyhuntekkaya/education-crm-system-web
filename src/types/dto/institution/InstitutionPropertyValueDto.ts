export interface InstitutionPropertyValueDto {
  id?: number;
  propertyId?: number;
  propertyName?: string;
  propertyDisplayName?: string;
  dataType?: string;
  showInCard?: boolean;
  showInProfile?: boolean;
  textValue?: string;
  numberValue?: number;
  booleanValue?: boolean;
  dateValue?: string;
  datetimeValue?: string;
  jsonValue?: string;
  fileUrl?: string;
  fileName?: string;
  displayValue?: string;
  formattedValue?: string;
}
