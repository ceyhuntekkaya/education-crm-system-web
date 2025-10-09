"use client";

import React, { createContext, useContext, useMemo } from "react";
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
    const userSchools = user?.userRoles?.[0]?.schools || [];
    return userSchools.map((school) => ({
      id: school.id || 0,
      name: school.name || "",
    }));
  }, [user?.userRoles]);

  // Custom hook ile seçili okul yönetimi
  const { selectedSchool, setSelectedSchool, isInitialized } =
    useSelectedSchool(schools);

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
