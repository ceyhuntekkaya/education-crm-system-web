"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { SchoolListContextType } from "../types";

const SchoolListContext = createContext<SchoolListContextType | undefined>(
  undefined
);

interface SchoolListProviderProps {
  children: ReactNode;
}

export const SchoolListProvider: React.FC<SchoolListProviderProps> = ({
  children,
}) => {
  const contextValue: SchoolListContextType = {
    // Context properties will be added here as needed
  };

  return (
    <SchoolListContext.Provider value={contextValue}>
      {children}
    </SchoolListContext.Provider>
  );
};

export const useSchoolList = (): SchoolListContextType => {
  const context = useContext(SchoolListContext);
  if (context === undefined) {
    throw new Error("useSchoolList must be used within a SchoolListProvider");
  }
  return context;
};
