export interface UserProfileDto {
  /** Format: int64 */
  id?: number;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  /** Format: int64 */
  countryId?: number;
  countryName?: string;
  /** Format: int64 */
  provinceId?: number;
  provinceName?: string;
  /** Format: int64 */
  districtId?: number;
  districtName?: string;
  /** Format: int64 */
  neighborhoodId?: number;
  neighborhoodName?: string;
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
