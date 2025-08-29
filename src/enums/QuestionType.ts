export enum QuestionType {
  SINGLE_CHOICE = "SINGLE_CHOICE", // Tek seçim (radio button)
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE", // Çoklu seçim (checkbox)
  DROPDOWN = "DROPDOWN", // Açılır liste
  TEXT_SHORT = "TEXT_SHORT", // Kısa metin
  TEXT_LONG = "TEXT_LONG", // Uzun metin (textarea)
  EMAIL = "EMAIL", // E-posta
  PHONE = "PHONE", // Telefon
  NUMBER = "NUMBER", // Sayı
  DATE = "DATE", // Tarih
  TIME = "TIME", // Saat
  RATING_STAR = "RATING_STAR", // Yıldız değerlendirme
  RATING_SCALE = "RATING_SCALE", // Ölçek değerlendirme (1-10)
  YES_NO = "YES_NO", // Evet/Hayır
  LIKERT_SCALE = "LIKERT_SCALE", // Likert ölçeği
  MATRIX = "MATRIX", // Matris sorusu
  FILE_UPLOAD = "FILE_UPLOAD", // Dosya yükleme
  SIGNATURE = "SIGNATURE", // İmza
  SECTION_HEADER = "SECTION_HEADER", // Bölüm başlığı
}
