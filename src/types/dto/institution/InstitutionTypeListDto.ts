import { InstitutionTypeDto } from "./InstitutionTypeDto";
import { PropertyGroupTypeDto } from "./PropertyGroupTypeDto";

export interface InstitutionTypeListDto {
  institutionTypeDto?: InstitutionTypeDto;
  propertyGroupTypeDtos?: PropertyGroupTypeDto[];
}
