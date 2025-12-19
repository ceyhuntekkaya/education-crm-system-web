"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { CampusCreateDto, CampusDto } from "@/types";
import { useRouter } from "next/navigation";

/**
 * Campus ekleme hook'u
 */
export const useAddCampus = () => {
  const router = useRouter();

  const {
    mutate: postCampus,
    loading: isLoading,
    error,
  } = usePost<CampusDto, CampusCreateDto>(
    API_ENDPOINTS.INSTITUTIONS.CAMPUS_CREATE,
    {
      onSuccess: (data) => {
        // console.log("✅ onSuccess alanı -> Campus başarıyla eklendi:", data);
        // Campus detay sayfasına yönlendir
        router.push(`/company/campus-detail/${data.id}`);
      },
      onError: (error) => {
        // console.log("❌ onError alanı -> Campus eklenirken hata:", error);
      },
    }
  );

  return {
    postCampus,
    isLoading,
    error,
  };
};
