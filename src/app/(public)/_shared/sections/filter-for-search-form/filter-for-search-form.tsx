"use client";
import { FormProvider } from "@/contexts";
import { Button, Divider, Form, FormValues } from "@/components";
import { useFormHook } from "@/hooks";
import { initialValues, validationSchema } from "./schemas";
import { FilterSearchProvider, useFilterSearchContext } from "./contexts";
import {
  LocationSection,
  InstitutionTypesSection,
  FeeRangeSection,
} from "./sections";

const FormContent = () => {
  const { resetForm } = useFormHook();
  const { handleSubmit } = useFilterSearchContext();

  return (
    <Form
      onSubmit={handleSubmit}
      className="bg-white box-shadow-md rounded-16 p-24 d-flex flex-column"
      data-aos="fade-up"
    >
      {/* Header */}
      {/* <FormValues /> */}
      <div>
        <h4 className="mb-8 text-main-600 fw-semibold">Okulları Filtrele</h4>
        <p className="text-neutral-500 text-sm mb-0 d-none d-md-block">
          Şehir, ilçe, ücret aralığı ve kurum türü seçeneklerine göre
          filtreleyin.
        </p>
      </div>

      {/* Divider */}
      <Divider />

      {/* Location Section */}
      <div className="mb-16">
        <h6 className="fw-medium text-neutral-900 mb-16">Konum Bilgileri</h6>
        <div className="bg-neutral-10">
          <LocationSection />
        </div>
      </div>

      {/* Divider */}
      <Divider />

      {/* Institution Types Section */}
      <div className="col-12">
        <InstitutionTypesSection />
      </div>

      <Divider />

      {/* Fee Range Section */}
      <div className="col-12">
        <h6 className="fw-medium text-neutral-900 mb-16">Ücret Aralığı</h6>
        <div className="bg-neutral-10">
          <FeeRangeSection />
        </div>
      </div>

      {/* Divider */}
      <Divider />

      {/* Actions */}
      <div className="d-flex flex-wrap gap-12 justify-content-end">
        <Button
          onClick={resetForm}
          variant="outline"
          leftIcon="ph-arrow-clockwise"
          size="sm"
        >
          Sıfırla
        </Button>
        <Button type="submit" leftIcon="ph-magnifying-glass" size="sm">
          Filtrele
        </Button>
      </div>

      <p className="text-neutral-400 text-xs mt-12 mb-0 d-block d-md-none text-center">
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
      <FilterSearchProvider>
        <FormContent />
      </FilterSearchProvider>
    </FormProvider>
  );
};

export default FilterForSearchForm;
