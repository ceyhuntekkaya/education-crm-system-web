import { useRouter } from "next/navigation";
import { FormValues } from "@/types";
import { createFilterApiParams, cleanFilterApiParams } from "../utils";
import { useFormHook } from "@/hooks/use-form-hook";

/**
 * Filter form submit işlemlerini yönetir
 */
export function useFilterSubmit() {
  const router = useRouter();
  const { values, initialValues, isDirty, areFieldsDirty } = useFormHook();

  /**
   * Sadece değişen alanları filtreleyerek döndürür
   */
  const getChangedFields = (): FormValues => {
    const changedFields: FormValues = {};

    Object.keys(values).forEach((fieldName) => {
      const currentValue = values[fieldName];
      const initialValue = initialValues[fieldName];

      // Array değerler için deep comparison
      if (Array.isArray(currentValue) && Array.isArray(initialValue)) {
        if (JSON.stringify(currentValue) !== JSON.stringify(initialValue)) {
          changedFields[fieldName] = currentValue;
        }
      }
      // Diğer değerler için basit karşılaştırma
      else if (currentValue !== initialValue) {
        changedFields[fieldName] = currentValue;
      }
    });

    return changedFields;
  };

  const handleSubmit = (useOnlyChangedFields: boolean = true) => {
    // Değişiklik kontrolü
    if (!isDirty) {
      console.log("Form değişikliği yok, submit işlemi yapılmıyor.");
      return;
    }

    // Kullanılacak değerleri belirle
    const formValues = useOnlyChangedFields ? getChangedFields() : values;

    console.log("Form değerleri:", formValues);
    console.log("Değişen alanlar:", getChangedFields());

    // API parametrelerini oluştur
    const apiParams = createFilterApiParams(formValues);
    const cleanParams = cleanFilterApiParams(apiParams);

    console.log("API Parametreleri:", cleanParams);

    // Query parametrelerini oluştur ve /search sayfasına yönlendir
    const searchParams = new URLSearchParams();
    Object.entries(cleanParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(key, item.toString()));
      } else if (value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });

    router.push(`/search?${searchParams.toString()}`);
  };

  return {
    handleSubmit,
    getChangedFields,
    isDirty,
    areFieldsDirty,
    values,
    initialValues,
  };
}
