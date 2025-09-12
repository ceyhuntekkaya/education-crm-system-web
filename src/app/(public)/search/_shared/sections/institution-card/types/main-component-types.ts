import { SchoolSearchResultDto } from "@/types/dto/institution/InstitutionSearch.types";

/**
 * Ana InstitutionCard component props
 */
export interface InstitutionCardProps {
  institution: SchoolSearchResultDto;
  className?: string;
  isExpanded?: boolean;
  onCardClick?: () => void;
  animationDelay?: string;
}
