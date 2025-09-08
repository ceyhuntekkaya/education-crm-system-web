export interface InstitutionPropertyValueDto {
  /** Format: int64 */
  id?: number;
  /** Format: int64 */
  propertyId?: number;
  propertyName?: string;
  propertyDisplayName?: string;
  /** @enum {string} */
  dataType?:
    | "TEXT"
    | "TEXTAREA"
    | "NUMBER"
    | "DECIMAL"
    | "BOOLEAN"
    | "SELECT"
    | "MULTISELECT"
    | "DATE"
    | "TIME"
    | "DATETIME"
    | "URL"
    | "EMAIL"
    | "PHONE"
    | "FILE"
    | "IMAGE";
  showInCard?: boolean;
  showInProfile?: boolean;
  textValue?: string;
  /** Format: double */
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
