"use client";

import { useEffect, useState } from "react";
import { useGetTeacherProfileById } from "./useTeacherProfileApi";
import type { TeacherProfileDto } from "@/types";

interface UseTeacherProfileByIdReturn {
  teacherProfile: TeacherProfileDto | null;
  isLoading: boolean;
  error: any;
  refetch: () => void;
}

/**
 * ID'ye göre öğretmen profili getirir
 * useGetTeacherProfileById'in response yapısını düzenler
 */
export function useTeacherProfileById(
  teacherProfileId: number,
): UseTeacherProfileByIdReturn {
  const [teacherProfile, setTeacherProfile] =
    useState<TeacherProfileDto | null>(null);

  const { data, loading, error, refetch } = useGetTeacherProfileById(
    teacherProfileId,
    {
      enabled: !!teacherProfileId,
    },
  );

  useEffect(() => {
    if (data?.data) {
      setTeacherProfile(data.data);
    }
  }, [data]);

  return {
    teacherProfile,
    isLoading: loading,
    error,
    refetch,
  };
}
