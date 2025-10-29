"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { SchoolFormContent } from "./sections";
import {
  validationSchema as schoolValidationSchema,
  initialValues as schoolInitialValues,
} from "./schemas";
import { SchoolFormProps } from "../../types";

/**
 * School form component
 */
export const SchoolForm: React.FC<SchoolFormProps> = ({
  className,
  initialData,
}) => {
  // Düzenleme modunda mevcut data varsa onu kullan, yoksa default değerleri kullan
  const formInitialValues = initialData
    ? {
        ...schoolInitialValues,
        ...initialData,
        // API'den gelen campus objesini campusId'ye çevir
        campusId: initialData.campus?.id?.toString() || "",
        // API'den gelen institutionType objesini institutionTypeId'ye çevir
        institutionTypeId: initialData.institutionType?.id?.toString() || "",
        // API'den gelen foreignLanguages string'ini array'e çevir (virgülle ayrılmış)
        foreignLanguages:
          initialData.foreignLanguages &&
          typeof initialData.foreignLanguages === "string"
            ? initialData.foreignLanguages
                .split(",")
                .map((lang) => lang.trim())
                .filter((lang) => lang !== "")
            : initialData.foreignLanguages || [],
        // API'den gelen propertyValues'i propertyType ID'lerine çevir
        propertyValues: initialData.propertyValues
          ? initialData.propertyValues
              .filter((pv) => pv.propertyId)
              .map((pv) => pv.propertyId!.toString())
          : [],
      }
    : schoolInitialValues;

  return (
    <div className={className}>
      <FormProvider
        initialValues={formInitialValues}
        validationSchema={schoolValidationSchema}
      >
        <SchoolFormContent />
      </FormProvider>
    </div>
  );
};
