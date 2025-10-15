import { useMemo } from "react";
import { createSections } from "../utils";
import { POST_SECTIONS } from "../config";
import { PostDto } from "@/types";

/**
 * Post sections hook'u
 * Tüm section işleme mantığını kapsüller
 */
export const usePostSections = (post: PostDto | null) => {
  return useMemo(() => {
    // Post null ise boş array döndür
    if (!post) return [];

    // Ana section'ları oluştur
    const postSections = createSections(POST_SECTIONS, post);

    return postSections;
  }, [post]);
};
