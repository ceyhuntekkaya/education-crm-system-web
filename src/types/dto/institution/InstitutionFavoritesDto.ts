import { SchoolSummaryDto } from './SchoolSummaryDto';
import { CampusSummaryDto } from './CampusSummaryDto';
import { BrandSummaryDto } from './BrandSummaryDto';

export interface InstitutionFavoritesDto {
  userId?: number;
  favoriteSchools?: SchoolSummaryDto[];
  favoriteCampuses?: CampusSummaryDto[];
  favoriteBrands?: BrandSummaryDto[];
  totalFavorites?: number;
}
