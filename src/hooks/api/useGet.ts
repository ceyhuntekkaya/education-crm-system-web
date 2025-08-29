'use client';

import { useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api/client';
import { useApi } from './useApi';
import { ApiOptions, PaginationParams } from './types';

// GET istekleri için hook
export const useGet = <T>(
  url: string | null,
  options?: ApiOptions<T> & { params?: Record<string, unknown> }
) => {
  const { enabled = true, params, onSuccess, onError, onFinally } = options || {};
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
      const errorMessage = error instanceof Error ? error.message : 'Bir hata oluştu';
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

// Pagination desteği ile GET hook
export const useGetPaginated = <T>(
  url: string | null,
  paginationParams?: PaginationParams,
  options?: ApiOptions
) => {
  const { enabled = true, onSuccess, onError, onFinally } = options || {};
  const api = useApi<T>();

  // Paginated GET isteği
  const fetchData = useCallback(async (params?: PaginationParams) => {
    if (!url) return null;

    const queryParams = { ...paginationParams, ...params };
    
    try {
      api.setLoading(true);
      api.setError(null);

      const response = await apiClient.get<T>(url, { params: queryParams });
      const result = response.data;

      api.setData(result);
      onSuccess?.(result);
      
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Bir hata oluştu';
      api.setError(errorMessage);
      onError?.(errorMessage);
      return null;
    } finally {
      api.setLoading(false);
      onFinally?.();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, JSON.stringify(paginationParams), api, onSuccess, onError, onFinally]);

  // Sayfa değiştirme
  const goToPage = useCallback((page: number) => {
    return fetchData({ page });
  }, [fetchData]);

  // Sonraki sayfa
  const nextPage = useCallback(() => {
    const currentPage = paginationParams?.page || 1;
    return fetchData({ page: currentPage + 1 });
  }, [fetchData, paginationParams?.page]);

  // Önceki sayfa
  const prevPage = useCallback(() => {
    const currentPage = paginationParams?.page || 1;
    if (currentPage > 1) {
      return fetchData({ page: currentPage - 1 });
    }
    return Promise.resolve(null);
  }, [fetchData, paginationParams?.page]);

  // Yeniden yükleme
  const refetch = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  // Otomatik çalışma - sadece enabled ve url değiştiğinde
  useEffect(() => {
    if (enabled && url) {
      fetchData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, url]); // fetchData dependency'sini kaldırdık

  return {
    ...api,
    refetch,
    goToPage,
    nextPage,
    prevPage,
  };
};
