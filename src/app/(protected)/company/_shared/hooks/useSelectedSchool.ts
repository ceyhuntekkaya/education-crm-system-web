import { useState, useEffect } from "react";
import { SchoolDto } from "@/types";
import { getStoredSelectedSchool, setStoredSelectedSchool } from "../utils";

/**
 * Seçili Kurum için localStorage işlemlerini yöneten custom hook
 * @param defaultSchools - Varsayılan Kurum listesi
 * @returns Seçili Kurum state'i ve setter fonksiyonu
 */
export const useSelectedSchool = (defaultSchools: SchoolDto[]) => {
  const [selectedSchool, setSelectedSchool] = useState<SchoolDto | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Component mount olduğunda localStorage'dan seçili Kurumu çek
  useEffect(() => {
    const storedSchool = getStoredSelectedSchool();

    if (storedSchool) {
      // Stored school'un schools listesinde olup olmadığını kontrol et
      const schoolExists = defaultSchools.find(
        (school) => school.id === storedSchool.id
      );

      if (schoolExists) {
        setSelectedSchool(storedSchool);
      } else {
        // Eğer stored school artık mevcut değilse, default'u seç
        setSelectedSchool(defaultSchools[0]);
        setStoredSelectedSchool(defaultSchools[0]);
      }
    } else {
      // localStorage'da seçili Kurum yoksa default'u seç
      setSelectedSchool(defaultSchools[0]);
      setStoredSelectedSchool(defaultSchools[0]);
    }

    setIsInitialized(true);
  }, [defaultSchools]);

  // Seçili Kurum değiştiğinde localStorage'a kaydet
  const handleSetSelectedSchool = (school: SchoolDto) => {
    setSelectedSchool(school);
    setStoredSelectedSchool(school);
  };

  return {
    selectedSchool,
    setSelectedSchool: handleSetSelectedSchool,
    isInitialized,
  };
};
