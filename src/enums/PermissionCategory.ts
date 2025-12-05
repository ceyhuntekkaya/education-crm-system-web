export enum PermissionCategory {
  USER_MANAGEMENT = "USER_MANAGEMENT", // kullanici_olustur, kullanici_duzenle vs
  INSTITUTION_MANAGEMENT = "INSTITUTION_MANAGEMENT", // kampus_duzenle, Kurum_olustur vs
  APPOINTMENT_MANAGEMENT = "APPOINTMENT_MANAGEMENT", // randevu_olustur, randevu_iptal_et vs
  CONTENT_MANAGEMENT = "CONTENT_MANAGEMENT", // galeri_duzenle, post_olustur vs
  SURVEY_MANAGEMENT = "SURVEY_MANAGEMENT", // anket_goruntule, anket_duzenle vs
  SUBSCRIPTION_MANAGEMENT = "SUBSCRIPTION_MANAGEMENT", // abonelik_goruntule, odeme_yap vs
  ANALYTICS = "ANALYTICS", // istatistik_goruntule, rapor_olustur vs
}
