"use client";

import { useJobPostingById as useJobPostingByIdFromShared } from "../../../../../_shared/hooks/api";

/**
 * İlan ID'sine göre tek bir iş ilanının detaylarını getirir
 * (Ana _shared'dan re-export)
 */
export const useJobPostingDetail = useJobPostingByIdFromShared;
