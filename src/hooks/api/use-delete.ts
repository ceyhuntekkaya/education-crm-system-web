"use client";

import { useCallback } from "react";
import { apiClient } from "@/lib/api/client";
import { useApi } from "./use-api";
import { MutationOptions } from "./types";

// DELETE istekleri için hook
export const useDelete = <TData = unknown, TVariables = unknown>(
  url: string | ((variables: TVariables) => string),
  options?: MutationOptions<TData, TVariables>
) => {
  const api = useApi<TData>();

  // DELETE isteği yapma fonksiyonu
  const mutate = useCallback(
    async (
      data: TVariables,
      mutationOptions?: MutationOptions<TData, TVariables>
    ): Promise<TData | null> => {
      const combinedOptions = { ...options, ...mutationOptions };
      const endpoint = typeof url === "function" ? url(data) : url;

      return api.executeMutation(
        () => apiClient.delete<TData>(endpoint),
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
    remove: mutate,
    removeAsync: mutateAsync,
    delete: mutate,
    deleteAsync: mutateAsync,
  };
};

// ID ile silme için özelleştirilmiş hook
export const useDeleteById = <TData = unknown>(
  baseUrl: string,
  options?: MutationOptions<TData, string | number>
) => {
  const api = useApi<TData>();

  // ID ile silme fonksiyonu
  const deleteById = useCallback(
    async (
      id: string | number,
      mutationOptions?: MutationOptions<TData, string | number>
    ): Promise<TData | null> => {
      const combinedOptions = { ...options, ...mutationOptions };
      const url = `${baseUrl}/${id}`;

      return api.executeMutation(
        () => apiClient.delete<TData>(url),
        id,
        combinedOptions
      );
    },
    [baseUrl, options, api]
  );

  // Async delete by ID
  const deleteByIdAsync = useCallback(
    async (
      id: string | number,
      mutationOptions?: MutationOptions<TData, string | number>
    ): Promise<TData> => {
      const result = await deleteById(id, mutationOptions);
      if (result === null) {
        throw new Error("Delete operation failed");
      }
      return result;
    },
    [deleteById]
  );

  return {
    ...api,
    deleteById,
    deleteByIdAsync,
    // Alias'lar
    remove: deleteById,
    removeAsync: deleteByIdAsync,
  };
};

// Toplu silme için hook
export const useBulkDelete = <TData = unknown>(
  url: string,
  options?: MutationOptions<TData, (string | number)[]>
) => {
  const api = useApi<TData>();

  // Toplu silme fonksiyonu
  const bulkDelete = useCallback(
    async (
      ids: (string | number)[],
      mutationOptions?: MutationOptions<TData, (string | number)[]>
    ): Promise<TData | null> => {
      const combinedOptions = { ...options, ...mutationOptions };

      return api.executeMutation(
        (variables: (string | number)[]) =>
          apiClient.delete<TData>(url, { data: { ids: variables } }),
        ids,
        combinedOptions
      );
    },
    [url, options, api]
  );

  return {
    ...api,
    bulkDelete,
    // Alias
    deleteMany: bulkDelete,
  };
};
