"use client";
import { FormProvider } from "@/contexts";
import { Button, Divider, Form, FormValues } from "@/components";
import CustomCard from "@/components/ui/custom-card";
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
      className="d-flex flex-column"
      data-aos="fade-up"
    >
      <CustomCard
        size="md"
        title="Doğru Eğitimi Bul"
        subtitle={
          "Şehir, ilçe, ücret aralığı, kurum kategorisi ve kurum türü seçeneklerine göre filtreleyin."
        }
        variant="outline"
      >
        {/* Location Section */}
        <div className="pb-16">
          <h6 className="fw-medium text-neutral-900 mb-16">Konum Bilgileri</h6>
          <LocationSection />
        </div>

        <Divider />

        {/* Institution Types Section */}
        <div>
          <InstitutionTypesSection />
        </div>

        <Divider />

        {/* Fee Range Section */}
        <div>
          <h6 className="fw-medium text-neutral-900">Ücret Aralığı</h6>
          <FeeRangeSection />
        </div>

        <Divider />

        {/* Actions */}
        <div>
          <div className="d-flex flex-wrap gap-12 justify-content-end action-buttons">
            <Button
              onClick={resetForm}
              variant="outline"
              leftIcon="ph-arrow-clockwise"
              size="sm"
              className="flex-fill flex-lg-grow-0"
            >
              Sıfırla
            </Button>
            <Button
              type="submit"
              leftIcon="ph-magnifying-glass"
              size="sm"
              className="flex-fill flex-lg-grow-0"
            >
              Ara
            </Button>
          </div>

          <p className="text-neutral-400 text-xs mt-12 mb-0 d-block d-lg-none text-center">
            Yukarıdaki alanlara göre filtreleyebilirsiniz.
          </p>
        </div>
      </CustomCard>
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
