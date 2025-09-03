"use client";

import { useState, useCallback } from "react";
import { ApiState, ApiOptions, MutationOptions } from "./types";

// Ana API hook - diğer hook'lar için temel
export const useApi = <T>() => {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  // Loading durumunu set etme
  const setLoading = useCallback((loading: boolean) => {
    setState((prev) => ({ ...prev, loading }));
  }, []);

  // Error durumunu set etme
  const setError = useCallback((error: string | null) => {
    setState((prev) => ({ ...prev, error }));
  }, []);

  // Data'yı set etme
  const setData = useCallback((data: T | null) => {
    setState((prev) => ({ ...prev, data }));
  }, []);

  // State'i reset etme
  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  // Generic request fonksiyonu
  const execute = useCallback(
    async <TResult>(
      requestFn: () => Promise<{ data: TResult }>,
      options?: ApiOptions
    ): Promise<TResult | null> => {
      try {
        setLoading(true);
        setError(null);

        const response = await requestFn();
        const result = response.data;

        setData(result as unknown as T);
        options?.onSuccess?.(result);

        return result;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Bir hata oluştu";
        setError(errorMessage);
        options?.onError?.(errorMessage);
        return null;
      } finally {
        setLoading(false);
        options?.onFinally?.();
      }
    },
    [setData, setError, setLoading]
  );

  // Mutation için execute fonksiyonu
  const executeMutation = useCallback(
    async <TResult, TVariables>(
      requestFn: (variables: TVariables) => Promise<{ data: TResult }>,
      variables: TVariables,
      options?: MutationOptions<TResult, TVariables>
    ): Promise<TResult | null> => {
      try {
        setLoading(true);
        setError(null);

        const response = await requestFn(variables);
        const result = response.data;

        // Response kontrolü
        if (result === undefined || result === null) {
          throw new Error("API response is empty or null");
        }

        setData(result as unknown as T);
        options?.onSuccess?.(result, variables);

        return result;
      } catch (error) {
        let errorMessage = "Bir hata oluştu";

        if (error instanceof Error) {
          errorMessage = error.message;

          // JSON parse hatalarını özel olarak yakala
          if (error.message.includes("Unexpected end of JSON input")) {
            errorMessage =
              "Sunucudan geçersiz yanıt alındı. Lütfen sistem yöneticisine başvurun.";
            console.error(
              "JSON Parse Error - Likely empty or invalid response from server"
            );
          }

          if (error.message.includes("JSON")) {
            errorMessage =
              "Veri formatı hatası. Sunucu yanıtı beklenenden farklı.";
          }
        }

        console.error("API Mutation Error:", {
          error,
          variables,
          errorMessage,
          timestamp: new Date().toISOString(),
        });

        setError(errorMessage);
        options?.onError?.(errorMessage, variables);
        return null;
      } finally {
        setLoading(false);
        options?.onFinally?.(variables);
      }
    },
    [setData, setError, setLoading]
  );

  return {
    ...state,
    setLoading,
    setError,
    setData,
    reset,
    execute,
    executeMutation,
  };
};
