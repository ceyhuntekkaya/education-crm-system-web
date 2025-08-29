'use client';

import { useCallback } from 'react';
import { apiClient } from '@/lib/api/client';
import { useApi } from './useApi';
import { MutationOptions } from './types';

// POST istekleri için hook
export const usePost = <TData = unknown, TVariables = unknown>(
  url: string,
  options?: MutationOptions<TData, TVariables>
) => {
  const api = useApi<TData>();

  // POST isteği yapma fonksiyonu
  const mutate = useCallback(async (
    data: TVariables,
    mutationOptions?: MutationOptions<TData, TVariables>
  ): Promise<TData | null> => {
    const combinedOptions = { ...options, ...mutationOptions };
    
    return api.executeMutation(
      (variables: TVariables) => apiClient.post<TData>(url, variables),
      data,
      combinedOptions
    );
  }, [url, options, api]);

  // Async mutate - Promise döndürür
  const mutateAsync = useCallback(async (
    data: TVariables,
    mutationOptions?: MutationOptions<TData, TVariables>
  ): Promise<TData> => {
    const result = await mutate(data, mutationOptions);
    if (result === null) {
      throw new Error('Mutation failed');
    }
    return result;
  }, [mutate]);

  return {
    ...api,
    mutate,
    mutateAsync,
    // Alias'lar
    post: mutate,
    postAsync: mutateAsync,
  };
};

// Form submit için özelleştirilmiş POST hook
export const usePostForm = <TFormData = Record<string, unknown>, TResponse = unknown>(
  url: string,
  options?: MutationOptions<TResponse, TFormData> & {
    resetOnSuccess?: boolean;
  }
) => {
  const { resetOnSuccess = true, ...mutationOptions } = options || {};
  const api = useApi<TResponse>();

  // Form submit fonksiyonu
  const submitForm = useCallback(async (
    formData: TFormData,
    submitOptions?: MutationOptions<TResponse, TFormData>
  ): Promise<TResponse | null> => {
    const combinedOptions = {
      ...mutationOptions,
      ...submitOptions,
      onSuccess: (data: TResponse, variables: TFormData) => {
        if (resetOnSuccess) {
          // Form reset edilebilir (form context ile entegrasyon)
        }
        mutationOptions?.onSuccess?.(data, variables);
        submitOptions?.onSuccess?.(data, variables);
      },
    };
    
    // Normalizer: convert undefined/null/objects to safe primitive values for form submission.
    const normalizeForm = (data: unknown): TFormData => {
      if (!data || typeof data !== "object") return (data as unknown) as TFormData;
      const dataObj = data as Record<string, unknown>;
      const out: Record<string, unknown> = {};
      Object.keys(dataObj).forEach((k) => {
        const v = dataObj[k];
        if (v === undefined || v === null) {
          out[k] = "";
        } else if (typeof v === "object") {
          // Keep File-like objects intact, otherwise stringify
          const maybeFile = v as { name?: unknown; size?: unknown };
          const isFileLike =
            typeof maybeFile.name === "string" && typeof maybeFile.size === "number";
          out[k] = isFileLike ? v : String(v);
        } else {
          out[k] = v;
        }
      });
      return out as TFormData;
    };

    const payload = normalizeForm(formData);

    return api.executeMutation(
      (variables: TFormData) => apiClient.post<TResponse>(url, variables),
      payload,
      combinedOptions
    );
  }, [url, mutationOptions, resetOnSuccess, api]);

  return {
    ...api,
    submitForm,
    // Alias
    submit: submitForm,
  };
};
