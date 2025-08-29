"use client";
import { FormProvider, useFormField } from "@/contexts";
import * as yup from "yup";
import { Button, Form, FormAutocomplete, FormInput } from "@/components";

import { FormValues } from "@/contexts";
import { useFormHook } from "@/hooks";

const validationSchema = yup.object({
  schoolName: yup.string(),
  city: yup.string(),
  district: yup.string(),
  schoolType: yup.string(),
  institutionType: yup.string(),
});

const initialValues: FormValues = {
  schoolName: "",
  city: "",
  district: "",
  schoolType: "",
  institutionType: "",
};

const FormContent = () => {
  const { values, resetForm } = useFormHook();
  console.log("Form değerleri:", values);

  const onSubmit = (values: FormValues) => {
    // Filtreleme işlemini burada yapabilirsin
    console.log("Filtrelenen değerler:", values);
  };

  return (
    <Form
      onSubmit={onSubmit}
      className="filter-form bg-white box-shadow-md rounded-16 p-32 mb-32 wow bounceIn"
      data-aos="fade-up"
    >
      <h4 className="mb-24 text-main-600 fw-semibold">Okulları Filtrele</h4>
      <p className="text-neutral-500 text-sm mb-16 d-none d-md-block">
        İl, ilçe, okul türü veya kurum tipine göre filtreleyin.
      </p>
      <div className="mb-24">
        <FormInput
          name="schoolName"
          variant="inline"
          placeholder="Okul İsmi"
          className="col-span-2"
        />
      </div>
      <div className="grid-cols-2 gap-16">
        <FormAutocomplete
          name="city"
          variant="inline"
          placeholder="Şehir ara..."
          options={[
            { value: "istanbul", label: "İstanbul" },
            { value: "ankara", label: "Ankara" },
            { value: "izmir", label: "İzmir" },
          ]}
          noOptionsText="Şehir bulunamadı"
        />
        {/* <FormSelect
          name="city"
          variant="inline"
          options={[
            { value: "", label: "İl Seçiniz" },
            { value: "istanbul", label: "İstanbul" },
            { value: "ankara", label: "Ankara" },
            { value: "izmir", label: "İzmir" },
            { value: "bursa", label: "Bursa" },
            { value: "antalya", label: "Antalya" },
          ]}
        /> */}
        <FormAutocomplete
          name="district"
          variant="inline"
          placeholder="İlçe ara..."
          options={[
            { value: "kadikoy", label: "Kadıköy" },
            { value: "besiktas", label: "Beşiktaş" },
            { value: "cankaya", label: "Çankaya" },
            { value: "konak", label: "Konak" },
            { value: "nilüfer", label: "Nilüfer" },
          ]}
          noOptionsText="İlçe bulunamadı"
        />
        <FormAutocomplete
          name="schoolType"
          variant="inline"
          placeholder="Okul türü ara..."
          options={[
            { value: "ilkokul", label: "İlkokul" },
            { value: "ortaokul", label: "Ortaokul" },
            { value: "lise", label: "Lise" },
            { value: "universite", label: "Üniversite" },
          ]}
          noOptionsText="Okul türü bulunamadı"
        />
        <FormAutocomplete
          name="institutionType"
          variant="inline"
          placeholder="Kurum tipi ara..."
          options={[
            { value: "devlet", label: "Devlet" },
            { value: "ozel", label: "Özel" },
            { value: "vakif", label: "Vakıf" },
          ]}
          noOptionsText="Kurum tipi bulunamadı"
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
          Filterele
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
