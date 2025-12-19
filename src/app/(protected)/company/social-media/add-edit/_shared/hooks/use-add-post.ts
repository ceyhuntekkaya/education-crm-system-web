"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { PostCreateDto, PostDto } from "@/types";
import { useRouter } from "next/navigation";
import { useSocialMedia } from "../../../_shared/context";

/**
 * Post ekleme hook'u
 */
export const useAddPost = () => {
  const router = useRouter();
  const { refetchPosts } = useSocialMedia();

  const {
    mutate: postPost,
    loading: isLoading,
    error,
  } = usePost<PostDto, PostCreateDto>(API_ENDPOINTS.CONTENT.POST_CREATE, {
    onSuccess: (data) => {
      // console.log("✅ onSuccess alanı -> Post başarıyla eklendi:", data);
      // Liste API'sine tekrar istek at
      refetchPosts();
      // Social media sayfasına yönlendir
      router.push("/company/social-media");
    },
    onError: (error) => {
      // console.log("❌ onError alanı -> Post eklenirken hata:", error);
    },
  });

  return {
    postPost,
    isLoading,
    error,
  };
};
