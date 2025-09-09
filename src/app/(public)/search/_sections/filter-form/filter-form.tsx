"use client";
import React from "react";
import { FormProvider } from "@/contexts";
import { Form, Button } from "@/components";
import { Accordion, AccordionItem } from "@/components/ui";
import { useFormHook, useAccordion } from "@/hooks";
import { useInstitutionSearchHook } from "../../_hooks";
import { FormValues } from "@/types";
import { initialValues, validationSchema } from "./_schemas";
import {
  SearchSection,
  LocationSection,
  InstitutionTypesSection,
  AgeRangeSection,
  FeeRangeSection,
  CurriculumSection,
  LanguageSection,
  RatingSection,
  AdditionalSection,
  SortingSection,
} from "./_sections";

const FormContent = () => {
  const { values, resetForm, updateField } = useFormHook();

  const { options, search } = useInstitutionSearchHook({
    values,
    updateField,
  });

  // Accordion hook'unu başlat - istediğiniz bölümleri varsayılan olarak açık yapabilirsiniz
  const { isOpen, toggleItem } = useAccordion({
    defaultOpen: ["search"], // SearchSection varsayılan olarak açık
    allowMultiple: true, // Birden fazla bölüm aynı anda açık olabilir
  });

  const formSections = [
    { ...SearchSection, forceOpen: true }, // Arama bölümü her zaman açık
    { ...LocationSection({ values, options }), forceOpen: true }, // Arama bölümü her zaman açık
    InstitutionTypesSection({ options }),
    AgeRangeSection,
    FeeRangeSection,
    CurriculumSection,
    LanguageSection,
    RatingSection,
    AdditionalSection,
    SortingSection,
  ];

  const onSubmit = (values: FormValues) => {
    console.log("Form Values:", values);

    // API'ye gönderilecek parametreleri hazırla
    // const apiParams = {
    //   searchTerm: values.searchTerm || undefined,
    //   institutionTypeIds:
    //     Array.isArray(values.institutionTypeIds) &&
    //     values.institutionTypeIds.length
    //       ? values.institutionTypeIds
    //       : undefined,
    //   minAge: Array.isArray(values.ageRange) ? values.ageRange[0] : undefined,
    //   maxAge: Array.isArray(values.ageRange) ? values.ageRange[1] : undefined,
    //   minFee: Array.isArray(values.feeRange) ? values.feeRange[0] : undefined,
    //   maxFee: Array.isArray(values.feeRange) ? values.feeRange[1] : undefined,
    //   curriculumType: values.curriculumType || undefined,
    //   languageOfInstruction: values.languageOfInstruction || undefined,
    //   countryId: values.countryId ? Number(values.countryId) : undefined,
    //   provinceId: values.provinceId ? Number(values.provinceId) : undefined,
    //   districtId: values.districtId ? Number(values.districtId) : undefined,
    //   neighborhoodId: values.neighborhoodId
    //     ? Number(values.neighborhoodId)
    //     : undefined,
    //   latitude: values.latitude || undefined,
    //   longitude: values.longitude || undefined,
    //   radiusKm: values.radiusKm || undefined,
    //   minRating: values.minRating || undefined,
    //   hasActiveCampaigns: values.hasActiveCampaigns || undefined,
    //   isSubscribed: values.isSubscribed || undefined,
    //   sortBy: values.sortBy || "name",
    //   sortDirection: values.sortDirection || "asc",
    //   page: 1,
    //   size: 10,
    // };

    const apiParams = {
      searchTerm: "",
      institutionTypeIds: undefined,
      minAge: undefined,
      maxAge: 0,
      minFee: 0.1,
      maxFee: 0,
      curriculumType: "",
      languageOfInstruction: "",
      countryId: undefined,
      provinceId: undefined,
      districtId: undefined,
      neighborhoodId: undefined,
      latitude: undefined,
      longitude: undefined,
      radiusKm: undefined,
      minRating: undefined,
      hasActiveCampaigns: undefined,
      isSubscribed: undefined,
      propertyFilters: undefined,
      sortBy: "",
      sortDirection: "",
      page: 0,
      size: 10,
    };

    // Undefined değerleri temizle
    const cleanParams = Object.fromEntries(
      Object.entries(apiParams).filter(([_, value]) => value !== undefined)
    );

    console.log("API Parametreleri:", cleanParams);
    // Search fonksiyonunu hook'tan kullan
    search(cleanParams);
  };

  return (
    <Form
      onSubmit={onSubmit}
      className={`sidebar rounded-12 bg-white p-32 box-shadow-md `}
      data-aos="fade-up"
    >
      <div>
        <div className="flex-between">
          <div className="flex-grow-1">
            <div className="flex-between">
              <h4 className="mb-0">Arama Kriterleri</h4>
              <button
                type="button"
                className="sidebar-close text-xl text-neutral-500 d-lg-none hover-text-main-600"
              >
                <i className="ph-bold ph-x" />
              </button>
            </div>
            <span className="d-block border border-neutral-30 border-dashed my-24" />
          </div>
        </div>
        {/* Form Bölümleri - Accordion ile render */}
        <Accordion styling="off">
          {formSections.map((section, index) => {
            // Eğer title yoksa (SearchSection gibi), accordion olmadan render et
            if (!section.title) {
              return (
                <div key={section.id} className="mb-24">
                  {section.component}
                  <span className="d-block border border-neutral-30 border-dashed my-24" />
                </div>
              );
            }

            return (
              <React.Fragment key={section.id}>
                <AccordionItem
                  id={section.id}
                  title={section.title}
                  isOpen={isOpen(section.id)}
                  onToggle={toggleItem}
                  forceOpen={(section as any).forceOpen || false}
                  className="mb-0"
                  titleClassName="text-neutral-700 hover-text-main-600"
                  contentClassName=""
                >
                  {section.component}
                </AccordionItem>
                {index < formSections.length - 1 && (
                  <span className="d-block border border-neutral-30 border-dashed my-24" />
                )}
              </React.Fragment>
            );
          })}
        </Accordion>
        <span className="d-block border border-neutral-30 border-dashed my-32" />
        <div className="d-flex flex-column gap-12">
          <Button
            type="submit"
            variant="inline"
            leftIcon="ph-magnifying-glass"
            fullWidth
          >
            Filtrele
          </Button>
          <Button
            type="reset"
            variant="outline"
            leftIcon="ph-arrow-clockwise"
            fullWidth
            onClick={() => resetForm()}
          >
            Filtreleri Temizle
          </Button>
        </div>
      </div>
    </Form>
  );
};

const FilterForm = () => {
  return (
    <FormProvider
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <FormContent />
    </FormProvider>
  );
};

export default FilterForm;
