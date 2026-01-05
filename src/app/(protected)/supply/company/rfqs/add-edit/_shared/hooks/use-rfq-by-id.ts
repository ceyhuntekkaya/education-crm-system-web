"use client";

import { useRFQById as useRFQByIdApi } from "../../../_shared/hooks/api";

/**
 * ID'ye göre RFQ detayını getirir
 * _shared/hooks/api'deki hook'u re-export eder
 */
export const useRFQById = (id: number | null) => {
  return useRFQByIdApi(id!);
};
