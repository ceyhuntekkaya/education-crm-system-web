"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type SnackbarType = "success" | "error" | "warning" | "info";

export interface SnackbarMessage {
  id: string;
  message: string;
  type: SnackbarType;
  duration?: number;
}

interface SnackbarContextType {
  snackbars: SnackbarMessage[];
  showSnackbar: (
    message: string,
    type: SnackbarType,
    duration?: number
  ) => void;
  hideSnackbar: (id: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within SnackbarProvider");
  }
  return context;
};

interface SnackbarProviderProps {
  children: React.ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const [snackbars, setSnackbars] = useState<SnackbarMessage[]>([]);

  const hideSnackbar = useCallback((id: string) => {
    setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
  }, []);

  const showSnackbar = useCallback(
    (message: string, type: SnackbarType, duration: number = 4000) => {
      const id = `snackbar-${Date.now()}-${Math.random()}`;
      const newSnackbar: SnackbarMessage = {
        id,
        message,
        type,
        duration,
      };

      setSnackbars((prev) => [...prev, newSnackbar]);

      // Auto hide after duration
      if (duration > 0) {
        setTimeout(() => {
          hideSnackbar(id);
        }, duration);
      }
    },
    [hideSnackbar]
  );

  return (
    <SnackbarContext.Provider
      value={{ snackbars, showSnackbar, hideSnackbar }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};
