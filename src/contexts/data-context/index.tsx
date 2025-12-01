"use client";

import React, { createContext, useContext, useMemo } from "react";
import { usePathname } from "next/navigation";
import { DataContextType } from "./types";
import {
  useAppointments,
  useFavoriteSearches,
  useMessages,
  useMyLists,
  useSurveys,
} from "./hooks";

const DataContext = createContext<DataContextType | undefined>(undefined);

// Public path'leri kontrol eden yardımcı fonksiyon
const isPublicPath = (pathname: string): boolean => {
  // Public path'ler: ana sayfa, arama, hakkımızda, randevular, anketler, listeler, mesajlar, vs.
  const publicPaths = [
    "/",
    "/search",
    "/about",
    "/appointments",
    "/surveys",
    "/my-lists",
    "/messages",
    "/memberships",
  ];

  // Eğer pathname bu path'lerden biriyle başlıyorsa public'tir
  return publicPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();

  // Sadece public path'lerde veri çek
  const shouldFetchData = isPublicPath(pathname);

  // Lists data
  const {
    listMenuLinks,
    parentLists,
    loading: listsLoading,
    error: listsError,
    refetch: refetchLists,
  } = useMyLists(shouldFetchData);

  // Favorite searches data
  const {
    favoriteSearchMenuLinks,
    loading: favoriteSearchesLoading,
    error: favoriteSearchesError,
    refetch: refetchFavoriteSearches,
  } = useFavoriteSearches(shouldFetchData);

  // Appointments data
  const {
    slots: appointmentSlots,
    loading: appointmentsLoading,
    error: appointmentsError,
    refetch: refetchAppointments,
  } = useAppointments(shouldFetchData);

  // Surveys data
  const {
    surveys,
    loading: surveysLoading,
    error: surveysError,
    refetch: refetchSurveys,
  } = useSurveys(shouldFetchData);

  // Messages data
  const {
    conversationGroups,
    loading: messagesLoading,
    error: messagesError,
    refetch: refetchMessages,
  } = useMessages(shouldFetchData);

  // Calculate counts for badges
  const appointmentsCount = useMemo(() => {
    // Sadece appointment'ı olan slot'ları say
    return appointmentSlots.filter((slot) => slot.appointment).length;
  }, [appointmentSlots]);

  const surveysCount = useMemo(() => {
    return surveys.length;
  }, [surveys]);

  const messagesCount = useMemo(() => {
    return conversationGroups.length;
  }, [conversationGroups]);

  const value: DataContextType = {
    // Lists
    listMenuLinks,
    parentLists,
    listsLoading,
    listsError: listsError as string | null,
    refetchLists,

    // Favorite Searches
    favoriteSearchMenuLinks,
    favoriteSearchesLoading,
    favoriteSearchesError: favoriteSearchesError as string | null,
    refetchFavoriteSearches,

    // Appointments
    appointmentSlots,
    appointmentsLoading,
    appointmentsError: appointmentsError as string | null,
    refetchAppointments,

    // Surveys
    surveys,
    surveysLoading,
    surveysError: surveysError as string | null,
    refetchSurveys,

    // Messages
    conversationGroups,
    messagesLoading,
    messagesError: messagesError as string | null,
    refetchMessages,

    // Counts
    appointmentsCount,
    surveysCount,
    messagesCount,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
