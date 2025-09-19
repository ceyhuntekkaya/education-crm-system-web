import { useRouter } from "next/navigation";
import { FormValues } from "@/types";
import { createFilterApiParams, cleanFilterApiParams } from "../utils";

/**
 * Filter form submit işlemlerini yönetir
 */
export function useFilterSubmit() {
  const router = useRouter();

  const handleSubmit = (values: FormValues) => {
    console.log("Form değerleri:", values);

    // API parametrelerini oluştur
    const apiParams = createFilterApiParams(values);
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
  };
}
