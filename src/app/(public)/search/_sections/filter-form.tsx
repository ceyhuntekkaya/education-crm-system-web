"use client";
import React from "react";
import { FormProvider } from "@/contexts";
import * as yup from "yup";
import {
  Form,
  FormAutocomplete,
  FormInput,
  FormCheckbox,
  FormRadio,
  FormRange,
} from "@/components";

import { FormValues } from "@/contexts";
import { useFormHook } from "@/hooks";
import { useInstitutionSearchHook } from "../_hooks";

// Form seçenekleri data'ları
const institutionTypeOptions = [
  { value: "1", label: "Anaokulu" },
  { value: "2", label: "İlkokul" },
  { value: "3", label: "Ortaokul" },
  { value: "4", label: "Lise" },
  { value: "5", label: "Üniversite" },
  { value: "6", label: "Özel Kurs" },
];

const curriculumTypeOptions = [
  { value: "meb", label: "MEB Müfredatı" },
  { value: "ib", label: "IB Programı" },
  { value: "cambridge", label: "Cambridge" },
  { value: "american", label: "Amerikan Müfredatı" },
  { value: "german", label: "Alman Müfredatı" },
];

const languageOptions = [
  { value: "tr", label: "Türkçe" },
  { value: "en", label: "İngilizce" },
  { value: "de", label: "Almanca" },
  { value: "fr", label: "Fransızca" },
  { value: "bilingual", label: "İki Dilli" },
];

const ratingOptions = [
  { value: "1", label: "1 Yıldız ve üzeri" },
  { value: "2", label: "2 Yıldız ve üzeri" },
  { value: "3", label: "3 Yıldız ve üzeri" },
  { value: "4", label: "4 Yıldız ve üzeri" },
  { value: "5", label: "5 Yıldız" },
];

const sortOptions = [
  { value: "name", label: "İsim" },
  { value: "rating", label: "Puan" },
  { value: "price", label: "Ücret" },
  { value: "distance", label: "Mesafe" },
  { value: "createdAt", label: "Eklenme Tarihi" },
];

const sortDirectionOptions = [
  { value: "asc", label: "Artan" },
  { value: "desc", label: "Azalan" },
];

const validationSchema = yup.object({
  searchTerm: yup.string(),
  institutionTypeIds: yup.mixed(),
  ageRange: yup.mixed(),
  feeRange: yup.mixed(),
  curriculumType: yup.string(),
  languageOfInstruction: yup.string(),
  countryId: yup.mixed(),
  provinceId: yup.mixed(),
  districtId: yup.mixed(),
  neighborhoodId: yup.mixed(),
  latitude: yup.number(),
  longitude: yup.number(),
  radiusKm: yup.number(),
  minRating: yup.mixed(),
  hasActiveCampaigns: yup.boolean(),
  isSubscribed: yup.boolean(),
  sortBy: yup.string(),
  sortDirection: yup.string(),
});

const initialValues: FormValues = {
  searchTerm: "",
  institutionTypeIds: [] as any,
  ageRange: [1, 80] as any,
  feeRange: [0.1, 1000] as any,
  curriculumType: "",
  languageOfInstruction: "",
  countryId: "",
  provinceId: "",
  districtId: "",
  neighborhoodId: "",
  latitude: 0,
  longitude: 0,
  radiusKm: 5,
  minRating: "",
  hasActiveCampaigns: false,
  isSubscribed: false,
  sortBy: "name",
  sortDirection: "asc",
};

const FormContent = () => {
  const { values, resetForm, updateField } = useFormHook();

  const { locationOptions, search } = useInstitutionSearchHook({
    values,
    updateField,
  });

  const formSections = [
    {
      id: "search",
      title: null,
      component: (
        <div className="position-relative d-flex flex-column gap-12">
          <FormInput
            name="searchTerm"
            variant="inline"
            placeholder="Anahtar kelime ile ara..."
            iconLeft="ph-magnifying-glass"
          />
        </div>
      ),
    },
    {
      id: "location",
      title: "Lokasyon",
      component: (
        <div className="d-flex flex-column gap-16">
          <FormAutocomplete
            key={`country-${values.countryId || "empty"}`}
            name="countryId"
            variant="inline"
            placeholder="Ülke ara..."
            options={locationOptions.countries.data}
            noOptionsText="Ülke bulunamadı"
            isLoading={locationOptions.countries.loading}
          />
          <FormAutocomplete
            key={`province-${values.countryId}-${values.provinceId || "empty"}`}
            name="provinceId"
            variant="inline"
            placeholder="İl ara..."
            options={locationOptions.provinces.data}
            noOptionsText="İl bulunamadı"
            isLoading={locationOptions.provinces.loading}
            disabled={!values.countryId}
          />
          <FormAutocomplete
            key={`district-${values.provinceId}-${
              values.districtId || "empty"
            }`}
            name="districtId"
            variant="inline"
            placeholder="İlçe ara..."
            options={locationOptions.districts.data}
            noOptionsText="İlçe bulunamadı"
            isLoading={locationOptions.districts.loading}
            disabled={!values.provinceId}
          />
          <FormAutocomplete
            key={`neighborhood-${values.districtId}-${
              values.neighborhoodId || "empty"
            }`}
            name="neighborhoodId"
            variant="inline"
            placeholder="Mahalle ara..."
            options={locationOptions.neighborhoods.data}
            noOptionsText="Mahalle bulunamadı"
            isLoading={locationOptions.neighborhoods.loading}
            disabled={!values.districtId}
          />
          <FormInput
            name="radiusKm"
            type="number"
            label="Yarıçap (km)"
            variant="inline"
            placeholder="Yarıçap (km)"
            min="1"
            max="100"
          />
        </div>
      ),
    },
    {
      id: "institutionTypes",
      title: "Kurum Türü",
      component: (
        <FormCheckbox
          name="institutionTypeIds"
          label=""
          options={institutionTypeOptions}
          multi={true}
        />
      ),
    },
    {
      id: "ageRange",
      title: null,
      component: (
        <FormRange
          name="ageRange"
          label="Yaş Aralığı"
          min={1}
          max={80}
          step={1}
          suffix=" yaş"
        />
      ),
    },
    {
      id: "feeRange",
      title: null,
      component: (
        <FormRange
          name="feeRange"
          label="Ücret Aralığı"
          min={0.1}
          max={10000}
          step={0.1}
          prefix="₺"
        />
      ),
    },
    {
      id: "curriculum",
      title: "Müfredat Türü",
      component: (
        <FormRadio
          name="curriculumType"
          label=""
          value=""
          options={curriculumTypeOptions}
          multi={true}
        />
      ),
    },
    {
      id: "language",
      title: "Eğitim Dili",
      component: (
        <FormRadio
          name="languageOfInstruction"
          label=""
          value=""
          options={languageOptions}
          multi={true}
        />
      ),
    },
    {
      id: "rating",
      title: "Minimum Puan",
      component: (
        <FormRadio
          name="minRating"
          label=""
          value=""
          options={ratingOptions}
          multi={true}
        />
      ),
    },
    {
      id: "additional",
      title: "Ek Filtreler",
      component: (
        <div className="d-flex flex-column gap-16">
          <FormCheckbox
            name="hasActiveCampaigns"
            label="Aktif kampanyası olan kurumlar"
          />
          <FormCheckbox
            name="isSubscribed"
            label="Sadece üye olunan kurumlar"
          />
        </div>
      ),
    },
    {
      id: "sorting",
      title: "Sıralama",
      component: (
        <div className="d-flex flex-column gap-16">
          <FormAutocomplete
            name="sortBy"
            variant="inline"
            placeholder="Sıralama türü seçin..."
            options={sortOptions}
            noOptionsText="Sıralama seçeneği bulunamadı"
          />
          <FormAutocomplete
            name="sortDirection"
            variant="inline"
            placeholder="Sıralama yönü seçin..."
            options={sortDirectionOptions}
            noOptionsText="Yön seçeneği bulunamadı"
          />
        </div>
      ),
    },
  ];

  const onSubmit = (values: FormValues) => {
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
      institutionTypeIds: null,
      minAge: null,
      maxAge: 0,
      minFee: 0.1,
      maxFee: 0,
      curriculumType: "",
      languageOfInstruction: "",
      countryId: null,
      provinceId: null,
      districtId: null,
      neighborhoodId: null,
      latitude: null,
      longitude: null,
      radiusKm: null,
      minRating: null,
      hasActiveCampaigns: null,
      isSubscribed: null,
      propertyFilters: null,
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
        {/* Form Bölümleri - Map ile render */}
        {formSections.map((section, index) => (
          <React.Fragment key={section.id}>
            <div className={section.title ? "d-flex flex-column gap-16" : ""}>
              {section.title && (
                <h6 className="text-lg mb-16 fw-semibold">{section.title}</h6>
              )}
              {section.component}
            </div>
            {index < formSections.length - 1 && (
              <span className="d-block border border-neutral-30 border-dashed my-24" />
            )}
          </React.Fragment>
        ))}
        <span className="d-block border border-neutral-30 border-dashed my-32" />
        <div className="d-flex flex-column gap-12">
          <button
            type="submit"
            className="btn btn-main rounded-pill flex-center gap-16 fw-semibold w-100"
          >
            <i className="ph-bold ph-magnifying-glass d-flex text-lg" />
            Filtrele
          </button>
          <button
            type="reset"
            className="btn btn-outline-main rounded-pill flex-center gap-16 fw-semibold w-100"
            onClick={() => resetForm()}
          >
            <i className="ph-bold ph-arrow-clockwise d-flex text-lg" />
            Filtreleri Temizle
          </button>
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
