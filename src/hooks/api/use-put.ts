"use client";

import { useCallback } from "react";
import { apiClient } from "@/lib/api/client";
import { useApi } from "./use-api";
import { MutationOptions } from "./types";

// PUT istekleri için hook
export const usePut = <TData = unknown, TVariables = unknown>(
  url: string | ((variables: TVariables) => string),
  options?: MutationOptions<TData, TVariables>
) => {
  const api = useApi<TData>();

  // PUT isteği yapma fonksiyonu
  const mutate = useCallback(
    async (
      data: TVariables,
      mutationOptions?: MutationOptions<TData, TVariables>
    ): Promise<TData | null> => {
      const combinedOptions = { ...options, ...mutationOptions };
      const endpoint = typeof url === "function" ? url(data) : url;

      return api.executeMutation(
        (variables: TVariables) => apiClient.put<TData>(endpoint, variables),
        data,
        combinedOptions
      );
    },
    [url, options, api]
  );

  // Async mutate - Promise döndürür
  const mutateAsync = useCallback(
    async (
      data: TVariables,
      mutationOptions?: MutationOptions<TData, TVariables>
    ): Promise<TData> => {
      const result = await mutate(data, mutationOptions);
      if (result === null) {
        throw new Error("Mutation failed");
      }
      return result;
    },
    [mutate]
  );

  return {
    ...api,
    mutate,
    mutateAsync,
    // Alias'lar
    update: mutate,
    updateAsync: mutateAsync,
  };
};

// Partial update için PATCH hook
export const usePatch = <TData = unknown, TVariables = unknown>(
  url: string | ((variables: TVariables) => string),
  options?: MutationOptions<TData, TVariables>
) => {
  const api = useApi<TData>();

  // PATCH isteği yapma fonksiyonu
  const mutate = useCallback(
    async (
      data: TVariables,
      mutationOptions?: MutationOptions<TData, TVariables>
    ): Promise<TData | null> => {
      const combinedOptions = { ...options, ...mutationOptions };
      const endpoint = typeof url === "function" ? url(data) : url;

      return api.executeMutation(
        (variables: TVariables) => apiClient.patch<TData>(endpoint, variables),
        data,
        combinedOptions
      );
    },
    [url, options, api]
  );

  // Async mutate - Promise döndürür
  const mutateAsync = useCallback(
    async (
      data: TVariables,
      mutationOptions?: MutationOptions<TData, TVariables>
    ): Promise<TData> => {
      const result = await mutate(data, mutationOptions);
      if (result === null) {
        throw new Error("Mutation failed");
      }
      return result;
    },
    [mutate]
  );

  return {
    ...api,
    mutate,
    mutateAsync,
    // Alias'lar
    patch: mutate,
    patchAsync: mutateAsync,
  };
};
