"use client";
import React from "react";
import { Form, Button, FormValues as FormDebug } from "@/components";
import { Accordion, AccordionItem } from "@/components/ui";
import { useAccordion, useFormHook, useModal } from "@/hooks";
import { useSearchContext } from "../../contexts";
import { SaveFavoriteSearchModal } from "../save-favorite-search-modal";
import { FormValues } from "@/types";
import { createApiParams, cleanApiParams } from "../../utils";
import {
  // SearchSection,
  LocationSection,
  InstitutionTypesSection,
  // SektorSection,
  // AgeRangeSection,
  FeeRangeSection,
  // CurriculumSection,
  // LanguageSection,
  RatingSection,
  // AdditionalSection,
  // SortingSection,
  DynamicPropertySections,
} from "./sections";

// Section tipi tanımlaması
interface Section {
  id: string;
  title?: string | React.ReactElement;
  component: React.ReactElement;
  forceOpen?: boolean;
}

const FormContent = () => {
  const { resetForm } = useFormHook();
  const { search, sectionChanges, institutionTypes, resetSearch } =
    useSearchContext();

  // Favori Modal için
  const FavoriteSearchButton = () => {
    const saveModal = useModal();

    return (
      <>
        <Button
          onClick={saveModal.open}
          variant="outline"
          leftIcon="ph-heart"
          fullWidth
          size="xxs"
          className="text-main-600 border-main-200 hover-bg-main-50"
        >
          Favori Arama Kaydet
        </Button>

        <SaveFavoriteSearchModal
          isOpen={saveModal.isOpen}
          onClose={saveModal.close}
        />
      </>
    );
  };

  // Accordion hook'unu başlat - istediğiniz bölümleri varsayılan olarak açık yapabilirsiniz
  const { isOpen, toggleItem } = useAccordion({
    defaultOpen: ["search"], // SearchSection varsayılan olarak açık
    allowMultiple: true, // Birden fazla bölüm aynı anda açık olabilir
  });

  const formSections: Section[] = [
    { ...InstitutionTypesSection(), forceOpen: true },
    { ...LocationSection(), forceOpen: true }, // Lokasyon bölümü her zaman açık
    // SektorSection({ options }),
    // AgeRangeSection(),
    { ...FeeRangeSection, forceOpen: true },
    // CurriculumSection(),
    // LanguageSection(),

    // { ...SearchSection(), forceOpen: true }, // Arama bölümü her zaman açık

    // AdditionalSection(),
    // SortingSection(),

    ...DynamicPropertySections(), // Dinamik section'ları spread et
    RatingSection(),
  ];

  const onSubmit = (values: FormValues) => {
    console.log("Form Values:", values);

    // API parametrelerini oluştur (propertyFilters dahil)
    const apiParams = createApiParams(values, institutionTypes);

    // Undefined değerleri temizle
    const cleanParams = cleanApiParams(apiParams);

    console.log("API Parametreleri:", cleanParams);
    // Search fonksiyonunu hook'tan kullan
    search(cleanParams);
  };

  return (
    <Form
      onSubmit={onSubmit}
      className={`search-sidebar-filter sidebar rounded-12 bg-white p-32 box-shadow-md `}
      data-aos="fade-up"
    >
      <FormDebug />
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

            // Bu section'da değişiklik var mı kontrol et
            const hasChanges = sectionChanges[section.id];

            // Değişiklik varsa title className'ini güncelle - minimal ve şık stil
            const titleClassName = hasChanges
              ? "text-main-600 fw-semibold hover-text-main-700"
              : "text-neutral-700 hover-text-main-600";

            return (
              <React.Fragment key={section.id}>
                <AccordionItem
                  id={section.id}
                  title={
                    hasChanges ? (
                      <div className="d-flex align-items-center gap-8">
                        <span className="w-4 h-4 bg-main-600 rounded-circle flex-shrink-0"></span>
                        <span>{section.title}</span>
                      </div>
                    ) : (
                      section.title
                    )
                  }
                  isOpen={isOpen(section.id)}
                  onToggle={toggleItem}
                  forceOpen={(section as any).forceOpen || false}
                  className="mb-0"
                  titleClassName={titleClassName}
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
      </div>

      {/* Sticky Footer Buttons */}
      <div className="search-sidebar-filter__sticky-footer">
        <div className="d-flex flex-column gap-12">
          {/* Ana butonlar */}
          <div className="d-flex flex-between gap-12">
            <Button
              type="reset"
              variant="outline"
              leftIcon="ph-arrow-clockwise"
              fullWidth
              onClick={() => {
                resetForm();
                resetSearch();
              }}
              size="xxs"
            >
              {" "}
            </Button>
            <Button
              type="submit"
              variant="inline"
              leftIcon="ph-magnifying-glass"
              fullWidth
              size="xxs"
            >
              Filtrele
            </Button>
          </div>

          {/* Favori Kaydet Butonu */}
          <div className="pt-8 border-top border-neutral-30">
            <FavoriteSearchButton />
          </div>
        </div>
      </div>
    </Form>
  );
};

const FilterForm = () => {
  return <FormContent />;
};

export default FilterForm;
