"use client";

import React, { useState, useEffect } from "react";
import { FormProvider } from "@/contexts/form-context";
import { Drawer } from "@/components/ui/drawer";
import { INITIAL_FILTER_VALUES } from "../../hooks/useJobPostingsFilter";
import { JobPostingFilterSidebarContent } from "./sections";
import type { FilterFormProps } from "./types";

// ─── FormProvider wrapper ─────────────────────────────────────────────────

const FilterForm: React.FC<FilterFormProps> = (props) => {
  return (
    <FormProvider initialValues={INITIAL_FILTER_VALUES}>
      <JobPostingFilterSidebarContent {...props} />
    </FormProvider>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// FILTER SIDEBAR (Desktop + Mobile)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * İş ilanı filtre sidebar bileşeni.
 * Masaüstünde doğrudan form olarak, mobilde drawer içinde gösterilir.
 */
export const JobPostingFilterSidebar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 992);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isMobile) {
    return <FilterForm />;
  }

  return (
    <>
      <div className="mobile-filter-sticky-button d-lg-none">
        <div className="mobile-filter-sticky-button__container">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="mobile-filter-sticky-button__btn"
          >
            <i className="ph-bold ph-funnel" />
            <span>Filtrele</span>
          </button>
        </div>
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        position="left"
        width="85%"
        header={
          <h5 className="mb-0 fw-semibold text-neutral-700">
            <i className="ph ph-funnel me-8"></i>
            İlan Filtrele
          </h5>
        }
        className="filter-form-drawer"
      >
        <FilterForm onSubmitSuccess={() => setIsDrawerOpen(false)} hideHeader />
      </Drawer>
    </>
  );
};

export default JobPostingFilterSidebar;
