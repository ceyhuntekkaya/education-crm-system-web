import type { PopoverFilterConfig } from "@/components/layouts/data-collection-layout";

/**
 * 🔍 JOB POSTING POPOVER FILTERS (Teacher Version)
 * Öğretmen için iş ilanı popover filter konfigürasyonları
 * Not: Teacher sadece PUBLISHED ilanları göreceği için status filtresi yok
 */
export const JOB_POSTING_POPOVER_FILTERS: PopoverFilterConfig[] = [
  {
    id: "employmentType",
    fieldName: "employmentType",
    label: "İstihdam Tipi",
    activeColor: "#10b981",
    activeBackground: "rgba(16, 185, 129, 0.1)",
    options: [
      { value: "ALL", label: "Tümü", icon: "ph-stack" },
      { value: "FULL_TIME", label: "Tam Zamanlı", icon: "ph-briefcase" },
      { value: "PART_TIME", label: "Yarı Zamanlı", icon: "ph-clock" },
      { value: "CONTRACT", label: "Sözleşmeli", icon: "ph-file-text" },
      { value: "INTERNSHIP", label: "Stajyer", icon: "ph-student" },
    ],
    defaultValue: "ALL",
  },
  {
    id: "branch",
    fieldName: "branch",
    label: "Branş",
    activeColor: "#8b5cf6",
    activeBackground: "rgba(139, 92, 246, 0.1)",
    options: [
      { value: "ALL", label: "Tümü", icon: "ph-stack" },
      { value: "Matematik", label: "Matematik", icon: "ph-function" },
      { value: "Türkçe", label: "Türkçe", icon: "ph-book" },
      { value: "İngilizce", label: "İngilizce", icon: "ph-translate" },
      { value: "Fen Bilgisi", label: "Fen Bilgisi", icon: "ph-flask" },
      { value: "Sosyal Bilgiler", label: "Sosyal Bilgiler", icon: "ph-globe" },
      { value: "Fizik", label: "Fizik", icon: "ph-atom" },
      { value: "Kimya", label: "Kimya", icon: "ph-test-tube" },
      { value: "Biyoloji", label: "Biyoloji", icon: "ph-leaf" },
      { value: "Tarih", label: "Tarih", icon: "ph-clock-countdown" },
      { value: "Coğrafya", label: "Coğrafya", icon: "ph-map-trifold" },
      { value: "Rehberlik", label: "Rehberlik", icon: "ph-chats-circle" },
    ],
    defaultValue: "ALL",
  },
];

// Backward compatibility için function export et
export const createJobPostingPopoverFilters = (): PopoverFilterConfig[] =>
  JOB_POSTING_POPOVER_FILTERS;
