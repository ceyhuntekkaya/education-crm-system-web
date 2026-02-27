import { useState, useMemo, useCallback } from "react";
import type { JobPostingDto, GetJobPostingsParams } from "@/types";

// Minimum shape we need from an application record
type ApplicationLike = { jobPosting?: { id: number | string } | null };

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

export interface JobPostingFilterValues {
  keyword: string;
  branch: string;
  employmentType: string;
  minExperience: string;
  educationLevel: string;
  salary: [number, number]; // [min, max]
}

export const INITIAL_FILTER_VALUES: JobPostingFilterValues = {
  keyword: "",
  branch: "",
  employmentType: "",
  minExperience: "",
  educationLevel: "",
  salary: [0, 300000],
};

// ═══════════════════════════════════════════════════════════════════════════
// HOOK
// ═══════════════════════════════════════════════════════════════════════════

interface UseJobPostingsFilterParams {
  jobPostings: JobPostingDto[];
  fetchWithParams: (params: GetJobPostingsParams) => void;
  applications: ApplicationLike[];
}

export function useJobPostingsFilter({
  jobPostings,
  fetchWithParams,
  applications,
}: UseJobPostingsFilterParams) {
  const [filterValues, setFilterValues] = useState<JobPostingFilterValues>(
    INITIAL_FILTER_VALUES,
  );
  const [hasSearched, setHasSearched] = useState(false);

  // Başvuru yapılmış ilan ID'leri
  const appliedJobPostingIds = useMemo(() => {
    return new Set(
      applications
        .filter((app) => app.jobPosting?.id)
        .map((app) => app.jobPosting!.id),
    );
  }, [applications]);

  // Başvuru yapılmamış ilanlar
  const unappliedJobPostings = useMemo(() => {
    return jobPostings.filter(
      (jobPosting) => !appliedJobPostingIds.has(jobPosting.id),
    );
  }, [jobPostings, appliedJobPostingIds]);

  // Filtreleme uygulanmış ilanlar
  const filteredJobPostings = useMemo(() => {
    let result = unappliedJobPostings;

    // Keyword filtresi
    if (filterValues.keyword.trim()) {
      const kw = filterValues.keyword.trim().toLowerCase();
      result = result.filter(
        (jp) =>
          jp.positionTitle?.toLowerCase().includes(kw) ||
          jp.branch?.toLowerCase().includes(kw) ||
          jp.description?.toLowerCase().includes(kw),
      );
    }

    // Branş filtresi
    if (filterValues.branch) {
      result = result.filter((jp) => jp.branch === filterValues.branch);
    }

    // İstihdam tipi filtresi
    if (filterValues.employmentType) {
      result = result.filter(
        (jp) => jp.employmentType === filterValues.employmentType,
      );
    }

    // Minimum deneyim filtresi
    if (filterValues.minExperience !== "") {
      const minExp = parseInt(filterValues.minExperience, 10);
      if (!isNaN(minExp)) {
        result = result.filter(
          (jp) => (jp.requiredExperienceYears ?? 0) >= minExp,
        );
      }
    }

    // Eğitim seviyesi filtresi
    if (filterValues.educationLevel) {
      result = result.filter(
        (jp) => jp.requiredEducationLevel === filterValues.educationLevel,
      );
    }

    // Maaş aralığı filtresi
    const [salaryMin, salaryMax] = filterValues.salary;
    if (salaryMin > 0 || salaryMax < 300000) {
      if (salaryMin > 0) {
        result = result.filter(
          (jp) => jp.salaryMax == null || jp.salaryMax >= salaryMin,
        );
      }
      if (salaryMax < 300000) {
        result = result.filter(
          (jp) => jp.salaryMin == null || jp.salaryMin <= salaryMax,
        );
      }
    }

    return result;
  }, [unappliedJobPostings, filterValues]);

  // Aktif filtre var mı?
  const hasActiveFilters = useMemo(() => {
    return (
      filterValues.keyword.trim() !== "" ||
      filterValues.branch !== "" ||
      filterValues.employmentType !== "" ||
      filterValues.minExperience !== "" ||
      filterValues.educationLevel !== "" ||
      filterValues.salary[0] > 0 ||
      filterValues.salary[1] < 300000
    );
  }, [filterValues]);

  const applyFilters = useCallback(
    (values: JobPostingFilterValues) => {
      fetchWithParams({
        status: "PUBLISHED",
        searchTerm: values.keyword.trim() || undefined,
        branch: values.branch || undefined,
        employmentType: values.employmentType || undefined,
        minExperienceYears: values.minExperience
          ? parseInt(values.minExperience, 10)
          : undefined,
        requiredEducationLevel: values.educationLevel || undefined,
        salaryMin: values.salary[0] > 0 ? values.salary[0] : undefined,
        salaryMax: values.salary[1] < 300000 ? values.salary[1] : undefined,
      });
      setFilterValues(values);
      setHasSearched(true);
    },
    [fetchWithParams],
  );

  const resetFilters = useCallback(() => {
    setFilterValues(INITIAL_FILTER_VALUES);
    setHasSearched(false);
  }, []);

  return {
    filterValues,
    filteredJobPostings,
    hasActiveFilters,
    hasSearched,
    totalCount: unappliedJobPostings.length,
    filteredCount: filteredJobPostings.length,
    applyFilters,
    resetFilters,
  };
}
