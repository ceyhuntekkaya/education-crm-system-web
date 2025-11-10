"use client";

import React, { useEffect, useMemo } from "react";
import { FormProvider } from "@/contexts/form-context";
import { SchoolFormContent } from "./sections";
import {
  validationSchema as schoolValidationSchema,
  initialValues as schoolInitialValues,
} from "./schemas";
import { SchoolFormProps } from "../../types";
import { useSchoolAddEdit } from "../../context";

/**
 * School form component
 */
export const SchoolForm: React.FC<SchoolFormProps> = ({
  className,
  initialData,
}) => {
  // Context'ten school properties'i al (edit mode için)
  const { schoolPropertyTypeIds, isEditing, schoolPropertiesLoading } =
    useSchoolAddEdit();

  // Property values'u memoize et - sadece değiştiğinde güncelle
  const propertyValues = useMemo(() => {
    if (!isEditing || schoolPropertiesLoading) {
      return [];
    }
    const values = schoolPropertyTypeIds.map((id) => id.toString());
    return values;
  }, [isEditing, schoolPropertiesLoading, schoolPropertyTypeIds]);

  // Düzenleme modunda mevcut data varsa onu kullan, yoksa default değerleri kullan
  const formInitialValues = useMemo(
    () =>
      initialData
        ? {
            ...schoolInitialValues,
            ...initialData,
            // API'den gelen campus objesini campusId'ye çevir
            campusId: initialData.campus?.id?.toString() || "",
            // API'den gelen institutionType objesini institutionTypeId'ye çevir
            institutionTypeId:
              initialData.institutionType?.id?.toString() || "",
            // API'den gelen foreignLanguages string'ini array'e çevir (virgülle ayrılmış)
            foreignLanguages:
              initialData.foreignLanguages &&
              typeof initialData.foreignLanguages === "string"
                ? initialData.foreignLanguages
                    .split(",")
                    .map((lang) => lang.trim())
                    .filter((lang) => lang !== "")
                : initialData.foreignLanguages || [],
            // Edit modunda: /institutions/schools/{id}/property API'den gelen
            // propertyTypeId'leri kullan - bunlar Institution Type'daki property
            // seçenekleriyle eşleştirilecek
            propertyValues,
          }
        : schoolInitialValues,
    [initialData, propertyValues]
  );

  return (
    <div className={className}>
      <FormProvider
        key={`school-form-${isEditing ? initialData?.id : "add"}-${
          propertyValues.length
        }`}
        initialValues={formInitialValues}
        validationSchema={schoolValidationSchema}
      >
        <SchoolFormContent />
      </FormProvider>
    </div>
  );
};
