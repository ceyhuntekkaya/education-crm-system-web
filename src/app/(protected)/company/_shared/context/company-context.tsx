"use client";

import React, { createContext, useContext, useMemo, useEffect } from "react";
import { CompanyContextType, CompanyProviderProps } from "../types";
import { useSelectedSchool } from "../hooks";
import { useAuth } from "@/contexts";

// Context oluşturma
const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

// Company Provider
export const CompanyProvider: React.FC<CompanyProviderProps> = ({
  children,
}) => {
  const { user } = useAuth();

  const schools = useMemo(() => {
    return user?.userRoles?.[0]?.schools || [];
  }, [user?.userRoles]);

  // Custom hook ile seçili Kurum yönetimi
  const { selectedSchool, setSelectedSchool, isInitialized } =
    useSelectedSchool(schools);

  // User değiştiğinde (Kurum güncelleme sonrası), selectedSchool'u da güncelle
  useEffect(() => {
    if (selectedSchool && schools.length > 0) {
      const updatedSchool = schools.find((s) => s.id === selectedSchool.id);
      if (updatedSchool && updatedSchool.name !== selectedSchool.name) {
        // Kurum ismi değişmişse güncelle
        setSelectedSchool(updatedSchool);
      }
    }
  }, [schools, selectedSchool, setSelectedSchool]);

  const value: CompanyContextType = {
    // State
    schools,
    selectedSchool,
    isInitialized,

    // Setters
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
