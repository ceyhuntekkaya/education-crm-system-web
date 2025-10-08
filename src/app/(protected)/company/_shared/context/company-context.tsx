"use client";

import React, { createContext, useContext, useState } from "react";
import { CompanyContextType, CompanyProviderProps } from "../types";

// Context oluşturma
const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

// Company Provider
export const CompanyProvider: React.FC<CompanyProviderProps> = ({
  children,
}) => {
  return (
    <CompanyContext.Provider value={undefined}>
      {children}
    </CompanyContext.Provider>
  );
};

// Custom hook for using company context
export const useCompany = (): CompanyContextType => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
};

export default CompanyContext;
