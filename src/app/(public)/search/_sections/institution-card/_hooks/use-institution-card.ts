import { useState, useMemo } from "react";
import { SchoolSearchResultDto } from "@/types/dto/institution/InstitutionSearch.types";
import {
  hasActiveCampaign,
  getVisibleCardProperties,
  getVisibleHighlights,
  getInstitutionTypeBadgeStyle,
  getCampaignBadgeStyle,
} from "../_utils";

export interface UseInstitutionCardOptions {
  institution: SchoolSearchResultDto;
  onCardClick?: () => void;
}

export interface UseInstitutionCardReturn {
  // Institution data
  institution: SchoolSearchResultDto;

  // Computed values
  hasActiveCampaign: boolean;
  visibleCardProperties: any[];
  visibleHighlights: string[];
  institutionTypeStyle: any;
  campaignStyle: any;

  // State management
  showAllHighlights: boolean;
  showAllProperties: boolean;

  // Actions
  toggleAllHighlights: () => void;
  toggleAllProperties: () => void;
  setShowAllHighlights: (value: boolean) => void;
  setShowAllProperties: (value: boolean) => void;
  onCardClick?: () => void;
}

/**
 * Institution Card hook - Props drilling sorununu çözmek için oluşturulmuştur
 * Tüm state yönetimi ve computed değerleri merkezi olarak yönetir
 */
export const useInstitutionCard = ({
  institution,
  onCardClick,
}: UseInstitutionCardOptions): UseInstitutionCardReturn => {
  // Local state
  const [showAllHighlights, setShowAllHighlights] = useState(false);
  const [showAllProperties, setShowAllProperties] = useState(false);

  // Computed values - memoized for performance
  const institutionHasActiveCampaign = useMemo(
    () => hasActiveCampaign(institution),
    [institution]
  );

  const visibleCardProperties = useMemo(
    () => getVisibleCardProperties(institution),
    [institution]
  );

  const visibleHighlights = useMemo(
    () => getVisibleHighlights(institution),
    [institution]
  );

  const institutionTypeStyle = useMemo(
    () => getInstitutionTypeBadgeStyle(institution),
    [institution]
  );

  const campaignStyle = useMemo(
    () => getCampaignBadgeStyle(institution),
    [institution]
  );

  // Actions
  const toggleAllHighlights = () => {
    setShowAllHighlights((prev) => !prev);
  };

  const toggleAllProperties = () => {
    setShowAllProperties((prev) => !prev);
  };

  return {
    // Institution data
    institution,

    // Computed values
    hasActiveCampaign: institutionHasActiveCampaign,
    visibleCardProperties,
    visibleHighlights,
    institutionTypeStyle,
    campaignStyle,

    // State management
    showAllHighlights,
    showAllProperties,

    // Actions
    toggleAllHighlights,
    toggleAllProperties,
    setShowAllHighlights,
    setShowAllProperties,
    onCardClick,
  };
};
