"use client";

import { useGetOrganizerById } from "../../../../../_shared/hooks/api/useOrganizersApi";

/**
 * Organizatör ID'sine göre tek bir organizatörün detaylarını getirir
 * (Ana _shared'dan re-export)
 */
export const useOrganizerDetail = (id: number) =>
  useGetOrganizerById(id, { enabled: id > 0 });
