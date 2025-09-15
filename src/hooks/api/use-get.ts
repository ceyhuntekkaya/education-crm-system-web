"use client";

import { useEffect, useCallback } from "react";
import { apiClient } from "@/lib/api/client";
import { useApi } from "./use-api";
import { ApiOptions, PaginationParams } from "./types";

// GET istekleri için hook
export const useGet = <T>(
  url: string | null,
  options?: ApiOptions<T> & { params?: Record<string, unknown> }
) => {
  const {
    enabled = true,
    params,
    onSuccess,
    onError,
    onFinally,
  } = options || {};
  const api = useApi<T>();

  // GET isteği yapma fonksiyonu
  const fetchData = useCallback(async () => {
    if (!url) return null;

    try {
      api.setLoading(true);
      api.setError(null);

      const response = await apiClient.get<T>(url, { params });
      const result = response.data;

      api.setData(result);
      onSuccess?.(result);

      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Bir hata oluştu";
      api.setError(errorMessage);
      onError?.(errorMessage);
      return null;
    } finally {
      api.setLoading(false);
      onFinally?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, JSON.stringify(params), api, onSuccess, onError, onFinally]);

  // Veriyi yeniden yükleme
  const refetch = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  // Otomatik çalışma - sadece enabled ve url değiştiğinde
  useEffect(() => {
    if (enabled && url) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, url]); // fetchData'yı kaldırdık

  return {
    ...api,
    refetch,
  };
};
