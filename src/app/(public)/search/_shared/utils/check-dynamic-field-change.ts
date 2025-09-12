/**
 * Dinamik field'ın değişiklik durumunu kontrol eder
 */
export const checkDynamicFieldChange = (
  fieldName: string,
  currentValue: any,
  initialValues: Record<string, any>,
  isMultiple: boolean = false
) => {
  if (!fieldName) return false;

  // Initial value'yu belirle
  const hasInitialValue = fieldName in initialValues;
  const initialValue = hasInitialValue
    ? initialValues[fieldName]
    : isMultiple
    ? []
    : "";

  // Değerleri karşılaştır
  let hasChanged = false;
  if (Array.isArray(currentValue) && Array.isArray(initialValue)) {
    hasChanged = JSON.stringify(currentValue) !== JSON.stringify(initialValue);
  } else {
    hasChanged = currentValue !== initialValue;
  }

  // Boş değer kontrolü
  const isEmpty = Array.isArray(currentValue)
    ? currentValue.length === 0
    : !currentValue || currentValue === "";

  return hasChanged && !isEmpty;
};
