import { SchoolDto } from './SchoolDto';

export interface InstitutionComparisonDto {
  schools?: SchoolDto[];
  comparisonCategories?: string[];
  comparisonData?: Record<string, Record<number, unknown>>;
  recommendations?: string[];
}
