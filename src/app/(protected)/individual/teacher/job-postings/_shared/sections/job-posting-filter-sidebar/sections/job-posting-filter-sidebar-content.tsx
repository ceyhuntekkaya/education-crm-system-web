"use client";

import React from "react";
import {
  Form,
  FormInput,
  FormAutocomplete,
  FormRange,
} from "@/components/forms";
import { Button } from "@/components/ui/button";
import { useFormHook } from "@/hooks";
import { useJobPostingsContext } from "../../../contexts/job-postings-context";
import type { FilterFormContentProps } from "../types";

// ─── Seçenek listeleri ────────────────────────────────────────────────────

const BRANCH_OPTIONS = [
  { value: "Matematik", label: "Matematik" },
  { value: "Türkçe", label: "Türkçe" },
  { value: "İngilizce", label: "İngilizce" },
  { value: "Fen Bilgisi", label: "Fen Bilgisi" },
  { value: "Sosyal Bilgiler", label: "Sosyal Bilgiler" },
  { value: "Fizik", label: "Fizik" },
  { value: "Kimya", label: "Kimya" },
  { value: "Biyoloji", label: "Biyoloji" },
  { value: "Tarih", label: "Tarih" },
  { value: "Coğrafya", label: "Coğrafya" },
  { value: "Rehberlik", label: "Rehberlik" },
];

const EMPLOYMENT_TYPE_OPTIONS = [
  { value: "FULL_TIME", label: "Tam Zamanlı" },
  { value: "PART_TIME", label: "Yarı Zamanlı" },
  { value: "CONTRACT", label: "Sözleşmeli" },
  { value: "INTERNSHIP", label: "Stajyer" },
];

const EXPERIENCE_OPTIONS = [
  { value: "0", label: "Deneyimsiz" },
  { value: "1", label: "1+ Yıl" },
  { value: "2", label: "2+ Yıl" },
  { value: "3", label: "3+ Yıl" },
  { value: "5", label: "5+ Yıl" },
  { value: "10", label: "10+ Yıl" },
];

const EDUCATION_LEVEL_OPTIONS = [
  { value: "HIGH_SCHOOL", label: "Lise" },
  { value: "ASSOCIATE", label: "Ön Lisans" },
  { value: "BACHELOR", label: "Lisans" },
  { value: "MASTER", label: "Yüksek Lisans" },
  { value: "DOCTORATE", label: "Doktora" },
];

// ─── Form içeriği ─────────────────────────────────────────────────────────

/**
 * İş ilanı filtre form içeriği
 */
export const JobPostingFilterSidebarContent: React.FC<
  FilterFormContentProps
> = ({ onSubmitSuccess, hideHeader = false }) => {
  const { applyFilters, resetFilters } = useJobPostingsContext();
  const { resetForm } = useFormHook();

  const handleSubmit = (values: Record<string, unknown>) => {
    const salaryArr = Array.isArray(values.salary)
      ? (values.salary as [number, number])
      : [0, 300000];
    applyFilters({
      keyword: (values.keyword as string) || "",
      branch: (values.branch as string) || "",
      employmentType: (values.employmentType as string) || "",
      minExperience: (values.minExperience as string) || "",
      educationLevel: (values.educationLevel as string) || "",
      salary: [salaryArr[0], salaryArr[1]],
    });
    onSubmitSuccess?.();
  };

  const handleReset = () => {
    resetForm();
    resetFilters();
    onSubmitSuccess?.();
  };

  return (
    <Form
      onSubmit={handleSubmit}
      validateOnSubmit={false}
      className={`job-posting-filter-sidebar rounded-12 bg-white ${
        hideHeader ? "p-0" : "p-32 box-shadow-md"
      }`}
    >
      {/* ── Başlık ─────────────────────────────────────────────────────── */}
      {!hideHeader && (
        <div className="mb-24">
          <div className="d-flex align-items-center gap-12 mb-8">
            <div
              className="d-flex align-items-center justify-content-center rounded-8 bg-main-100 flex-shrink-0"
              style={{ width: 40, height: 40 }}
            >
              <i className="ph-bold ph-funnel text-main-600 text-xl" />
            </div>
            <div>
              <h6 className="mb-0 fw-bold text-neutral-800 text-lg">
                Filtrele
              </h6>
              <p className="text-xs text-neutral-500 mb-0 mt-4 lh-sm">
                Pozisyona uygun filtreleri seçin
              </p>
            </div>
          </div>
          <span className="d-block border border-neutral-100 mt-16" />
        </div>
      )}

      <div className="d-flex flex-column gap-20">
        {/* Arama */}
        <FormInput
          name="keyword"
          label="Arama"
          placeholder="Pozisyon, branş veya açıklama..."
          iconLeft="ph-bold ph-magnifying-glass"
          variant="inline"
        />

        {/* Branş */}
        <FormAutocomplete
          name="branch"
          label="Branş"
          placeholder="Branş seçiniz..."
          options={BRANCH_OPTIONS}
          variant="inline"
        />

        {/* İstihdam Tipi */}
        <FormAutocomplete
          name="employmentType"
          label="İstihdam Tipi"
          placeholder="İstihdam tipi seçiniz..."
          options={EMPLOYMENT_TYPE_OPTIONS}
          variant="inline"
        />

        {/* Minimum Deneyim */}
        <FormAutocomplete
          name="minExperience"
          label="Minimum Deneyim"
          placeholder="Deneyim seçiniz..."
          options={EXPERIENCE_OPTIONS}
          variant="inline"
        />

        {/* Eğitim Seviyesi */}
        <FormAutocomplete
          name="educationLevel"
          label="Eğitim Seviyesi"
          placeholder="Eğitim seviyesi seçiniz..."
          options={EDUCATION_LEVEL_OPTIONS}
          variant="inline"
        />

        {/* Maaş Aralığı */}
        <FormRange
          name="salary"
          label="Maaş Aralığı"
          min={0}
          max={300000}
          step={5000}
          prefix="₺"
        />
      </div>

      <span className="d-block border border-neutral-30 border-dashed my-24" />

      {/* Aksiyonlar */}
      <div className="d-flex gap-10">
        <Button
          type="button"
          variant="outline"
          size="sm"
          leftIcon="ph-arrow-clockwise"
          onClick={handleReset}
          aria-label="Filtreleri sıfırla"
        >
          {""}
        </Button>
        <Button
          type="submit"
          variant="inline"
          size="sm"
          leftIcon="ph-magnifying-glass"
          fullWidth
        >
          Filtrele
        </Button>
      </div>
    </Form>
  );
};

JobPostingFilterSidebarContent.displayName = "JobPostingFilterSidebarContent";
