"use client";

import React, { createContext, useContext, useState } from "react";
import { CompanyContextType, CompanyProviderProps } from "../types";
import { useSelectedSchool } from "../hooks";
import { useAuth } from "@/contexts";

// Context oluşturma
const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

// Fake okul verileri
const defaultSchools = [
  { id: 1, name: "İlkokul", type: "İlkokul" },
  { id: 2, name: "Ortaokul", type: "Ortaokul" },
  { id: 3, name: "Lise", type: "Lise" },
];

// Company Provider
export const CompanyProvider: React.FC<CompanyProviderProps> = ({
  children,
}) => {
  const { user } = useAuth();
  // Sadece sidebar için gerekli state'ler
  const [schools, setSchools] = useState(defaultSchools);

  // Custom hook ile seçili okul yönetimi
  const { selectedSchool, setSelectedSchool, isInitialized } =
    useSelectedSchool(defaultSchools);

  const value: CompanyContextType = {
    // State
    schools,
    selectedSchool,
    isInitialized,

    // Setters
    setSchools,
    setSelectedSchool,
  };

  return (
    <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>
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
