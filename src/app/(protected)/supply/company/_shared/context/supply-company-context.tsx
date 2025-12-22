"use client";

import React, { createContext, useContext } from "react";

interface SupplyCompanyContextType {
  // Tedarik şirketi ile ilgili state'ler buraya eklenecek
}

interface SupplyCompanyProviderProps {
  children: React.ReactNode;
}

// Context oluşturma
const SupplyCompanyContext = createContext<
  SupplyCompanyContextType | undefined
>(undefined);

// Supply Company Provider
export const SupplyCompanyProvider: React.FC<SupplyCompanyProviderProps> = ({
  children,
}) => {
  const value: SupplyCompanyContextType = {
    // State ve fonksiyonlar buraya eklenecek
  };

  return (
    <SupplyCompanyContext.Provider value={value}>
      {children}
    </SupplyCompanyContext.Provider>
  );
};

// Custom hook for using supply company context
export const useSupplyCompany = (): SupplyCompanyContextType => {
  const context = useContext(SupplyCompanyContext);
  if (!context) {
    throw new Error(
      "useSupplyCompany must be used within a SupplyCompanyProvider"
    );
  }
  return context;
};

export default SupplyCompanyContext;
