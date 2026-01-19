"use client";

import React, { createContext, useContext } from "react";

// Context'te sadece gerekli type'ları export edelim
interface SupplySupplierContextType {
  // Context içinde başka state'ler varsa buraya eklenecek
}

interface SupplySupplierProviderProps {
  children: React.ReactNode;
}

// Context oluşturma
const SupplySupplierContext = createContext<
  SupplySupplierContextType | undefined
>(undefined);

// Supply Supplier Provider
export const SupplySupplierProvider: React.FC<SupplySupplierProviderProps> = ({
  children,
}) => {
  const value: SupplySupplierContextType = {
    // State ve fonksiyonlar buraya eklenecek
  };

  return (
    <SupplySupplierContext.Provider value={value}>
      {children}
    </SupplySupplierContext.Provider>
  );
};

// Custom hook for using supply supplier context
export const useSupplySupplier = (): SupplySupplierContextType => {
  const context = useContext(SupplySupplierContext);
  if (!context) {
    throw new Error(
      "useSupplySupplier must be used within a SupplySupplierProvider"
    );
  }
  return context;
};

export default SupplySupplierContext;
