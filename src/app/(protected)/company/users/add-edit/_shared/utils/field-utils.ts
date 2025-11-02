/**
 * Check if a field should be disabled
 */
export const isFieldDisabled = (
  fieldName: string,
  isEditing: boolean,
  disabledFields: string[] = []
): boolean => {
  if (!isEditing) return false;
  return disabledFields.includes(fieldName);
};

/**
 * Check if a field is allowed
 */
export const isFieldAllowed = (
  fieldName: string,
  allowedFields: string[] = []
): boolean => {
  if (allowedFields.length === 0) return true;
  return allowedFields.includes(fieldName);
};
