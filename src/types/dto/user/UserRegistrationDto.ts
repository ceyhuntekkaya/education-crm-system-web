import { UserType } from "../../../enums/UserType";

export interface UserRegistrationDto {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  userType: UserType;
  countryId: number;
  provinceId: number;
  districtId: number;
  neighborhoodId: number;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  acceptMarketing: boolean;
}
