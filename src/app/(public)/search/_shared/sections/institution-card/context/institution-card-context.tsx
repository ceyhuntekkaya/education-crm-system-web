import React, { createContext, useContext, ReactNode } from "react";
import {
  useInstitutionCard,
  UseInstitutionCardReturn,
  UseInstitutionCardOptions,
} from "../hooks";

const InstitutionCardContext = createContext<
  UseInstitutionCardReturn | undefined
>(undefined);

interface InstitutionCardProviderProps extends UseInstitutionCardOptions {
  children: ReactNode;
}

/**
 * Institution Card Context Provider
 * Props drilling sorununu çözmek için oluşturulmuştur
 * Tüm child componentler bu context'i kullanarak verilere erişebilir
 */
export const InstitutionCardProvider: React.FC<
  InstitutionCardProviderProps
> = ({ children, institution, onCardClick }) => {
  const institutionCardData = useInstitutionCard({ institution, onCardClick });

  return (
    <InstitutionCardContext.Provider value={institutionCardData}>
      {children}
    </InstitutionCardContext.Provider>
  );
};

/**
 * Institution Card Context hook
 * Context'i kullanmak için bu hook'u kullanın
 */
export const useInstitutionCardContext = (): UseInstitutionCardReturn => {
  const context = useContext(InstitutionCardContext);

  if (context === undefined) {
    throw new Error(
      "useInstitutionCardContext must be used within an InstitutionCardProvider"
    );
  }

  return context;
};
