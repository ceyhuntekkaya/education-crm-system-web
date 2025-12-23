import { FormValues } from "@/types";

export const initialProductsFilterValues: FormValues = {
  searchTerm: "",
  categoryId: "",
  supplierId: "",
  status: "",
  priceRange: [1, 1000000], // FormRange için [min, max] array formatı
};
