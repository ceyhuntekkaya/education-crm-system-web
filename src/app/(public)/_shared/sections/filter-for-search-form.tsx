"use client";
import { FormProvider, useFormField } from "@/contexts";
import * as yup from "yup";
import {
  Button,
  Form,
  FormAutocomplete,
  FormInput,
  FormCheckbox,
  FormRadio,
} from "@/components";

import { useFormHook } from "@/hooks";
import { FormValues } from "@/types";
import { useRouter } from "next/navigation";

const validationSchema = yup.object({
  searchTerm: yup.string(),
  provinceId: yup.mixed(),
  districtId: yup.mixed(),
  institutionTypeIds: yup.mixed(),
  minRating: yup.mixed(),
});

const initialValues: FormValues = {
  searchTerm: "",
  provinceId: "",
  districtId: "",
  institutionTypeIds: [] as any,
  minRating: "",
};

const FormContent = () => {
  const { values, resetForm } = useFormHook();
  const router = useRouter();
  console.log("Form değerleri:", values);

  // Filter-form'daki API parametre mantığına uygun şekilde parametreleri hazırla
  const onSubmit = (values: FormValues) => {
    const apiParams = {
      searchTerm: values.searchTerm || undefined,
      provinceId: values.provinceId ? Number(values.provinceId) : undefined,
      districtId: values.districtId ? Number(values.districtId) : undefined,
      institutionTypeIds:
        Array.isArray(values.institutionTypeIds) &&
        values.institutionTypeIds.length
          ? values.institutionTypeIds
          : undefined,
      minRating: values.minRating || undefined,
      // page: 1,
      // size: 10,
    };
    const cleanParams = Object.fromEntries(
      Object.entries(apiParams).filter(([_, value]) => value !== undefined)
    );
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

  // Filter-form'daki inputları ve opsiyonları kullan
  const provinceOptions = [
    { value: "", label: "Şehir seçin" },
    { value: "1", label: "İstanbul" },
    { value: "2", label: "Ankara" },
    { value: "3", label: "İzmir" },
  ];
  const districtOptions = [
    { value: "", label: "İlçe seçin" },
    { value: "1", label: "Kadıköy" },
    { value: "2", label: "Beşiktaş" },
    { value: "3", label: "Şişli" },
  ];
  const institutionTypeOptions = [
    { value: "1", label: "Anaokulu" },
    { value: "2", label: "İlkokul" },
    { value: "3", label: "Ortaokul" },
    { value: "4", label: "Lise" },
    { value: "5", label: "Üniversite" },
    { value: "6", label: "Özel Kurs" },
  ];
  const ratingOptions = [
    { value: "1", label: "1 Yıldız ve üzeri" },
    { value: "2", label: "2 Yıldız ve üzeri" },
    { value: "3", label: "3 Yıldız ve üzeri" },
    { value: "4", label: "4 Yıldız ve üzeri" },
    { value: "5", label: "5 Yıldız" },
  ];

  return (
    <Form
      onSubmit={onSubmit}
      className="filter-form bg-white box-shadow-md rounded-16 p-32 mb-32 wow bounceIn"
      data-aos="fade-up"
    >
      <h4 className="mb-24 text-main-600 fw-semibold">Okulları Filtrele</h4>
      <p className="text-neutral-500 text-sm mb-16 d-none d-md-block">
        Şehir, ilçe, kurum türü, minimum puan ve arama kelimesine göre
        filtreleyin.
      </p>
      <div className="mb-24">
        <FormInput
          name="searchTerm"
          variant="inline"
          placeholder="Anahtar kelime ile ara..."
          iconRight="ph-magnifying-glass"
          className="col-span-2"
        />
      </div>
      <div className="grid-cols-2 gap-16">
        <FormAutocomplete
          name="provinceId"
          variant="inline"
          placeholder="Şehir ara..."
          options={provinceOptions}
          noOptionsText="Şehir bulunamadı"
        />
        <FormAutocomplete
          name="districtId"
          variant="inline"
          placeholder="İlçe ara..."
          options={districtOptions}
          noOptionsText="İlçe bulunamadı"
        />
        <FormCheckbox
          name="institutionTypeIds"
          label="Kurum Türü"
          options={institutionTypeOptions}
          multi={true}
        />
        <FormRadio
          name="minRating"
          label="Minimum Puan"
          value=""
          options={ratingOptions}
          multi={true}
        />
      </div>
      <span className="d-block border border-neutral-30 border-dashed my-24" />
      <div className="d-flex flex-wrap gap-16 justify-content-end mt-16">
        <Button
          onClick={resetForm}
          variant="outline"
          leftIcon="ph-arrow-clockwise"
        >
          Sıfırla
        </Button>
        <Button type="submit" leftIcon="ph-magnifying-glass">
          Filtrele
        </Button>
      </div>
      <p className="text-neutral-400 text-xs mt-16 d-block d-md-none">
        Yukarıdaki alanlara göre filtreleyebilirsiniz.
      </p>
    </Form>
  );
};

const FilterForSearchForm = () => {
  return (
    <FormProvider
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <FormContent />
    </FormProvider>
  );
};

export default FilterForSearchForm;
