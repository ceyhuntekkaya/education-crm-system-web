/**
 * Düzenleme modunda değiştirilebilecek alanlar
 * Sadece temel bilgiler, profil resmi ve bildirim tercihleri
 */
export const ALLOWED_FIELDS_FOR_EDIT: string[] = [
  "firstName",
  "lastName",
  "phone",
  "profileImageUrl",
  "emailNotifications",
  "smsNotifications",
  "marketingEmails",
];
