"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { CurrentAppointmentContextType } from "../types";
import { mockCurrentAppointment } from "../mock/current-appointment-data";

const CurrentAppointmentContext = createContext<
  CurrentAppointmentContextType | undefined
>(undefined);

export const useCurrentAppointmentContext =
  (): CurrentAppointmentContextType => {
    const context = useContext(CurrentAppointmentContext);
    if (!context) {
      throw new Error(
        "useCurrentAppointmentContext must be used within CurrentAppointmentProvider"
      );
    }
    return context;
  };

interface CurrentAppointmentProviderProps {
  children: React.ReactNode;
  institutionId: string;
}

export const CurrentAppointmentProvider: React.FC<
  CurrentAppointmentProviderProps
> = ({ children, institutionId }) => {
  const [currentAppointment, setCurrentAppointment] =
    useState<AppointmentDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data yükleme - Gerçek API ile değiştirilecek
  useEffect(() => {
    const loadCurrentAppointment = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Simulated API call delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock data - institutionId'ye göre kontrol
        if (mockCurrentAppointment.schoolId === parseInt(institutionId)) {
          setCurrentAppointment(mockCurrentAppointment);
        } else {
          setCurrentAppointment(null);
        }
      } catch (err) {
        setError("Randevu bilgisi yüklenirken bir hata oluştu.");
        console.error("Error loading current appointment:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCurrentAppointment();
  }, [institutionId]);

  const refetch = () => {
    // Veriyi yeniden yükle
    setCurrentAppointment(
      currentAppointment ? { ...currentAppointment } : null
    );
  };

  const value: CurrentAppointmentContextType = {
    currentAppointment,
    isLoading,
    error,
    refetch,
  };

  return (
    <CurrentAppointmentContext.Provider value={value}>
      {children}
    </CurrentAppointmentContext.Provider>
  );
};
