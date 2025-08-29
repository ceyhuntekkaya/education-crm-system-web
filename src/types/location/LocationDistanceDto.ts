import { LocationSuggestionDto } from './LocationSuggestionDto';

export interface LocationDistanceDto {
  location?: LocationSuggestionDto;
  distanceKm?: number;
  estimatedTravelTimeMinutes?: number;
  transportationMethod?: string;
}
