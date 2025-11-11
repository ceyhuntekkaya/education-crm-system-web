export interface UserRegistrationDto {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  confirmPassword?: string;
  /** @enum {string} */
  userType?: "INSTITUTION_USER" | "PARENT";
  /** Format: int64 */
  countryId?: number;
  /** Format: int64 */
  provinceId?: number;
  /** Format: int64 */
  districtId?: number;
  /** Format: int64 */
  neighborhoodId?: number;
  addressLine1?: string;
  addressLine2?: string;
  postalCode?: string;
  acceptTerms?: boolean;
  acceptPrivacy?: boolean;
  acceptMarketing?: boolean;
}

