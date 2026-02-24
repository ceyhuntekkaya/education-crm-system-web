/**
 * 🎯 DETAIL LAYOUT TYPES
 * Detail sayfaları için tip tanımlamaları
 */

import { ReactNode } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// BASIC TYPES
// ═══════════════════════════════════════════════════════════════════════════

export interface ActionButton {
  id: string;
  label: string;
  icon?: string;
  onClick?: () => void; // Custom handler
  href?: string; // Navigation URL
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export interface BackButton {
  label?: string;
  href?: string;
  onClick?: () => void;
  showIcon?: boolean;
}

// ═══════════════════════════════════════════════════════════════════════════
// COLUMN TYPES
// ═══════════════════════════════════════════════════════════════════════════

export interface DetailColumn<T = any> {
  field: string;
  headerName: string;
  section: "info" | "details" | "dates" | "meta" | "rating";
  icon?: string;
  iconColor?: string;
  width?: number;
  grid?: number; // Bootstrap grid column değeri (örn: 6, 12)
  order?: number;
  renderCell?: (data: T) => ReactNode; // Meta section için artık opsiyonel
  valueGetter?: (data: T) => ReactNode; // Ham field değerini dönüştürmek için (renderCell gerekmez)
  condition?: (data: T) => boolean;
  // Meta section için özellikler
  url?: string | ((data: T) => string | null); // URL routing için (basit string veya fonksiyon)
  metaOnClick?: (data: T) => void; // Karmaşık tıklama logic'i için
  metaClickable?: (data: T) => boolean; // Tıklanabilirlik kontrolü
}

export interface DetailColumnsConfig<T = any> {
  data: T;
  columns: DetailColumn<T>[];
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION TYPES
// ═══════════════════════════════════════════════════════════════════════════

export interface DetailSection {
  id: string;
  title?: string;
  className?: string;
  colSpan?: string; // Bootstrap col classes (örn: "col-12", "col-md-6")
  children: ReactNode;
  card?: boolean; // Card wrapper'ı kullanılsın mı
  padding?: boolean; // Padding eklenesin mi
}

// ═══════════════════════════════════════════════════════════════════════════
// STATE TYPES
// ═══════════════════════════════════════════════════════════════════════════

export interface DetailLoadingState {
  isLoading: boolean;
  loadingComponent?: ReactNode;
}

export interface DetailErrorState {
  error?: Error | string | null;
  errorComponent?: ReactNode;
  onRetry?: () => void;
}

export interface DetailEmptyState {
  isEmpty: boolean;
  emptyComponent?: ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: ActionButton;
}

// ═══════════════════════════════════════════════════════════════════════════
// HEADER CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

export interface DetailHeaderConfig {
  // Geri dön butonu
  backButton?: BackButton | false;

  // Aksiyon butonları
  actionButtons?: ActionButton[];

  // Header özelleştirme
  className?: string;
  reversed?: boolean; // Butonların yerini değiştir (geri dön sağda, aksiyonlar solda)

  // Custom header component
  customHeader?: ReactNode;
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN LAYOUT PROPS
// ═══════════════════════════════════════════════════════════════════════════

export interface DetailLayoutProps {
  // Header configuration
  header?: DetailHeaderConfig;

  // Columns configuration (NEW)
  columns?: DetailColumnsConfig<any>;

  // Sections
  mainSection?: DetailSection; // Ana bilgi section'ı
  detailSections?: DetailSection[]; // Detay section'ları

  // States
  loading?: DetailLoadingState;
  error?: DetailErrorState;
  empty?: DetailEmptyState;

  // Container configuration
  containerClass?: string;
  spacing?: "sm" | "md" | "lg"; // Row gap

  // Custom content
  children?: ReactNode; // Tamamen custom içerik için
}
