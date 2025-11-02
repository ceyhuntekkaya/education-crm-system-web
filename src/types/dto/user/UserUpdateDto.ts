export interface UserUpdateDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  profileImageUrl?: string;
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
  /** Format: double */
  latitude?: number;
  /** Format: double */
  longitude?: number;
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  marketingEmails?: boolean;
  preferredLanguage?: string;
  timezone?: string;
}
