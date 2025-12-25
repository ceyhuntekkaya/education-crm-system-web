import { useState, useEffect, useMemo } from "react";
import { useFormHook } from "@/hooks";

interface UseSectionChangesReturn {
  sectionChanges: Record<string, boolean>;
}

/**
 * 🎨 SECTION CHANGES HOOK
 * Form section'larındaki değişiklikleri takip eder
 */
export function useProductsSectionChanges(
  isDirty: boolean,
  areFieldsDirty: (fields: string[]) => boolean,
  values: Record<string, any>,
  initialValues: Record<string, any>
): UseSectionChangesReturn {
  const [sectionChanges, setSectionChanges] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    // Check each section for changes
    const changes: Record<string, boolean> = {
      search: areFieldsDirty(["searchTerm"]),
      category: areFieldsDirty(["categoryId"]),
      supplier: areFieldsDirty(["supplierId"]),
      status: areFieldsDirty(["status"]),
      priceRange: areFieldsDirty(["minPrice", "maxPrice"]),
    };

    setSectionChanges(changes);
  }, [values, initialValues, areFieldsDirty]);

  return { sectionChanges };
}
