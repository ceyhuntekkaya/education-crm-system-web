"use client";

import { useMemo } from "react";
import type { DetailLayoutProps } from "../types";

/**
 * Detail layout konfigürasyonlarını parse eden hook
 */
export function useDetailLayoutConfig(props: DetailLayoutProps) {
  return useMemo(() => {
    const {
      header,
      mainSection,
      detailSections = [],
      loading,
      error,
      empty,
      containerClass = "",
      spacing = "lg", // RFQ için default lg spacing
      children,
    } = props;

    // State kontrolü
    const shouldShowLoading = loading?.isLoading ?? false;
    const shouldShowError = !!error?.error && !shouldShowLoading;
    const shouldShowEmpty =
      (empty?.isEmpty ?? false) && !shouldShowLoading && !shouldShowError;
    const shouldShowContent =
      !shouldShowLoading && !shouldShowError && !shouldShowEmpty;

    return {
      // Configs
      headerConfig: header,
      mainSectionConfig: mainSection,
      detailSectionsConfig: detailSections,

      // States
      loadingConfig: loading,
      errorConfig: error,
      emptyConfig: empty,

      // Container
      containerClassName: containerClass,
      spacingConfig: spacing,

      // Custom content
      customChildren: children,

      // State flags
      shouldShowLoading,
      shouldShowError,
      shouldShowEmpty,
      shouldShowContent,
    };
  }, [props]);
}
