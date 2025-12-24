"use client";
import React, { useState, useEffect } from "react";
import { Form, Button, FormValues as FormDebug } from "@/components";
import { Accordion, AccordionItem } from "@/components/ui";
import { Drawer } from "@/components/ui/drawer";
import { useAccordion, useFormHook } from "@/hooks";
import { useProductsSearchContext } from "../../contexts";
import { FormValues } from "@/types";
import { createProductsApiParams, cleanProductsApiParams } from "../../utils";
import {
  SearchSection,
  CategorySection,
  SupplierSection,
  StatusSection,
  PriceRangeSection,
} from "./sections";

// Section tipi tanımlaması
interface Section {
  id: string;
  title?: string | React.ReactElement | null;
  component: React.ReactElement;
  forceOpen?: boolean;
}

interface FormContentProps {
  onSubmitSuccess?: () => void;
  hideHeader?: boolean;
}

const FormContent = ({
  onSubmitSuccess,
  hideHeader = false,
}: FormContentProps) => {
  const { resetForm } = useFormHook();
  const { search, sectionChanges, resetSearch } = useProductsSearchContext();

  // Accordion hook'unu başlat
  const { isOpen, toggleItem } = useAccordion({
    defaultOpen: ["search"],
    allowMultiple: true,
  });

  const formSections: Section[] = [
    SearchSection,
    { ...CategorySection(), forceOpen: true },
    { ...SupplierSection() },
    { ...StatusSection() },
    { ...PriceRangeSection, forceOpen: true },
  ];

  const onSubmit = (values: FormValues) => {
    // API parametrelerini oluştur
    const apiParams = createProductsApiParams(values);

    // Undefined değerleri temizle
    const cleanParams = cleanProductsApiParams(apiParams);

    console.log("Ürün Arama Parametreleri:", cleanParams);

    // Search fonksiyonunu context'ten kullan
    search(cleanParams);

    // Mobile drawer'ı kapat
    onSubmitSuccess?.();
  };

  return (
    <Form
      onSubmit={onSubmit}
      className={`search-sidebar-filter sidebar rounded-12 bg-white ${
        hideHeader ? "p-0" : "p-32"
      } ${hideHeader ? "" : "box-shadow-md"}`}
      data-aos={hideHeader ? undefined : "fade-up"}
    >
      <FormDebug />
      <div>
        {!hideHeader && (
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
        )}

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

            // Section değişiklik durumunu kontrol et
            const hasChanges = sectionChanges[section.id];

            // Değişiklik varsa title className'ini güncelle
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
        </div>
      </div>
    </Form>
  );
};

const FilterForm = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Ekran boyutunu kontrol et
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992); // lg breakpoint
    };

    // İlk yüklemede kontrol et
    checkMobile();

    // Resize event listener
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  // Desktop görünümü - Orijinal tasarım
  if (!isMobile) {
    return <FormContent />;
  }

  // Mobile görünümü - Sticky Bottom Button + Drawer
  return (
    <>
      {/* Mobile - Form yerine sticky button göster */}
      <div className="d-lg-none">
        {/* Mobile Sticky Filter Button - Ekranın altına sabit */}
        <div className="mobile-filter-sticky-button">
          <div className="mobile-filter-sticky-button__container">
            <button
              type="button"
              onClick={openDrawer}
              className="mobile-filter-sticky-button__btn"
            >
              <i className="ph-bold ph-funnel" />
              <span>Filtrele</span>
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <Drawer
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          position="left"
          width="80%"
          header={
            <h5 className="mb-0 fw-semibold text-neutral-700">
              <i className="ph ph-funnel me-8"></i>
              Arama Kriterleri
            </h5>
          }
          className="filter-form-drawer"
        >
          <FormContent onSubmitSuccess={closeDrawer} hideHeader={true} />
        </Drawer>
      </div>
    </>
  );
};

export default FilterForm;
