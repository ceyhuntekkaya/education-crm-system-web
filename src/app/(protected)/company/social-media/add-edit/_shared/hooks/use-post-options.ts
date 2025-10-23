"use client";

import { useMemo } from "react";
import { PostType, PostStatus } from "@/enums";
import { UsePostOptionsReturn } from "../types";
import { getPostTypeLabel, getPostStatusLabel } from "../utils";

/**
 * Post form için enum options hook'u
 */
export const usePostOptions = (): UsePostOptionsReturn => {
  // PostType options
  const postTypeOptions = useMemo(
    () =>
      Object.entries(PostType).map(([key, value]) => ({
        value: value,
        label: getPostTypeLabel(value),
      })),
    []
  );

  // PostStatus options
  const postStatusOptions = useMemo(
    () =>
      Object.entries(PostStatus).map(([key, value]) => ({
        value: value,
        label: getPostStatusLabel(value),
      })),
    []
  );

  return {
    postTypeOptions,
    postStatusOptions,
  };
};
