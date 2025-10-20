"use client";

import React, { createContext, useContext } from "react";
import { ModalProps } from "../types";

/**
 * Modal Context interface
 * Modal'ın tüm props'larını alt bileşenlerle paylaşır
 */
export interface ModalContextValue extends Omit<ModalProps, "children"> {
  /** Modal'ın ref'i */
  modalRef?: React.RefObject<HTMLDivElement>;
}

/**
 * Modal Context
 */
const ModalContext = createContext<ModalContextValue | null>(null);

/**
 * Modal Context Provider
 */
export interface ModalProviderProps {
  children: React.ReactNode;
  value: ModalContextValue;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({
  children,
  value,
}) => {
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

/**
 * Modal Context hook
 * Modal'ın props'larına erişim sağlar
 */
export const useModalContext = (): ModalContextValue => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error(
      "useModalContext must be used within a ModalProvider. " +
        "Make sure you are using this hook inside Modal.Header, Modal.Body, or Modal.Footer components."
    );
  }

  return context;
};

/**
 * Modal Context hook (opsiyonel)
 * Modal'ın dışında kullanıldığında null döner
 */
export const useModalContextOptional = (): ModalContextValue | null => {
  return useContext(ModalContext);
};
