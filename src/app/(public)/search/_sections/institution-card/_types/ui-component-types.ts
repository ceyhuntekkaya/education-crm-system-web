// UI component props - Context kullanımı sonrası sadeleştirildi

/**
 * HeroImage Props - sadece display options
 */
export interface HeroImageProps {
  height?: string;
  showButtons?: boolean;
}

/**
 * InstitutionHeader Props - sadece size option
 */
export interface InstitutionHeaderProps {
  logoSize?: number;
}

/**
 * Artık prop almayan bileşenler:
 * - Highlights: context'ten veri alıyor
 * - Properties: context'ten veri alıyor
 * - ActionSection: context'ten onCardClick alıyor
 * - ExpandedLayout: context'ten onCardClick alıyor
 * - DescriptionSection: context'ten veri alıyor
 * - AgeRangeInfo: context'ten veri alıyor
 */
