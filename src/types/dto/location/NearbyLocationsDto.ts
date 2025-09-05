import { CoordinatesDto } from './CoordinatesDto';
import { LocationDistanceDto } from './LocationDistanceDto';

export interface NearbyLocationsDto {
  center?: CoordinatesDto;
  radiusKm?: number;
  locations?: LocationDistanceDto[];
  totalCount?: number;
}
